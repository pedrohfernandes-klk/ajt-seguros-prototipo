import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AJT Seguros — Proteção com presença",
  description: "Mediação de seguros para particulares e empresas em Alcochete. Aconselhamento próximo desde 2002.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt"><body>{children}</body></html>;
}
