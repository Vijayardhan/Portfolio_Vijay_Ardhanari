document.addEventListener('DOMContentLoaded', function() {
    // Initialize WOW.js
    new WOW({
        offset: 30,
        mobile: true
    }).init();

    // Theme change handler
    function updatePublicationsTheme() {
        const publicationsSection = document.getElementById('publications');
        if (document.body.classList.contains('dark-mode')) {
            publicationsSection.style.backgroundColor = 'var(--section-bg-dark)';
        } else {
            publicationsSection.style.backgroundColor = 'var(--section-bg-light)';
        }
    }

    // Initialize theme
    updatePublicationsTheme();
    
    // Listen for theme changes
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', updatePublicationsTheme);
    }

    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.publication-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('animate__animated', 'animate__pulse');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('animate__animated', 'animate__pulse');
        });
    });
});