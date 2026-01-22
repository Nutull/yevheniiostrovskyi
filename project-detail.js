function loadProject() {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    const project = projectsData.find(p => p.id === projectId);

    const contentDiv = document.getElementById('project-page-content');

    if (!project) {
        contentDiv.innerHTML = "<div class='project-detail-container'><h1>Project not found</h1><a href='index.html' class='back-link'>Go back</a></div>";
        return;
    }

    document.title = `${project.title} | Portfolio`;

    contentDiv.innerHTML = `
        <div class="project-detail-container">
            <header class="project-header">
                <h1 class="project-title-large">${project.title}</h1>
                <p class="project-description">${project.description}</p>
            </header>

            <div class="project-media-list">
                ${project.gallery.map(img => `
                    <img src="${img}" class="project-media-item" alt="${project.title} Render">
                `).join('')}
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', loadProject);