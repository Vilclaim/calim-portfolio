// Dynamic Year
document.getElementById("year").textContent = new Date().getFullYear();

// Starry Background
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
let numStars = 120;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.2,
    speed: Math.random() * 0.5 + 0.2,
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
    if (star.y > canvas.height) star.y = 0;
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// Scroll Animations
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

// VIEW MY ADS MODAL
const adsModal = document.getElementById("adsModal");
const viewAdsBtn = document.querySelector(".btn-view-ads");
const adsExitHome = document.getElementById("adsHomeExit");

// Open modal
viewAdsBtn.addEventListener("click", () => {
  adsModal.style.display = "flex";
});

// Close modal with top X
adsExitHome.addEventListener("click", () => {
  adsModal.style.display = "none";
});

// Click outside closes modal
window.addEventListener("click", (e) => {
  if (e.target === adsModal) {
    adsModal.style.display = "none";
  }
});
