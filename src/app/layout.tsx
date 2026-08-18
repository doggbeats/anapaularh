import type { Metadata } from "next";
import Script from "next/script";
import { Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccessibilityWidget from "@/components/AccessibilityWidget";

const A11Y_RESTORE_SCRIPT = `(function(){try{var s=JSON.parse(localStorage.getItem("a11y-settings")||"null");if(s&&s.scale)document.documentElement.style.setProperty("--a11y-scale",String(s.scale));}catch(e){}})();`;

const lato = Lato({
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-lato",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ana Paula RH | Vagas & Oportunidades",
    template: "%s | Ana Paula RH",
  },
  description:
    "Plataforma de recrutamento e seleção: vagas de emprego, candidaturas online e gestão para empresas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${lato.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-zinc-50">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <AccessibilityWidget />
        <Script id="a11y-restore" strategy="beforeInteractive">
          {A11Y_RESTORE_SCRIPT}
        </Script>
      </body>
    </html>
  );
}
