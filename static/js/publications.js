let currentPublication = 1;
const totalPublications = 1; // Update to your actual number of publications

function updatePublicationDisplay() {
    for (let i = 1; i <= totalPublications; i++) {
        const pub = document.getElementById(`publication-${i}`);
        if (pub) {
            pub.style.display = 'none';
        }
    }

    const current = document.getElementById(`publication-${currentPublication}`);
    if (current) {
        current.style.display = 'flex';
    }

    const prevBtn = document.getElementById('prev-publication');
    const nextBtn = document.getElementById('next-publication');

    if (prevBtn && nextBtn) {
        prevBtn.style.visibility = currentPublication > 1 ? 'visible' : 'hidden';
        nextBtn.style.visibility = currentPublication < totalPublications ? 'visible' : 'hidden';
    }
}

document.getElementById('prev-publication').addEventListener('click', () => {
    if (currentPublication > 1) {
        currentPublication--;
        updatePublicationDisplay();
    }
});

document.getElementById('next-publication').addEventListener('click', () => {
    if (currentPublication < totalPublications) {
        currentPublication++;
        updatePublicationDisplay();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    updatePublicationDisplay();

    // Intersection Observer for fade-in animation
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

    document.querySelectorAll('.publication-container').forEach(container => {
        observer.observe(container);
    });
});


document.addEventListener('DOMContentLoaded', function() {
  const publicationsSection = document.querySelector('#publications');
  const publicationsHeading = document.querySelector('#publications h2.publications-heading');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        publicationsHeading.classList.add('animate');
      }
    });
  }, { threshold: 0.3 });
  
  observer.observe(publicationsSection);
});