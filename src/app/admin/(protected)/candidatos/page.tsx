import type { Metadata } from "next";
import Link from "next/link";
import { readDB } from "@/lib/db";
import { excluirCandidatura } from "@/lib/actions";
import { formatDate } from "@/lib/format";
import { STATUS_LABELS } from "@/lib/types";
import StatusForm from "@/components/StatusForm";
import ConfirmForm from "@/components/ConfirmForm";

export const metadata: Metadata = {
  title: "Candidatos",
};

export default async function CandidatosPage() {
  const db = await readDB();
  const candidaturas = [...db.candidaturas].sort(
    (a, b) => b.createdAt - a.createdAt,
  );

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
        Candidatos
      </h1>
      <p className="mt-1 text-zinc-500">
        Todas as candidaturas recebidas, com o status atual.
      </p>

      {candidaturas.length > 0 ? (
        <div className="mt-6 overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-400">
                <th className="px-4 py-3 font-medium">Candidato</th>
                <th className="px-4 py-3 font-medium">Vaga</th>
                <th className="px-4 py-3 font-medium">Contato</th>
                <th className="px-4 py-3 font-medium">Perfil</th>
                <th className="px-4 py-3 font-medium">Currículo</th>
                <th className="px-4 py-3 font-medium">Recebida em</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {candidaturas.map((c) => {
                const vaga = db.vagas.find((v) => v.id === c.vagaId);
                return (
                  <tr key={c.id} className="hover:bg-zinc-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-zinc-900">{c.nome}</p>
                      <p className="text-xs text-zinc-400">{c.cidade}</p>
                    </td>
                    <td className="px-4 py-3">
                      {vaga ? (
                        <Link
                          href={`/admin/vagas/${vaga.id}`}
                          className="text-zinc-700 hover:text-zinc-900"
                        >
                          {vaga.titulo}
                        </Link>
                      ) : (
                        <span className="text-zinc-400">Vaga removida</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-zinc-600">
                      <p>{c.whatsapp}</p>
                      <p className="text-xs text-zinc-400">{c.email}</p>
                    </td>
                    <td className="px-4 py-3 text-zinc-600">
                      <p className="text-xs">{c.experiencia || "—"}</p>
                      <p className="text-xs">{c.formacao || "—"}</p>
                      {c.linkedin && (
                        <a
                          href={c.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-zinc-500 hover:underline"
                        >
                          LinkedIn
                        </a>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {c.curriculoPath ? (
                        <a
                          href={`/admin/candidaturas/${c.id}/curriculo`}
                          className="text-zinc-900 hover:underline"
                        >
                          Baixar
                        </a>
                      ) : (
                        <span className="text-zinc-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-zinc-600">
                      {formatDate(c.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusForm id={c.id} status={c.status} />
                      <p className="mt-1 text-xs text-zinc-400">
                        {STATUS_LABELS[c.status]}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <ConfirmForm
                        action={excluirCandidatura}
                        confirmMessage={`Excluir a candidatura de "${c.nome}"?`}
                      >
                        <input type="hidden" name="id" value={c.id} />
                        <input type="hidden" name="vagaId" value={c.vagaId} />
                        <button
                          type="submit"
                          className="rounded-md border border-zinc-200 px-2.5 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                        >
                          Excluir
                        </button>
                      </ConfirmForm>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-zinc-300 bg-white p-12 text-center">
          <p className="text-zinc-600">
            Nenhuma candidatura recebida ainda.
          </p>
          <Link
            href="/admin/vagas/nova"
            className="mt-3 inline-block text-sm font-medium text-zinc-900 hover:underline"
          >
            Cadastrar uma vaga para receber candidaturas
          </Link>
        </div>
      )}
    </div>
  );
}
