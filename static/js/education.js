document.addEventListener('DOMContentLoaded', () => {
    const leftBox = document.querySelector('.left-box');
    const rightBox = document.querySelector('.right-box');
    const education = document.querySelector('#education');

    // Define the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when in view
                leftBox.classList.add('animate-left');
                rightBox.classList.add('animate-right');
            }
        });
    }, {
        threshold: 0.1 // Adjust threshold as needed
    });

    // Start observing the #about-extend section
    observer.observe(education);
});