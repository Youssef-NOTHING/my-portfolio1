document.addEventListener("DOMContentLoaded", function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navUl = document.querySelector('nav ul');

    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navUl.classList.toggle('open');
    });

    navUl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navUl.classList.remove('open');
        });
    });
});