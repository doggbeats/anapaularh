import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVaga } from "@/lib/db";
import { atualizarVaga } from "@/lib/actions";
import VagaForm from "@/components/VagaForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const vaga = await getVaga(id);
  return { title: vaga ? `Editar — ${vaga.titulo}` : "Editar vaga" };
}

export default async function EditarVagaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vaga = await getVaga(id);
  if (!vaga) notFound();

  const action = atualizarVaga.bind(null, vaga.id);

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
        Editar vaga
      </h1>
      <p className="mt-1 text-zinc-500">
        Edite as informações da vaga e salve as alterações.
      </p>
      <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 sm:p-8">
        <VagaForm action={action} vaga={vaga} submitLabel="Salvar alterações" />
      </div>
    </div>
  );
}
