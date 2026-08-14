import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a AP RH e como conectamos talentos e empresas.",
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
        Sobre a Ana Paula RH
      </h1>
      <p className="mt-4 text-lg font-semibold text-zinc-800">
        Conectando talentos a grandes oportunidades.
      </p>
      <div className="mt-6 space-y-4 leading-7 text-zinc-600">
        <p>
          Sou Ana Paula, profissional de Recursos Humanos e fundadora da Ana
          Paula RH, especializada em recrutamento e seleção, triagem de
          currículos e divulgação de oportunidades.
        </p>
        <p>
          Meu trabalho nasceu do propósito de aproximar empresas de
          profissionais que realmente tenham potencial para fazer parte de
          suas equipes, tornando o processo de contratação mais organizado,
          estratégico e humanizado.
        </p>
        <p>
          Através da Ana Paula RH, ofereço às empresas suporte na divulgação
          de vagas, atração e triagem de candidatos e condução de processos
          seletivos.
        </p>
        <p>
          Para os candidatos, disponibilizo oportunidades e um espaço para
          cadastro no nosso banco de talentos, facilitando o acesso a novas
          possibilidades profissionais.
        </p>
        <p>
          Meu objetivo é conectar as necessidades das empresas aos talentos
          certos, com profissionalismo, organização e proximidade em cada
          etapa do processo.
        </p>
      </div>

      <h2 className="mt-12 text-2xl font-bold tracking-tight text-zinc-900">
        O que fazemos
      </h2>
      <ul className="mt-5 space-y-3">
        {[
          "Recrutamento & Seleção",
          "Triagem de Currículos",
          "Divulgação de Vagas",
          "Banco de Talentos",
          "Atração de Candidatos",
        ].map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 font-medium text-zinc-800 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 shrink-0 text-zinc-900"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-10 rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-center">
        <p className="text-zinc-800">
          Pronto para dar o próximo passo na sua carreira?
        </p>
        <Link
          href="/vagas"
          className="mt-3 inline-block rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
        >
          Ver vagas disponíveis
        </Link>
      </div>
    </div>
  );
}
