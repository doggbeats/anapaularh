import Link from "next/link";
import { readDB } from "@/lib/db";
import { CATEGORIAS } from "@/lib/types";
import VagaCard from "@/components/VagaCard";

export const dynamic = "force-dynamic";

export default function Home() {
  const db = readDB();
  const vagasAtivas = db.vagas
    .filter((v) => v.ativa)
    .sort((a, b) => b.createdAt - a.createdAt);
  const destaques = vagasAtivas.slice(0, 6);

  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-zinc-100 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-zinc-100 blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 top-10 h-40 w-40 rounded-full bg-zinc-100 blur-2xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-2xl">
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl">
              Ana Paula{" "}
              <span className="text-zinc-500">RH</span>
            </h1>
            <p className="mt-4 text-xl font-semibold text-zinc-800 sm:text-2xl">
              Vagas & Oportunidades
            </p>
            <p className="mt-3 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg">
              Conectamos talentos às melhores oportunidades. Explore vagas,
              candidate-se em minutos e dê o próximo passo na sua carreira.
            </p>
          </div>

          <form
            action="/vagas"
            method="get"
            className="mt-10 flex max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl ring-1 ring-black/5"
          >
            <input
              type="search"
              name="q"
              placeholder="Buscar por cargo, empresa ou palavra-chave..."
              className="w-full px-4 py-4 text-zinc-900 outline-none placeholder:text-zinc-400 sm:px-5"
            />
            <button
              type="submit"
              className="shrink-0 bg-zinc-900 px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-zinc-700 sm:px-8"
            >
              Buscar vagas
            </button>
          </form>

          <div className="mt-7 flex flex-wrap items-center gap-2 text-sm">
            <span className="font-medium text-zinc-600">Categorias:</span>
            {CATEGORIAS.slice(0, 5).map((c) => (
              <Link
                key={c}
                href={`/vagas?categoria=${encodeURIComponent(c)}`}
                className="rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 font-medium text-zinc-800 transition-colors hover:border-zinc-900 hover:text-zinc-900"
              >
                {c}
              </Link>
            ))}
            <Link
              href="/vagas"
              className="px-2 py-1 font-semibold text-zinc-900 hover:underline"
            >
              Ver todas →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
              Vagas em destaque
            </h2>
            <p className="mt-1 text-zinc-500">
              {vagasAtivas.length > 0
                ? `${vagasAtivas.length} vaga${vagasAtivas.length === 1 ? "" : "s"} disponíve${vagasAtivas.length === 1 ? "l" : "is"}`
                : "Nenhuma vaga disponível no momento"}
            </p>
          </div>
          <Link
            href="/vagas"
            className="hidden shrink-0 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 sm:block"
          >
            Ver todas as vagas
          </Link>
        </div>

        {destaques.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destaques.map((vaga) => (
              <VagaCard key={vaga.id} vaga={vaga} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-dashed border-zinc-300 bg-white p-12 text-center">
            <p className="text-zinc-600">
              Nenhuma vaga publicada ainda. Volte em breve!
            </p>
          </div>
        )}
      </section>

      <section className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
            Explore por categoria
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {CATEGORIAS.map((categoria) => {
              const count = vagasAtivas.filter(
                (v) => v.categoria === categoria,
              ).length;
              return (
                <Link
                  key={categoria}
                  href={`/vagas?categoria=${encodeURIComponent(categoria)}`}
                  className="group rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition-colors hover:border-zinc-900 hover:bg-white"
                >
                  <p className="font-semibold text-zinc-800 group-hover:text-zinc-900">
                    {categoria}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">
                    {count} vaga{count === 1 ? "" : "s"}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-zinc-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
            Sua vaga merece os melhores talentos
          </h2>
          <p className="max-w-xl text-zinc-600">
            Publique sua oportunidade e receba candidaturas organizadas em
            minutos. Deixe que a Ana Paula RH conecta você ao candidato certo.
          </p>
        </div>
      </section>
    </>
  );
}
