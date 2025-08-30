document.addEventListener('DOMContentLoaded', function () {
    
    // 1. Инициализация Swiper.js для слайдера команды
    const swiper = new Swiper('.team-slider', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1200: { slidesPerView: 4, spaceBetween: 30 }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // 2. Анимация для главных карточек при скролле
    const featuredCards = document.querySelectorAll('.featured-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.5 // Анимация сработает, когда 50% карточки будет видно
    });

    featuredCards.forEach(card => {
        observer.observe(card);
    });
});