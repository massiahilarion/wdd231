const menuButton = document.querySelector('#menu');
const navList = document.querySelector('#primary-nav');

menuButton.addEventListener('click', () => {
  const open = navList.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
  menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  menuButton.textContent = open ? 'X' : '\u2630';
});