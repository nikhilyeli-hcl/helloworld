// Theme toggle logic
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;
const themeSelect = document.getElementById('theme-select');

const themes = [
  'forest-theme', 'coffee-theme', 'wooden-theme', 'leather-theme', 'fall-theme', 'blues-theme', 'water-theme', 'ocean-theme'
];
let currentThemeIdx = 0;

function setTheme(theme) {
  // Remove both theme-light and theme-dark
  body.classList.remove('theme-light', 'theme-dark');
  body.classList.add(theme);
  if (theme === 'theme-dark') {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  } else {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
  localStorage.setItem('theme', theme);
  // Update all section backgrounds for the new mode
  updateSectionTheme();
}

function setColorTheme(idx) {
  themes.forEach(t => body.classList.remove(t));
  body.classList.add(themes[idx]);
  localStorage.setItem('colorTheme', themes[idx]);
  updateSectionTheme();
  updateThemeSwatchIcon(themes[idx]);
}

function updateSectionTheme() {
  // Add theme-light/theme-dark to all .*-bg sections for correct background
  const mode = body.classList.contains('theme-dark') ? 'theme-dark' : 'theme-light';
  document.querySelectorAll('.forest-bg, .coffee-bg, .wooden-bg, .leather-bg, .fall-bg, .blues-bg, .water-bg, .ocean-bg').forEach(el => {
    el.classList.remove('theme-light', 'theme-dark');
    el.classList.add(mode);
  });
}

// Theme swatch icon update
const themeIconSwatch = document.getElementById('theme-icon-swatch');
const themeIcons = {
  'forest-theme': '<i class="fas fa-leaf" style="color:#4caf50"></i>',
  'coffee-theme': '<i class="fas fa-mug-hot" style="color:#6f4e37"></i>',
  'wooden-theme': '<i class="fas fa-tree" style="color:#8b5c2a"></i>',
  'leather-theme': '<i class="fas fa-couch" style="color:#a0522d"></i>',
  'fall-theme': '<i class="fas fa-leaf" style="color:#e07a5f"></i>',
  'blues-theme': '<i class="fas fa-water" style="color:#00b4d8"></i>',
  'water-theme': '<i class="fas fa-tint" style="color:#0077b6"></i>',
  'ocean-theme': '<i class="fas fa-water" style="color:#48cae4"></i>',
};
function updateThemeSwatchIcon(theme) {
  if (themeIconSwatch) {
    themeIconSwatch.innerHTML = themeIcons[theme] || '<i class="fas fa-palette"></i>';
  }
}

themeToggle.addEventListener('click', () => {
  // Toggle dark/light
  const newTheme = body.classList.contains('theme-dark') ? 'theme-light' : 'theme-dark';
  setTheme(newTheme);
});

// Cycle color theme on double click
body.addEventListener('dblclick', () => {
  currentThemeIdx = (currentThemeIdx + 1) % themes.length;
  setColorTheme(currentThemeIdx);
});

// On load, set theme and color theme from localStorage
window.onload = () => {
  const savedTheme = localStorage.getItem('theme') || 'theme-light';
  setTheme(savedTheme);
  const savedColor = localStorage.getItem('colorTheme');
  if (savedColor && themes.includes(savedColor)) {
    body.classList.add(savedColor);
    currentThemeIdx = themes.indexOf(savedColor);
  } else {
    body.classList.add(themes[0]);
  }
  updateSectionTheme();
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

if (themeSelect) {
  themeSelect.addEventListener('change', (e) => {
    const idx = themes.indexOf(e.target.value);
    if (idx !== -1) {
      currentThemeIdx = idx;
      setColorTheme(idx);
    }
  });
  // Set selector to current theme on load
  window.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem('colorTheme');
    if (savedColor && themes.includes(savedColor)) {
      themeSelect.value = savedColor;
    } else {
      themeSelect.value = themes[0];
    }
  });
}

// Typewriter effect for hero section
function typewriterEffect(element, text, speed = 40) {
  element.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Keep caret blinking after typing
      element.classList.add('typewriter-caret');
    }
  }
  type();
}

document.addEventListener('DOMContentLoaded', () => {
  const heroTypewriter = document.getElementById('hero-typewriter');
  if (heroTypewriter) {
    // Remove CSS typing animation for JS-driven effect
    heroTypewriter.style.animation = 'none';
    heroTypewriter.classList.remove('typewriter');
    // Start typewriter effect
    typewriterEffect(heroTypewriter, 'A Fullstack Engineer, Designer & Photographer', 38);
  }
});

