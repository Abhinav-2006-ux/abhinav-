document.addEventListener("DOMContentLoaded", () => {
    // Hide loader
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
        playHomeAnimations();
    }, 500);

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const hamburgerIcon = document.querySelector('.hamburger i');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('open');
            if (nav.classList.contains('open')) {
                hamburgerIcon.classList.remove('fa-bars');
                hamburgerIcon.classList.add('fa-times');
            } else {
                hamburgerIcon.classList.remove('fa-times');
                hamburgerIcon.classList.add('fa-bars');
            }
        });
    }

    // Navigation Logic
    const navLinks = document.querySelectorAll('.nav-link');
    
    let isAnimating = false;

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if(isAnimating) return;
            
            const targetId = link.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if(targetSection.classList.contains('active')) {
                // Close menu if clicking already active section on mobile
                if(nav.classList.contains('open')) {
                    nav.classList.remove('open');
                    hamburgerIcon.classList.remove('fa-times');
                    hamburgerIcon.classList.add('fa-bars');
                }
                return;
            }

            // Close menu on navigation
            if(nav.classList.contains('open')) {
                nav.classList.remove('open');
                hamburgerIcon.classList.remove('fa-times');
                hamburgerIcon.classList.add('fa-bars');
            }

            isAnimating = true;

            // Update active link
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            // Find current active section
            const currentSection = document.querySelector('.view-section.active');

            // Crossfade views
            gsap.to(currentSection, {
                opacity: 0,
                duration: 0.4,
                onComplete: () => {
                    currentSection.classList.remove('active');
                    currentSection.style.visibility = 'hidden';
                    
                    resetAnimations(currentSection.id);

                    targetSection.classList.add('active');
                    targetSection.style.visibility = 'visible';
                    
                    gsap.to(targetSection, {
                        opacity: 1,
                        duration: 0.4,
                        onComplete: () => {
                            isAnimating = false;
                            playAnimations(targetId);
                        }
                    });
                }
            });
        });
    });

    // --- ANIMATION ROUTER --- //

    function playAnimations(sectionId) {
        if(sectionId === 'home') playHomeAnimations();
        if(sectionId === 'work') playWorkAnimations();
        if(sectionId === 'contact' || sectionId === 'about' || sectionId === 'experience') playGenericAnimations(sectionId);
    }

    function resetAnimations(sectionId) {
        if(sectionId === 'home') {
            gsap.set('.hero-greeting', {opacity: 0, x: -30});
            gsap.set('.hero-title', {opacity: 0, x: -30});
            gsap.set('.hero-subtitle', {opacity: 0, x: -30});
            gsap.set('.primary-btn', {opacity: 0, y: 20});
            gsap.set('.hero-image', {scale: 1.05, opacity: 0});
        }
        if(sectionId === 'work') {
            gsap.set('.section-heading', {opacity: 0, y: 20});
            gsap.set('.project-card', {opacity: 0, y: 30});
        }
        if(sectionId === 'contact' || sectionId === 'about' || sectionId === 'experience') {
            gsap.set(`#${sectionId} .section-heading`, {opacity: 0, y: 20});
            gsap.set(`#${sectionId} p, #${sectionId} .primary-btn, #${sectionId} .experience-item`, {opacity: 0, y: 20});
        }
    }

    // Initialize states
    resetAnimations('home');
    resetAnimations('about');
    resetAnimations('experience');
    resetAnimations('work');
    resetAnimations('contact');

    // Specific Entrance Animations
    function playHomeAnimations() {
        const tl = gsap.timeline();
        tl.to('.hero-image', {opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out'}, 0)
          .to('.hero-greeting', {opacity: 1, x: 0, duration: 0.8, ease: 'power2.out'}, 0.3)
          .to('.hero-title', {opacity: 1, x: 0, duration: 0.8, ease: 'power2.out'}, 0.4)
          .to('.hero-subtitle', {opacity: 1, x: 0, duration: 0.8, ease: 'power2.out'}, 0.5)
          .to('.primary-btn', {opacity: 1, y: 0, duration: 0.6, ease: 'power2.out'}, 0.7);
    }

    function playWorkAnimations() {
        gsap.to('#work .section-heading', {opacity: 1, y: 0, duration: 0.6});
        gsap.to('.project-card', {opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out', delay: 0.2});
    }

    function playGenericAnimations(id) {
        gsap.to(`#${id} .section-heading`, {opacity: 1, y: 0, duration: 0.6});
        gsap.to([`#${id} p`, `#${id} .primary-btn`, `#${id} .experience-item`], {opacity: 1, y: 0, stagger: 0.1, duration: 0.6, delay: 0.2});
    }
});
