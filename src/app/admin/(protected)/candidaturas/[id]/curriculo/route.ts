import { readFileSync } from "node:fs";
import path from "node:path";
import { getDownloadUrl } from "@vercel/blob";
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
  const candidatura = await getCandidatura(id);

  if (!candidatura?.curriculoPath) {
    return new Response("Currículo não encontrado", { status: 404 });
  }

  const ext = path.extname(candidatura.curriculoNome || "").toLowerCase();
  const contentType = CONTENT_TYPES[ext] ?? "application/octet-stream";
  const fileName =
    candidatura.curriculoNome || `curriculo_${candidatura.nome}${ext}`;

  const disposition = `attachment; filename="${fileName}"`;

  if (candidatura.curriculoPath.startsWith("https://")) {
    try {
      const res = await fetch(getDownloadUrl(candidatura.curriculoPath));
      if (!res.ok) {
        return new Response("Currículo não encontrado", { status: 404 });
      }
      const body = await res.arrayBuffer();
      return new Response(new Uint8Array(body), {
        status: 200,
        headers: {
          "Content-Type": res.headers.get("content-type") ?? contentType,
          "Content-Disposition": disposition,
          "Content-Length": String(body.byteLength),
        },
      });
    } catch {
      return new Response("Currículo não encontrado", { status: 404 });
    }
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

  return new Response(new Uint8Array(file), {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": disposition,
      "Content-Length": String(file.length),
    },
  });
}
