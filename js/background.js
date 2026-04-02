// Animated canvas background — full spec (55 particles, home page)
// Lite spec (20 particles, inner pages) enabled by data-lite attribute on canvas

(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const isLite = canvas.dataset.lite !== undefined;
  const PARTICLE_COUNT = canvas.dataset.particles ? parseInt(canvas.dataset.particles) : (isLite ? 20 : 55);
  const MAX_DIST       = canvas.dataset.maxdist   ? parseInt(canvas.dataset.maxdist)   : (isLite ? 60 : 90);
  const ALPHA_SCALE = isLite ? 0.7 : 1.0; // 30% reduction for lite

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  // ── Particle factory ──────────────────────────────────────────────────────
  function createParticle(W, H) {
    const t = Math.random(); // color interpolation 0→1
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: 1.2 + Math.random() * 2.8,   // base radius 1.2–4px
      phase: Math.random() * Math.PI * 2,
      t: t,
    };
  }

  // ── Colour helpers ────────────────────────────────────────────────────────
  // Interpolate between teal #1D9E75 and blue #378ADD
  function particleRGB(t) {
    const r = Math.round(29  + (55  - 29)  * t);
    const g = Math.round(158 + (138 - 158) * t);
    const b = Math.round(117 + (221 - 117) * t);
    return [r, g, b];
  }

  // ── Init / resize ─────────────────────────────────────────────────────────
  function init() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(canvas.width, canvas.height));
    }
  }

  // ── Noise overlay ─────────────────────────────────────────────────────────
  function drawNoise(t) {
    const W = canvas.width;
    const H = canvas.height;
    const step = 10;
    for (let x = 0; x < W; x += step) {
      for (let y = 0; y < H; y += step) {
        const noise =
          Math.sin(x * 0.018 + t * 0.4) * Math.cos(y * 0.022 + t * 0.3) * 0.4 +
          Math.sin(x * 0.035 + y * 0.028 + t * 0.6) * 0.3 +
          Math.cos(x * 0.012 - y * 0.019 + t * 0.2) * 0.3;
        // map noise (-1..1) to subtle teal tint, max alpha 0.06
        const alpha = ((noise + 1) / 2) * 0.06;
        ctx.fillStyle = `rgba(29,158,117,${alpha})`;
        ctx.fillRect(x, y, step, step);
      }
    }
  }

  // ── Main render loop ──────────────────────────────────────────────────────
  function draw(timestamp) {
    const tick = timestamp * 0.0004;
    const W = canvas.width;
    const H = canvas.height;

    // Background fill
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#f7f5ee';
    ctx.fillRect(0, 0, W, H);

    // Noise texture
    drawNoise(timestamp * 0.001);

    // Update particle positions
    for (const p of particles) {
      p.x += p.vx + Math.sin(tick + p.phase) * 0.15;
      p.y += p.vy + Math.cos(tick + p.phase * 0.7) * 0.1;
      // Wrap edges
      if (p.x < 0)  p.x += W;
      if (p.x > W)  p.x -= W;
      if (p.y < 0)  p.y += H;
      if (p.y > H)  p.y -= H;
    }

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const lineAlpha = (1 - dist / MAX_DIST) * 0.2 * ALPHA_SCALE;
          ctx.strokeStyle = `rgba(29,158,117,${lineAlpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (const p of particles) {
      const pulse   = Math.sin(tick * 1.8 + p.phase) * 0.25 + 0.75;
      const radius  = p.r * pulse;
      const depthA  = (0.4 + p.t * 0.5) * ALPHA_SCALE;
      const [r, g, b] = particleRGB(p.t);

      // Soft halo at 3× radius, 10% of core alpha
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3);
      grad.addColorStop(0,   `rgba(${r},${g},${b},${depthA})`);
      grad.addColorStop(0.33, `rgba(${r},${g},${b},${depthA * 0.1})`);
      grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);

      ctx.beginPath();
      ctx.arc(p.x, p.y, radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${depthA})`;
      ctx.fill();
    }

    animId = requestAnimationFrame(draw);
  }

  // ── Start ─────────────────────────────────────────────────────────────────
  init();
  animId = requestAnimationFrame(draw);

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    init();
    animId = requestAnimationFrame(draw);
  });
})();
