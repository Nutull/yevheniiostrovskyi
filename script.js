window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

const container = document.getElementById('projects-container');

function renderProjects() {
    if (!container) return;
    if (typeof projectsData !== 'undefined') {
        container.innerHTML = projectsData.map(project => `
            <a href="project.html?id=${project.id}" class="project-item ${project.size || ''}">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    <h3 class="project-title">${project.title}</h3>
                </div>
            </a>
        `).join('');
        initScrollAnimation();
    }
}

function initScrollAnimation() {
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.project-item').forEach(item => observer.observe(item));
}

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('header-scrolled', window.scrollY > 50);
});

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();

    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    let scrollPosition = 0;

    const toggleMenu = (e) => {
        if (e) e.preventDefault();
        
        const isOpen = nav.classList.contains('active');

        if (!isOpen) {
            scrollPosition = window.pageYOffset;
            nav.style.transition = 'transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)';
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition}px`;
            document.body.style.width = '100%';

            nav.style.display = 'flex';
            setTimeout(() => {
                nav.classList.add('active');
                menuToggle.classList.add('active');
            }, 10);
        } else {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            
            setTimeout(() => {
                if (!nav.classList.contains('active')) {
                    document.body.style.removeProperty('overflow');
                    document.body.style.removeProperty('position');
                    document.body.style.removeProperty('top');
                    document.body.style.removeProperty('width');  
                    window.scrollTo(0, scrollPosition); 
                    nav.style.display = 'none';
                }
            }, 500);
        }
    };

    menuToggle.addEventListener('click', toggleMenu);

    document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href && !href.startsWith('#')) {
            e.preventDefault();
            
            const overlay = document.querySelector('.page-transition-overlay');
            
            if (overlay) overlay.classList.add('active');
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        }
    });
});

});