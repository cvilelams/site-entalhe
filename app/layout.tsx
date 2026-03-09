import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant", weight: ["300", "400", "500"] });
const notoSerifJp = Noto_Serif_JP({ subsets: ["latin"], variable: "--font-noto-jp", weight: ["300", "400"] });

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${cormorant.variable} ${notoSerifJp.variable}`}>{children}</body>
    </html>
  );
}
