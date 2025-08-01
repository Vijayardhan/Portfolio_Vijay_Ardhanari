document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


function toggleMenu(hamburger) {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('show');
    hamburger.classList.toggle('open');
}