export type TipoVaga =
  | "CLT"
  | "Estágio"
  | "PJ"
  | "Temporário"
  | "Freelance";

export type ModalidadeVaga = "Presencial" | "Remoto" | "Híbrido";

export type StatusCandidatura =
  | "nova"
  | "em_analise"
  | "aprovada"
  | "reprovada";

export interface Vaga {
  id: string;
  titulo: string;
  empresa: string;
  categoria: string;
  tipo: TipoVaga;
  modalidade: ModalidadeVaga;
  local: string;
  salario: string;
  descricao: string;
  requisitos: string;
  ativa: boolean;
  createdAt: number;
}

export interface Candidatura {
  id: string;
  vagaId: string;
  nome: string;
  whatsapp: string;
  email: string;
  cidade: string;
  experiencia: string;
  formacao: string;
  linkedin: string;
  curriculoNome: string;
  curriculoPath: string;
  status: StatusCandidatura;
  createdAt: number;
}

export interface Session {
  createdAt: number;
  expiresAt: number;
}

export interface AdminUser {
  username: string;
  salt: string;
  passwordHash: string;
}

export interface DB {
  admin: AdminUser;
  sessions: Record<string, Session>;
  vagas: Vaga[];
  candidaturas: Candidatura[];
}

export const CATEGORIAS = [
  "Tecnologia",
  "Vendas",
  "Marketing",
  "Atendimento",
  "Administrativo",
  "Operações",
  "Saúde",
  "Educação",
  "Financeiro",
  "Outros",
] as const;

export const STATUS_LABELS: Record<StatusCandidatura, string> = {
  nova: "Nova",
  em_analise: "Em análise",
  aprovada: "Aprovada",
  reprovada: "Reprovada",
};
