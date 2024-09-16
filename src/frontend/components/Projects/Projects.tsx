import { projects } from "../../../backend/data/projects"
import Project from "./Project";

export default function Projects() {
  return (
      <ul id="project-list">
        {projects?.map((project) => (
          <li className="project-item" key={project.id}> 
            <Project
              id={project.id}
              title={project.title}
              description={project.description}
              objective={project.objective}
              languages={project.languages}
              image={project.image}
            />
          </li>
        ))}
      </ul>
  );
}
