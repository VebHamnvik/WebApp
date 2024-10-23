import { Hono } from "hono";
import { cors } from "hono/cors";
import { ProjectSchema, ProjectType } from "./types/projectTypes";

const projects: ProjectType[] = [
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

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", async (c) => {
    return c.json(projects);
});

app.post("/add", async (c) => {
  try {
      const newProject = await c.req.json();
      const id = (projects.length + 1).toString()
      newProject.id = id

      const project = ProjectSchema.parse(newProject);

      if (!project) return c.json({ error: "Invalid project" }, { status: 400 });
      projects.push(project);

      return c.json({ message: "Project added successfully" }, { status: 200 });
    } catch (error){
        console.error("Error adding project:", error);
        return c.json({ error: "Failed to add project" }, { status: 500 });
    }})
  
export { app };