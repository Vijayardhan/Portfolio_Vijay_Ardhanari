document.addEventListener('DOMContentLoaded', function() {
    const firstName = document.querySelector('.first-name');
    const lastName = document.querySelector('.last-name');
    
    if (firstName && lastName) {
        // Process first name
        const firstNameText = firstName.textContent;
        firstName.innerHTML = '';
        for (let i = 0; i < firstNameText.length; i++) {
            const span = document.createElement('span');
            span.textContent = firstNameText[i];
            firstName.appendChild(span);
        }
        
        // Process last name
        const lastNameText = lastName.textContent;
        lastName.innerHTML = '';
        for (let i = 0; i < lastNameText.length; i++) {
            const span = document.createElement('span');
            span.textContent = lastNameText[i];
            lastName.appendChild(span);
        }
    }
    

    // Your existing JavaScript
    document.querySelectorAll('#nav-menu li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the target element
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calculate the position with offset (e.g., 100px above the section)
            const offset = 50;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            // Scroll to the position
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
});

function toggleMenu(hamburger, shouldClose = false) {
    const navMenu = document.getElementById('nav-menu');
    const isOpening = !navMenu.classList.contains('show');
    
    if (shouldClose) {
        // Force close menu and reset hamburger
        navMenu.classList.remove('show', 'closing');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
        return;
    }
    
    if (isOpening) {
        // Opening animation
        navMenu.classList.remove('closing');
        navMenu.classList.add('show');
        hamburger.classList.add('open');
        document.body.style.overflow = 'hidden';
    } else {
        // Closing animation
        navMenu.classList.add('closing');
        hamburger.classList.remove('open');
        
        // Wait for closing animation to complete before hiding
        setTimeout(() => {
            navMenu.classList.remove('show', 'closing');
            document.body.style.overflow = '';
        }, 300);
    }
}

// Enhanced click handler for menu items
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            const hamburger = document.querySelector('.hamburger');
            
            // Force close menu and reset hamburger immediately
            toggleMenu(hamburger, true);
            
            // Scroll to target after menu closes
            setTimeout(() => {
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 50);
        }
    });
});