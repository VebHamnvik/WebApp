import fs from "node:fs/promises";
import { join } from "node:path";
import type { DB } from "../db/db";
import { ProjectType } from "../types/projectTypes";

export const seed = async (db: DB) => {
    const path = join(import.meta.dirname, "data.json");
    const file = await fs.readFile(path, "utf-8");
    const { projects } = JSON.parse(file) as {
        projects: ProjectType[];
    };

    const insertProject = db.prepare(`
        INSERT INTO projects (id, title, description, objective, language, created_at, status, is_public, tags, image) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

        db.transaction(() => {
            for (const project of projects) {
                insertProject.run(
                    project.id,
                    project.title,
                    project.description,
                    project.objective,
                    project.language,
                    project.createdAt,
                    project.status,
                    project.isPublic ? 1 : 0,
                    project.tags.join(','),
                    project.image
                );
            };
        })();

};