import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readDB } from "@/lib/db";
import { formatDate, relativeTime } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/vagas/[id]">): Promise<Metadata> {
  const { id } = await params;
  const vaga = (await readDB()).vagas.find((v) => v.id === id && v.ativa);
  if (!vaga) return { title: "Vaga não encontrada" };
  return {
    title: `${vaga.titulo} — ${vaga.empresa}`,
    description: vaga.descricao,
  };
}

export default async function VagaDetalhePage({
  params,
  searchParams,
}: PageProps<"/vagas/[id]">) {
  const { id } = await params;
  const query = await searchParams;
  const candidaturaSucesso = query.candidatura === "sucesso";

  const vaga = (await readDB()).vagas.find((v) => v.id === id && v.ativa);
  if (!vaga) notFound();

  const requisitos = vaga.requisitos
    .split("\n")
    .map((r) => r.replace(/^[-*•]\s*/, "").trim())
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/vagas"
        className="text-sm font-medium text-zinc-900 hover:underline"
      >
        ← Voltar para as vagas
      </Link>

      {candidaturaSucesso && (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-800">
          Candidatura enviada com sucesso! Vamos analisar e entraremos em
          contato em breve.
        </div>
      )}

      <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700">
            {vaga.categoria}
          </span>
          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700">
            {vaga.tipo}
          </span>
          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700">
            {vaga.modalidade}
          </span>
          {!vaga.ativa && (
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700">
              Encerrada
            </span>
          )}
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900">
          {vaga.titulo}
        </h1>
        <p className="mt-1 text-lg font-medium text-zinc-600">
          {vaga.empresa}
        </p>

        <dl className="mt-6 grid gap-4 rounded-lg bg-zinc-50 p-4 text-sm sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <dt className="text-zinc-400">📍 Local</dt>
            <dd className="font-medium text-zinc-800">{vaga.local}</dd>
          </div>
          <div className="flex items-center gap-3">
            <dt className="text-zinc-400">💰 Remuneração</dt>
            <dd className="font-medium text-zinc-800">
              {vaga.salario || "A combinar"}
            </dd>
          </div>
          <div className="flex items-center gap-3">
            <dt className="text-zinc-400">📅 Publicada em</dt>
            <dd className="font-medium text-zinc-800">
              {formatDate(vaga.createdAt)} ({relativeTime(vaga.createdAt)})
            </dd>
          </div>
        </dl>

        <h2 className="mt-8 text-lg font-semibold text-zinc-900">
          Descrição da vaga
        </h2>
        <p className="mt-2 whitespace-pre-line leading-7 text-zinc-600">
          {vaga.descricao}
        </p>

        {requisitos.length > 0 && (
          <>
            <h2 className="mt-8 text-lg font-semibold text-zinc-900">
              Requisitos
            </h2>
            <ul className="mt-2 space-y-2">
              {requisitos.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-zinc-600">
                  <span className="mt-0.5 text-zinc-900">•</span>
                  {req}
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-10 rounded-xl border border-zinc-200 bg-zinc-50 p-6">
          <p className="text-zinc-800">
            Gostou desta oportunidade? Candidate-se agora mesmo e envie seu
            currículo em poucos minutos.
          </p>
          <Link
            href={`/vagas/${vaga.id}/candidatar`}
            className="mt-4 inline-block rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
          >
            Candidatar-se
          </Link>
        </div>
      </div>
    </div>
  );
}
