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

    document.querySelectorAll('.certification-container').forEach(container => {
        observer.observe(container);
    });
});

// Add this to your existing observer code
const achievementsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelector('.achievements-heading').classList.add('animate');
        }
    });
}, { threshold: 0.3 });

achievementsObserver.observe(document.querySelector('#achievements'));