/* ==========================================================================
   DATA ANALYST PORTFOLIO - DYNAMIC PROJECTS GALLERY & FILTERING
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const projectsGrid = document.getElementById('projects-grid');
  const searchInput = document.getElementById('project-search');
  const filterButtons = document.querySelectorAll('.filter-btn');

  let allProjects = [];

  // Fetch projects from JSON database
  async function fetchProjects() {
    try {
      const response = await fetch('assets/data/projects.json');
      if (!response.ok) throw new Error('Failed to load project database.');
      const data = await response.json();
      allProjects = data.projects;
      renderProjects(allProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
      if (projectsGrid) {
        projectsGrid.innerHTML = `<p style="color: var(--text-secondary); text-align: center; grid-column: 1 / -1;">Unable to load projects at this moment. Please ensure you are running via a local server (Live Server).</p>`;
      }
    }
  }

  // Render project cards to the DOM
  function renderProjects(projectsToRender) {
    if (!projectsGrid) return;

    if (projectsToRender.length === 0) {
      projectsGrid.innerHTML = `<p style="color: var(--text-secondary); text-align: center; grid-column: 1 / -1; padding: 3rem 0;">No matching projects found.</p>`;
      return;
    }

    projectsGrid.innerHTML = projectsToRender.map(project => {
      const toolsHtml = project.tools.map(tool => 
        `<span style="font-size: 0.75rem; padding: 0.25rem 0.6rem; background: var(--bg-primary); border-radius: 4px; border: 1px solid var(--border-color); color: var(--text-secondary);">${tool}</span>`
      ).join('');

      return `
        <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <span class="badge">${project.category}</span>
            </div>
            <h3 style="font-size: 1.25rem; margin-bottom: 0.75rem;">${project.title}</h3>
            <p style="font-size: 0.95rem; margin-bottom: 1.5rem; color: var(--text-secondary);">${project.shortDescription}</p>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
              ${toolsHtml}
            </div>
          </div>
          
          <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-color); padding-top: 1.25rem; margin-top: auto;">
            <a href="project-details.html?id=${project.id}" style="color: var(--accent-primary); font-weight: 600; font-size: 0.95rem; display: inline-flex; align-items: center; gap: 0.5rem;">
              View Case Study <i class="fas fa-arrow-right"></i>
            </a>
            <div style="display: flex; gap: 0.75rem;">
              <a href="${project.githubUrl}" target="_blank" title="GitHub Repository" style="color: var(--text-muted); font-size: 1.1rem; transition: color 0.2s;"><i class="fab fa-github"></i></a>
              <a href="${project.liveDemoUrl}" target="_blank" title="Live Dashboard" style="color: var(--text-muted); font-size: 1.1rem; transition: color 0.2s;"><i class="fas fa-external-link-alt"></i></a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Filter projects by category
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        filterButtons.forEach(btn => {
          btn.classList.remove('btn-primary');
          btn.classList.add('btn-outline');
        });
        e.target.classList.remove('btn-outline');
        e.target.classList.add('btn-primary');

        const filterValue = e.target.getAttribute('data-filter');
        if (filterValue === 'all') {
          renderProjects(allProjects);
        } else {
          const filtered = allProjects.filter(p => p.category === filterValue);
          renderProjects(filtered);
        }
      });
    });
  }

  // Real-time search functionality
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const filtered = allProjects.filter(p => 
        p.title.toLowerCase().includes(term) ||
        p.shortDescription.toLowerCase().includes(term) ||
        p.tools.some(t => t.toLowerCase().includes(term)) ||
        p.category.toLowerCase().includes(term)
      );
      renderProjects(filtered);
    });
  }

  // Initialize data fetch
  fetchProjects();
});