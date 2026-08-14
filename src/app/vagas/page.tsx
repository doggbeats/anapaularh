import type { Metadata } from "next";
import Link from "next/link";
import { readDB } from "@/lib/db";
import { CATEGORIAS } from "@/lib/types";
import { normalizeText } from "@/lib/format";
import VagaCard from "@/components/VagaCard";

export const metadata: Metadata = {
  title: "Vagas",
  description: "Explore todas as vagas de emprego disponíveis na AP RH.",
};

export default async function VagasPage({
  searchParams,
}: PageProps<"/vagas">) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const categoria =
    typeof params.categoria === "string" ? params.categoria : "";

  const db = readDB();
  const vagas = db.vagas
    .filter((v) => v.ativa)
    .filter((v) => {
      const termo = normalizeText(q);
      if (termo) {
        const alvo = normalizeText(
          `${v.titulo} ${v.empresa} ${v.descricao} ${v.categoria} ${v.local} ${v.salario}`,
        );
        if (!alvo.includes(termo)) return false;
      }
      if (categoria && v.categoria !== categoria) return false;
      return true;
    })
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Vagas disponíveis
        </h1>
        <p className="mt-2 text-zinc-600">
          {vagas.length} vaga{vagas.length === 1 ? "" : "s"} encontrada
          {vagas.length === 1 ? "" : "s"}
          {q && (
            <>
              {" "}
              para <span className="font-medium text-zinc-900">“{q}”</span>
            </>
          )}
        </p>
      </div>

      <form
        action="/vagas"
        method="get"
        className="mt-6 grid gap-3 sm:grid-cols-[1fr_220px_auto]"
      >
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Buscar por cargo, empresa ou palavra-chave..."
          className="w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-zinc-900 outline-none transition-colors focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
        />
        <select
          name="categoria"
          defaultValue={categoria}
          className="rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-zinc-900 outline-none transition-colors focus:border-zinc-900"
        >
          <option value="">Todas as categorias</option>
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
        >
          Filtrar
        </button>
      </form>

      {q || categoria ? (
        <Link href="/vagas" className="mt-4 inline-block text-sm text-zinc-900 hover:underline">
          Limpar filtros
        </Link>
      ) : null}

      {vagas.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vagas.map((vaga) => (
            <VagaCard key={vaga.id} vaga={vaga} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-xl border border-dashed border-zinc-300 bg-white p-12 text-center">
          <p className="text-zinc-600">
            Nenhuma vaga encontrada com os filtros atuais.
          </p>
          <Link
            href="/vagas"
            className="mt-3 inline-block text-sm font-medium text-zinc-900 hover:underline"
          >
            Limpar filtros
          </Link>
        </div>
      )}
    </div>
  );
}
