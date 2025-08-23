document.addEventListener("DOMContentLoaded", function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navUl = document.querySelector('nav ul');
    const closeToggle = document.querySelector('.close-toggle');

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

    // Ferme le menu quand on clique sur la croix
    if (closeToggle) {
        closeToggle.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navUl.classList.remove('open');
        });
    }

    document.getElementById('theme-toggle').onclick = function() {
        document.body.classList.toggle('dark-mode');
    };
});