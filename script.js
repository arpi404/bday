/* ══════════════════════════════════════════════
   Birthday Website — script.js  (fixed & clean)
══════════════════════════════════════════════ */

const COLORS = ['#ffffff', '#d4d4d4', '#a3a3a3', '#737373', '#e5e5e5'];
const MAX_TRIES = 4;
let tries = 0;

/* ── 1. Floating confetti dots ── */
function createConfetti() {
  const bg = document.getElementById('confettiBg');
  if (!bg) return;
  for (let i = 0; i < 35; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
      animation-duration: ${5 + Math.random() * 10}s;
      animation-delay: ${Math.random() * 10}s;
      width: ${4 + Math.random() * 8}px;
      height: ${4 + Math.random() * 8}px;
    `;
    bg.appendChild(dot);
  }
}

/* ── 2. Fade-in sections on scroll ── */
function initScrollReveal() {
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px)';
    section.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
    observer.observe(section);
  });
}

/* ── 3. Run-away button ── */
function runAway() {
  tries++;
  const btn = document.getElementById('runBtn');
  const area = document.getElementById('btnArea');
  const maxX = area.clientWidth - btn.offsetWidth - 10;
  const maxY = area.clientHeight - btn.offsetHeight - 10;

  btn.style.left = Math.max(0, Math.floor(Math.random() * maxX)) + 'px';
  btn.style.top  = Math.max(0, Math.floor(Math.random() * maxY)) + 'px';

  const msg = document.getElementById('triesMsg');
  if (tries < MAX_TRIES) {
    msg.textContent = `HAHA CAN'T CATCH ME  😈  (${tries}/${MAX_TRIES})`;
  } else {
    msg.textContent = 'UGH FINE. I GIVE UP 😂';
    btn.style.display = 'none';
    setTimeout(handleOpen, 700);
  }
}

/* ── 4. Reveal gift section ── */
function handleOpen() {
  const s3 = document.getElementById('s3');
  s3.style.display = 'flex';
  setTimeout(() => s3.scrollIntoView({ behavior: 'smooth' }), 50);
}

/* ── 5. Open gift box ── */
function openGift() {
  const box = document.getElementById('giftBox');
  box.textContent = '💥';
  setTimeout(() => {
    box.textContent = '✨';
    const s4 = document.getElementById('s4');
    s4.style.display = 'flex';
    launchSparkles();
    setTimeout(() => s4.scrollIntoView({ behavior: 'smooth' }), 200);
  }, 600);
}

/* ── 6. Sparkle burst ── */
function launchSparkles() {
  const container = document.getElementById('sparkle');
  container.innerHTML = '';
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;

  for (let i = 0; i < 70; i++) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    const angle = Math.random() * 2 * Math.PI;
    const dist  = 150 + Math.random() * 280;
    spark.style.cssText = `
      left: ${cx}px;
      top: ${cy}px;
      background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
      --tx: ${Math.cos(angle) * dist}px;
      --ty: ${Math.sin(angle) * dist}px;
      animation-delay: ${Math.random() * 0.3}s;
      width: ${4 + Math.random() * 10}px;
      height: ${4 + Math.random() * 10}px;
    `;
    container.appendChild(spark);
  }
  setTimeout(() => { container.innerHTML = ''; }, 1600);
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  createConfetti();
  initScrollReveal();
});
