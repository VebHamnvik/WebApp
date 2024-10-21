import { useState, useEffect } from "react";
import { ProjectType } from "../../../backend/types/projectTypes";
import DefaultProject from "./DefaultProject";
import ExpandedProjectView from "./ExpandedProject";
import { getUserFromCookies } from "../../../backend/util/auth";

type ProjectsProps = {
	projects: ProjectType[];
};


export default function Projects(props: ProjectsProps) {

  const { projects } = props;
  const [ expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null)
  const [visibleProjects, setVisibleProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    const user = getUserFromCookies();

    if (user?.role === "admin") {
      setVisibleProjects(projects);
    } else {
      setVisibleProjects(projects.filter((project) => project.isPublic));
    }
  }, [projects]);

  const toggleExpansion = (index: number) => {
    if (expandedProjectIndex === index) {
      setExpandedProjectIndex(null);
    } else {
      setExpandedProjectIndex(index);
    }
  };

  return (
    <ul id="project-list">
      {visibleProjects?.map((project: ProjectType, index: number) => (
        <li
          className="project-item"
          key={project.title}
          onClick={() => toggleExpansion(index)}
          style={{ cursor: "pointer" }}
        >
          {expandedProjectIndex === index ? (
            <ExpandedProjectView
              title={project.title}
              description={project.description}
              objective={project.objective}
              language={project.language}
              createdAt={project.createdAt}
              status={project.status}
              isPublic={project.isPublic}
              tags={project.tags}
              image={project.image}
            />
          ) : (
            <DefaultProject
              title={project.title}
              description={project.description}
              objective={project.objective}
              language={project.language}
              createdAt={project.createdAt}
              status={project.status}
              isPublic={project.isPublic}
              tags={project.tags}
              image={project.image}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
