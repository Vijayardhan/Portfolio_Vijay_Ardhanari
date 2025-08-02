let currentProject = 1;
const totalProjects = 4; // Update this number to match your total projects

function updateProjectDisplay() {
    // Hide all projects
    for (let i = 1; i <= totalProjects; i++) {
        const project = document.getElementById(`project-${i}`);
        if (project) {
            project.style.display = 'none';
        }
    }

    // Show current project
    const current = document.getElementById(`project-${currentProject}`);
    if (current) {
        current.style.display = 'flex';
    }

    // Update nav button visibility
    const prevBtn = document.getElementById('prev-project');
    const nextBtn = document.getElementById('next-project');

    if (prevBtn && nextBtn) {
        prevBtn.style.visibility = currentProject > 1 ? 'visible' : 'hidden';
        nextBtn.style.visibility = currentProject < totalProjects ? 'visible' : 'hidden';
    }
}

// Add event listeners
document.getElementById('prev-project').addEventListener('click', () => {
    if (currentProject > 1) {
        currentProject--;
        updateProjectDisplay();
    }
});

document.getElementById('next-project').addEventListener('click', () => {
    if (currentProject < totalProjects) {
        currentProject++;
        updateProjectDisplay();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    updateProjectDisplay(); // Set initial state

    // Intersection animation observer
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

    // Menu close on link click
    const links = document.querySelectorAll('nav ul li a');
    const menu = document.getElementById('nav-menu');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('show');
        });
    });
});
