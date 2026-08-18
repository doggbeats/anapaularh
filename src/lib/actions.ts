"use server";

import { randomBytes } from "node:crypto";
import { existsSync, mkdirSync, writeFileSync, unlinkSync } from "node:fs";
import path from "node:path";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { readDB, writeDB, UPLOADS_DIR } from "./db";
import {
  verifyPassword,
  createSessionToken,
  setSessionCookie,
  clearSessionCookie,
  isAuthenticated,
  SESSION_TTL_MS,
} from "./auth";
import type {
  ModalidadeVaga,
  StatusCandidatura,
  TipoVaga,
  Vaga,
} from "./types";

export interface ActionState {
  error?: string;
  success?: boolean;
}

export async function login(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const db = await readDB();
  const admin = db.admin;

  if (
    username !== admin.username ||
    !verifyPassword(password, admin.salt, admin.passwordHash)
  ) {
    return { error: "Usuário ou senha inválidos." };
  }

  const token = createSessionToken();
  db.sessions[token] = {
    createdAt: Date.now(),
    expiresAt: Date.now() + SESSION_TTL_MS,
  };
  await writeDB(db);
  await setSessionCookie(token);

  redirect("/admin");
}

export async function logout(): Promise<void> {
  const db = await readDB();
  const cookieStore = await cookies();
  const token = cookieStore.get("recruta_session")?.value;
  if (token) {
    delete db.sessions[token];
    await writeDB(db);
  }
  await clearSessionCookie();
  redirect("/admin/login");
}

function validateVaga(formData: FormData): Omit<Vaga, "id" | "createdAt"> {
  const titulo = String(formData.get("titulo") ?? "").trim();
  const empresa = String(formData.get("empresa") ?? "").trim();
  const categoria = String(formData.get("categoria") ?? "").trim();
  const tipo = String(formData.get("tipo") ?? "") as TipoVaga;
  const modalidade = String(formData.get("modalidade") ?? "") as ModalidadeVaga;
  const local = String(formData.get("local") ?? "").trim();
  const salario = String(formData.get("salario") ?? "").trim();
  const descricao = String(formData.get("descricao") ?? "").trim();
  const requisitos = String(formData.get("requisitos") ?? "").trim();
  const ativa = formData.get("ativa") === "on";

  if (
    !titulo ||
    !empresa ||
    !categoria ||
    !tipo ||
    !modalidade ||
    !local ||
    !descricao ||
    !requisitos
  ) {
    throw new Error("Preencha todos os campos obrigatórios.");
  }

  return {
    titulo,
    empresa,
    categoria,
    tipo,
    modalidade,
    local,
    salario,
    descricao,
    requisitos,
    ativa,
  };
}

export async function criarVaga(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!(await isAuthenticated())) {
    return { error: "Acesso não autorizado. Faça login novamente." };
  }

  try {
    const data = validateVaga(formData);
    const db = await readDB();
    db.vagas.push({ ...data, id: randomBytes(8).toString("hex"), createdAt: Date.now() });
    await writeDB(db);
    revalidatePath("/");
    revalidatePath("/vagas");
    revalidatePath("/admin");
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao salvar vaga." };
  }

  redirect("/admin");
}

export async function atualizarVaga(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!(await isAuthenticated())) {
    return { error: "Acesso não autorizado. Faça login novamente." };
  }

  try {
    const data = validateVaga(formData);
    const db = await readDB();
    const index = db.vagas.findIndex((v) => v.id === id);
    if (index === -1) {
      return { error: "Vaga não encontrada." };
    }
    db.vagas[index] = { ...data, id, createdAt: db.vagas[index].createdAt };
    await writeDB(db);
    revalidatePath("/");
    revalidatePath("/vagas");
    revalidatePath("/admin");
    revalidatePath(`/vagas/${id}`);
    revalidatePath(`/admin/vagas/${id}`);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao salvar vaga." };
  }

  redirect("/admin");
}

