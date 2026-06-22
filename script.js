// Dynamic Year
document.getElementById("year").textContent = new Date().getFullYear();

// Preloader
window.addEventListener("load", () => {
  document.querySelector(".preloader").classList.add("hide");
});

// Mobile Menu
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
  navbar.classList.toggle("show");
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("show");
  });
});

// Starry Background
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
let numStars = 160;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function createStars() {
  stars = [];

  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.4 + 0.2,
      speed: Math.random() * 0.5 + 0.15,
      alpha: Math.random()
    });
  }
}
createStars();

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 245, 255, ${star.alpha})`;
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

// Typing Animation
const words = [
  "3D Portfolio Websites",
  "Responsive Web Design",
  "E-commerce Websites",
  "Modern UI/UX Designs",
  "Creative Digital Experiences"
];

let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;
const typingText = document.getElementById("typing");

function typeEffect() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, letterIndex--);
  } else {
    typingText.textContent = currentWord.substring(0, letterIndex++);
  }

  if (!isDeleting && letterIndex === currentWord.length + 1) {
    isDeleting = true;
    setTimeout(typeEffect, 1200);
    return;
  }

  if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, isDeleting ? 45 : 80);
}
typeEffect();

// Scroll Animations
const scrollElements = document.querySelectorAll(".fade-up, .slide-in");

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

scrollElements.forEach(el => observer.observe(el));

// Skill Bars Animation
const skillBars = document.querySelectorAll(".skill-bar span");

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width;
    }
  });
}, { threshold: 0.6 });

skillBars.forEach(bar => skillObserver.observe(bar));

// Counter Animation
const counters = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = Number(counter.dataset.count);
      let count = 0;
      const speed = target / 60;

      const updateCount = () => {
        count += speed;

        if (count < target) {
          counter.textContent = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target + (target === 100 ? "%" : "+");
        }
      };

      updateCount();
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.7 });

counters.forEach(counter => counterObserver.observe(counter));

// 3D Tilt Cards
const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -12;
    const rotateY = ((x / rect.width) - 0.5) * 12;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  });
});

// Cursor Glow
const cursor=document.querySelector(".cursor");

document.addEventListener("mousemove",(e)=>{

cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";

});

document.querySelectorAll("a,button,.project-card,.skill-card,.service-card")
.forEach(el=>{

el.addEventListener("mouseenter",()=>{

cursor.classList.add("hover");

});

el.addEventListener("mouseleave",()=>{

cursor.classList.remove("hover");

});

});

// Scroll Progress + Back To Top
const progress = document.querySelector(".scroll-progress");
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progressWidth = (scrollTop / docHeight) * 100;

  progress.style.width = `${progressWidth}%`;

  if (scrollTop > 500) {
    backTop.style.display = "block";
  } else {
    backTop.style.display = "none";
  }

  activeNavLink();
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Active Navbar Link
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

function activeNavLink() {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 160;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}


// Work Modal
const workModal = document.getElementById("workModal");
const openWorkModal = document.querySelector(".open-work-modal");
const closeWorkModal = document.querySelector(".close-work-modal");

openWorkModal.addEventListener("click", () => {
  workModal.classList.add("show");
  document.body.style.overflow = "hidden";
});

closeWorkModal.addEventListener("click", () => {
  workModal.classList.remove("show");
  document.body.style.overflow = "auto";
});

workModal.addEventListener("click", (e) => {
  if (e.target === workModal) {
    workModal.classList.remove("show");
    document.body.style.overflow = "auto";
  }
});

/* ===========================================
   DESIGN PREVIEW GALLERY
=========================================== */

const galleries = {

logo: [

{
image:"logo1.jpg",
title:"Logo Design",
category:"Branding",
description:"Professional logo created for branding."
},

{
image:"logo2.jpg",
title:"Luxury Logo",
category:"Branding",
description:"Modern premium logo."
},

{
image:"logo3.jpg",
title:"Corporate Logo",
category:"Branding",
description:"Business identity design."
}

],

website:[

{
image:"website1.jpg",
title:"Website UI",
category:"Web Design",
description:"Modern responsive website."
},

{
image:"website2.jpg",
title:"Landing Page",
category:"Web Design",
description:"Clean landing page."
},

{
image:"website3.jpg",
title:"Dashboard",
category:"Web Design",
description:"Admin dashboard."
}

],

poster:[

{
image:"poster1.jpg",
title:"Poster Design",
category:"Poster",
description:"Advertising poster."
},

{
image:"poster2.jpg",
title:"Product Promotion",
category:"Poster",
description:"Social media design."
}

],

packaging:[

{
image:"package1.jpg",
title:"Perfume Packaging",
category:"Packaging",
description:"Luxury perfume box."
},

{
image:"package2.jpg",
title:"Bottle Design",
category:"Packaging",
description:"Bottle presentation."
}

],

product3d:[

{
image:"3d1.jpg",
title:"3D Bottle",
category:"3D Design",
description:"3D perfume render."
},

{
image:"3d2.jpg",
title:"Luxury Bottle",
category:"3D Design",
description:"Product visualization."
}

]

};

const previewModal=document.getElementById("designPreviewModal");

const previewImage=document.getElementById("previewImage");

const previewCategory=document.getElementById("previewCategory");

const previewTitle=document.getElementById("previewTitle");

const previewDescription=document.getElementById("previewDescription");

const previewCounter=document.getElementById("previewCounter");

const prevBtn=document.getElementById("prevDesign");

const nextBtn=document.getElementById("nextDesign");

const closePreview=document.querySelector(".close-preview-modal");

let currentGallery=[];

let currentIndex=0;

function loadPreview(){

const item=currentGallery[currentIndex];

previewImage.src=item.image;

previewCategory.textContent=item.category;

previewTitle.textContent=item.title;

previewDescription.textContent=item.description;

previewCounter.textContent=
`${currentIndex+1} / ${currentGallery.length}`;

}

document.querySelectorAll(".view-design-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

const galleryName=btn.dataset.gallery;

currentGallery=galleries[galleryName];

currentIndex=0;

loadPreview();

previewModal.classList.add("show");

});

});

nextBtn.addEventListener("click",()=>{

currentIndex++;

if(currentIndex>=currentGallery.length){

currentIndex=0;

}

loadPreview();

});

prevBtn.addEventListener("click",()=>{

currentIndex--;

if(currentIndex<0){

currentIndex=currentGallery.length-1;

}

loadPreview();

});

closePreview.addEventListener("click",()=>{

previewModal.classList.remove("show");

});

previewModal.addEventListener("click",e=>{

if(e.target===previewModal){

previewModal.classList.remove("show");

}

});
