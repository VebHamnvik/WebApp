import type { DB } from "./db";

export const createTables = (db: DB) => {
    db.exec(`
        CREATE TABLE IF NOT EXISTS projects (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            objective TEXT NOT NULL,
            language TEXT NOT NULL,
            created_at TEXT NOT NULL,
            status TEXT NOT NULL,
            is_public BOOLEAN NOT NULL,
            tags TEXT NOT NULL,
            image TEXT NOT NULL
        );
      `);
};