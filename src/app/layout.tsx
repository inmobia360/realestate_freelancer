import type { Metadata } from "next";
import "./globals.css";
import { DesignAgent } from "@/app/agents/DesignAgent";


export const metadata: Metadata = {
  title: "Inmobia 360 | Tu agencia inmobiliaria en el bolsillo",
  description: "Inmobia 360 ayuda a agentes inmobiliarios a preparar tareas y documentos para que puedan revisarlos y decidir desde el móvil.",
  keywords: ["Inmobia 360", "agencia inmobiliaria digital", "agentes inmobiliarios", "asistentes inmobiliarios"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-theme="dark" suppressHydrationWarning className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F8FAFC] dark:bg-[#080b18] text-[#0A192F] dark:text-[#F8FAFC] selection:bg-[#7B2CBF] selection:text-white">
        <DesignAgent>{children}</DesignAgent>
      </body>
    </html>
  );
}
