document.addEventListener('DOMContentLoaded', () => {
    const skillBoxes = document.querySelectorAll('.skill-box');

    // Define the Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when in view
                entry.target.classList.add('animate');

                // Stop observing after animation has been triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Adjust threshold as needed
    });

    // Start observing each skill box
    skillBoxes.forEach(box => {
        observer.observe(box);
    });
});