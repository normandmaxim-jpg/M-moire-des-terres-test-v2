/*
  ═══════════════════════════════════════════════
  script.js — Mémoire des terres
  ═══════════════════════════════════════════════
*/


/* ─────────────────────────────────────────────
   ÉTAPE 1 — RÉCUPÉRER LES ÉLÉMENTS HTML
───────────────────────────────────────────── */
const couloir          = document.getElementById('couloir');
const archiveCadre     = document.getElementById('archiveCadre');
const carteCadre       = document.getElementById('carteCadre');
const archiveCadre2    = document.getElementById('archiveCadre2');
const texteBloc        = document.getElementById('texteBloc');
const finEcran         = document.getElementById('finEcran');
const barreProgression = document.getElementById('barreProgression');
const scrollIndic      = document.getElementById('scrollIndic');
const entete           = document.getElementById('entete');


/* ─────────────────────────────────────────────
   ÉTAPE 2 — FONCTION PRINCIPALE
───────────────────────────────────────────── */
function onScroll() {

  /* ── Calcul de la progression ── */
  const scrollY       = window.scrollY;
  const hauteurTotale = couloir.offsetHeight - window.innerHeight;
  const progress      = Math.min(scrollY / hauteurTotale, 1);  /* nombre entre 0 et 1 */


  /* ────────────────────────────────────────
     Effet 1 : BARRE DE PROGRESSION
  ──────────────────────────────────────── */
  barreProgression.style.width = (progress * 100) + '%';


  /* ────────────────────────────────────────
     Effet 2 : INDICATEUR "scroller"
     Disparaît dès qu'on commence à scroller
  ──────────────────────────────────────── */
  if (progress < 0.03) {
    scrollIndic.style.opacity = 1;
  } else {
    scrollIndic.style.opacity = 0;
  }


  /* ────────────────────────────────────────
     Effet 3 : IMAGE 1 (archive) DEVIENT FLOUE
     Flou progressif de 0px → 20px
     + s'estompe doucement en opacity
  ──────────────────────────────────────── */
  const valeurFlou    = Math.max(0, (progress - 0.05) * 22);
  const opaciteImage1 = Math.max(0.1, 1 - progress * 0.8);

  archiveCadre.style.filter  = 'blur(' + valeurFlou + 'px)';
  archiveCadre.style.opacity = opaciteImage1;


  /* ────────────────────────────────────────
     Effet 4 : IMAGE 2 (carte actuelle) APPARAÎT
     Apparaît à 0.25 (25% du scroll)
     Fade out entre 0.65 et 0.75 pour laisser
     la place à l'image 3
  ──────────────────────────────────────── */
  if (progress > 0.25) {
    carteCadre.classList.add('visible');
  } else {
    carteCadre.classList.remove('visible');
  }

  /* Fade out de la carte pendant que l'image 3 arrive */
  if (progress >= 0.65 && progress < 0.75) {
    const fadeOutCarte = 1 - (progress - 0.65) / 0.10;
    carteCadre.style.opacity = Math.max(0, fadeOutCarte);
  } else if (progress >= 0.75) {
    carteCadre.style.opacity = '0';
  } else {
    carteCadre.style.opacity = '';  /* laisse le CSS gérer */
  }


  /* ────────────────────────────────────────
     Effet 5 : TEXTE
     Apparaît à 0.40 en même temps que l'image 3
     Disparaît entre 0.60 et 0.70

     Ajuste ces chiffres si besoin :
     0.40 = moment d'apparition
     0.60 = début de la disparition
     0.70 = complètement disparu
  ──────────────────────────────────────── */
  if (progress > 0.40 && progress < 0.70) {
    texteBloc.classList.add('visible');
  } else {
    texteBloc.classList.remove('visible');
  }

  /* Apparition progressive entre 0.40 et 0.50 */
  if (progress >= 0.40 && progress < 0.50) {
    const fadeInTexte = (progress - 0.40) / 0.10;
    texteBloc.style.opacity = Math.min(1, fadeInTexte);

  /* Pleinement visible entre 0.50 et 0.60 */
  } else if (progress >= 0.50 && progress < 0.60) {
    texteBloc.style.opacity = '1';

  /* Disparition progressive entre 0.60 et 0.70 */
  } else if (progress >= 0.60 && progress < 0.70) {
    const fadeOutTexte = 1 - (progress - 0.60) / 0.10;
    texteBloc.style.opacity = Math.max(0, fadeOutTexte);

  /* Caché partout ailleurs */
  } else {
    texteBloc.style.opacity = '0';
  }


  /* ────────────────────────────────────────
     Effet 6 : IMAGE 3 (archiveCadre2) APPARAÎT
     Commence à apparaître à 0.65 — pendant que
     la carte (image 2) est en train de disparaître
     → crée un effet de transition croisée
  ──────────────────────────────────────── */
  if (progress > 0.65) {
    archiveCadre2.classList.add('visible');
  } else {
    archiveCadre2.classList.remove('visible');
  }


  /* ────────────────────────────────────────
     Effet 7 : ÉCRAN DE FIN
     Apparaît à 0.92 (92% du scroll)
  ──────────────────────────────────────── */
  if (progress > 0.92) {
    finEcran.classList.add('visible');
  } else {
    finEcran.classList.remove('visible');
  }


  /* ────────────────────────────────────────
     Effet 8 : TITRE EN HAUT s'efface vers la fin
  ──────────────────────────────────────── */
  if (progress > 0.85) {
    entete.style.opacity = 0;
  } else {
    entete.style.opacity = 1;
  }

}


/* ─────────────────────────────────────────────
   ÉTAPE 3 — BRANCHER LA FONCTION AU SCROLL
───────────────────────────────────────────── */
window.addEventListener('scroll', onScroll, { passive: true });


/* ─────────────────────────────────────────────
   ÉTAPE 4 — APPEL INITIAL
───────────────────────────────────────────── */
onScroll();
