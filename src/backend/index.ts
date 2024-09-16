import { Hono } from "hono";
import { cors } from "hono/cors";
import { ProjectSchema } from "./types/types";


const app = new Hono();

app.use(cors());

app.notFound((ctx) => {
    return ctx.text('404 Not Found', 404);
  });

app.post("/add", async (c) => {
  try {
      const newProject = await c.req.json();
      console.log(newProject);

      const project = ProjectSchema.parse(newProject);

      if (!project) return c.json({ error: "Invalid project" }, { status: 400 });
      console.log(project);
      const projectData = JSON.stringify(project, null, 2);
      // writeFile("/projects.json", projectData);
      return c.json({ message: "Project added successfully" }, { status: 200 });
      
  } catch (error){
      console.error("Error adding project:", error);
      return c.json({ error: "Failed to add project" }, { status: 500 });
  }})
  
export { app };