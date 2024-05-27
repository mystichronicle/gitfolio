const fs = require('fs');
const fetch = require('node-fetch');

async function fetchProjects() {
    const response = await fetch('https://api.github.com/users/debjit-mandal/repos');
    return await response.json();
}

async function updateProjects() {
    const repos = await fetchProjects();
    let projectHTML = '';

    repos.forEach(repo => {
        projectHTML += `
        <div class="project">
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description available.'}</p>
            <a href="${repo.html_url}" target="_blank">View Project <i class="fas fa-external-link-alt"></i></a>
        </div>`;
    });

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Gitfolio</title>
        <link rel="stylesheet" href="styles.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    </head>
    <body>
        <header>
            <div class="container">
                <h1>Gitfolio</h1>
                <p>Explore my GitHub projects</p>
            </div>
        </header>
        <main class="container">
            <div id="projects" class="projects-grid">
                ${projectHTML}
            </div>
        </main>
        <footer>
            <div class="container">
                <p>&copy; 2024 Debjit Mandal | <a href="https://github.com/debjit-mandal" target="_blank"><i class="fab fa-github"></i></a></p>
            </div>
        </footer>
        <script src="app.js"></script>
    </body>
    </html>`;

    fs.writeFileSync('index.html', htmlContent);
}

updateProjects();
