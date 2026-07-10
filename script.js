(function() {
    'use strict';

    // ---------- HEADER SCROLL (hide on down, show on up) ----------
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 60) {
            // scrolling down
            header.classList.add('hidden');
        } else {
            // scrolling up
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
    const mobileLangToggle = document.getElementById('mobileLangToggle');

    function openMobileMenu() {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        if (mobileMenu.classList.contains('open')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // close on link click (mobile)
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // close on background click (optional, but we want close on overlay click)
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu || e.target === mobileMenu.querySelector('.mobile-menu-inner')) {
            closeMobileMenu();
        }
    });

    // ---------- ACTIONS (desktop & mobile) ----------
    function handleAction(action, event) {
        // prevent default if it's a link
        if (event) event.preventDefault();

        switch (action) {
            case 'cv':
                // открыть PDF в новой вкладке
                window.open('cv.pdf', '_blank');
                break;
            case 'hh':
                window.open('https://hh.ru/resume/your-resume-id', '_blank');
                break;
            case 'dprofile':
                // Dprofile пока не создан – ничего не делаем (или можно показать уведомление)
                // alert('Dprofile soon');
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
    const langToggle = document.getElementById('langToggle');
    const mobileLangToggle2 = document.getElementById('mobileLangToggle');
    let currentLang = 'ru'; // 'ru' or 'en'

    function toggleLang() {
        if (currentLang === 'ru') {
            currentLang = 'en';
            langToggle.textContent = 'EN';
            mobileLangToggle2.textContent = 'EN';
        } else {
            currentLang = 'ru';
            langToggle.textContent = 'RU';
            mobileLangToggle2.textContent = 'RU';
        }
        // Никакого перевода страницы — только смена надписи.
    }

    langToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleLang();
    });

    mobileLangToggle2.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleLang();
        // не закрываем меню, чтобы было удобно
    });

    // ---------- ЗАКРЫТИЕ МЕНЮ ПРИ РЕСАЙЗЕ (если стало > 768) ----------
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (mobileMenu.classList.contains('open')) {
                closeMobileMenu();
            }
        }
    });

})();
