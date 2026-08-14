import Link from "next/link";
import Image from "next/image";
import { logout } from "@/lib/actions";

export default function AdminNav() {
  const linkClass =
    "rounded-md px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-white/60 hover:text-zinc-900";

  return (
    <nav className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm">
      <div className="flex flex-wrap items-center gap-1">
        <Link href="/admin" className="mr-2 flex items-center gap-2">
          <Image
            src="/logo.jpeg"
            alt="AP RH"
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg object-cover"
          />
        </Link>
        <Link href="/admin" className={linkClass}>
          Painel
        </Link>
        <Link href="/admin/vagas/nova" className={linkClass}>
          + Nova vaga
        </Link>
        <Link href="/admin/candidatos" className={linkClass}>
          Candidatos
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="rounded-md px-3 py-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
        >
          Ver site
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-md bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-200"
          >
            Sair
          </button>
        </form>
      </div>
    </nav>
  );
}
