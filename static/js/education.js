document.addEventListener('DOMContentLoaded', () => {
    const leftBox = document.querySelector('.left-box');
    const rightBox = document.querySelector('.right-box');

    const isMobile = window.innerWidth <= 768;

    // LEFT BOX OBSERVER - trigger earlier
    const observerLeft = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                leftBox.classList.add('animate-left');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0, // Trigger as soon as any part is visible
        rootMargin: isMobile ? '0px 0px -150px 0px' : '-100px 0px -100px 0px' // Negative bottom margin to trigger earlier
    });

    observerLeft.observe(leftBox);

    // RIGHT BOX OBSERVER - trigger earlier
    const observerRight = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                rightBox.classList.add('animate-right');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0, // Trigger as soon as any part is visible
        rootMargin: isMobile ? '0px 0px -150px 0px' : '-100px 0px -100px 0px' // Negative bottom margin to trigger earlier
    });

    observerRight.observe(rightBox);
});