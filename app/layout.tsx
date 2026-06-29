import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "REA docente de Programación EBI",
  description: "Recurso Educativo Abierto para planificar, adaptar y exportar propuestas de Programación para 7.º, 8.º y 9.º EBI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
