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
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

// Mobile Menu Toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

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
    // Hide cursor on touch devices to prevent interaction issues
    if (window.matchMedia('(pointer: coarse)').matches) {
        cursor.style.display = 'none';
        return;
    }
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

// ===== GLOBAL DATA =====
const DEFAULT_PROJECTS = [
    {
        id: 1,
        title: 'City Rider App Design',
        category: 'UI/UX • Mobile App',
        img: 'assets/projects/city-rider.png',
        description: 'A comprehensive ride-sharing mobile application design featuring user-centric workflows for booking, driver tracking, and payment integration.',
        problem: 'Commuters in urban areas needed a more intuitive and faster way to book rides with clear pricing and driver verification.',
        solution: 'Developed a high-fidelity UI design with optimized booking flows, real-time map tracking, and a clean, modern aesthetic to enhance trust and usability.',
        role: 'Lead UI/UX Designer',
        tools: 'Figma, Adobe Illustrator',
        outcome: 'Completed a full 24-screen design system that streamlines the user journey from onboarding to destination arrival.',
        gallery: [
            'assets/projects/city-rider.png'
        ]
    },
    {
        id: 2,
        title: 'Beauty Parlor Branding',
        category: 'Graphic Design • Branding',
        img: 'assets/projects/beauty-thumb.jpg',
        description: 'A sophisticated visual identity and marketing collateral design for Haniya Beauty Parlour and Sakeena Makeup Artist.',
        problem: 'The client needed a luxurious and inviting brand presence that appeals to modern clients looking for professional makeup and salon services.',
        solution: 'Developed a cohesive branding system using gold accents, elegant typography, and high-quality lifestyle imagery to convey professionalism and luxury.',
        role: 'Lead Brand Designer',
        tools: 'Adobe Photoshop, Illustrator',
        outcome: 'Successfully created a suite of digital and print materials that helped establish a premium market position for the parlor.',
        gallery: [
            'assets/projects/beauty-logo.jpg',
            'assets/projects/beauty-thumb.jpg',
            'assets/projects/beauty-contact.jpg',
            'assets/projects/beauty-pricing.jpg',
            'assets/projects/beauty-flyer.jpg'
        ]
    },
    {
        id: 3,
        title: 'Fintech Mobile App',
        category: 'UI/UX • App',
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        description: 'A comprehensive mobile application design focused on user experience and modern interface patterns. This project involved extensive user research, wireframing, and high-fidelity prototyping.',
        problem: 'Users found traditional banking apps too cluttered and difficult to navigate, especially for rapid transfers.',
        solution: 'Developed a minimalist, gesture-based interface with a "One-Tap Send" feature and clear financial health visualizations.',
        role: 'Lead UX/UI Designer',
        tools: 'Figma, Adobe XD, ProtoPie',
        outcome: 'Increased user engagement by 40% and reduced transfer time by 60%.',
        gallery: [
            'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80'
        ]
    },
    {
        id: 4,
        title: 'Aura Roast Branding',
        category: 'Graphic Design',
        img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
        description: 'Complete brand identity package including logo design, color palette selection, typography, and brand guidelines for a specialty coffee shop.',
        problem: 'The client needed a visual identity that felt both "premium" and "approachable" to stand out in a crowded urban market.',
        solution: 'Created a logo inspired by the golden ratio and the shape of a coffee bean, paired with earth-toned colors and elegant serif typography.',
        role: 'Brand Designer',
        tools: 'Adobe Illustrator, Photoshop',
        outcome: 'The brand successfully launched two locations and achieved strong social media recognition within 3 months.',
        gallery: [
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80'
        ]
    },
    {
        id: 5,
        title: 'Modern Architecture Web',
        category: 'Web Development',
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        description: 'A high-end, minimal portfolio website for a luxury architecture firm featuring immersive galleries and smooth animations.',
        problem: 'Former site was slow and didn\'t showcase large-scale high-resolution imagery effectively.',
        solution: 'Built a responsive, SPA-style website using modern CSS techniques and GSAP for fluid transitions between projects.',
        role: 'Frontend Developer',
        tools: 'HTML5, CSS3, JavaScript, GSAP',
        outcome: 'Improved site load performance by 50% and received "Site of the Day" nomination.',
        gallery: [
            'https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
        ]
    },
    {
        id: 6,
        title: 'Urban Fashion Lookbook',
        category: 'Multimedia',
        img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
        description: 'Cinematic video lookbook and social media campaign for a new streetwear brand launch.',
        problem: 'The brand needed to capture the attention of Gen Z audiences through short-form, high-impact visual content.',
        solution: 'Produced a series of high-energy reels and a main lookbook video using creative transition techniques and custom color grading.',
        role: 'Video Editor & Colorist',
        tools: 'Premiere Pro, After Effects, DaVinci Resolve',
        outcome: 'Campaign reached over 100k views organically on Instagram and TikTok.',
        gallery: [
            'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80'
        ]
    },
    {
        id: 7,
        title: 'HomeSmart Ecosystem',
        category: 'App Development',
        img: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80',
        description: 'Cross-platform mobile application for controlling smart home devices with an emphasis on automation and energy efficiency.',
        problem: 'Existing smart home apps felt fragmented and required too many steps to perform basic routines.',
        solution: 'Developed a unified control system with AI-driven suggestions based on user habits and simple automation "recipes".',
        role: 'Mobile Developer',
        tools: 'React Native, Node.js, Firebase',
        outcome: 'Highly rated on App Store for its clean design and reliability.',
        gallery: [
            'https://images.unsplash.com/photo-1558002038-1037906d98e4?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1512050648246-a854a0910245?auto=format&fit=crop&w=800&q=80'
        ]
    },
    {
        id: 8,
        title: 'Poster Design Projects',
        category: 'Graphic Design',
        img: 'assets/projects/poster-thumb.jpg',
        description: 'A collection of vibrant festival posters and commercial advertisements designed for local businesses, focusing on traditional themes and modern marketing.',
        problem: 'Local businesses needed eye-catching visuals to celebrate festivals and promote special offers while maintaining cultural resonance.',
        solution: 'Designed a series of posters using rich typography, vibrant color palettes, and high-quality imagery that blended tradition with professional branding.',
        role: 'Graphic Designer',
        tools: 'Adobe Photoshop, Illustrator',
        outcome: 'The posters were widely shared on social media and used for local physical distribution, leading to increased customer walk-ins during the festival season.',
        gallery: [
            'assets/projects/pongal-graphixpert.png',
            'assets/projects/pongal-nms.png',
            'assets/projects/pongal-bysul-store.jpg',
            'assets/projects/pongal-bysul-trading.jpg',
            'assets/projects/new-year-bysul.png',
            'assets/projects/pongal-offer-friends.jpg'
        ]
    }
];

