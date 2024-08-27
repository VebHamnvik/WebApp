import './style.css'

// Defining an interface for the projects.
// Interface is like a struct in c++ or c
interface Project {
    id: number,
    title: string,
    description: string,
    objective: string,
    languages: string,
    image: string
}

let projects: Project[] = [];

function addProjectToDOM(project: Project) {
    // Retrieve the element with the class 'project-list'
    const projectList = document.querySelector('project-list')

    //if it exists
    if (projectList){

        // create a li element with som children
        const listItem = document.createElement('li');
        listItem.className = 'project-item';
        listItem.innerHTML = `
            <h2>${project.title}</h2>
            <p><strong>Description:</strong> ${project.description}</p>
            <p><strong>Objective:</strong> ${project.objective}</p>
            <p><strong>Languages:</strong> ${project.languages}</p>
            <img src="${project.image}" alt="${project.title}" width="100">
        `;

        // Add the li as a child to the 'project-list' element
        projectList.appendChild(listItem);
    }
}

document.getElementById('projectForm')?.addEventListener("submit", function(event) {
    // Prevent the user from making a project with default values
    event.preventDefault();

    // Get the data from the form
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const description = (document.getElementById("description") as HTMLTextAreaElement).value;
    const objective = (document.getElementById("objective") as HTMLInputElement).value;
    const languages = (document.getElementById("languages") as HTMLInputElement).value;
    const image = (document.getElementById("image") as HTMLInputElement).value;

    // Create a new Project
    const newProject: Project = {
        id: projects.length + 1,
        title: title,
        description: description,
        objective: objective,
        languages: languages,
        image: image
    };

    projects.push(newProject);

    // Add the new project to the DOM
    addProjectToDOM(newProject);

    // Update the JSON file
    saveProjectsToServer(projects);

    // Clear the form after submission
    (document.getElementById("projectForm") as HTMLFormElement).reset();
});

function saveProjectsToServer(projects: Project[]) {
    fetch('/saveProjects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(projects)
    })
    .then(response => {
        if (response.ok) {
            alert('Project saved successfully!');
        } else {
            alert('Failed to save project.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error saving project.');
    });
}
