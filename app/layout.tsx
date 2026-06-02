import type { Metadata } from "next";
import "./globals.css";
import { roboto } from "./ui/fonts";

export const metadata: Metadata = {
  title:{
    template: '%s | Escala App',
    default: 'Escala App'
  },
  description: "Sistema de Escala para Escola Sabatina Jovem",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={roboto.className}>
      <body>{children}</body>
    </html>
  );
}
