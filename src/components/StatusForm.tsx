"use client";

import { useRef } from "react";
import { atualizarStatusCandidatura } from "@/lib/actions";
import { STATUS_LABELS, type StatusCandidatura } from "@/lib/types";

export default function StatusForm({
  id,
  status,
}: {
  id: string;
  status: StatusCandidatura;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={atualizarStatusCandidatura}
      onChange={() => formRef.current?.requestSubmit()}
      className="inline-block"
    >
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        className="rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 text-sm text-zinc-700 outline-none transition-colors focus:border-zinc-900"
      >
        {(Object.keys(STATUS_LABELS) as StatusCandidatura[]).map((value) => (
          <option key={value} value={value}>
            {STATUS_LABELS[value]}
          </option>
        ))}
      </select>
    </form>
  );
}
