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

    document.querySelectorAll('.volunteer-item').forEach(item => {
        observer.observe(item);
    });
});

// Add to your existing IntersectionObserver code
const volunteerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelector('.volunteer-heading').classList.add('animate');
        }
    });
}, { threshold: 0.3 });

volunteerObserver.observe(document.querySelector('#volunteer'));