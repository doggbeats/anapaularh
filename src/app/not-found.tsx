import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center sm:px-6">
      <p className="text-6xl font-bold text-zinc-900">404</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900">
        Página não encontrada
      </h1>
      <p className="mt-2 text-zinc-500">
        A página que você procura não existe ou foi movida.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
