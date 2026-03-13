import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import DevDialKit from "@/components/DevDialKit";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.variable}>
        {children}
        <DevDialKit />
      </body>
    </html>
  );
}
