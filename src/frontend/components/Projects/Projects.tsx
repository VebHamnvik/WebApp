import { ProjectType } from "../../../backend/types/types";
import Project from "./Project";

type ProjectsProps = {
	projects: ProjectType[];
};


export default function Projects(props: ProjectsProps) {

  const { projects } = props;

  return (
      <ul id="project-list">
        {projects?.map((project: ProjectType) => (
          <li className="project-item" key={project.title}> 
            <Project
              title={project.title}
              description={project.description}
              objective={project.objective}
              language={project.language}
              image={project.image}
            />
          </li>
        ))}
      </ul>
  );
}
