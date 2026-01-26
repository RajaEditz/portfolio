// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NAVBAR & NAVIGATION LOGIC =====
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Navbar background change
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active link detection
    let current = '';
    sections.forEach(section => {
        if (section.offsetParent === null) return; // Skip hidden sections

        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Background is now handled by universal CSS mesh gradient

// ===== PARALLAX EFFECT ON FLOATING SHAPES =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shape');

    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.05;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== ANIMATED CURSOR =====
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 217, 255, 0.5), transparent);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease, opacity 0.2s ease;
    opacity: 0;
`;
document.body.appendChild(cursor);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = '1';
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.left = cursorX - 10 + 'px';
    cursor.style.top = cursorY - 10 + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// ===== HANDLE PLACEHOLDER IMAGES =====
// Placeholder logic removed - using actual profile photo


// ===== DYNAMIC PROJECTS LOADING =====
function loadProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    const projects = JSON.parse(localStorage.getItem('portfolio_projects')) || [
        {
            id: 1,
            title: 'Ecommerce Redesign',
            category: 'UI/UX • Web',
            img: 'project1.jpg',
            description: 'A complete overhaul of an ecommerce platform to improve user conversion.',
            problem: 'Users were dropping off at the checkout page due to a complex flow.',
            solution: 'Simplified the 5-step checkout into a single-page interactive experience.',
            role: 'Lead UX Designer',
            tools: 'Figma, Adobe Illustrator',
            outcome: 'Increased conversion rate by 25% within the first month.',
            gallery: ['project1.jpg', 'project1-detail1.jpg', 'project1-detail2.jpg']
        }
    ];

    container.innerHTML = projects.map(p => `
        <div class="project-card animate-on-scroll" onclick="openModal(${p.id})">
            <div class="project-image">
                <img src="${p.img}" alt="${p.title}">
            </div>
            <div class="project-overlay">
                <h3>${p.title}</h3>
                <p class="project-category">${p.category}</p>
            </div>
        </div>
    `).join('');

    handleProjectImages();
    observeNewElements();
}

// ===== MODAL LOGIC =====
const modal = document.getElementById('project-modal');
const modalCloseBtn = document.querySelector('.modal-close');
const modalBackBtn = document.querySelector('.back-button');
const modalOverlay = document.querySelector('.modal-overlay');

function openModal(projectId) {
    const projects = JSON.parse(localStorage.getItem('portfolio_projects')) || [
        {
            id: 1,
            title: 'Project',
            category: 'UI/UX • Flutter',
            img: 'project1.jpg',
            description: 'A comprehensive mobile application design focused on user experience and modern interface patterns. This project involved extensive user research, wireframing, and high-fidelity prototyping.',
            gallery: ['project1.jpg', 'project1-detail1.jpg', 'project1-detail2.jpg']
        },
        {
            id: 2,
            title: 'Branding Showcase',
            category: 'Graphic Design',
            img: 'project2.jpg',
            description: 'Complete brand identity package including logo design, color palette selection, typography, and brand guidelines. Created to establish a strong visual presence.',
            gallery: ['project2.jpg', 'project2-detail1.jpg', 'project2-detail2.jpg']
        }
    ];

    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    // Populate Modal Data
    document.querySelector('.modal-title').textContent = project.title;
    document.querySelector('.modal-category').textContent = project.category;
    document.querySelector('.modal-description').textContent = project.description;

    // Case Study Fields
    const caseStudyContainer = document.querySelector('.case-study-details');
    if (project.problem || project.solution || project.role || project.tools || project.outcome) {
        caseStudyContainer.style.display = 'block';
        document.getElementById('modal-problem').textContent = project.problem || 'N/A';
        document.getElementById('modal-solution').textContent = project.solution || 'N/A';
        document.getElementById('modal-role').textContent = project.role || 'N/A';
        document.getElementById('modal-tools').textContent = project.tools || 'N/A';
        document.getElementById('modal-outcome').textContent = project.outcome || 'N/A';

        // Specialized Images
        const setSpecialImg = (id, src) => {
            const imgEl = document.getElementById(id);
            if (src) {
                imgEl.src = src;
                imgEl.style.display = 'block';
            } else {
                imgEl.style.display = 'none';
            }
        };

        setSpecialImg('modal-problem-img', project.problemImg);
        setSpecialImg('modal-solution-img', project.solutionImg);
        setSpecialImg('modal-outcome-img', project.outcomeImg);

    } else {
        caseStudyContainer.style.display = 'none';
    }

    // Generate Gallery
    const galleryContainer = document.getElementById('modal-gallery');
    const galleryImages = project.gallery || [];

    if (galleryImages.length > 0) {
        galleryContainer.style.display = 'grid';
        galleryContainer.innerHTML = galleryImages.map((img, index) => `
            <div class="gallery-item">
                <img src="${img}" alt="${project.title} Image ${index + 1}">
            </div>
        `).join('');
    } else {
        galleryContainer.style.display = 'none';
    }

    // Show Modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Disable scroll

    // Update Live Link
    const footer = document.querySelector('.modal-footer');
    const existingLiveBtn = footer.querySelector('.live-btn');
    if (existingLiveBtn) existingLiveBtn.remove(); // Clear previous button

    if (project.link) {
        const liveBtn = document.createElement('a');
        liveBtn.href = project.link;
        liveBtn.target = '_blank';
        liveBtn.className = 'back-button live-btn';
        liveBtn.style.background = 'var(--gradient-accent)';
        liveBtn.style.color = 'white';
        liveBtn.style.border = 'none';
        liveBtn.style.marginRight = '1rem';
        liveBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            Live Project
        `;
        footer.insertBefore(liveBtn, footer.firstChild);
    }
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Enable scroll
}

// Event Listeners
if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
if (modalBackBtn) modalBackBtn.addEventListener('click', closeModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

function handleProjectImages() {
    const projectImages = document.querySelectorAll('.project-image img');
    const projectGradients = [
        { start: '#4338ca', end: '#06b6d4', name: 'Mobile App' },
        { start: '#1f2937', end: '#4b5563', name: 'Branding' }
    ];

    projectImages.forEach((img, index) => {
        if (!img.src || img.src.includes('project') || img.src.includes('data:image')) {
            if (img.src.includes('data:image')) return; // skip if already processed
            const gradient = projectGradients[index % projectGradients.length];
            img.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Cdefs%3E%3ClinearGradient id="grad${index}" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:${encodeURIComponent(gradient.start)};stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:${encodeURIComponent(gradient.end)};stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="800" height="600" fill="url(%23grad${index})" /%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dy=".3em"%3E${gradient.name}%3C/text%3E%3C/svg%3E`;
        }
    });
}

// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

function observeNewElements() {
    const animatedElements = document.querySelectorAll('.about-content, .projects-grid, .contact-content, .stat-item, .project-card, .about-image, .about-text');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// ===== TYPING EFFECT FOR HERO SPECIALTY =====
const specialtyText = document.querySelector('.hero-specialty');
if (specialtyText) {
    const text = specialtyText.textContent;
    specialtyText.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            specialtyText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 15);
        }
    }

    setTimeout(() => {
        typeWriter();
    }, 800);
}

// ===== MAGNETIC BUTTONS =====
const buttons = document.querySelectorAll('.download-button, .social-icon');

buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

// ===== SMOOTH PAGE LOAD =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    observeNewElements();
});

console.log('🎨 Modern Portfolio Loaded! ✨');
