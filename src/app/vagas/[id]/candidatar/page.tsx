import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readDB } from "@/lib/db";
import CandidaturaForm from "@/components/CandidaturaForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/vagas/[id]/candidatar">): Promise<Metadata> {
  const { id } = await params;
  const vaga = readDB().vagas.find((v) => v.id === id && v.ativa);
  return {
    title: vaga ? `Candidatar-se — ${vaga.titulo}` : "Candidatar-se",
  };
}

export default async function CandidatarPage({
  params,
}: PageProps<"/vagas/[id]/candidatar">) {
  const { id } = await params;
  const vaga = readDB().vagas.find((v) => v.id === id && v.ativa);
  if (!vaga) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <Link
        href={`/vagas/${vaga.id}`}
        className="text-sm font-medium text-zinc-900 hover:underline"
      >
        ← Voltar para a vaga
      </Link>

      <div className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Candidatura
        </h1>
        <div className="mt-3 rounded-lg border border-zinc-200 bg-white p-4">
          <p className="font-semibold text-zinc-900">{vaga.titulo}</p>
          <p className="mt-0.5 text-sm text-zinc-500">
            {vaga.empresa} · {vaga.local} · {vaga.tipo}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 sm:p-8">
        <p className="text-sm text-zinc-500">
          Preencha os dados abaixo para enviar sua candidatura. Os campos
          marcados com * são obrigatórios.
        </p>
        <CandidaturaForm vagaId={vaga.id} />
      </div>
    </div>
  );
}
