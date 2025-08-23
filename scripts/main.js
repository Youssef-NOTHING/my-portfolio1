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
