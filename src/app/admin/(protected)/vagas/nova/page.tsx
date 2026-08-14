import type { Metadata } from "next";
import { criarVaga } from "@/lib/actions";
import VagaForm from "@/components/VagaForm";

export const metadata: Metadata = {
  title: "Cadastrar vaga",
};

export default function NovaVagaPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
        Cadastrar vaga
      </h1>
      <p className="mt-1 text-zinc-500">
        Preencha os dados abaixo para publicar uma nova vaga no site.
      </p>
      <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 sm:p-8">
        <VagaForm action={criarVaga} submitLabel="Cadastrar vaga" />
      </div>
    </div>
  );
}
