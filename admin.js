// ===== ADMIN LOGIC =====

const DEFAULT_PASS = 'admin123';
const DEFAULT_PROJECTS = [
    {
        id: 1,
        title: 'City Rider App Design',
        category: 'UI/UX • Mobile App',
        img: 'assets/projects/city-rider-thumb.jpg',
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
        img: 'assets/projects/beauty-card.jpg',
        description: 'A sophisticated visual identity and marketing collateral design for Haniya Beauty Parlour and Sakeena Makeup Artist.',
        problem: 'The client needed a luxurious and inviting brand presence that appeals to modern clients looking for professional makeup and salon services.',
        solution: 'Developed a cohesive branding system using gold accents, elegant typography, and high-quality lifestyle imagery to convey professionalism and luxury.',
        role: 'Lead Brand Designer',
        tools: 'Adobe Photoshop, Illustrator',
        outcome: 'Successfully created a suite of digital and print materials that helped establish a premium market position for the parlor.',
        gallery: [
            'assets/projects/beauty-logo.jpg',
            'assets/projects/beauty-contact.jpg',
            'assets/projects/beauty-pricing.jpg',
            'assets/projects/beauty-flyer.jpg',
            'assets/projects/beauty-banner.jpg'
        ]
    },
    {
        id: 3,
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
    },
    {
        id: 4,
        title: 'Thumbnail Design Projects',
        category: 'Graphic Design • Youtube',
        img: 'assets/projects/thumb-design.png',
        description: 'A collection of high-click-through-rate (CTR) thumbnail designs for various services, including logo design, multimedia, and tech content.',
        problem: 'Content creators and service providers needed visually striking thumbnails to grab attention in a crowded digital landscape.',
        solution: 'Created custom-themed thumbnails using bold typography, high-contrast colors, and professional layouts tailored to specific niches like AI coding and logo design.',
        role: 'Lead Visual Designer',
        tools: 'Adobe Photoshop, Illustrator',
        outcome: 'Increased visual engagement and brand professionalization for the featured services.',
        gallery: [
            'assets/projects/thumb-design.png',
            'assets/projects/thumb-logo.png',
            'assets/projects/thumb-multimedia.png',
            'assets/projects/thumb-editing.png',
            'assets/projects/thumb-vibe.png',
            'assets/projects/thumb-web.png',
            'assets/projects/thumb-uiux.png',
            'assets/projects/thumb-graphic.png',
            'assets/projects/thumb-app.png'
        ]
    }
];

let projects = [];
try {
    const stored = localStorage.getItem('portfolio_projects');
    if (stored) {
        projects = JSON.parse(stored);

        // Auto-cleanup: remove projects that are no longer in DEFAULT_PROJECTS
        projects = projects.filter(p => DEFAULT_PROJECTS.some(dp => dp.id === p.id));
        localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    }
    if (!projects || !Array.isArray(projects) || projects.length === 0) {
        projects = DEFAULT_PROJECTS;
    }
} catch (e) {
    projects = DEFAULT_PROJECTS;
}

let editingId = null;

// Persistent Auth (Client-side only)
if (sessionStorage.getItem('is_admin') === 'true') {
    showDashboard();
}

function login() {
    const pass = document.getElementById('admin-pass').value;
    const error = document.getElementById('login-error');

    if (pass === DEFAULT_PASS) {
        sessionStorage.setItem('is_admin', 'true');
        showDashboard();
    } else {
        error.textContent = 'Incorrect password. Try "admin123"';
    }
}

function showDashboard() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    renderProjectList();
}

function renderProjectList() {
    const list = document.getElementById('project-list');
    list.innerHTML = projects.map(p => `
        <div class="project-item-admin">
            <div>
                <strong style="display: block;">${p.title}</strong>
                <span style="color: grey; font-size: 0.8rem;">${p.category}</span>
            </div>
            <div style="display: flex; gap: 1rem;">
                <button onclick="editProject(${p.id})" style="background: none; border: none; color: #00d9ff; cursor: pointer;">Edit</button>
                <button onclick="deleteProject(${p.id})" style="background: none; border: none; color: #ff4d4d; cursor: pointer;">Delete</button>
            </div>
        </div>
    `).join('');
}

// Helper to read and compress image
const compressImage = (file, maxWidth = 1000, maxHeight = 1000, quality = 0.6) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                // Convert to JPEG with quality reduction to save space
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
};

function openModal(id = null) {
    editingId = id;
    const modal = document.getElementById('project-modal');
    const title = document.getElementById('modal-title');

    if (id) {
        const p = projects.find(proj => proj.id === id);
        document.getElementById('project-title').value = p.title || '';
        document.getElementById('project-category').value = p.category || '';
        document.getElementById('project-description').value = p.description || '';
        document.getElementById('project-problem').value = p.problem || '';
        document.getElementById('project-solution').value = p.solution || '';
        document.getElementById('project-role').value = p.role || '';
        document.getElementById('project-tools').value = p.tools || '';
        document.getElementById('project-outcome').value = p.outcome || '';
        document.getElementById('project-link').value = p.link || '';

        // Render gallery preview
        renderAdminGallery(p.gallery || []);

        title.textContent = 'Edit Project';
    } else {
        document.getElementById('project-title').value = '';
        document.getElementById('project-category').value = '';
        document.getElementById('project-description').value = '';
        document.getElementById('project-problem').value = '';
        document.getElementById('project-solution').value = '';
        document.getElementById('project-role').value = '';
        document.getElementById('project-tools').value = '';
        document.getElementById('project-outcome').value = '';
        document.getElementById('project-link').value = '';
        document.getElementById('project-img-file').value = '';
        document.getElementById('project-problem-img').value = '';
        document.getElementById('project-solution-img').value = '';
        document.getElementById('project-outcome-img').value = '';
        document.getElementById('project-gallery-files').value = '';

        document.getElementById('admin-gallery-preview').innerHTML = '';
        title.textContent = 'Add Project';
    }

    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('project-modal').style.display = 'none';
}