export async function excluirVaga(formData: FormData): Promise<void> {
  if (!(await isAuthenticated())) {
    return;
  }
  const id = String(formData.get("id") ?? "");
  const db = await readDB();
  const candidaturas = db.candidaturas.filter((c) => c.vagaId === id);
  db.vagas = db.vagas.filter((v) => v.id !== id);
  db.candidaturas = db.candidaturas.filter((c) => c.vagaId !== id);
  await writeDB(db);

  for (const c of candidaturas) {
    if (c.curriculoPath) {
      try {
        unlinkSync(c.curriculoPath);
      } catch {
        // arquivo já removido
      }
    }
  }

  revalidatePath("/");
  revalidatePath("/vagas");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function excluirCandidatura(formData: FormData): Promise<void> {
  if (!(await isAuthenticated())) {
    return;
  }
  const id = String(formData.get("id") ?? "");
  const vagaId = String(formData.get("vagaId") ?? "");
  const db = await readDB();
  const candidatura = db.candidaturas.find((c) => c.id === id);

  if (candidatura?.curriculoPath) {
    try {
      unlinkSync(candidatura.curriculoPath);
    } catch {
      // arquivo já removido
    }
  }

  db.candidaturas = db.candidaturas.filter((c) => c.id !== id);
  await writeDB(db);

  revalidatePath("/admin");
  if (vagaId) {
    revalidatePath(`/admin/vagas/${vagaId}`);
  }
  redirect(vagaId ? `/admin/vagas/${vagaId}` : "/admin");
}

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
}

async function storeCurriculo(
  file: File,
  candidaturaId: string,
): Promise<{ curriculoNome: string; curriculoPath: string }> {
  const curriculoNome = sanitizeFileName(file.name);
  const storedName = `${candidaturaId}_${curriculoNome}`;
  if (!existsSync(UPLOADS_DIR)) {
    mkdirSync(UPLOADS_DIR, { recursive: true });
  }
  writeFileSync(
    path.join(UPLOADS_DIR, storedName),
    Buffer.from(await file.arrayBuffer()),
  );
  return { curriculoNome, curriculoPath: path.join(UPLOADS_DIR, storedName) };
}

export async function candidatar(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const vagaId = String(formData.get("vagaId") ?? "");
  const nome = String(formData.get("nome") ?? "").trim();
  const whatsapp = String(formData.get("whatsapp") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const cidade = String(formData.get("cidade") ?? "").trim();
  const experiencia = String(formData.get("experiencia") ?? "").trim();
  const formacao = String(formData.get("formacao") ?? "").trim();
  const linkedin = String(formData.get("linkedin") ?? "").trim();
  const curriculo = formData.get("curriculo");

  if (!vagaId || !nome || !whatsapp || !email || !cidade) {
    return { error: "Preencha todos os campos obrigatórios." };
  }

  const db = await readDB();
  const vaga = db.vagas.find((v) => v.id === vagaId);
  if (!vaga || !vaga.ativa) {
    return { error: "Esta vaga não está mais disponível." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Informe um e-mail válido." };
  }

  if (!(curriculo instanceof File) || curriculo.size === 0) {
    return { error: "Anexe seu currículo para enviar a candidatura." };
  }

  const candidaturaId = randomBytes(8).toString("hex");

  let curriculoNome = "";
  let curriculoPath = "";

  if (curriculo instanceof File && curriculo.size > 0) {
    if (curriculo.size > 5 * 1024 * 1024) {
      return { error: "O currículo deve ter no máximo 5 MB." };
    }
    const allowedExt = [".pdf", ".doc", ".docx", ".txt"];
    const ext = path.extname(curriculo.name).toLowerCase();
    if (!allowedExt.includes(ext)) {
      return {
        error: "Formato de currículo inválido. Use PDF, DOC, DOCX ou TXT.",
      };
    }
    const stored = await storeCurriculo(curriculo, candidaturaId);
    curriculoNome = stored.curriculoNome;
    curriculoPath = stored.curriculoPath;
  }

  db.candidaturas.push({
    id: candidaturaId,
    vagaId,
    nome,
    whatsapp,
    email,
    cidade,
    experiencia,
    formacao,
    linkedin,
    curriculoNome,
    curriculoPath,
    status: "nova",
    createdAt: Date.now(),
  });
  await writeDB(db);

  revalidatePath("/admin");
  revalidatePath(`/admin/vagas/${vagaId}`);

  redirect(`/vagas/${vagaId}?candidatura=sucesso`);
}

export async function atualizarStatusCandidatura(
  formData: FormData,
): Promise<void> {
  if (!(await isAuthenticated())) {
    return;
  }
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as StatusCandidatura;

  if (!["nova", "em_analise", "aprovada", "reprovada"].includes(status)) {
    return;
  }

  const db = await readDB();
  const candidatura = db.candidaturas.find((c) => c.id === id);
  if (!candidatura) return;

  candidatura.status = status;
  await writeDB(db);
  revalidatePath("/admin");
  revalidatePath(`/admin/vagas/${candidatura.vagaId}`);
  revalidatePath("/admin/candidatos");
}
