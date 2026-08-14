"use client";

import { useActionState } from "react";
import { CATEGORIAS, type TipoVaga, type Vaga } from "@/lib/types";
import type { ActionState } from "@/lib/actions";

const TIPOS: TipoVaga[] = ["CLT", "Estágio", "PJ", "Temporário", "Freelance"];

const inputClass =
  "w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 outline-none transition-colors focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200";

export default function VagaForm({
  action,
  vaga,
  submitLabel = "Salvar vaga",
}: {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  vaga?: Vaga;
  submitLabel?: string;
}) {
  const [state, submit, pending] = useActionState<ActionState, FormData>(
    action,
    { error: undefined },
  );

  return (
    <form action={submit} className="mt-6 space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="titulo" className="mb-1 block text-sm font-medium text-zinc-700">
            Título da vaga *
          </label>
          <input
            id="titulo"
            name="titulo"
            type="text"
            required
            defaultValue={vaga?.titulo}
            className={inputClass}
            placeholder="Ex.: Desenvolvedor(a) Front-end"
          />
        </div>
        <div>
          <label htmlFor="empresa" className="mb-1 block text-sm font-medium text-zinc-700">
            Empresa *
          </label>
          <input
            id="empresa"
            name="empresa"
            type="text"
            required
            defaultValue={vaga?.empresa}
            className={inputClass}
            placeholder="Nome da empresa"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="categoria" className="mb-1 block text-sm font-medium text-zinc-700">
            Categoria *
          </label>
          <select
            id="categoria"
            name="categoria"
            required
            defaultValue={vaga?.categoria ?? CATEGORIAS[0]}
            className={inputClass}
          >
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tipo" className="mb-1 block text-sm font-medium text-zinc-700">
            Tipo de contratação *
          </label>
          <select
            id="tipo"
            name="tipo"
            required
            defaultValue={vaga?.tipo ?? "CLT"}
            className={inputClass}
          >
            {TIPOS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="local" className="mb-1 block text-sm font-medium text-zinc-700">
            Local *
          </label>
          <input
            id="local"
            name="local"
            type="text"
            required
            defaultValue={vaga?.local}
            className={inputClass}
            placeholder="Ex.: São Paulo - SP ou Remoto"
          />
        </div>
        <div>
          <label htmlFor="salario" className="mb-1 block text-sm font-medium text-zinc-700">
            Salário / remuneração
          </label>
          <input
            id="salario"
            name="salario"
            type="text"
            defaultValue={vaga?.salario}
            className={inputClass}
            placeholder="Ex.: R$ 4.000,00 ou a combinar"
          />
        </div>
      </div>

      <div>
        <label htmlFor="descricao" className="mb-1 block text-sm font-medium text-zinc-700">
          Descrição da vaga *
        </label>
        <textarea
          id="descricao"
          name="descricao"
          required
          rows={4}
          defaultValue={vaga?.descricao}
          className={inputClass}
          placeholder="Descreva as responsabilidades e o contexto da vaga..."
        />
      </div>

      <div>
        <label htmlFor="requisitos" className="mb-1 block text-sm font-medium text-zinc-700">
          Requisitos (um por linha) *
        </label>
        <textarea
          id="requisitos"
          name="requisitos"
          required
          rows={5}
          defaultValue={vaga?.requisitos}
          className={inputClass}
          placeholder={"- Experiência com React\n- Conhecimento em TypeScript"}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-zinc-700">
        <input
          type="checkbox"
          name="ativa"
          defaultChecked={vaga ? vaga.ativa : true}
          className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500"
        />
        Vaga ativa (visível no site)
      </label>

      {state?.error && (
        <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
          {state.error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Salvando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
