document.addEventListener('DOMContentLoaded', function() {
    // Theme change handler
    function updateHomeTheme() {
        const homeSection = document.getElementById('home');
        if (document.body.classList.contains('dark-mode')) {
            homeSection.style.backgroundColor = '#0a041a';
        } else {
            homeSection.style.backgroundColor = '#f8f9fa';
        }
    }

    // Typing animation with improved loop
    function setupTypingAnimation() {
        const typingText = document.querySelector('.typing-text');
        const text = "IoT | Automation | Testing";
        let index = 0;
        let isDeleting = false;
        let speed = 150;
        let pauseTime = 2000; // 2 seconds pause at end

        function type() {
            const currentText = text.substring(0, index);
            typingText.textContent = currentText;
            
            if (!isDeleting && index === text.length) {
                // Pause at end of typing
                isDeleting = true;
                setTimeout(type, pauseTime);
            } else if (isDeleting && index === 0) {
                // Pause at start before typing again
                isDeleting = false;
                setTimeout(type, 500);
            } else {
                index = isDeleting ? index - 1 : index + 1;
                const variableSpeed = isDeleting ? speed / 2 : speed;
                setTimeout(type, variableSpeed);
            }
        }

        // Start after initial animation
        setTimeout(type, 1500);
    }

    // Profile image hover effect
    function setupProfileHover() {
        const profileImage = document.querySelector('.profile-image');
        profileImage.addEventListener('mouseenter', () => {
            profileImage.style.transform = 'scale(1.05) rotate(5deg)';
        });
        profileImage.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'scale(1) rotate(0)';
        });
    }

    // Listen for theme changes from navbar
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', updateHomeTheme);
    }

    // Initialize functions
    updateHomeTheme();
    setupTypingAnimation();
    setupProfileHover();

    // Animate elements when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('#home [class*="fade"]').forEach(el => {
        observer.observe(el);
    });
});