document.addEventListener('DOMContentLoaded', function () {
    // Initialise WOW.js
    if (typeof WOW !== 'undefined') {
        new WOW({
            offset: 30,
            mobile: true
        }).init();
    }

    function updatePublicationsTheme() {
        const publicationsSection =
            document.getElementById('publications');

        if (!publicationsSection) {
            return;
        }

        if (document.body.classList.contains('dark-mode')) {
            publicationsSection.style.backgroundColor =
                'var(--section-bg-dark)';
        } else {
            publicationsSection.style.backgroundColor =
                'var(--section-bg-light)';
        }
    }

    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            setTimeout(updatePublicationsTheme, 0);
        });
    }

    updatePublicationsTheme();

    const carouselContainer = document.querySelector(
        '.publication-carousel-container'
    );

    const publicationCards = document.querySelectorAll(
        '.publication-card'
    );

    const previousButton = document.querySelector(
        '.publication-prev'
    );

    const nextButton = document.querySelector(
        '.publication-next'
    );

    const dotsContainer = document.querySelector(
        '.publication-pagination-dots'
    );

    if (
        !carouselContainer ||
        publicationCards.length === 0 ||
        !previousButton ||
        !nextButton ||
        !dotsContainer
    ) {
        return;
    }

    let currentPublication = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    function createPaginationDots() {
        dotsContainer.innerHTML = '';

        publicationCards.forEach(function (_, index) {
            const dot = document.createElement('button');

            dot.type = 'button';
            dot.className = 'publication-dot';
            dot.setAttribute(
                'aria-label',
                `Go to publication ${index + 1}`
            );

            dot.addEventListener('click', function () {
                currentPublication = index;
                updateCarousel();
            });

            dotsContainer.appendChild(dot);
        });
    }

    function updateCarousel() {
        carouselContainer.style.transform =
            `translateX(-${currentPublication * 100}%)`;

        const dots = document.querySelectorAll('.publication-dot');

        dots.forEach(function (dot, index) {
            dot.classList.toggle(
                'active',
                index === currentPublication
            );

            dot.setAttribute(
                'aria-current',
                index === currentPublication
                    ? 'true'
                    : 'false'
            );
        });
    }

    function showNextPublication() {
        currentPublication =
            (currentPublication + 1) % publicationCards.length;

        updateCarousel();
    }

    function showPreviousPublication() {
        currentPublication =
            (
                currentPublication -
                1 +
                publicationCards.length
            ) % publicationCards.length;

        updateCarousel();
    }

    previousButton.addEventListener(
        'click',
        showPreviousPublication
    );

    nextButton.addEventListener(
        'click',
        showNextPublication
    );

    // Keyboard navigation
    document.addEventListener('keydown', function (event) {
        const publicationsSection =
            document.getElementById('publications');

        if (!publicationsSection) {
            return;
        }

        const sectionPosition =
            publicationsSection.getBoundingClientRect();

        const sectionIsVisible =
            sectionPosition.top < window.innerHeight &&
            sectionPosition.bottom > 0;

        if (!sectionIsVisible) {
            return;
        }

        if (event.key === 'ArrowLeft') {
            showPreviousPublication();
        }

        if (event.key === 'ArrowRight') {
            showNextPublication();
        }
    });

    // Touch and swipe support
    carouselContainer.addEventListener(
        'touchstart',
        function (event) {
            touchStartX = event.changedTouches[0].screenX;
        },
        {
            passive: true
        }
    );

    carouselContainer.addEventListener(
        'touchend',
        function (event) {
            touchEndX = event.changedTouches[0].screenX;

            const swipeDistance = touchStartX - touchEndX;
            const minimumSwipeDistance = 50;

            if (swipeDistance > minimumSwipeDistance) {
                showNextPublication();
            } else if (
                swipeDistance < -minimumSwipeDistance
            ) {
                showPreviousPublication();
            }
        },
        {
            passive: true
        }
    );

    // Button hover animation
    const publicationButtons = document.querySelectorAll(
        '.publication-button'
    );

    publicationButtons.forEach(function (button) {
        button.addEventListener('mouseenter', function () {
            this.classList.add(
                'animate__animated',
                'animate__pulse'
            );
        });

        button.addEventListener('mouseleave', function () {
            this.classList.remove(
                'animate__animated',
                'animate__pulse'
            );
        });
    });

    createPaginationDots();
    updateCarousel();
});