// IzaacWeb V5 - Menu //

const btnMobile = document.getElementById('btn-mobile');
const nav = document.getElementById('nav');
const menu = document.getElementById('menu');

function setAria(isOpen) {
  if (!btnMobile) return;
  btnMobile.setAttribute('aria-expanded', String(isOpen));
  btnMobile.setAttribute('aria-label', isOpen ? 'Fechar Menu' : 'Abrir Menu');
}

function openMenu() {
  nav.classList.add('active');
  setAria(true);
}

function closeMenu() {
  nav.classList.remove('active');
  setAria(false);
}

function toggleMenu() {
  const isOpen = nav.classList.toggle('active');
  setAria(isOpen);
}

// Fechar ao clicar fora
function handleDocumentClick(e) {
  if (!nav.classList.contains('active')) return;
  const isClickInside = nav.contains(e.target);
  if (!isClickInside) closeMenu();
}

// Fechar ao clicar em qualquer link do menu
function handleMenuLinkClick(e) {
  const target = e.target;
  if (target && target.tagName === 'A') {
    closeMenu();
  }
}

// Fechar ao redimensionar para desktop
function handleResize() {
  if (window.innerWidth > 900 && nav.classList.contains('active')) {
    closeMenu();
  }
}

// Listeners
if (btnMobile) {
  btnMobile.addEventListener('click', toggleMenu);
}

document.addEventListener('click', handleDocumentClick);
if (menu) menu.addEventListener('click', handleMenuLinkClick);
window.addEventListener('resize', handleResize);

// Estado inicial (assegura aria correta)
setAria(false);