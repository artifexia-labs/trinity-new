// Находим кнопку-бургер и меню по их селекторам
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.navbar__menu');

// Добавляем обработчик события "клик" на кнопку
menuToggle.addEventListener('click', () => {
    // При каждом клике добавляем или убираем класс 'is-active' у меню
    // CSS уже настроен так, чтобы показывать меню, когда у него есть этот класс
    navMenu.classList.toggle('is-active');
});

// Инициализация Swiper Hero Slider
if (document.querySelector('.hero-slider')) {
    new Swiper('.hero-slider', {
        loop: true, // Бесконечное повторение
        speed: 1500, // Скорость смены слайда (медленнее, чтобы было видно зум)
        autoplay: {
            delay: 6000, // Задержка между слайдами
            disableOnInteraction: false, // Продолжать автовоспроизведение после взаимодействия пользователя
        },
        effect: 'fade', // Эффект перехода fade (плавное появление/исчезновение)
        fadeEffect: {
            crossFade: true,
        },
        on: {
            init: function () {
                // Добавляем класс активному слайду для начального зума
                this.slides[this.activeIndex].classList.add('swiper-slide-active');
            },
            slideChangeTransitionStart: function () {
                // Убираем класс у предыдущего слайда
                this.slides[this.previousIndex].classList.remove('swiper-slide-active');
            },
            slideChangeTransitionEnd: function () {
                // Добавляем класс текущему активному слайду
                this.slides[this.activeIndex].classList.add('swiper-slide-active');
            },
        },
    });
}