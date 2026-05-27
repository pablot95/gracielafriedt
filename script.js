// ── Navbar scroll shadow ──────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile menu ───────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ── Form submit ───────────────────────────────────────
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const orig = btn.textContent;
        btn.textContent = 'Enviando...';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = '¡Mensaje enviado!';
            form.reset();
            setTimeout(() => {
                btn.textContent = orig;
                btn.disabled = false;
            }, 3000);
        }, 1200);
    });
}

// ── Animaciones de entrada al hacer scroll ────────────
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            if (el.dataset.delay) el.style.transitionDelay = el.dataset.delay + 'ms';
            el.classList.add('visible');
            revealObs.unobserve(el);
        }
    });
}, { threshold: 0.12 });

function reveal(selector, anim, stagger) {
    document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add('reveal');
        el.dataset.anim = anim;
        if (stagger && i > 0) el.dataset.delay = i * stagger;
        revealObs.observe(el);
    });
}

// Encabezados de sección
reveal('.especialidades .section-header, .servicios .section-header, .testimonios .section-header, .contacto .section-header', 'up');

// Tarjetas con efecto escalonado
reveal('.spec-card',    'up',    100);
reveal('.service-card', 'up',    120);
reveal('.testi-card',   'up',    120);

// Sección Sobre Mí
reveal('.sobre-mi-image', 'left');
reveal('.sobre-mi-text',  'right');

// CTA banner
reveal('.cta-text',     'left');
reveal('.cta-cta-wrap', 'right');

// Contacto
reveal('.contacto-info', 'left');
reveal('.contacto-form', 'right');

// Footer
reveal('.footer-brand',  'up');
reveal('.footer-social', 'fade');
