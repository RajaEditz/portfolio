// ===== ADMIN LOGIC =====

const DEFAULT_PASS = 'admin123';
let projects = JSON.parse(localStorage.getItem('portfolio_projects')) || [
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
        outcome: 'Increased conversion rate by 25% within the first month.'
    }
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
    if (imgFile) imgData = await reader(imgFile);

    let problemImgData = null;
    if (problemImgFile) problemImgData = await reader(problemImgFile);

    let solutionImgData = null;
    if (solutionImgFile) solutionImgData = await reader(solutionImgFile);

    let outcomeImgData = null;
    if (outcomeImgFile) outcomeImgData = await reader(outcomeImgFile);

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
