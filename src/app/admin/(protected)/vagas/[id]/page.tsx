import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readDB, getVaga } from "@/lib/db";
import { excluirVaga } from "@/lib/actions";
import { formatDate, relativeTime } from "@/lib/format";
import { STATUS_LABELS } from "@/lib/types";
import StatusForm from "@/components/StatusForm";
import ConfirmForm from "@/components/ConfirmForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const vaga = getVaga(id);
  return { title: vaga ? vaga.titulo : "Vaga" };
}

export default async function AdminVagaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vaga = getVaga(id);
  if (!vaga) notFound();

  const db = readDB();
  const candidaturas = db.candidaturas
    .filter((c) => c.vagaId === vaga.id)
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div>
      <Link
        href="/admin"
                      className="text-sm font-medium text-zinc-900 hover:underline"
      >
        ← Voltar para o painel
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            {vaga.titulo}
          </h1>
          <p className="mt-1 text-zinc-500">
            {vaga.empresa} · {vaga.categoria} · {vaga.tipo} · {vaga.local}
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            {vaga.ativa ? "Vaga ativa" : "Vaga inativa"} · publicada{" "}
            {relativeTime(vaga.createdAt)}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/vagas/${vaga.id}`}
            target="_blank"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
          >
            Ver no site
          </Link>
          <Link
            href={`/admin/vagas/${vaga.id}/editar`}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
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
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50"
            >
              Excluir
            </button>
          </ConfirmForm>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-zinc-900">
          Candidaturas{" "}
          <span className="text-base font-normal text-zinc-400">
            ({candidaturas.length})
          </span>
        </h2>

        {candidaturas.length > 0 ? (
          <div className="mt-4 space-y-4">
            {candidaturas.map((c) => (
              <div
                key={c.id}
                className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-zinc-900">{c.nome}</p>
                    <div className="mt-1 space-y-0.5 text-sm text-zinc-500">
                      <p>💬 {c.whatsapp}</p>
                      <p>✉️ {c.email}</p>
                      <p>📍 {c.cidade}</p>
                      <p className="text-xs text-zinc-400">
                        Recebida em {formatDate(c.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
                      {STATUS_LABELS[c.status]}
                    </span>
                    <StatusForm id={c.id} status={c.status} />
                  </div>
                </div>
                <div className="mt-3 border-t border-zinc-100 pt-3">
                  {c.curriculoPath ? (
                    <a
                      href={`/admin/candidaturas/${c.id}/curriculo`}
        className="text-sm font-medium text-zinc-900 hover:underline"
                    >
                      📄 Baixar currículo
                      {c.curriculoNome ? ` (${c.curriculoNome})` : ""}
                    </a>
                  ) : (
                    <span className="text-sm text-zinc-400">
                      Sem currículo anexado
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-zinc-300 bg-white p-12 text-center">
            <p className="text-zinc-600">
              Nenhuma candidatura recebida para esta vaga ainda.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
