document.addEventListener('DOMContentLoaded', function () {

    // --- Логика для мобильного меню ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.navbar__menu');
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('is-active');
    });

    // --- Логика для Hero Slider ---
    if (document.querySelector('.hero-slider')) {
        new Swiper('.hero-slider', {
            loop: true,
            speed: 1500,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },
        });
    }

    // --- Логика для переключения языков ---
    let translations = {};

    // Функция применяет переводы к странице
    const translatePage = () => {
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.getAttribute('data-translate-key');
            const page = document.body.className.split('-')[0] || 'index';
            
            let translation = '';
            
            // Ищем ключ сначала в секции для конкретной страницы
            if (translations[page] && translations[page][key]) {
                translation = translations[page][key];
            } 
            // Если не нашли, ищем в общих элементах (common)
            else if (translations.common && translations.common[key]) {
                translation = translations.common[key];
            }

            if (translation) {
                // Если это title страницы
                if (el.tagName === 'TITLE') {
                    el.innerText = translation;
                } else {
                    el.innerHTML = translation;
                }
            }
        });
    };

    // Функция загружает JSON-файл для выбранного языка
    const loadLanguage = async (lang) => {
        try {
            const response = await fetch(`lang/${lang}.json`);
            if (!response.ok) {
                console.error(`Could not load translation file for ${lang}.`);
                return;
            }
            translations = await response.json();
            translatePage();
            document.documentElement.lang = lang;
            localStorage.setItem('language', lang);
        } catch (error) {
            console.error('Error loading or parsing translation file:', error);
        }
    };

    // Навешиваем обработчики на кнопки смены языка
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            loadLanguage(lang);
        });
    });

    // При загрузке страницы определяем язык
    const savedLang = localStorage.getItem('language');
    const userLang = navigator.language.split('-')[0];
    const supportedLangs = ['cs', 'ru', 'en', 'de'];
    
    let initialLang = 'cs'; // Язык по умолчанию

    if (savedLang && supportedLangs.includes(savedLang)) {
        initialLang = savedLang;
    } else if (supportedLangs.includes(userLang)) {
        initialLang = userLang;
    }
    
    loadLanguage(initialLang);
});