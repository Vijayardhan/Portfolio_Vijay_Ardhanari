document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-container');
    const cards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    const dotsContainer = document.querySelector('.pagination-dots');
    let currentIndex = 0;
    const cardCount = cards.length;

    // Initialize dots based on screen size
    function initializeDots() {
        dotsContainer.innerHTML = '';
        const dotCount = window.innerWidth <= 767 ? cardCount : Math.ceil(cardCount / 2);
        
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.dataset.index = i;
            dot.addEventListener('click', () => {
                currentIndex = i * (window.innerWidth <= 767 ? 1 : 2);
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        }
        updateDots();
    }

    // Update carousel position
    function updateCarousel() {
        const cardsPerView = getCardsPerView();
        const cardWidth = cards[0].offsetWidth + 32;
        const translateX = -currentIndex * cardWidth;
        
        carousel.style.transform = `translateX(${translateX}px)`;
        carousel.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        
        updateNavButtons();
        updateDots();
    }

    // Update navigation buttons visibility
    function updateNavButtons() {
        const cardsPerView = getCardsPerView();
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
        nextBtn.style.display = currentIndex >= cardCount - cardsPerView ? 'none' : 'block';
    }

    // Update active dot
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        const activeDotIndex = window.innerWidth <= 767 ? currentIndex : Math.floor(currentIndex / 2);
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
    }

    // Get number of visible cards
    function getCardsPerView() {
        if (window.innerWidth <= 767) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    // Navigation handlers
    function goNext() {
        const cardsPerView = getCardsPerView();
        if (currentIndex < cardCount - cardsPerView) {
            currentIndex += cardsPerView;
            updateCarousel();
        }
    }

    function goPrev() {
        const cardsPerView = getCardsPerView();
        if (currentIndex > 0) {
            currentIndex -= cardsPerView;
            updateCarousel();
        }
    }

    // Button event listeners
    prevBtn.addEventListener('click', goPrev);
    nextBtn.addEventListener('click', goNext);

    // Handle resize
    window.addEventListener('resize', () => {
        const cardsPerView = getCardsPerView();
        if (currentIndex > cardCount - cardsPerView) {
            currentIndex = Math.max(0, cardCount - cardsPerView);
        }
        initializeDots();
        updateCarousel();
    });

    // Tech stack animations
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        // Floating animation
        item.style.animation = 'float 3s ease-in-out infinite';
        
        // Hover effects
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.05)';
            item.style.boxShadow = '0 8px 20px rgba(58, 91, 255, 0.3)';
            item.style.animation = 'none';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.boxShadow = 'none';
            item.style.animation = 'float 3s ease-in-out infinite';
        });
    });

    // Initialize
    initializeDots();
    updateCarousel();
});