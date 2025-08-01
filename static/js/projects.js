let currentProject = 1;

document.getElementById('prev-project').addEventListener('click', () => {
    if (currentProject > 1) {
        document.getElementById(`project-${currentProject}`).style.display = 'none';
        currentProject--;
        document.getElementById(`project-${currentProject}`).style.display = 'flex';
    }
});

document.getElementById('next-project').addEventListener('click', () => {
    if (currentProject < 4) { // Update this number to reflect the total number of projects
        document.getElementById(`project-${currentProject}`).style.display = 'none';
        currentProject++;
        document.getElementById(`project-${currentProject}`).style.display = 'flex';
    }
});


function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('show');
}

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

    document.querySelectorAll('.project-container').forEach(container => {
        observer.observe(container);
    });
});


// Add event listeners to all navigation links to close the menu when a link is clicked
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');
    const menu = document.getElementById('nav-menu');

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('show');
        });
    });
});