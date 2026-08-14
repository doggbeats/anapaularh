import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Login administrativo",
};

export default async function AdminLoginPage() {
  if (await isAuthenticated()) {
    redirect("/admin");
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-20 sm:px-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <Image
          src="/logo.jpeg"
          alt="AP RH"
          width={56}
          height={56}
          className="h-14 w-14 rounded-xl object-cover"
        />
        <p className="mt-6 text-sm text-zinc-500">
          Acesse com suas credenciais para gerenciar vagas e candidaturas.
        </p>
        <LoginForm />
      </div>
      <p className="mt-6 text-center text-sm text-zinc-400">
        Voltar para o{" "}
        <Link href="/" className="font-medium text-zinc-600 hover:underline">
          site
        </Link>
      </p>
    </div>
  );
}
