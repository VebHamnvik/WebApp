import type { DB } from "./db";
import { seed } from "./seed";
import { createTables } from "./tables";

export const setup = async (db: DB) => {
  await createTables(db);
  const row = db.prepare("SELECT COUNT(*) as count FROM projects").get();

  if (row.count == 0) {
    await seed(db)
  }
};