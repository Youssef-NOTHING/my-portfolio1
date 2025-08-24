document.addEventListener('DOMContentLoaded', () => {
  // NAV TOGGLE (guarded)
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('no-scroll', open); // optional
    });
  }

  // Dark/Light mode (guarded)
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme') || 'light';
      document.body.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
    });
  }

  // Scroll animations (guarded)
  const faders = document.querySelectorAll('section, .hero h1, .hero p, .hero button, .portfolio-card, .timeline-item, .skill-card');
  if (faders.length) {
    const appearOptions = { threshold: 0.3, rootMargin: '0px 0px -50px 0px' };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';

        if (entry.target.classList.contains('skill-card')) {
          const circle = entry.target.querySelector('.progress');
          const percentText = entry.target.querySelector('.percent');
          if (circle && percentText) {
            const radius = circle.r.baseVal.value;
            const percent = Number(entry.target.dataset.percent || 0);
            const circumference = 2 * Math.PI * radius;
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = circumference;
            const offset = circumference - (percent / 100) * circumference;
            circle.style.strokeDashoffset = offset;

            let current = 0;
            const interval = setInterval(() => {
              if (current >= percent) clearInterval(interval);
              else {
                current++;
                percentText.innerText = current + '%';
              }
            }, 15);
          }
        }
        observer.unobserve(entry.target);
      });
    }, appearOptions);

    faders.forEach(fader => appearOnScroll.observe(fader));
  }

  // Testimonials (version 1) — guarded
  const slideTrack = document.querySelector('.testimonial-slide');
  if (slideTrack) {
    const totalSlides = slideTrack.children.length;
    let slideIndex = 0;
    setInterval(() => {
      slideIndex = (slideIndex + 1) % totalSlides;
      slideTrack.style.transform = `translateX(-${slideIndex * 100}%)`;
    }, 4000);
  }

  // Contact form (guarded)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        name: form.name?.value || '',
        email: form.email?.value || '',
        message: form.message?.value || ''
      };
      try {
        const response = await fetch('URL_DU_SERVEUR', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        await response.json();
        alert('Message envoyé avec succès !');
      } catch (error) {
        console.error('Erreur :', error);
        alert("Une erreur s'est produite. Réessayez plus tard.");
      }
    });
  }

  // Testimonials (version 2 with arrows) — guarded
  const carousel = document.querySelector('.testimonial-carousel');
  const cards = document.querySelectorAll('.testimonial-card');
  const leftArrow = document.querySelector('.arrow-left');
  const rightArrow = document.querySelector('.arrow-right');

  if (carousel && cards.length) {
    let index = 0;
    const total = cards.length;

    function showSlide(i) {
      if (i >= total) index = 0;
      else if (i < 0) index = total - 1;
      else index = i;
      carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    if (rightArrow) rightArrow.addEventListener('click', () => showSlide(index + 1));
    if (leftArrow) leftArrow.addEventListener('click', () => showSlide(index - 1));

    setInterval(() => showSlide(index + 1), 5000);
  }
});
