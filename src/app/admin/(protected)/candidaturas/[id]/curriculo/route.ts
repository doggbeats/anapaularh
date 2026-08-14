import { readFileSync } from "node:fs";
import path from "node:path";
import { isAuthenticated } from "@/lib/auth";
import { getCandidatura, UPLOADS_DIR } from "@/lib/db";

const CONTENT_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".txt": "text/plain; charset=utf-8",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated())) {
    return new Response("Não autorizado", { status: 401 });
  }

  const { id } = await params;
  const candidatura = getCandidatura(id);

  if (!candidatura?.curriculoPath) {
    return new Response("Currículo não encontrado", { status: 404 });
  }

  const filePath = path.isAbsolute(candidatura.curriculoPath)
    ? candidatura.curriculoPath
    : path.join(UPLOADS_DIR, candidatura.curriculoPath);

  let file: Buffer;
  try {
    file = readFileSync(filePath);
  } catch {
    return new Response("Currículo não encontrado", { status: 404 });
  }

  const ext = path.extname(candidatura.curriculoNome || "").toLowerCase();
  const contentType = CONTENT_TYPES[ext] ?? "application/octet-stream";
  const fileName =
    candidatura.curriculoNome || `curriculo_${candidatura.nome}${ext}`;

  return new Response(new Uint8Array(file), {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Length": String(file.length),
    },
  });
}
