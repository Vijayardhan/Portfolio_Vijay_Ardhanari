document.addEventListener('DOMContentLoaded', () => {
    // Theme adaptation (existing code)
    function updateSkillsTheme() {
        const skillsSection = document.getElementById('skills');
        if (document.body.classList.contains('dark-mode')) {
            skillsSection.style.backgroundColor = '#01052c';
        } else {
            skillsSection.style.backgroundColor = '#ffffffed';
        }
    }
    updateSkillsTheme();
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') updateSkillsTheme();
        });
    });
    observer.observe(document.body, { attributes: true });

    // WOW Animations for Skills
    const skillItems = document.querySelectorAll('.skill-item');
    
    // 1. Initial Hidden State with Perspective
    gsap.set(skillItems, {
        opacity: 0,
        y: 30,
        rotationX: 15,
        transformPerspective: 800,
        transformOrigin: "center bottom"
    });

    // 2. Staggered Entry Animation
    gsap.to(skillItems, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        stagger: {
            amount: 1,
            from: "random"
        },
        ease: "back.out(1.2)",
        scrollTrigger: {
            trigger: "#skills",
            start: "top 70%",
            toggleActions: "play none none none"
        }
    });

    // 3. Hover Effects with Particle Burst
    skillItems.forEach((item) => {
        // Create particles container
        const particles = document.createElement('div');
        particles.className = 'skill-particles';
        item.appendChild(particles);
        
        item.addEventListener('mouseenter', () => {
            // Scale up effect
            gsap.to(item, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Particle burst animation
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particles.appendChild(particle);
                
                gsap.fromTo(particle, 
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 0
                    },
                    {
                        x: Math.random() * 60 - 30,
                        y: Math.random() * 60 - 30,
                        scale: Math.random() * 0.6 + 0.4,
                        opacity: 0,
                        duration: 1,
                        ease: "power2.out",
                        onComplete: () => particle.remove()
                    }
                );
            }
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                scale: 1,
                duration: 0.5,
                ease: "elastic.out(1, 0.5)"
            });
        });
    });

    // 4. Continuous Subtle Float Animation
    skillItems.forEach((item, i) => {
        gsap.to(item, {
            y: -5,
            duration: 2 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.1
        });
    });
});