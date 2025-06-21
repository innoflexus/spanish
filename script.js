// DOM Elements
const navToggle = document.querySelector('button[class*="md:hidden"]');
const mobileMenu = document.createElement('div');
const languageToggle = document.getElementById('languageToggle');
const testimonialSlider = document.getElementById('testimonialSlider');
const prevTestimonialBtn = document.getElementById('prevTestimonial');
const nextTestimonialBtn = document.getElementById('nextTestimonial');
const faqContainer = document.getElementById('faqContainer');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('section');

// Debug check
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');
  if (!testimonialSlider) console.error('Testimonial slider element not found!');
  document.body.style.backgroundColor = 'red'; // Remove after testing
});

// Testimonial Data
const testimonials = [
  { name: "Sarah K.", location: "British expat in Barcelona", text: "After just 3 months of María's classes...", avatar: "👩🏼‍💼" },
  { name: "Michael T.", location: "Digital Nomad in Mexico City", text: "The business Spanish course helped me negotiate...", avatar: "👨🏽‍💻" },
  { name: "Aisha M.", location: "DELE Student from Germany", text: "I passed my B2 exam on the first try...", avatar: "👩🏾🎓" },
  { name: "James & Lisa", location: "Retired in Andalusia", text: "At 60+, we thought learning Spanish would be impossible...", avatar: "👴🏼👵🏼" }
];

// FAQ Data
const faqs = [
  { question: "Do you teach complete beginners?", answer: "Absolutely! About 40% of my students start..." },
  { question: "What's your cancellation policy?", answer: "I require 24 hours notice..." },
  { question: "How do online lessons work?", answer: "We'll use Zoom or Google Meet..." },
  { question: "Do you provide materials?", answer: "Yes! All students receive customized..." },
  { question: "Can I switch between online and in-person?", answer: "Of course! Many of my students switch..." }
];

// Mobile Menu
function setupMobileMenu() {
  mobileMenu.className = 'mobile-menu hidden md:hidden fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-8';
  mobileMenu.innerHTML = `
    <button class="absolute top-4 right-4 text-3xl">&times;</button>
    <a href="#about" class="text-2xl font-medium">About</a>
    <a href="#courses" class="text-2xl font-medium">Courses</a>
    <a href="#testimonials" class="text-2xl font-medium">Testimonials</a>
    <a href="#faq" class="text-2xl font-medium">FAQ</a>
    <a href="#contact" class="text-2xl font-medium">Contact</a>
    <a href="#contact" class="px-6 py-3 bg-gradient-to-r from-spanish-red to-spanish-blue text-white rounded-full text-xl mt-4">Free Trial</a>`;
  document.body.appendChild(mobileMenu);

  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    document.body.style.overflow = mobileMenu.classList.contains('hidden') ? 'auto' : 'hidden';
  });

  mobileMenu.querySelector('button').addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = 'auto';
    });
  });
}

// Language Toggle
function setupLanguageToggle() {
  let currentLanguage = 'english';

  languageToggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'english' ? 'spanish' : 'english';
    updateLanguage(currentLanguage);
  });

  function updateLanguage(lang) {
    const t = {
      english: {
        logo: 'Español<span class="text-spanish-blue">Éxito</span>',
        heroTitle: 'Speak Spanish Confidently',
        heroSubtitle: 'Personalized lessons that get you conversational fast',
        ctaPrimary: 'Start Free Trial',
        ctaSecondary: 'View Courses'
      },
      spanish: {
        logo: 'Español<span class="text-spanish-blue">Éxito</span>',
        heroTitle: 'Habla Español Con Confianza',
        heroSubtitle: 'Clases personalizadas que te ayudarán a conversar rápidamente',
        ctaPrimary: 'Empieza tu Clase Gratis',
        ctaSecondary: 'Ver Cursos'
      }
    }[lang];

    document.querySelector('nav a').innerHTML = t.logo;
    document.querySelector('h1').textContent = t.heroTitle;
    document.querySelector('.hero p').textContent = t.heroSubtitle;
    document.querySelector('.hero .btn-primary').textContent = t.ctaPrimary;
    document.querySelector('.hero .btn-secondary').textContent = t.ctaSecondary;

    languageToggle.innerHTML = lang === 'spanish'
      ? `<img src="assets/images/flag-icons/uk-flag.png" alt="English" class="w-6 h-4"><span>English</span>`
      : `<img src="assets/images/flag-icons/spain-flag.png" alt="Español" class="w-6 h-4"><span>Español</span>`;
  }
}

// Testimonial Slider
function setupTestimonialSlider() {
  let current = 0;

  function render(i) {
    const t = testimonials[i];
    testimonialSlider.innerHTML = `
      <div class="testimonial-card p-8 text-center">
        <div class="text-5xl mb-4">${t.avatar}</div>
        <p class="italic mb-6">"${t.text}"</p>
        <p class="font-bold">${t.name}</p>
        <p class="text-gray-600">${t.location}</p>
        <div class="flex justify-center mt-4 space-x-1">
          ${testimonials.map((_, idx) =>
            `<button class="w-3 h-3 rounded-full ${idx === i ? 'bg-spanish-red' : 'bg-gray-300'}"></button>`
          ).join('')}
        </div>`;
    testimonialSlider.querySelectorAll('button').forEach((btn, idx) => {
      btn.addEventListener('click', () => { current = idx; render(idx); });
    });
  }

  prevTestimonialBtn.addEventListener('click', () => render(current = (current - 1 + testimonials.length) % testimonials.length));
  nextTestimonialBtn.addEventListener('click', () => render(current = (current + 1) % testimonials.length));

  let interval = setInterval(() => render(current = (current + 1) % testimonials.length), 5000);
  testimonialSlider.addEventListener('mouseenter', () => clearInterval(interval));
  testimonialSlider.addEventListener('mouseleave', () => interval = setInterval(() => render(current = (current + 1) % testimonials.length), 5000));

  render(current);
}

// FAQ Accordion
function setupFAQAccordion() {
  faqs.forEach(faq => {
    const item = document.createElement('div');
    item.className = 'faq-item border rounded-xl mb-4';
    item.innerHTML = `
      <button class="faq-question p-6 font-semibold flex justify-between items-center">
        <span>${faq.question}</span><span class="faq-icon text-2xl">+</span>
      </button>
      <div class="faq-answer px-6 pb-0 max-h-0 overflow-hidden">
        <div class="pb-6 text-gray-600">${faq.answer}</div>
      </div>`;
    faqContainer.appendChild(item);

    const btn = item.querySelector('.faq-question');
    const ans = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    btn.addEventListener('click', () => {
      const open = ans.style.maxHeight !== '0px';
      document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = '0');
      document.querySelectorAll('.faq-icon').forEach(i => i.textContent = '+');
      document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('text-spanish-red'));

      if (!open) {
        ans.style.maxHeight = ans.scrollHeight + 'px';
        icon.textContent = '-';
        btn.classList.add('text-spanish-red');
      }
    });
  });
}

// Contact Form
function setupContactForm() {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    const name = contactForm.querySelector('#name').value.trim();
    const email = contactForm.querySelector('#email').value.trim();
    const message = contactForm.querySelector('#message').value.trim();

    if (!name || !email || !message) return alert('Please fill in all fields');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('Invalid email');

    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      await new Promise(res => setTimeout(res, 1000));
      alert('Message sent!');
      contactForm.reset();
    } catch {
      alert('Failed to send message. Try again.');
    } finally {
      btn.disabled = false;
      btn.textContent = original;
    }
  });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupLanguageToggle();
  setupTestimonialSlider();
  setupFAQAccordion();
  setupContactForm();
});
