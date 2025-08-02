document.addEventListener('DOMContentLoaded', () => {
    const leftBox = document.querySelector('.left-box');
    const rightBox = document.querySelector('.right-box');

    const isMobile = window.innerWidth <= 768;

    // LEFT BOX OBSERVER (trigger when it enters view)
    const observerLeft = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                leftBox.classList.add('animate-left');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: isMobile ? '0px 0px -100px 0px' : '0px'
    });

    observerLeft.observe(leftBox);

    // RIGHT BOX OBSERVER (trigger only when right box scrolls into view)
    const observerRight = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                rightBox.classList.add('animate-right');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: isMobile ? '0px 0px -100px 0px' : '0px'
    });

    observerRight.observe(rightBox);
});
