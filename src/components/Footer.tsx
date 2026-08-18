import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Image
            src="/logo.jpeg"
            alt="AP RH"
            width={48}
            height={48}
            className="h-12 w-12 rounded-lg object-cover"
          />
          <p className="mt-2 text-sm text-zinc-500">
            Conectando talentos às melhores oportunidades de emprego.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-900">Navegação</p>
          <ul className="mt-2 space-y-1.5 text-sm text-zinc-500">
            <li>
              <Link href="/vagas" className="hover:text-zinc-900">
                Vagas disponíveis
              </Link>
            </li>
            <li>
              <Link href="/sobre" className="hover:text-zinc-900">
                Sobre nós
              </Link>
            </li>
            <li>
              <Link href="/contato" className="hover:text-zinc-900">
                Contato
              </Link>
            </li>
            <li>
              <Link href="/privacidade" className="hover:text-zinc-900">
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-900">Empresas</p>
          <ul className="mt-2 space-y-1.5 text-sm text-zinc-500">
            <li>
              <Link href="/admin" className="hover:text-zinc-900">
                Área Administrativa
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-100 py-4 text-center text-xs text-zinc-400">
        © {new Date().getFullYear()} AP RH. Todos os direitos reservados.
      </div>
    </footer>
  );
}
