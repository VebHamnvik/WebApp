import dotenv from "dotenv";
dotenv.config();

import { app } from ".";
import { port } from "./config";
import { serve } from "@hono/node-server";

const serverPort = process.env.PORT ?? port ?? 3999;

console.log(`Server is running on port ${serverPort}`);

serve({
    fetch: app.fetch,
    port: Number(serverPort),
});