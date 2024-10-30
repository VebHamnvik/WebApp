import { ProjectType } from "../../types/projectTypes";
import { DbProject } from "../../types/projectTypes";
import { createId } from "../../util/generateId";
import { formatDateForStorage } from "../../util/dateFormatter";

// Convert a database representation to an application model
export const fromDb = (dbProject: DbProject): ProjectType => {
  // Use created_at directly, assuming it's in the correct YYYY-MM-DD format
  const createdAt = dbProject.createdAt; // No additional conversion needed

  return {
    id: dbProject.id,
    title: dbProject.title,
    description: dbProject.description,
    objective: dbProject.objective,
    language: dbProject.language,
    createdAt, // Directly assign it
    status: dbProject.status,
    isPublic: dbProject.is_public === 1,
    tags: Array.isArray(dbProject.tags) ? dbProject.tags : dbProject.tags.split(","), // Handle both array and string
    image: dbProject.image,
  };
};


export const fromDbArray = (dbArray: DbProject[]): ProjectType[] => {
  return dbArray.map((project) => fromDb(project));
};


// Converts an application model to a database representation
export const toDb = (project: ProjectType): DbProject => {
  const dbProject: DbProject = {
    id: project.id,
    title: project.title,
    description: project.description,
    objective: project.objective,
    language: project.language,
    created_at: formatDateForStorage(project.createdAt), // Using storage format
    status: project.status,
    is_public: project.isPublic ? 1 : 0,
    tags: project.tags.join(","), 
    image: project.image,
  };

  return dbProject;
};

  export const createProject = (project: Partial<ProjectType>): ProjectType => {
    return {
      id: project.id ?? createId(),
      title: project.title ?? "",
      description: project.description ?? "",
      objective: project.objective ?? "",
      language: project.language ?? "Unknown",
      createdAt: project.createdAt ?? new Date().toISOString(),
      status: project.status ?? "Draft",
      isPublic: project.isPublic ?? false,
      tags: project.tags ?? [],
      image: project.image ?? "",
    };
  };