import { Hono } from 'hono';
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { ProjectSchema, type Project } from './types';

const app = new Hono();

app.use("/*", cors());

app.use("/static/*", serveStatic({ root: "./" }));

const projects: Project[] = [
    {
        "id":  1,
        "title": "Airport Simulator",
        "description": "A library for creating an airport with support for simulating said airport for desired durations",
        "objective": "The objective of this project was to learn C# and .NET",
        "languages": "C#",
        "image": "Test"
    },
];

app.post("/add", async (c) => {
    const newProject = await c.req.json();

    const project = ProjectSchema.parse(newProject);

    if (!project) return c.json({ error: "Invalid project" }, { status: 400 });
    console.log(project);
    projects.push(project);

    return c.json<Project[]>(projects, { status: 201 });

});

app.get("/", (c) => {
    return c.json<Project[]>(projects);
})

const port = 3000;

console.log(`Server is running on port ${port}`);

serve({
    fetch: app.fetch,
    port,
});