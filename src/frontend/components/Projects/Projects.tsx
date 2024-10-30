import { useState, useEffect } from "react";
import { ProjectType } from "../../../backend/types/projectTypes";
import DefaultProject from "./DefaultProject";
import ExpandedProjectView from "./ExpandedProject";
import { getUserFromCookies } from "../../../backend/util/auth";
import { baseUrl } from "../../config/urls";

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

  const onRemove = async (projectId: string) => {
    try {
      const response = await fetch(`${baseUrl}/v1/api/projects/${projectId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setVisibleProjects(visibleProjects.filter((project) => project.id !== projectId));
      } else {
        console.error("Failed to delete project:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <ul id="project-list">
      {visibleProjects?.map((project: ProjectType, index: number) => (
        <li
          className="project-item"
          key={project.id || index}
          onClick={() => toggleExpansion(index)}
          style={{ cursor: "pointer" }}
        >
          {expandedProjectIndex === index ? (
            <ExpandedProjectView
              {...project}
              onRemove={() => onRemove(project.id)}
            />
          ) : (
            <DefaultProject {...project} />
          )}
        </li>
      ))}
    </ul>
  );
}
