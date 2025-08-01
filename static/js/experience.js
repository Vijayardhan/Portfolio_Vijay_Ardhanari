function showNote() {
    alert("Currently Working");
}

document.addEventListener('DOMContentLoaded', () => {
    const options = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                if (target.classList.contains('circle')) {
                    target.classList.add('animate');
                } else if (target.classList.contains('experience-box')) {
                    target.classList.add('animate');
                }
                observer.unobserve(target); // Stop observing once animated
            }
        });
    }, options);

    document.querySelectorAll('.circle').forEach(circle => {
        observer.observe(circle);
    });

    document.querySelectorAll('.experience-box').forEach(box => {
        observer.observe(box);
    });
});
