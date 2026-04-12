document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel-container');
    const cards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    const dotsContainer = document.querySelector('.pagination-dots');

    let currentIndex = 0;
    const cardCount = cards.length;

    function getCardsPerView() {
        if (window.innerWidth <= 767) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function getStepSize() {
        if (window.innerWidth <= 767) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function getMaxIndex() {
        const cardsPerView = getCardsPerView();
        return Math.max(0, cardCount - cardsPerView);
    }

    function getCardGap() {
        return parseInt(window.getComputedStyle(carousel).gap) || 32;
    }

    function initializeDots() {
        dotsContainer.innerHTML = '';
        const step = getStepSize();
        const totalDots = Math.ceil(cardCount / step);

        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.dataset.index = i;

            dot.addEventListener('click', () => {
                currentIndex = i * step;
                if (currentIndex > getMaxIndex()) {
                    currentIndex = getMaxIndex();
                }
                updateCarousel();
            });

            dotsContainer.appendChild(dot);
        }

        updateDots();
    }

    function updateCarousel() {
        if (!cards.length) return;

        const cardWidth = cards[0].offsetWidth;
        const gap = getCardGap();
        const translateX = -currentIndex * (cardWidth + gap);

        carousel.style.transform = `translateX(${translateX}px)`;
        carousel.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';

        updateNavButtons();
        updateDots();
    }

    function updateNavButtons() {
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
        nextBtn.style.display = currentIndex >= getMaxIndex() ? 'none' : 'block';
    }

    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        const step = getStepSize();
        const activeDotIndex = Math.floor(currentIndex / step);

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
    }

    function goNext() {
        const step = getStepSize();
        const maxIndex = getMaxIndex();

        if (currentIndex < maxIndex) {
            currentIndex += step;
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            updateCarousel();
        }
    }

    function goPrev() {
        const step = getStepSize();

        if (currentIndex > 0) {
            currentIndex -= step;
            if (currentIndex < 0) currentIndex = 0;
            updateCarousel();
        }
    }

    prevBtn.addEventListener('click', goPrev);
    nextBtn.addEventListener('click', goNext);

    window.addEventListener('resize', () => {
        const maxIndex = getMaxIndex();
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        initializeDots();
        updateCarousel();
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 80);
            }
        });
    }, { threshold: 0.15 });

    cards.forEach((card) => {
        observer.observe(card);
    });

    initializeDots();
    updateCarousel();
});