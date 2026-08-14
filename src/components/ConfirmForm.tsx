"use client";

import type { FormEvent } from "react";

export default function ConfirmForm({
  action,
  confirmMessage,
  children,
}: {
  action: (formData: FormData) => void | Promise<void>;
  confirmMessage: string;
  children: React.ReactNode;
}) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (!window.confirm(confirmMessage)) {
      e.preventDefault();
    }
  }

  return (
    <form action={action} onSubmit={handleSubmit} className="inline-block">
      {children}
    </form>
  );
}
