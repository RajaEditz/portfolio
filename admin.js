// ===== ADMIN LOGIC =====

const DEFAULT_PASS = 'admin123';
let projects = JSON.parse(localStorage.getItem('portfolio_projects')) || [
    { id: 1, title: 'Mobile App Design', category: 'UI/UX • Flutter', img: 'project1.jpg' },
    { id: 2, title: 'Branding Showcase', category: 'Graphic Design', img: 'project2.jpg' }
];

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

// Helper to read file as Data URL
const reader = (file) => new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = (err) => reject(err);
    fr.readAsDataURL(file);
});

function openModal(id = null) {
    editingId = id;
    const modal = document.getElementById('project-modal');
    const title = document.getElementById('modal-title');

    if (id) {
        const p = projects.find(proj => proj.id === id);
        document.getElementById('project-title').value = p.title || '';
        document.getElementById('project-category').value = p.category || '';
        document.getElementById('project-description').value = p.description || '';
        document.getElementById('project-link').value = p.link || '';
        // Note: File inputs cannot be pre-populated for security reasons

        title.textContent = 'Edit Project';
    } else {
        document.getElementById('project-title').value = '';
        document.getElementById('project-category').value = '';
        document.getElementById('project-description').value = '';
        document.getElementById('project-link').value = '';
        document.getElementById('project-img-file').value = '';
        document.getElementById('project-gallery-files').value = '';
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
    const link = document.getElementById('project-link').value;
    const imgFile = document.getElementById('project-img-file').files[0];
    const galleryFiles = document.getElementById('project-gallery-files').files;

    if (!title || !category) return alert('Please fill in title and category');

    let imgData = null;
    if (imgFile) {
        imgData = await reader(imgFile);
    }

    let galleryData = [];
    if (galleryFiles.length > 0) {
        for (let i = 0; i < galleryFiles.length; i++) {
            const data = await reader(galleryFiles[i]);
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
            link,
            // Only update image if new one provided, otherwise keep existing
            img: imgData || existing.img,
            // Append new gallery images to existing ones if provided
            gallery: galleryData.length > 0 ? (existing.gallery || []).concat(galleryData) : (existing.gallery || [])
        };
    } else {
        projects.push({
            id: Date.now(),
            title,
            category,
            description,
            link,
            img: imgData || 'project1.jpg', // Fallback to placeholder if no image
            gallery: galleryData.length > 0 ? galleryData : []
        });
    }

    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    renderProjectList();
    closeModal();
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
