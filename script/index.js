let currentSlide = 0;
const totalSlides = 7;
const slideInterval = 1000; // 1 second interval
let autoSlideInterval;

function updateSlide() {
    if (window.innerWidth <= 768) {
        const gallery = document.querySelector('.collections-gallery');
        const dots = document.querySelectorAll('.dot');
        
        if (gallery && dots.length > 0) {
            const translateX = -(currentSlide * (100 / totalSlides));
            gallery.style.transform = `translateX(${translateX}%)`;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
    }
}

function nextSlide() {
    if (window.innerWidth <= 768) {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide();
    }
}

function startAutoSlide() {
    if (window.innerWidth <= 768) {
        autoSlideInterval = setInterval(nextSlide, slideInterval);
    }
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 768) {
        updateSlide();
        startAutoSlide();
    }
    
    const collectionsContainer = document.querySelector('.collections-container');
    if (collectionsContainer) {
        collectionsContainer.addEventListener('mouseenter', stopAutoSlide);
        collectionsContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                currentSlide = index;
                updateSlide();
                stopAutoSlide();
                startAutoSlide();
            }
        });
    });
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            stopAutoSlide();
            const gallery = document.querySelector('.collections-gallery');
            if (gallery) {
                gallery.style.transform = 'translateX(0)';
            }
        } else {
            currentSlide = 0;
            updateSlide();
            startAutoSlide();
        }
    });
});