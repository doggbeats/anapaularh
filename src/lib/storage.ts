import { put, get } from "@vercel/blob";

const BLOB_PATHNAME = "app-state/db.json";

export async function loadState(): Promise<string | null> {
  try {
    const result = await get(BLOB_PATHNAME, { access: "private" });
    if (!result) return null;
    return await new Response(result.stream).text();
  } catch {
    return null;
  }
}

export async function saveState(json: string): Promise<void> {
  await put(BLOB_PATHNAME, json, {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