async function saveProject() {
    const title = document.getElementById('project-title').value;
    const category = document.getElementById('project-category').value;
    const description = document.getElementById('project-description').value;
    const problem = document.getElementById('project-problem').value;
    const solution = document.getElementById('project-solution').value;
    const role = document.getElementById('project-role').value;
    const tools = document.getElementById('project-tools').value;
    const outcome = document.getElementById('project-outcome').value;
    const link = document.getElementById('project-link').value;
    const imgFile = document.getElementById('project-img-file').files[0];
    const problemImgFile = document.getElementById('project-problem-img').files[0];
    const solutionImgFile = document.getElementById('project-solution-img').files[0];
    const outcomeImgFile = document.getElementById('project-outcome-img').files[0];
    const galleryFiles = document.getElementById('project-gallery-files').files;

    if (!title || !category) return alert('Please fill in title and category');

    let imgData = null;
    if (imgFile) imgData = await compressImage(imgFile);

    let problemImgData = null;
    if (problemImgFile) problemImgData = await compressImage(problemImgFile);

    let solutionImgData = null;
    if (solutionImgFile) solutionImgData = await compressImage(solutionImgFile);

    let outcomeImgData = null;
    if (outcomeImgFile) outcomeImgData = await compressImage(outcomeImgFile);

    let galleryData = [];
    if (galleryFiles.length > 0) {
        for (let i = 0; i < galleryFiles.length; i++) {
            const data = await compressImage(galleryFiles[i]);
            galleryData.push(data);
        }
    }

    if (editingId) {
        const index = projects.findIndex(p => p.id === editingId);
        const existing = projects[index];

        projects[index] = {
            ...existing,
            title,
            category,
            description,
            problem,
            solution,
            role,
            tools,
            outcome,
            link,
            // Only update image if new one provided, otherwise keep existing
            img: imgData || existing.img,
            problemImg: problemImgData || existing.problemImg,
            solutionImg: solutionImgData || existing.solutionImg,
            outcomeImg: outcomeImgData || existing.outcomeImg,
            // Images are managed in openModal/renderAdminGallery
            gallery: galleryData.length > 0 ? (existing.gallery || []).concat(galleryData) : (existing.gallery || [])
        };
    } else {
        projects.push({
            id: Date.now(),
            title,
            category,
            description,
            problem,
            solution,
            role,
            tools,
            outcome,
            link,
            img: imgData || 'project1.jpg',
            problemImg: problemImgData,
            solutionImg: solutionImgData,
            outcomeImg: outcomeImgData,
            gallery: galleryData.length > 0 ? galleryData : []
        });
    }

    try {
        localStorage.setItem('portfolio_projects', JSON.stringify(projects));
        renderProjectList();
        closeModal();
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            alert('Storage limit exceeded! The images you are trying to upload are too large for browser storage. Please try using smaller/compressed images or fewer photos.');
        } else {
            alert('Error saving project: ' + e.message);
        }
    }
}

function editProject(id) {
    openModal(id);
}

function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        projects = projects.filter(p => p.id !== id);
        localStorage.setItem('portfolio_projects', JSON.stringify(projects));
        renderProjectList();
    }
}

function renderAdminGallery(gallery) {
    const preview = document.getElementById('admin-gallery-preview');
    preview.innerHTML = gallery.map((img, index) => `
        <div class="preview-item">
            <img src="${img}">
            <button class="remove-preview" onclick="removeFromGallery(${index})">×</button>
        </div>
    `).join('');
}

function removeFromGallery(index) {
    if (!editingId) return;
    const pIndex = projects.findIndex(p => p.id === editingId);
    if (pIndex === -1) return;

    projects[pIndex].gallery.splice(index, 1);
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    renderAdminGallery(projects[pIndex].gallery);
}

function resetDefaults() {
    if (confirm('Are you sure you want to reset all projects to defaults? This will delete your current projects!')) {
        projects = [...DEFAULT_PROJECTS];
        localStorage.setItem('portfolio_projects', JSON.stringify(projects));
        renderProjectList();
        alert('Projects reset to high-quality defaults!');
    }
}

// ===== SYNC / TRANSFER LOGIC =====
function openSyncModal() {
    document.getElementById('sync-modal').style.display = 'flex';
}

function closeSyncModal() {
    document.getElementById('sync-modal').style.display = 'none';
    document.getElementById('sync-input').value = '';
}

function copySyncData() {
    const data = JSON.stringify(projects);
    navigator.clipboard.writeText(data).then(() => {
        alert('Sync Code Copied! Now open this admin page on your phone and paste it in the "Import" box.');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy. Please manually copy the data from a new window.');
    });
}

function importSyncData() {
    const input = document.getElementById('sync-input').value;
    if (!input) return alert('Please paste the sync code first.');

    try {
        const importedProjects = JSON.parse(input);
        if (!Array.isArray(importedProjects)) throw new Error('Invalid format');

        if (confirm('This will overwrite all projects on this device. Continue?')) {
            projects = importedProjects;
            localStorage.setItem('portfolio_projects', JSON.stringify(projects));
            renderProjectList();
            alert('Sync Successful! Your mobile portfolio is now updated.');
            closeSyncModal();
        }
    } catch (e) {
        alert('Invalid Sync Code. Please make sure you copied the entire code correctly.');
    }
}
