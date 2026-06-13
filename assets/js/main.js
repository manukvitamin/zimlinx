const btn = document.querySelector('[data-menu-btn]');
const nav = document.querySelector('[data-nav]');
if (btn && nav) {
  btn.addEventListener('click', () => nav.classList.toggle('open'));
}