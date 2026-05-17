import type { Metadata } from "next";
import { Inter, Noto_Sans_Tamil, Source_Serif_4 } from "next/font/google";
import AppNavbar from "@/components/layout/AppNavbar";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const tamil = Noto_Sans_Tamil({
  variable: "--font-tamil",
  subsets: ["tamil", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "தமிழி AI — Tamil History Learning",
  description:
    "Ask questions about Tamil history with AI-grounded answers from archived sources.",
  icons: {
    icon: "/heritage-mark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${tamil.variable} ${sourceSerif.variable} h-full bg-[#faf7f2]`}
    >
      <body className="flex min-h-[100dvh] flex-col bg-[#faf7f2] text-stone-900 antialiased">
        <LanguageProvider>
          <AppNavbar />
          <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col bg-[#faf7f2]">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
