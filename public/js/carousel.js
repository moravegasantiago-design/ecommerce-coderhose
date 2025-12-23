
// Carrusel básico
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.carousel-indicator');
const track = document.getElementById('carouselTrack');

function goToSlide(n) {
    currentSlide = (n + slides.length) % slides.length;
    if (track) {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === currentSlide);
    });
}

document.getElementById('carouselPrev')?.addEventListener('click', () => goToSlide(currentSlide - 1));
document.getElementById('carouselNext')?.addEventListener('click', () => goToSlide(currentSlide + 1));

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
});

// Autoplay
let autoplayInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);

// Pausar en hover
document.querySelector('.hero-carousel')?.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

document.querySelector('.hero-carousel')?.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
});



