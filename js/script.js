document.addEventListener('DOMContentLoaded', () => {

  // Active nav link on scroll
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));

  // Smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Cursor glow effect on desktop
  if (window.innerWidth > 900) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed; pointer-events: none; z-index: 0;
      width: 600px; height: 600px; border-radius: 50%;
      background: radial-gradient(circle, rgba(100,255,218,0.04) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      transition: left 100ms ease, top 100ms ease;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

});
