/* -------------------------------
   DYNAMIC YEAR
--------------------------------*/
document.getElementById("year").textContent = new Date().getFullYear();

/* -------------------------------
   STARFIELD BACKGROUND
--------------------------------*/
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
let numStars = 140;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// create stars
for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.3,
    speed: Math.random() * 0.5 + 0.3,
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ffff";

  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;

    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(drawStars);
}
drawStars();

/* -------------------------------
   SCROLL ANIMATIONS
--------------------------------*/
const scrollElements = document.querySelectorAll('.fade-up, .slide-in');

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

scrollElements.forEach(el => observer.observe(el));

/* -------------------------------
   PREMIUM ADS MODAL OPEN/CLOSE
--------------------------------*/
const adsModal = document.getElementById("adsModal");
const viewAdsBtn = document.querySelector(".btn-view-ads");
const adsExitHome = document.getElementById("adsHomeExit");

// open modal
viewAdsBtn.addEventListener("click", () => {
  adsModal.style.display = "flex";
});

// close modal button
adsExitHome.addEventListener("click", () => {
  adsModal.style.display = "none";
});

// close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === adsModal) {
    adsModal.style.display = "none";
  }
});

/* -------------------------------
   HERO 3D PARALLAX MOVEMENT
--------------------------------*/
document.addEventListener("mousemove", (e) => {
  const hero = document.querySelector(".hero");

  let x = (window.innerWidth / 2 - e.pageX) / 40;
  let y = (window.innerHeight / 2 - e.pageY) / 40;

  hero.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
});

/* -------------------------------
   PROJECT CARDS 3D TILT EFFECT
--------------------------------*/
const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x - rect.width / 2) / 18).toFixed(2);
    const rotateX = (-(y - rect.height / 2) / 18).toFixed(2);

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.07)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  });
});

/* -------------------------------
   FLOATING HOLOGRAM IMAGE
--------------------------------*/
const floatingHolo = document.querySelector(".floating-holo");

if (floatingHolo) {
  let angle = 0;

  function animateHolo() {
    angle += 0.02;
    const y = Math.sin(angle) * 12;
    floatingHolo.style.transform = `translateY(${y}px)`;
    requestAnimationFrame(animateHolo);
  }

  animateHolo();
}

/* -------------------------------
   HOLOGRAM LIGHT SWEEP ON HERO IMAGE
--------------------------------*/
const heroImage = document.querySelector(".hero-image img");

if (heroImage) {
  let glowDirection = 1;
  let glowValue = 0;

  function glowEffect() {
    glowValue += glowDirection * 0.03;

    if (glowValue > 1) glowDirection = -1;
    if (glowValue < 0) glowDirection = 1;

    heroImage.style.filter = `drop-shadow(0 0 ${20 + glowValue * 20}px cyan)`;

    requestAnimationFrame(glowEffect);
  }

  glowEffect();
}

/* -------------------------------
   ABOUT ME HOLOGRAM PULSE RING
--------------------------------*/
const aboutRing = document.querySelector(".aboutme-image");

if (aboutRing) {
  let pulse = 0;
  let pulseDir = 1;

  function pulseAnimation() {
    pulse += pulseDir * 0.02;

    if (pulse > 1) pulseDir = -1;
    if (pulse < 0) pulseDir = 1;

    aboutRing.style.filter = `drop-shadow(0 0 ${10 + pulse * 15}px cyan)`;

    requestAnimationFrame(pulseAnimation);
  }

  pulseAnimation();
}
