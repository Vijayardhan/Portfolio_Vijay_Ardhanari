document.addEventListener('DOMContentLoaded', function () {
    // Theme change handler
    function updateHomeTheme() {
        const homeSection = document.getElementById('home');

        if (!homeSection) {
            return;
        }

        if (document.body.classList.contains('dark-mode')) {
            homeSection.style.backgroundColor = '#0a041a';
        } else {
            homeSection.style.backgroundColor = '#f8f9fa';
        }
    }

    // Typing animation
    function setupTypingAnimation() {
        const line1 = document.getElementById('typing-line1');
        const line2 = document.getElementById('typing-line2');

        if (!line1 || !line2) {
            return;
        }

        const text1 = 'Embedded Systems | Battery Testing';
        const text2 = 'Hardware Validation';

        let index1 = 0;
        let index2 = 0;
        let isDeleting = false;

        const typingSpeed = 55;
        const deletingSpeed = 30;
        const linePause = 150;
        const endPause = 1500;
        const restartPause = 300;

        function typeLine1() {
            line1.textContent = text1.substring(0, index1);

            if (index1 < text1.length) {
                index1++;
                setTimeout(typeLine1, typingSpeed);
            } else {
                line1.classList.remove('typing-cursor');
                line2.classList.add('typing-cursor');

                setTimeout(typeLine2, linePause);
            }
        }

        function typeLine2() {
            line2.textContent = text2.substring(0, index2);

            if (index2 < text2.length) {
                index2++;
                setTimeout(typeLine2, typingSpeed);
            } else {
                isDeleting = true;
                setTimeout(deleteText, endPause);
            }
        }

        function deleteText() {
            if (!isDeleting) {
                return;
            }

            if (index2 > 0) {
                index2--;
                line2.textContent = text2.substring(0, index2);
                setTimeout(deleteText, deletingSpeed);
            } else if (index1 > 0) {
                line2.classList.remove('typing-cursor');
                line1.classList.add('typing-cursor');

                index1--;
                line1.textContent = text1.substring(0, index1);
                setTimeout(deleteText, deletingSpeed);
            } else {
                isDeleting = false;

                line1.classList.add('typing-cursor');
                line2.classList.remove('typing-cursor');

                setTimeout(typeLine1, restartPause);
            }
        }

        line1.classList.add('typing-cursor');
        setTimeout(typeLine1, 800);
    }

    // Profile image hover effect
    function setupProfileHover() {
        const profileImage = document.querySelector('.profile-image');

        if (!profileImage) {
            return;
        }

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

    // Initialise functions
    updateHomeTheme();
    setupTypingAnimation();
    setupProfileHover();

    // Animate elements when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('#home [class*="fade"]').forEach((element) => {
        observer.observe(element);
    });
});