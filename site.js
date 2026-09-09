document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-item');
  const navButtons = document.querySelectorAll('.nav-item > .nav-link');

  navItems.forEach((item) => {
    const trigger = item.querySelector(':scope > .nav-link');
    const dropdown = item.querySelector('.dropdown');
    if (!trigger || !dropdown) return;

    trigger.setAttribute('aria-haspopup', 'true');
    if (trigger.tagName === 'BUTTON') {
      trigger.setAttribute('aria-expanded', 'false');
      trigger.addEventListener('click', (event) => {
        if (window.innerWidth > 760) return;
        event.preventDefault();
        const isOpen = item.classList.contains('is-open');
        navItems.forEach((navItem) => {
          navItem.classList.remove('is-open');
          const button = navItem.querySelector(':scope > .nav-link');
          if (button && button.tagName === 'BUTTON') {
            button.setAttribute('aria-expanded', 'false');
          }
        });
        if (!isOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-item')) {
      navItems.forEach((item) => {
        item.classList.remove('is-open');
        const button = item.querySelector(':scope > .nav-link');
        if (button && button.tagName === 'BUTTON') {
          button.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const normalized = href.split('/').pop();
    if (normalized === currentPage) {
      link.classList.add('active');
    }
  });
});
