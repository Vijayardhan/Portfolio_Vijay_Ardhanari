document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Support
    function updateExperienceTheme() {
        const experienceSection = document.getElementById('experience');
        if (document.body.classList.contains('dark-mode')) {
            experienceSection.style.backgroundColor = '#0a041a';
        } else {
            experienceSection.style.backgroundColor = '#f8f9fa';
        }
    }

    // Initialize theme
    updateExperienceTheme();

    // Watch for theme changes
    const themeObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                updateExperienceTheme();
            }
        });
    });
    themeObserver.observe(document.body, { attributes: true });

    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Set initial state and observe
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        animateOnScroll.observe(item);
    });

    // Smooth button hover effects
    const buttons = document.querySelectorAll('.gradient-btn, .outline-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });
});





document.addEventListener('DOMContentLoaded', () => {
    // ===== 1. ANIMATED BACKGROUND ELEMENTS =====
    const createFloatingOrbs = () => {
        const colors = ['rgba(106, 17, 203, 0.15)', 'rgba(39, 117, 252, 0.15)'];
        const experienceSection = document.getElementById('experience');
        
        for (let i = 0; i < 8; i++) {
            const orb = document.createElement('div');
            orb.className = 'floating-orb';
            orb.style.background = colors[Math.floor(Math.random() * colors.length)];
            orb.style.width = `${Math.random() * 100 + 50}px`;
            orb.style.height = orb.style.width;
            orb.style.left = `${Math.random() * 100}%`;
            orb.style.top = `${Math.random() * 100}%`;
            orb.style.filter = 'blur(30px)';
            orb.style.borderRadius = '50%';
            orb.style.position = 'absolute';
            orb.style.zIndex = '0';
            orb.style.opacity = '0';
            experienceSection.prepend(orb);
            
            // Animate orbs
            gsap.to(orb, {
                opacity: 0.8,
                duration: 5,
                x: `${Math.random() * 200 - 100}px`,
                y: `${Math.random() * 200 - 100}px`,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random() * 3
            });
        }
    };

    // ===== 2. HOLOGRAPHIC CARD EFFECTS =====
    const setupCards = () => {
        const cards = document.querySelectorAll('.timeline-item');
        
        cards.forEach((card, index) => {
            // Initial state
            gsap.set(card, {
                opacity: 0,
                y: 80,
                rotateX: 15,
                transformPerspective: 1000,
                transformOrigin: 'center center'
            });
            
            // Scroll animation
            ScrollTrigger.create({
                trigger: card,
                start: 'top 80%',
                onEnter: () => {
                    gsap.to(card, {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        duration: 1.2,
                        ease: 'back.out(1.2)',
                        delay: index * 0.15
                    });
                }
            });
            
            // Holographic hover effect
            card.addEventListener('mousemove', (e) => {
                const x = e.clientX - card.getBoundingClientRect().left;
                const y = e.clientY - card.getBoundingClientRect().top;
                const centerX = card.offsetWidth / 2;
                const centerY = card.offsetHeight / 2;
                
                gsap.to(card, {
                    rotateY: (x - centerX) / 20,
                    rotateX: -(y - centerY) / 20,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateY: 0,
                    rotateX: 0,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });
    };

    // ===== 3. NEON GLOW BUTTONS =====
    const animateButtons = () => {
        const buttons = document.querySelectorAll('.gradient-btn, .outline-btn');
        
        buttons.forEach(btn => {
            // Initial glow setup
            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            
            const glow = document.createElement('span');
            glow.className = 'btn-glow';
            glow.style.position = 'absolute';
            glow.style.background = 'rgba(255, 255, 255, 0.2)';
            glow.style.width = '50px';
            glow.style.height = '200%';
            glow.style.left = '-60px';
            glow.style.top = '-50%';
            glow.style.transform = 'rotate(20deg)';
            glow.style.filter = 'blur(10px)';
            btn.appendChild(glow);
            
            // Glow animation
            btn.addEventListener('mouseenter', () => {
                gsap.to(glow, {
                    left: '120%',
                    duration: 1.2,
                    ease: 'power2.inOut'
                });
                
                gsap.to(btn, {
                    boxShadow: '0 0 20px rgba(106, 17, 203, 0.8)',
                    duration: 0.3
                });
            });
        });
    };

    // Initialize all effects
    if (typeof gsap !== 'undefined') {
        createFloatingOrbs();
        setupCards();
        animateButtons();
    } else {
        console.error('GSAP is not loaded!');
    }
});