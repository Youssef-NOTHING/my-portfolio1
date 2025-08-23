// Dark/Light mode
document.getElementById('theme-toggle').addEventListener('click', ()=>{
  document.body.setAttribute('data-theme', document.body.getAttribute('data-theme')==='light'?'dark':'light');
});

// Scroll animations
const faders = document.querySelectorAll('section, .hero h1, .hero p, .hero button, .portfolio-card, .timeline-item, .skill-card');
const appearOptions = {threshold:0.3, rootMargin:"0px 0px -50px 0px"};
const appearOnScroll = new IntersectionObserver((entries, observer)=>{
  entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      entry.target.style.opacity='1';
      entry.target.style.transform='translateY(0)';
      // Animate skill circles
      if(entry.target.classList.contains('skill-card')){
        const circle = entry.target.querySelector('.progress');
        const radius = circle.r.baseVal.value;
        const percent = entry.target.dataset.percent;
        const circumference = 2 * Math.PI * radius;
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;
        let offset = circumference - (percent/100)*circumference;
        circle.style.strokeDashoffset = offset;
        // Animate text percentage
        const percentText = entry.target.querySelector('.percent');
        let current=0;
        const interval = setInterval(()=>{
          if(current>=percent){clearInterval(interval);}
          else{current++; percentText.innerText=current+'%';}
        },15);
      }
      observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// Testimonials carousel
let slideIndex=0;
const slides=document.querySelector('.testimonial-slide');
const totalSlides=slides.children.length;
setInterval(()=>{
    slideIndex=(slideIndex+1)%totalSlides;
    slides.style.transform=`translateX(-${slideIndex*100}%)`;
},4000);

const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', ()=>{
    navLinks.classList.toggle('active');
});

const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  try {
    const response = await fetch('URL_DU_SERVEUR', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'  // très important
      },
      body: JSON.stringify(data) // envoie les données en JSON
    });

    const result = await response.json();
    alert('Message envoyé avec succès !');
  } catch (error) {
    console.error('Erreur :', error);
  }
});

const carousel = document.querySelector('.testimonial-carousel');
  const cards = document.querySelectorAll('.testimonial-card');
  const leftArrow = document.querySelector('.arrow-left');
  const rightArrow = document.querySelector('.arrow-right');

  let index = 0;
  const total = cards.length;

  function showSlide(i) {
    if(i >= total) index = 0;
    else if(i < 0) index = total - 1;
    else index = i;

    carousel.style.transform = `translateX(-${index * 100}%)`;
  }

  rightArrow.addEventListener('click', () => {
    showSlide(index + 1);
  });

  leftArrow.addEventListener('click', () => {
    showSlide(index - 1);
  });

  // Auto-slide
  setInterval(() => {
    showSlide(index + 1);
  }, 5000); // Change slide every 5 seconds