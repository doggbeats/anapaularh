"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "a11y-settings";

const READABLE_TAGS = new Set([
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "P",
  "A",
  "LI",
  "SPAN",
  "LABEL",
  "BUTTON",
  "BLOCKQUOTE",
  "DT",
  "DD",
  "TH",
  "TD",
]);

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [readHover, setReadHover] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { scale?: number };
        if (typeof saved.scale === "number") {
          setScale(saved.scale);
          document.documentElement.style.setProperty("--a11y-scale", String(saved.scale));
        }
      }
    } catch {
      // armazenamento indisponível
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--a11y-scale", String(scale));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ scale }));
    } catch {
      // armazenamento indisponível
    }
  }, [scale]);

  useEffect(() => {
    const cancelReading = () => {
      document
        .querySelectorAll(".a11y-reading")
        .forEach((el) => el.classList.remove("a11y-reading"));
      window.speechSynthesis?.cancel();
    };

    if (!readHover) {
      cancelReading();
      return;
    }

    const findReadable = (el: HTMLElement | null): HTMLElement | null => {
      let node: HTMLElement | null = el;
      let depth = 0;
      while (node && depth < 5) {
        if (
          READABLE_TAGS.has(node.tagName) &&
          (node.innerText ?? "").trim().length > 1
        ) {
          return node;
        }
        node = node.parentElement;
        depth += 1;
      }
      return null;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || target.closest(".a11y-widget")) return;

      const el = findReadable(target);
      if (!el || el.classList.contains("a11y-reading")) return;

      cancelReading();

      const text = (el.innerText ?? "").trim();
      if (!text) return;

      el.classList.add("a11y-reading");

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "pt-BR";
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const related = e.relatedTarget as HTMLElement | null;
      if (related && target.contains(related)) return;
      cancelReading();
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelReading();
    };
  }, [readHover]);

  const changeScale = (delta: number) => {
    setScale((prev) =>
      Math.min(1.6, Math.max(0.85, Math.round((prev + delta) * 10) / 10)),
    );
  };

  const reset = () => {
    setScale(1);
    setReadHover(false);
  };

  const scalePercent = Math.round(scale * 100);

  return (
    <div className="a11y-widget fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-label="Opções de acessibilidade"
            className="relative z-50 w-72 rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-zinc-900">Acessibilidade</p>
              <button
                type="button"
                aria-label="Fechar acessibilidade"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Tamanho do texto
              </p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Diminuir texto"
                  onClick={() => changeScale(-0.1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 text-xs font-bold text-zinc-800 transition-colors hover:bg-zinc-100"
                >
                  A−
                </button>
                <span className="flex-1 text-center text-sm font-semibold text-zinc-700">
                  {scalePercent}%
                </span>
                <button
                  type="button"
                  aria-label="Aumentar texto"
                  onClick={() => changeScale(0.1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 text-xs font-bold text-zinc-800 transition-colors hover:bg-zinc-100"
                >
                  A+
                </button>
              </div>
            </div>

            <button
              type="button"
              aria-pressed={readHover}
              onClick={() => setReadHover((v) => !v)}
              className={`mt-4 flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                readHover
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-300 text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              Ler página ao passar o mouse
              <span
                className={`ml-2 inline-block h-3.5 w-3.5 rounded-full border ${
                  readHover ? "border-white bg-white" : "border-zinc-400 bg-transparent"
                }`}
              />
            </button>

            <button
              type="button"
              onClick={reset}
              className="mt-4 w-full rounded-lg bg-zinc-100 px-3 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-200"
            >
              Restaurar padrão
            </button>
          </div>
        </>
      )}

      <button
        type="button"
        aria-label={
          open ? "Fechar opções de acessibilidade" : "Abrir opções de acessibilidade"
        }
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white shadow-lg transition-colors hover:bg-zinc-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 7h.01" />
          <path d="M7.5 11.5h9" />
          <path d="M12 11.5V17" />
        </svg>
      </button>
    </div>
  );
}
