import { Hono } from "hono";
import { cors } from "hono/cors";
import { ProjectSchema } from "./types/types";
import { readFile, writeFile } from "fs/promises";



const app = new Hono();

app.use(cors());

app.notFound((ctx) => {
    return ctx.text('404 Not Found', 404);
  });

app.get("/", async (c) => {
    const data = await readFile("../data/projects.json", "utf-8");
    return c.json(JSON.parse(data));
});

async function loadProjects() {
  const data = await readFile('./projects.json', 'utf-8');
  return JSON.parse(data);
}

// Save updated projects to the JSON file
async function saveProjects(projects) {
  await writeFile('./projects.json', JSON.stringify(projects, null, 2));
}

app.post("/add", async (c) => {
  try {
      const newProject = await c.req.json();
      console.log(newProject);

      const project = ProjectSchema.parse(newProject);

      if (!project) return c.json({ error: "Invalid project" }, { status: 400 });
      const projects = await loadProjects();
      projects.push(project);

      await saveProjects(projects);

      return c.json({ message: "Project added successfully" }, { status: 200 });
    } catch (error){
        console.error("Error adding project:", error);
        return c.json({ error: "Failed to add project" }, { status: 500 });
    }})
  
export { app };