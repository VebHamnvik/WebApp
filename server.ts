import { Hono } from 'hono';
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { ProjectSchema, type Project } from './types';
import { readFile, writeFile } from "node:fs/promises";

const app = new Hono();

app.use(cors());

app.use("/static/*", serveStatic({ root: "./" }));


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
    }
    

});

app.get("/", async (c) => {
    const data = await readFile("projects.json", "utf-8");
    return c.json(JSON.parse(data));
})

const port = 3000;

console.log(`Server is running on port ${port}`);

serve({
    fetch: app.fetch,
    port,
});