let projects = [];
try {
    const stored = localStorage.getItem('portfolio_projects');
    if (stored) {
        projects = JSON.parse(stored);
    }
    if (!projects || !Array.isArray(projects) || projects.length === 0) {
        projects = DEFAULT_PROJECTS;
    }
} catch (e) {
    console.error('Error loading projects from storage:', e);
    projects = DEFAULT_PROJECTS;
}


// ===== DYNAMIC PROJECTS LOADING =====
function loadProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    try {
        const stored = localStorage.getItem('portfolio_projects');
        if (stored) {
            projects = JSON.parse(stored);
        }
        if (!projects || !Array.isArray(projects) || projects.length === 0) {
            projects = DEFAULT_PROJECTS;
        }
    } catch (e) {
        projects = DEFAULT_PROJECTS;
    }

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
    try {
        const stored = localStorage.getItem('portfolio_projects');
        if (stored) {
            projects = JSON.parse(stored);
        }
        if (!projects || !Array.isArray(projects) || projects.length === 0) {
            projects = DEFAULT_PROJECTS;
        }
    } catch (e) {
        projects = DEFAULT_PROJECTS;
    }
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
                imgEl.onclick = () => openLightbox(src); // Add lightbox click
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
            <div class="gallery-item" onclick="openLightbox('${img}')">
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
    if (e.key === 'Escape') {
        if (modal.classList.contains('active')) closeModal();
        if (lightbox.classList.contains('active')) closeLightbox();
    }
});

// ===== LIGHTBOX LOGIC =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

function openLightbox(src) {
    if (!src) return;
    lightboxImg.src = src;
    lightbox.classList.add('active');
    // Ensure lightbox is above the main modal
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Make case study images clickable for lightbox
document.querySelectorAll('.case-study-content img').forEach(img => {
    img.onclick = function () {
        openLightbox(this.src);
    };
});

function handleProjectImages() {
    const projectImages = document.querySelectorAll('.project-image img');
    const projectGradients = [
        { start: '#4338ca', end: '#06b6d4', name: 'Mobile App' },
        { start: '#1f2937', end: '#4b5563', name: 'Branding' }
    ];

    projectImages.forEach((img, index) => {
        // Only replace if src is missing, empty, or a generic placeholder like "project1.jpg"
        const src = img.getAttribute('src');
        if (!src || src === '#' || src.match(/^project\d+\.\w+$/)) {
            const gradient = projectGradients[index % projectGradients.length];
            img.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Cdefs%3E%3ClinearGradient id="grad${index}" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:${encodeURIComponent(gradient.start)};stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:${encodeURIComponent(gradient.end)};stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="800" height="600" fill="url(%23grad${index})" /%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dy=".3em"%3E${gradient.name}%3C/text%3E%3C/svg%3E`;
        }
    });
}

// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0,
    rootMargin: '0px 0px -50px 0px'
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
});

console.log('🎨 Modern Portfolio Loaded! ✨');
