document.addEventListener('DOMContentLoaded', () => {
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

    const aboutSection = document.querySelector('#about .about-container');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
});


// Add this to your existing observer code
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelector('.about-heading').classList.add('animate');
        }
    });
}, { threshold: 0.3 });

aboutObserver.observe(document.querySelector('#about'));