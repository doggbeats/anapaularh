import Link from "next/link";
import type { Vaga } from "@/lib/types";
import { relativeTime } from "@/lib/format";

export default function VagaCard({ vaga }: { vaga: Vaga }) {
  return (
    <article className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-zinc-900">
          <Link href={`/vagas/${vaga.id}`} className="hover:text-zinc-900">
            {vaga.titulo}
          </Link>
        </h3>
        <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700">
          {vaga.categoria}
        </span>
      </div>
      <p className="mt-1 text-sm font-medium text-zinc-700">{vaga.empresa}</p>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-500">
        <li className="flex items-center gap-1.5">
          <span>📍</span>
          {vaga.local}
        </li>
        <li className="flex items-center gap-1.5">
          <span>💼</span>
          {vaga.tipo}
        </li>
        {vaga.salario && (
          <li className="flex items-center gap-1.5">
            <span>💰</span>
            {vaga.salario}
          </li>
        )}
      </ul>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-500">
        {vaga.descricao}
      </p>
      <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4">
        <span className="text-xs text-zinc-400">
          Publicado {relativeTime(vaga.createdAt)}
        </span>
        <div className="flex gap-2">
          <Link
            href={`/vagas/${vaga.id}`}
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50"
          >
            Ver vaga
          </Link>
          <Link
            href={`/vagas/${vaga.id}/candidatar`}
            className="rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
          >
            Candidatar-se
          </Link>
        </div>
      </div>
    </article>
  );
}
