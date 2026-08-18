import type { Metadata } from "next";
import Link from "next/link";
import { readDB } from "@/lib/db";
import { excluirVaga } from "@/lib/actions";
import { formatDate } from "@/lib/format";
import ConfirmForm from "@/components/ConfirmForm";

export const metadata: Metadata = {
  title: "Painel administrativo",
};

export default async function AdminDashboardPage() {
  const db = await readDB();
  const vagas = [...db.vagas].sort((a, b) => b.createdAt - a.createdAt);
  const candidaturas = db.candidaturas;

  const totalVagas = vagas.length;
  const vagasAtivas = vagas.filter((v) => v.ativa).length;
  const totalCandidaturas = candidaturas.length;
  const candidaturasNovas = candidaturas.filter(
    (c) => c.status === "nova",
  ).length;

  const stats = [
    { label: "Vagas cadastradas", value: totalVagas },
    { label: "Vagas ativas", value: vagasAtivas },
    { label: "Candidaturas", value: totalCandidaturas },
    { label: "Candidaturas novas", value: candidaturasNovas },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Painel administrativo
          </h1>
          <p className="mt-1 text-zinc-500">
            Gerencie suas vagas e acompanhe as candidaturas.
          </p>
        </div>
        <Link
          href="/admin/vagas/nova"
          className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
        >
          + Cadastrar vaga
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-zinc-200 bg-white p-5"
          >
            <p className="text-3xl font-bold text-zinc-900">{s.value}</p>
            <p className="mt-1 text-sm text-zinc-500">{s.label}</p>
          </div>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-zinc-900">Vagas</h2>
        {vagas.length > 0 ? (
          <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-400">
                  <th className="px-4 py-3 font-medium">Vaga</th>
                  <th className="px-4 py-3 font-medium">Categoria</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Candidatos</th>
                  <th className="px-4 py-3 font-medium">Publicada em</th>
                  <th className="px-4 py-3 text-right font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {vagas.map((vaga) => {
                  const count = candidaturas.filter(
                    (c) => c.vagaId === vaga.id,
                  ).length;
                  return (
                    <tr key={vaga.id} className="hover:bg-zinc-50">
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/vagas/${vaga.id}`}
                          className="font-medium text-zinc-900 hover:text-zinc-900"
                        >
                          {vaga.titulo}
                        </Link>
                        <p className="text-xs text-zinc-400">{vaga.empresa}</p>
                      </td>
                      <td className="px-4 py-3 text-zinc-600">
                        {vaga.categoria}
                      </td>
                      <td className="px-4 py-3">
                        {vaga.ativa ? (
                          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700">
                            Ativa
                          </span>
                        ) : (
                          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600">
                            Inativa
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-zinc-600">{count}</td>
                      <td className="px-4 py-3 text-zinc-600">
                        {formatDate(vaga.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/vagas/${vaga.id}`}
                            className="rounded-md border border-zinc-300 px-2.5 py-1 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
                          >
                            Ver
                          </Link>
                          <Link
                            href={`/admin/vagas/${vaga.id}/editar`}
                            className="rounded-md border border-zinc-300 px-2.5 py-1 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
                          >
                            Editar
                          </Link>
                          <ConfirmForm
                            action={excluirVaga}
                            confirmMessage={`Excluir a vaga "${vaga.titulo}" e todas as suas candidaturas?`}
                          >
                            <input type="hidden" name="id" value={vaga.id} />
                            <button
                              type="submit"
                              className="rounded-md border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50"
                            >
                              Excluir
                            </button>
                          </ConfirmForm>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-zinc-300 bg-white p-12 text-center">
            <p className="text-zinc-600">Nenhuma vaga cadastrada ainda.</p>
            <Link
              href="/admin/vagas/nova"
              className="mt-3 inline-block text-sm font-medium text-zinc-900 hover:underline"
            >
              Cadastrar a primeira vaga
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
