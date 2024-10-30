import { Hono } from "hono";
import { cors } from "hono/cors";
import { ProjectSchema, ProjectType } from "./types/projectTypes";
import { z } from "zod";
import { createProjectRepository } from "./mvc/repository/projectRepository";
import { db } from "./db/db"
import { toDb, fromDbArray } from "./mvc/mappers/mappers";

let projects: ProjectType[] = [
  {
    "id": "1",
    "title": "Airport Simulator",
    "description": "A library for creating an airport with support for simulating said airport for desired durations",
    "objective": "The objective of this project was to learn C# and .NET",
    "language": "C#",
    "createdAt": "2024-02-02",
    "status": "Completed",
    "isPublic": true,
    "tags": ["C#", "Development", "API"],
    "image": "Test"
    },
    {
    "id": "2",
    "title": "Moove App",
    "description": "An android app for making the prosess of moving easier. Facilitates selling unwanted items and hiring help or tools",
    "objective": "The objective of this project was to learn how to develop an android app with kotlin",
    "language": "Kotlin",
    "createdAt": "2024-08-16",
    "status": "In Progress",
    "isPublic": true,
    "tags": ["Kotlin", "Development", "Android", "Firebase"],
    "image": "Test"
    },
    {
    "id": "3",
    "title": "Portfolio in React",
    "description": "Designing a portfolio webpage for myself in the WebApps course",
    "objective": "Learn to become a fullstack developer",
    "language": "js, ts",
    "createdAt": "2024-08-16",
    "status": "In Progress",
    "isPublic": false,
    "tags": ["React", "Development", "Web"],
    "image": "Test"
    }
];

const app = new Hono();
const repo = createProjectRepository(db)

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/v1/api/projects", async (c) => {
  try {
    const data1 = await repo.list();
    
    if (!data1.success) {
      console.error("Error fetching projects:", data1.error);
      return c.json({ error: data1.error.message }, { status: 500 });
    }

    const projects = fromDbArray(data1.data);
    return c.json(projects);
    
  } catch (error) {
    console.error("Unexpected error fetching projects:", error);
    return c.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
});




app.post("/v1/api/projects", async (c) => {
  try {
      const newProject = await c.req.json();
      const project = ProjectSchema.parse(newProject);

      const dbProject = toDb(project)
      console.log(dbProject)

      const data1 = await repo.create(dbProject)

      return c.json({ message: "Project added successfully", data1 }, { status: 200 });
  } catch (error) {
      if (error instanceof z.ZodError) {
          const validationErrors = error.errors.map(err => ({
              field: err.path[0],
              message: err.message
          }));
          console.error("Validation errors:", validationErrors);
          return c.json({ error: "Validation failed", details: validationErrors }, { status: 400 });
      } else {
          console.error("Error adding project:", error);
          return c.json({ error: "Failed to add project" }, { status: 500 });
      }
  }
});


app.delete(`/v1/api/projects/:id`, async (c) => {
  const id = c.req.param("id");
  const projectExist = projects.some((project) => project.id === id);
  
  if (!projectExist) {
    return c.json({
      error: "Project not found",
      status: 404,
      success: false,
    });
  }

  
  
  projects = projects.filter((project) => project.id !== id);
  return c.json({ data: projects, success: true });
});


app.patch(`/v1/api/projects/:id`, async (c) => {
  const id = c.req.param("id");
  const { name } = await c.req.json();
  projects = projects.map((project) =>
    project.id === id ? { ...project, name } : project
  );
  return c.json(projects);
});
  
export { app };