async function fetchProjects() {
    const response = await fetch('https://api.github.com/users/debjit-mandal/repos');
    const repos = await response.json();
    displayProjects(repos);

    // Add event listener for search functionality
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', function () {
        filterProjects(repos, searchInput.value);
    });
}

function displayProjects(repos) {
    const projectContainer = document.getElementById('projects');
    projectContainer.innerHTML = ''; // Clear existing content
    repos.forEach(repo => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project';
        projectElement.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description available.'}</p>
            <a href="${repo.html_url}" target="_blank">View Project <i class="fas fa-external-link-alt"></i></a>
        `;
        projectContainer.appendChild(projectElement);
    });
}

function filterProjects(repos, query) {
    const filteredRepos = repos.filter(repo => repo.name.toLowerCase().includes(query.toLowerCase()));
    displayProjects(filteredRepos);
}

document.addEventListener('DOMContentLoaded', fetchProjects);
