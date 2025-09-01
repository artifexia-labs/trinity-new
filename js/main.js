document.addEventListener('DOMContentLoaded', function () {

    // --- Логика для мобильного меню ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.navbar__menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('is-active');
        });
    }

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
    const langSwitcherButton = document.getElementById('lang-switcher-button');
    const langSwitcherDropdown = document.getElementById('lang-switcher-dropdown');
    const currentLangFlag = document.getElementById('current-lang-flag');
    const currentLangCode = document.getElementById('current-lang-code');
    let translations = {};

    const languages = {
        cs: { name: 'Čeština', flag: 'https://flagcdn.com/w40/cz.png', code: 'CS' },
        ru: { name: 'Русский', flag: 'https://flagcdn.com/w40/ru.png', code: 'RU' },
        en: { name: 'English', flag: 'https://flagcdn.com/w40/gb.png', code: 'EN' },
        de: { name: 'Deutsch', flag: 'https://flagcdn.com/w40/de.png', code: 'DE' }
    };

    // Показать/скрыть выпадающий список
    if (langSwitcherButton && langSwitcherDropdown) {
        langSwitcherButton.addEventListener('click', (e) => {
            e.stopPropagation();
            langSwitcherDropdown.classList.toggle('is-active');
        });

        // Закрыть список при клике вне его
        document.addEventListener('click', () => {
            if (langSwitcherDropdown.classList.contains('is-active')) {
                langSwitcherDropdown.classList.remove('is-active');
            }
        });
    }

    // Функция обновляет текущий флаг и код языка
    const updateCurrentLanguageDisplay = (lang) => {
        if (languages[lang] && currentLangFlag && currentLangCode) {
            currentLangFlag.src = languages[lang].flag;
            currentLangFlag.alt = lang;
            currentLangCode.textContent = languages[lang].code;
        }
    };

    // Функция применяет переводы к странице
    const translatePage = () => {
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.getAttribute('data-translate-key');
            const page = document.body.getAttribute('data-page') || 'index';
            
            let translation = '';
            
            if (translations[page] && translations[page][key]) {
                translation = translations[page][key];
            } else if (translations.common && translations.common[key]) {
                translation = translations.common[key];
            }

            if (translation) {
                if (el.tagName === 'TITLE') {
                    el.innerText = translation;
                } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translation;
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
            updateCurrentLanguageDisplay(lang);
        } catch (error) {
            console.error('Error loading or parsing translation file:', error);
        }
    };

    // Навешиваем обработчики на кнопки смены языка
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = button.getAttribute('data-lang');
            loadLanguage(lang);
            // Закрываем список после выбора
            if (langSwitcherDropdown) {
                langSwitcherDropdown.classList.remove('is-active');
            }
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