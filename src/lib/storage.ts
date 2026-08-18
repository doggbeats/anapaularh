import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.POSTGRES_URL || process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("POSTGRES_URL or DATABASE_URL must be set");
}

const sql = neon(DATABASE_URL);

async function ensureTable(): Promise<void> {
  await sql`CREATE TABLE IF NOT EXISTS app_state (
    id text PRIMARY KEY,
    data jsonb NOT NULL
  )`;
}

export async function loadState(): Promise<string | null> {
  await ensureTable();
  const rows = await sql`SELECT data FROM app_state WHERE id = 'main'`;
  if (rows.length === 0) return null;
  return JSON.stringify(rows[0].data);
}

export async function saveState(json: string): Promise<void> {
  await ensureTable();
  await sql`INSERT INTO app_state (id, data)
    VALUES ('main', ${json}::jsonb)
    ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data`;
}
