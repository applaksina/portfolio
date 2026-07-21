(function() {
    'use strict';

    // ---------- HEADER SCROLL (hide on down, show on up) ----------
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 60) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateHeader();
            });
            ticking = true;
        }
    });

    // ---------- MOBILE MENU ----------
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const mobileClose = document.getElementById('mobileClose');

    function openMobileMenu() {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            if (mobileMenu.classList.contains('open')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (mobileClose) {
        mobileClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closeMobileMenu();
        });
    }

    // close on link click (mobile)
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // close on background click
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu || e.target === mobileMenu.querySelector('.mobile-menu-inner')) {
                closeMobileMenu();
            }
        });
    }

    // ---------- ACTIONS (desktop & mobile) ----------
    function handleAction(action, event) {
        if (event) event.preventDefault();

        switch (action) {
            case 'cv':
                window.open('cv.pdf', '_blank');
                break;
            case 'hh':
                window.open('https://hh.ru/resume/your-resume-id', '_blank');
                break;
            case 'dprofile':
                // Dprofile пока не создан – ничего не делаем
                break;
            case 'telegram':
                window.open('https://t.me/your_telegram', '_blank');
                break;
            case 'max':
                window.open('https://t.me/max_chat', '_blank');
                break;
            case 'email':
                window.location.href = 'mailto:your@email.com';
                break;
            default:
                break;
        }
    }

    // desktop nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const action = this.dataset.action;
            if (action) {
                handleAction(action, e);
            }
        });
    });

    // mobile nav links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const action = this.dataset.action;
            if (action) {
                handleAction(action, e);
                closeMobileMenu();
            }
        });
    });

    // ---------- LANG TOGGLE (RU / EN) ----------
    const langToggle = document.getElementById('langToggle');              // правая кнопка в десктопе
    const mobileLangToggle = document.getElementById('mobileLangToggle'); // кнопка внутри мобильного меню
    const langToggleMobile = document.getElementById('langToggleMobile'); // НОВАЯ левая кнопка на мобильных

    let currentLang = 'ru';

    function toggleLang() {
        if (currentLang === 'ru') {
            currentLang = 'en';
            if (langToggle) langToggle.textContent = 'EN';
            if (mobileLangToggle) mobileLangToggle.textContent = 'EN';
            if (langToggleMobile) langToggleMobile.textContent = 'EN';
        } else {
            currentLang = 'ru';
            if (langToggle) langToggle.textContent = 'RU';
            if (mobileLangToggle) mobileLangToggle.textContent = 'RU';
            if (langToggleMobile) langToggleMobile.textContent = 'RU';
        }
        // Никакого перевода страницы – только смена надписи.
    }

    if (langToggle) {
        langToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleLang();
        });
    }

    if (mobileLangToggle) {
        mobileLangToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleLang();
        });
    }

    // НОВЫЙ обработчик для левой кнопки RU на мобильных
    if (langToggleMobile) {
        langToggleMobile.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleLang();
        });
    }

    // ---------- ЗАКРЫТИЕ МЕНЮ ПРИ РЕСАЙЗЕ (если стало > 768) ----------
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (mobileMenu && mobileMenu.classList.contains('open')) {
                closeMobileMenu();
            }
        }
    });

})();
