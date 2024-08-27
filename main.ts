import './style.css';
import { ProjectArraySchema, type Project } from "./types";
import { z } from "zod";


const form = document.getElementById('projectForm') as HTMLFormElement;
const projectList = document.getElementById('projects-list') as HTMLUListElement;
const projects: Project[] = [];



form.addEventListener("submit", async (event: SubmitEvent) => {
    // Prevent the user from making a project with default values
    event.preventDefault();

    // Get the data from the form
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const description = (document.getElementById("description") as HTMLTextAreaElement).value;
    const objective = (document.getElementById("objective") as HTMLInputElement).value;
    const languages = (document.getElementById("languages") as HTMLInputElement).value;
    const image = (document.getElementById("image") as HTMLInputElement).value;

    // Create a new Project
    const newProject = {
        id: projects.length + 1,
        title: title,
        description: description,
        objective: objective,
        languages: languages,
        image: image
    };

    projects.push(newProject);
    // Add the new project to the DOM
    updateProjectsList();

    try {
        const response = await fetch("http://localhost:3000/add", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(newProject),
        })

        if (response.status == 201){
            console.log("Project saved on the server.");
        }   else {
            console.error("An error occured saving the project to the server");
        }

    } catch (error) {
        console.error("An error occured sending the data to the server")
    }

    // Clear the form after submission
    (document.getElementById("projectForm") as HTMLFormElement).reset();
});

function updateProjectsList() {
    //if it exists
    if (!projectList) return;

    // Clear the list so it wont add duplicates
    projectList.innerHTML = '';
    
    // create a li element with som children
    for (const project of projects) {
        const listItem = document.createElement('li');
        listItem.className = 'project-item';
        listItem.innerHTML = `
        <div class="project-title">
            <h2>${project.title}</h2>
        </div>
        <div class="project-objective">
            <p><strong>Objective:</strong> ${project.objective}</p>
        </div>
        <div class="project-languages">
            <p><strong>Languages:</strong> ${project.languages}</p>
        </div>
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
        </div>
    `;
        // Add the li as a child to the 'project-list' element
        projectList.appendChild(listItem);
    }
    
}

function loadFromApi() {
    fetch("http://localhost:3000")
        .then((response) => response.json())
        .then((data: unknown) => {
            console.log(data);
            try {
                const validateProjects = ProjectArraySchema.parse(data);

                projects.push(...validateProjects);
                updateProjectsList();
            } catch (error) {
                if (error instanceof z.ZodError) {
                    console.error("Invalid data recieved from the server", error.errors);
                }   else {
                    console.log("Unexpected error when validating the date:", error);
                }
            }
        })
        .catch((error: Error) => {
            console.error("Error when retrieving data from server:", error);
        });
}

loadFromApi();

