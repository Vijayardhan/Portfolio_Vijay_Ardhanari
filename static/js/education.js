document.addEventListener('DOMContentLoaded', function() {
    // Theme change handler for education section
    function updateEducationTheme() {
        const educationSection = document.getElementById('education');
        if (document.body.classList.contains('dark-mode')) {
            educationSection.style.backgroundColor = '#0a041a';
        } else {
            educationSection.style.backgroundColor = '#ffffffff';
        }
    }

    // Initial theme check
    updateEducationTheme();

    // Observe theme changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                updateEducationTheme();
            }
        });
    });

    // Start observing the body for class changes
    observer.observe(document.body, {
        attributes: true
    });

    // Animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease-out';
        itemObserver.observe(item);
    });
});