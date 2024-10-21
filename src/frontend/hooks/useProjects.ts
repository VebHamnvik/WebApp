
import { useState, useEffect } from "react";
import { ProjectArraySchema, ProjectType } from "../../backend/types/projectTypes.ts";
import { getProjects } from "../../backend/services/api.ts";

export const useProjects = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const data = await getProjects();
        const validatedProjects = ProjectArraySchema.parse(data);
        setProjects(validatedProjects);
      } catch (error) {
        setError("Error loading projects");
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return { projects, setProjects, error, loading };
};