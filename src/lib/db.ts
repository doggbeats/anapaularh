import path from "node:path";
import { randomBytes, scryptSync } from "node:crypto";
import { loadState, saveState } from "./storage";
import type { DB, Vaga } from "./types";

export const DATA_DIR = path.join(process.cwd(), "data");
export const UPLOADS_DIR = path.join(DATA_DIR, "uploads");

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "4nn4.2026";

function hashPassword(password: string, salt: string): string {
  return scryptSync(password, salt, 64).toString("hex");
}

function seedDB(): DB {
  const salt = randomBytes(16).toString("hex");
  const now = Date.now();
  const sampleVagas: Vaga[] = [
    {
      id: randomBytes(8).toString("hex"),
      titulo: "Desenvolvedor(a) Front-end",
      empresa: "TechNova",
      categoria: "Tecnologia",
      tipo: "CLT",
      modalidade: "Remoto",
      local: "Remoto",
      salario: "R$ 6.000,00",
      descricao:
        "Atuar no desenvolvimento de interfaces web modernas com React e Next.js, colaborando com times de produto e design.",
      requisitos:
        "- Experiência com React e TypeScript\n- Conhecimento de Next.js\n- Familiaridade com Git\n- Boas práticas de acessibilidade",
      ativa: true,
      createdAt: now - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: randomBytes(8).toString("hex"),
      titulo: "Consultor(a) de Vendas",
      empresa: "VendaMais",
      categoria: "Vendas",
      tipo: "PJ",
      modalidade: "Presencial",
      local: "São Paulo - SP",
      salario: "Comissão + fixo",
      descricao:
        "Responsável pela prospecção e fechamento de novos clientes, mantendo o relacionamento com a carteira atual.",
      requisitos:
        "- Experiência com vendas consultivas\n- Excelente comunicação\n- Disponibilidade para visitas presenciais",
      ativa: true,
      createdAt: now - 1000 * 60 * 60 * 24 * 5,
    },
    {
      id: randomBytes(8).toString("hex"),
      titulo: "Analista de Marketing Digital",
      empresa: "Cresça Agência",
      categoria: "Marketing",
      tipo: "CLT",
      modalidade: "Presencial",
      local: "Belo Horizonte - MG",
      salario: "R$ 4.500,00",
      descricao:
        "Planejar e executar campanhas de marketing digital, gerenciar tráfego pago e produzir relatórios de performance.",
      requisitos:
        "- Domínio de Google Ads e Meta Ads\n- Conhecimento em SEO\n- Habilidade analítica",
      ativa: true,
      createdAt: now - 1000 * 60 * 60 * 24 * 8,
    },
    {
      id: randomBytes(8).toString("hex"),
      titulo: "Atendente de Suporte",
      empresa: "Suporte+",
      categoria: "Atendimento",
      tipo: "Temporário",
      modalidade: "Presencial",
      local: "Rio de Janeiro - RJ",
      salario: "R$ 2.200,00",
      descricao:
        "Atender clientes por chat e telefone, solucionando dúvidas e registrando chamados no sistema.",
      requisitos:
        "- Ensino médio completo\n- Boa comunicação\n- Experiência com atendimento",
      ativa: true,
      createdAt: now - 1000 * 60 * 60 * 24 * 12,
    },
    {
      id: randomBytes(8).toString("hex"),
      titulo: "Auxiliar Administrativo",
      empresa: "OrganizaTudo",
      categoria: "Administrativo",
      tipo: "Estágio",
      modalidade: "Presencial",
      local: "Curitiba - PR",
      salario: "R$ 1.400,00 + benefícios",
      descricao:
        "Apoiar rotinas administrativas, organização de documentos e atendimento interno.",
      requisitos:
        "- Cursando ensino superior\n- Pacote Office\n- Organização e proatividade",
      ativa: true,
      createdAt: now - 1000 * 60 * 60 * 24 * 15,
    },
    {
      id: randomBytes(8).toString("hex"),
      titulo: "Motorista de Aplicativo",
      empresa: "TransporteJá",
      categoria: "Operações",
      tipo: "Freelance",
      modalidade: "Híbrido",
      local: "Porto Alegre - RS",
      salario: "Variável",
      descricao:
        "Realizar corridas com veículo próprio, com flexibilidade de horários e metas de ganhos semanais.",
      requisitos:
        "- CNH B no mínimo\n- Veículo em boas condições\n- Disponibilidade de horário",
      ativa: true,
      createdAt: now - 1000 * 60 * 60 * 24 * 20,
    },
  ];

  return {
    admin: {
      username: ADMIN_USERNAME,
      salt,
      passwordHash: hashPassword(ADMIN_PASSWORD, salt),
    },
    sessions: {},
    vagas: sampleVagas,
    candidaturas: [],
  };
}

export async function readDB(): Promise<DB> {
  const raw = await loadState();
  if (raw === null) {
    const db = seedDB();
    await saveState(JSON.stringify(db));
    return db;
  }
  return JSON.parse(raw) as DB;
}

export async function writeDB(db: DB): Promise<void> {
  await saveState(JSON.stringify(db));
}

export async function getVaga(id: string): Promise<Vaga | undefined> {
  return (await readDB()).vagas.find((v) => v.id === id);
}

export async function getCandidatura(id: string) {
  return (await readDB()).candidaturas.find((c) => c.id === id);
}
