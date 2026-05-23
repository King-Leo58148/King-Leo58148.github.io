document.addEventListener('DOMContentLoaded', () => {

  // ── Typing animation
  const words = ["Django Developer", "API Builder", "Real-Time Systems", "WebSocket Engineer", "CS Student at KNUST"];
  const el = document.getElementById('typed');
  let w = 0, ch = 0, deleting = false;

  function tick() {
    const word = words[w];
    el.textContent = word.slice(0, ch);
    if (!deleting) {
      if (ch < word.length) { ch++; setTimeout(tick, 110); }
      else { deleting = true; setTimeout(tick, 1200); }
    } else {
      if (ch > 0) { ch--; setTimeout(tick, 55); }
      else { deleting = false; w = (w + 1) % words.length; setTimeout(tick, 300); }
    }
  }
  tick();

  // ── Skill bar percentage display
  document.querySelectorAll('.bar').forEach(b => {
    const pct = b.dataset.skill || 50;
    const label = b.closest('.skill').querySelector('.skill-pct');
    if (label) label.textContent = pct + '%';
  });

  // ── Intersection Observer
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
        e.target.querySelectorAll('.bar').forEach(b => {
          const v = b.dataset.skill || 50;
          b.querySelector('span').style.width = v + '%';
        });
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(n => io.observe(n));

  // ── Particles
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, pts = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function init() {
      pts = [];
      for (let i = 0; i < 70; i++) {
        pts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.4 + 0.4,
          dx: (Math.random() - 0.5) * 0.3,
          dy: (Math.random() - 0.5) * 0.3,
          o: Math.random() * 0.4 + 0.1
        });
      }
    }

    function render() {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,176,255,${p.o * 0.15})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      }
      requestAnimationFrame(render);
    }

    window.addEventListener('resize', () => { resize(); init(); });
    resize(); init(); render();
  }

  // ── Smooth nav scroll
  document.querySelectorAll('.nav-links a, .cta-scroll').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

});
