// Находим кнопку-бургер и меню по их селекторам
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.navbar__menu');

// Добавляем обработчик события "клик" на кнопку
menuToggle.addEventListener('click', () => {
    // При каждом клике добавляем или убираем класс 'is-active' у меню
    // CSS уже настроен так, чтобы показывать меню, когда у него есть этот класс
    navMenu.classList.toggle('is-active');
});