// Add caret blink for JS typewriter
const style = document.createElement('style');
style.innerHTML = `
.typewriter-caret {
  border-right: 3px solid #4caf50;
  animation: blink-caret 0.7s step-end infinite;
}
`;
document.head.appendChild(style);

// --- HORIZONTAL & VERTICAL SCROLL SYNC, PARALLAX, SLIDE EFFECT ---
const sectionsContainer = document.querySelector('.sections-horizontal');
const sectionEls = document.querySelectorAll('.section-horizontal');
const parallaxBgs = document.querySelectorAll('.section-horizontal .parallax-bg');

// Hide scrollbars for horizontal scroll container
if (sectionsContainer) {
  sectionsContainer.style.scrollbarWidth = 'none'; // Firefox
  sectionsContainer.style.msOverflowStyle = 'none'; // IE/Edge
  sectionsContainer.style.overflow = 'auto';
  sectionsContainer.style.overflowY = 'hidden';
  sectionsContainer.style.overflowX = 'auto';
  sectionsContainer.style.backgroundAttachment = 'fixed';
  sectionsContainer.style.backgroundRepeat = 'no-repeat';
}
// Hide scrollbars for Webkit browsers
const styleHideScroll = document.createElement('style');
styleHideScroll.innerHTML = `
.sections-horizontal::-webkit-scrollbar { display: none; height: 0; width: 0; background: transparent; }
`;
document.head.appendChild(styleHideScroll);

// Parallax backgrounds (customize images/colors as needed)
const parallaxImages = [
  'linear-gradient(120deg, #eafbe6 0%, #4caf50 100%)', // about
  'linear-gradient(120deg, #f5ecd7 0%, #c2b280 100%)', // skills
  'linear-gradient(120deg, #e0f7fa 0%, #00b4d8 100%)', // projects
  'linear-gradient(120deg, #caf0f8 0%, #0077b6 100%)', // gallery
  'linear-gradient(120deg, #e0fbfc 0%, #48cae4 100%)', // contact
];
parallaxBgs.forEach((bg, i) => {
  bg.style.background = parallaxImages[i % parallaxImages.length];
});

function setActiveSectionByScroll() {
  let minDist = Infinity, activeIdx = 0;
  sectionEls.forEach((sec, i) => {
    const rect = sec.getBoundingClientRect();
    const dist = Math.abs(rect.left);
    if (dist < minDist) {
      minDist = dist;
      activeIdx = i;
    }
  });
  sectionEls.forEach((sec, i) => {
    sec.classList.toggle('active', i === activeIdx);
  });
}

function handleParallax() {
  sectionEls.forEach((sec, i) => {
    const bg = parallaxBgs[i];
    const rect = sec.getBoundingClientRect();
    const offset = -rect.left * 0.2;
    bg.style.transform = `translateX(${offset}px)`;
  });
  // Seamless background effect for container
  if (sectionsContainer) {
    const scrollPct = sectionsContainer.scrollLeft / (sectionsContainer.scrollWidth - sectionsContainer.clientWidth);
    sectionsContainer.style.backgroundPosition = `${scrollPct * 100}% 0`;
  }
}

function scrollToSection(idx) {
  if (!sectionsContainer) return;
  const sec = sectionEls[idx];
  if (sec) {
    sec.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    sec.classList.add('slide-in');
    setTimeout(() => sec.classList.remove('slide-in'), 900);
  }
}

// Sync vertical scroll to horizontal and vice versa (desktop), allow vertical on mobile
let isMobile = window.innerWidth < 900;
function handleScrollSync(e) {
  if (isMobile) return;
  // Always move horizontally regardless of scroll direction
  const scrollAmount = e.deltaY !== 0 ? e.deltaY : e.deltaX;
  if (scrollAmount !== 0) {
    sectionsContainer.scrollLeft += scrollAmount;
    e.preventDefault();
  }
}
if (sectionsContainer) {
  sectionsContainer.addEventListener('wheel', handleScrollSync, { passive: false });
  sectionsContainer.addEventListener('scroll', () => {
    setActiveSectionByScroll();
    handleParallax();
  });
}
window.addEventListener('resize', () => {
  isMobile = window.innerWidth < 900;
});

// Header nav buttons scroll to section with slide effect
const heroBtns = document.querySelectorAll('.hero-section .btn');
const sectionIds = ['contact', 'projects', 'gallery'];
heroBtns.forEach((btn, i) => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    scrollToSection(i);
  });
});

// Initial state
window.addEventListener('DOMContentLoaded', () => {
  setActiveSectionByScroll();
  handleParallax();
});

// Allow vertical scroll on mobile
if (sectionsContainer) {
  sectionsContainer.addEventListener('touchmove', () => {
    setActiveSectionByScroll();
    handleParallax();
  });
}
