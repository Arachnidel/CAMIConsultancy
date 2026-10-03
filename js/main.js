// ============================================================
// NAVBAR — SCROLL EFFECT & MOBILE MENU
// ============================================================
(function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('menuToggle');
    const links = document.getElementById('navLinks');

    // Scroll shadow
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const current = window.scrollY;
        if (current > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = current;
    });

    // Mobile toggle
    toggle.addEventListener('click', () => {
        const isOpen = links.classList.toggle('open');
        toggle.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu on link click
    links.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            links.classList.remove('open');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
})();

// ============================================================
// PROJECTS DATA
// ============================================================
const projects = [
    {
        id: '001',
        country: 'SLOVENIA',
        tag: 'CORROSION',
        client: 'HELLA Saturnus Slovenija',
        description:
            'Radiowave-transparent, chemically-resistant coating developed for automotive emblems — in partnership with the National Institute of Chemistry, Slovenia.',
    },
    {
        id: '002',
        country: 'SLOVENIA',
        tag: 'COATING',
        client: 'Hidria d.o.o.',
        description:
            'Anti-stick coating for robotic electrical-steel lamination assembly, improving automated manufacturing reliability.',
    },
    {
        id: '003',
        country: 'THAILAND',
        tag: 'CORROSION',
        client: 'Siam Industrial Wire Co. Ltd',
        description:
            'Anti-corrosion coatings for pre-stressed concrete wires, plus a lubricant composition for high-speed steel wire drawing.',
    },
    {
        id: '004',
        country: 'UNITED KINGDOM',
        tag: 'GRAPHENE',
        client: 'Versarien',
        description:
            'Graphene-incorporated zinc-rich primer with enhanced corrosion protection for steel infrastructure.',
    },
    {
        id: '005',
        country: 'CHINA',
        tag: 'GRAPHENE',
        client: 'Runhu',
        description:
            'Graphene-based abrasion-resistant coating for diamond cutting wheels with extended service life; graphene zinc-silicate coating for steel.',
    },
    {
        id: '006',
        country: 'INDIA',
        tag: 'CONDUCTIVE INK',
        client: 'MATCON',
        description:
            'Conductive ink and graphene coatings developed for the aerospace sector.',
    },
    {
        id: '007',
        country: 'FRANCE',
        tag: 'MATERIALS',
        client: 'TESEM',
        description:
            'Specialist materials consultancy for cosmetic and personal-care packaging applications.',
    },
    {
        id: '008',
        country: 'UK & INDIA',
        tag: 'ENERGY',
        client: 'Rerise',
        description:
            'Energy storage and wireless charging solutions developed for the automotive industry.',
    },
    {
        id: '009',
        country: 'NORWAY',
        tag: 'GRAPHENE',
        client: 'Abalonyx AS',
        description:
            'Graphene-enhanced coatings for advanced surface protection.',
    },
    {
        id: '010',
        country: 'CHINA',
        tag: 'GRAPHENE',
        client: 'TECHVALLEY',
        description:
            'Graphene-enhanced concrete for next-generation construction performance.',
    },
];

// ============================================================
// RENDER PROJECTS
// ============================================================
(function renderProjects() {
    const grid = document.getElementById('projectGrid');
    if (!grid) return;

    grid.innerHTML = projects
        .map(
            (p) => `
        <div class="project-card">
          <div class="project-meta">
            <span>${p.country}</span>
            <span class="project-tag">${p.tag}</span>
          </div>
          <h4>${p.client}</h4>
          <p>${p.description}</p>
          <a href="#" class="project-link">ENGAGEMENT → DETAIL</a>
        </div>
      `
        )
        .join('');
})();

// ============================================================
// CONTACT FORM
// ============================================================
(function initForm() {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const organization = document.getElementById('organization').value.trim();
        const brief = document.getElementById('brief').value.trim();

        // Simple validation
        if (!name || !email || !brief) {
            feedback.className = 'form-feedback error';
            feedback.textContent = 'Please fill in all required fields (Name, Email, and Brief).';
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            feedback.className = 'form-feedback error';
            feedback.textContent = 'Please enter a valid email address.';
            return;
        }

        // Simulate submission
        feedback.className = 'form-feedback';
        feedback.textContent = 'Sending...';

        setTimeout(() => {
            feedback.className = 'form-feedback success';
            feedback.textContent =
                '✓ Brief transmitted successfully. We\'ll be in touch within 24 hours.';

            // Optionally reset
            // form.reset();

            // Clear success after 8 seconds
            setTimeout(() => {
                feedback.className = 'form-feedback';
                feedback.textContent = '';
            }, 8000);
        }, 1200);
    });
})();

// ============================================================
// SMOOTH SCROLL FOR ANCHOR LINKS (progressive enhancement)
// ============================================================
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80; // navbar height buffer
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
})();

// ============================================================
// INTERSECTION OBSERVER — FADE-IN ANIMATIONS
// ============================================================
(function initAnimations() {
    const cards = document.querySelectorAll(
        '.service-card, .why-item, .project-card, .leader-card, .stat'
    );

    if (!cards.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px',
        }
    );

    cards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
})();

console.log('CAMI Consultancy — site loaded.');