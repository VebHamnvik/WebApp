import { ProjectType } from "../../types/projectTypes";
import { DbProject } from "../../types/projectTypes";
import { formatDateForStorage } from "../../util/dateFormatter";

// Convert a database representation to an application model
export const fromDb = (dbProject: DbProject): ProjectType => {
  return {
    id: dbProject.id,
    title: dbProject.title,
    description: dbProject.description,
    objective: dbProject.objective,
    language: dbProject.language,
    createdAt: dbProject.createdAt,
    status: dbProject.status,
    isPublic: Boolean(dbProject.isPublic),
    tags: Array.isArray(dbProject.tags) ? dbProject.tags : dbProject.tags.split(","),
    image: dbProject.image,
  };
};



export const fromDbArray = (dbArray: DbProject[]): ProjectType[] => {
  const projects = dbArray.map((project) => fromDb(project));
  return projects;
};



// Converts an application model to a database representation
export const toDb = (project: ProjectType): DbProject => {
  const dbProject: DbProject = {
    id: project.id,
    title: project.title,
    description: project.description,
    objective: project.objective,
    language: project.language,
    createdAt: formatDateForStorage(project.createdAt),
    status: project.status,
    isPublic: project.isPublic ? 1 : 0,
    tags: project.tags.join(","), 
    image: project.image,
  };

  return dbProject;
};
