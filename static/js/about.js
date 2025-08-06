document.addEventListener('DOMContentLoaded', function() {
    // Theme change handler
    function updateAboutTheme() {
        const aboutSection = document.getElementById('about');
        if (document.body.classList.contains('dark-mode')) {
            aboutSection.style.backgroundColor = '#01052cff';
        } else {
            aboutSection.style.backgroundColor = '#ffffffed';
        }
    }

    // Initialize theme
    updateAboutTheme();
    
    // Listen for theme changes
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', updateAboutTheme);
    }

    // Animation on scroll
    const aboutElements = document.querySelectorAll(
        '#about .profile-circle-1, #about .about-text-container, #about .resume-button-container'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    aboutElements.forEach(el => observer.observe(el));
});