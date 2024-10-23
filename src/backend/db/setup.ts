import fs from "node:fs/promises";
import { access } from "node:fs/promises";
import { constants } from "node:fs";
import { join } from "node:path";
import type { DB } from "./db";
import { seed } from "./seed";
import { createTables } from "./tables";

export const setup = async (db: DB) => {
  const dbPath = join(new URL('.', import.meta.url).pathname, "dev.db");
  console.log(dbPath);

  await createTables(db);
  const row = db.prepare("SELECT COUNT(*) as count FROM projects").get();

  if (row.count == 0) {
    await seed(db)
  }
};