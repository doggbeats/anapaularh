"use client";

import { useActionState } from "react";
import { candidatar, type ActionState } from "@/lib/actions";

export default function CandidaturaForm({ vagaId }: { vagaId: string }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(
    candidatar,
    { error: undefined },
  );

  const inputClass =
    "w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 outline-none transition-colors focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200";

  return (
    <form action={action} className="mt-6 space-y-4">
      <input type="hidden" name="vagaId" value={vagaId} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className="mb-1 block text-sm font-medium text-zinc-700">
            Nome completo *
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            required
            className={inputClass}
            placeholder="Seu nome"
          />
        </div>
        <div>
          <label htmlFor="cidade" className="mb-1 block text-sm font-medium text-zinc-700">
            Cidade *
          </label>
          <input
            id="cidade"
            name="cidade"
            type="text"
            required
            className={inputClass}
            placeholder="Cidade / UF"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="whatsapp" className="mb-1 block text-sm font-medium text-zinc-700">
            WhatsApp *
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            required
            className={inputClass}
            placeholder="(11) 99999-9999"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-zinc-700">
            E-mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="voce@email.com"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="experiencia" className="mb-1 block text-sm font-medium text-zinc-700">
            Experiência profissional
          </label>
          <input
            id="experiencia"
            name="experiencia"
            type="text"
            className={inputClass}
            placeholder="Ex.: 3 anos em desenvolvimento front-end"
          />
        </div>
        <div>
          <label htmlFor="formacao" className="mb-1 block text-sm font-medium text-zinc-700">
            Formação acadêmica
          </label>
          <input
            id="formacao"
            name="formacao"
            type="text"
            className={inputClass}
            placeholder="Ex.: Superior em Administração"
          />
        </div>
      </div>

      <div>
        <label htmlFor="linkedin" className="mb-1 block text-sm font-medium text-zinc-700">
          LinkedIn
        </label>
        <input
          id="linkedin"
          name="linkedin"
          type="url"
          className={inputClass}
          placeholder="https://linkedin.com/in/seu-perfil"
        />
      </div>

      <div>
        <label htmlFor="curriculo" className="mb-1 block text-sm font-medium text-zinc-700">
          Currículo (PDF, DOC ou DOCX — máx. 5 MB) *
        </label>
        <input
          id="curriculo"
          name="curriculo"
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          required
          className={inputClass}
        />
      </div>

      {state?.error && (
        <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Enviando candidatura..." : "Enviar candidatura"}
      </button>
    </form>
  );
}
