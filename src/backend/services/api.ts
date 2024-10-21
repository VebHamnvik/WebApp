
export const getProjects = async () => {
    const response = await fetch("http://localhost:3999/", { credentials: "include"});
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    const data = await response.json();
    return data;
  };

  