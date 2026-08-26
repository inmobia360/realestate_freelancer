import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "RealEstate Connect | Hub & Marketing Platform — SaaS B2B Inmobiliario",
  description: "Plataforma SaaS B2B para agencias, brokers e inversores: generación multicanal de contenidos con IA, modelado de Cap Rate / Cash-Flow y scoring predictivo de compradores.",
  keywords: ["realestate connect", "proptech saas", "ia inmobiliaria", "marketing inmobiliario b2b", "lead scoring", "cap rate calculator"],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-theme="dark" suppressHydrationWarning className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F8FAFC] dark:bg-[#080b18] text-[#0A192F] dark:text-[#F8FAFC] selection:bg-[#7B2CBF] selection:text-white">
        <ThemeProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
