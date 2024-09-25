import { Hono } from "hono";
import { cors } from "hono/cors";
import { ProjectSchema, ProjectType } from "./types/types";

const projects: ProjectType[] = [
  {
    "title": "Airport Simulator",
    "description": "A library for creating an airport with support for simulating said airport for desired durations",
    "objective": "The objective of this project was to learn C# and .NET",
    "language": "C#",
    "image": "Test"
    }
];


const app = new Hono();

app.use(cors());

app.get("/", async (c) => {
    return c.json(projects);
});

app.post("/add", async (c) => {
  try {
      const newProject = await c.req.json();
      console.log(newProject);

      const project = ProjectSchema.parse(newProject);

      if (!project) return c.json({ error: "Invalid project" }, { status: 400 });
      projects.push(project);

      return c.json({ message: "Project added successfully" }, { status: 200 });
    } catch (error){
        console.error("Error adding project:", error);
        return c.json({ error: "Failed to add project" }, { status: 500 });
    }})
  
export { app };