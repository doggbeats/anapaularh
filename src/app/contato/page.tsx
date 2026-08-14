import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a equipe da AP RH.",
};

export default function ContatoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
        Contato
      </h1>
      <p className="mt-4 leading-7 text-zinc-600">
        Tem dúvidas, sugestões ou quer divulgar vagas na AP RH? Fale com a
        nossa equipe.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <a
          href="mailto:contato@aprh.com.br"
          className="rounded-xl border border-zinc-200 bg-white p-6 text-center transition-colors hover:border-zinc-900"
        >
          <p className="text-2xl">✉️</p>
          <p className="mt-3 font-semibold text-zinc-900">E-mail</p>
          <p className="mt-1 text-sm text-zinc-500">contato@aprh.com.br</p>
        </a>
        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-zinc-200 bg-white p-6 text-center transition-colors hover:border-zinc-900"
        >
          <p className="text-2xl">💬</p>
          <p className="mt-3 font-semibold text-zinc-900">WhatsApp</p>
          <p className="mt-1 text-sm text-zinc-500">(11) 99999-9999</p>
        </a>
        <a
          href="https://maps.google.com/?q=Av.+Paulista+1000"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-zinc-200 bg-white p-6 text-center transition-colors hover:border-zinc-900"
        >
          <p className="text-2xl">📍</p>
          <p className="mt-3 font-semibold text-zinc-900">Endereço</p>
          <p className="mt-1 text-sm text-zinc-500">
            Av. Paulista, 1000 — São Paulo, SP
          </p>
        </a>
      </div>

      <div className="mt-10 rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-center">
        <p className="text-zinc-800">É uma empresa e quer publicar vagas?</p>
        <Link
          href="/admin"
          className="mt-3 inline-block rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
        >
          Acessar Área Administrativa
        </Link>
      </div>
    </div>
  );
}
