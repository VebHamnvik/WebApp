
import { endpoints } from "../../frontend/config/urls";



export const getProjects = async () => {
    const response = await fetch(endpoints.projects, { credentials: "include"});
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    const data = await response.json();
    return data;
  };

  