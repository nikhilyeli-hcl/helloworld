// Theme toggle logic
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

function setTheme(theme) {
  body.className = theme;
  if (theme === 'theme-dark') {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  } else {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
  localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
  const newTheme = body.classList.contains('theme-dark') ? 'theme-light' : 'theme-dark';
  setTheme(newTheme);
});

// On load, set theme from localStorage
window.onload = () => {
  const savedTheme = localStorage.getItem('theme') || 'theme-light';
  setTheme(savedTheme);
};

// Animate sections, header, headings, and footer on load
function animateSections() {
  const animatedSections = document.querySelectorAll('section, header.hero-section');
  animatedSections.forEach((el, idx) => {
    el.style.animationDelay = (0.1 + idx * 0.1) + 's';
    el.classList.add('animated');
  });

  // Animate headings and footer
  const animatedText = document.querySelectorAll('h1, h2, h5, .footer-custom .pb-3, .footer-custom .pt-3');
  animatedText.forEach((el, idx) => {
    el.style.animationDelay = (0.15 + idx * 0.1) + 's';
    el.classList.add('animated');
  });
}

// Reveal on scroll
function revealOnScroll() {
  const revealEls = document.querySelectorAll('section, header.hero-section');
  const windowHeight = window.innerHeight;
  revealEls.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 80) {
      el.classList.add('revealed');
    }
  });
}
window.addEventListener('DOMContentLoaded', () => {
  animateSections();
  revealOnScroll();
});
window.addEventListener('scroll', revealOnScroll);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
  const hero = document.querySelector('header.hero-section');
  if (hero) {
    const scrolled = window.scrollY;
    hero.style.backgroundPosition = `center ${scrolled * 0.4}px`;
    hero.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
});

function fadeSectionGradient(section) {
  if (!section.classList.contains('section-gradient-fade')) {
    section.classList.add('section-gradient-fade');
    setTimeout(() => {
      section.classList.remove('section-gradient-fade');
    }, 3000); // Remove class after animation for re-entry
  }
}

function handleSectionFadeOnEntry() {
  const sections = document.querySelectorAll('#about, #skills, #projects, #contact');
  const windowHeight = window.innerHeight;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < windowHeight - 80 && rect.bottom > 80) {
      fadeSectionGradient(section);
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  animateSections();
  revealOnScroll();
  handleSectionFadeOnEntry();
});
window.addEventListener('scroll', () => {
  revealOnScroll();
  handleSectionFadeOnEntry();
});
