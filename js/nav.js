// Navigation behaviour — active link highlighting + scroll-based opacity
(function () {
  const navLinks = document.querySelectorAll('.nav-links a');
  const current  = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();
