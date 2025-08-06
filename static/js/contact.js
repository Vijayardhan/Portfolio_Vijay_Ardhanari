document.addEventListener('DOMContentLoaded', () => {

     // Theme change handler
    function updateContactTheme() {
        const contactSection = document.getElementById('Contact');
        if (document.body.classList.contains('dark-mode')) {
            contactSection.style.backgroundColor = '#01052cff';
        } else {
            contactSection.style.backgroundColor = '#ffffffed';
        }
    }

    // Initialize theme
    updateContactTheme();
    
    // Listen for theme changes
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', updateContactTheme);
    }

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    const contactSection = document.querySelector('#Contact .custom-container');
    if (contactSection) {
        observer.observe(contactSection);
    }
});