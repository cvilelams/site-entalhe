import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import DevDialKit from "@/components/DevDialKit";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  metadataBase: new URL("https://curso.oficinacigarra.com.br"),
  verification: {
    google: "zP4ekllI6MFqgZsZlQ2EeFP-BGzsiey4hrlxoDE2Goo",
  },
  alternates: {
    canonical: "/",
  },
  keywords: [
    "curso de entalhe",
    "entalhe em madeira",
    "entalhe com faca",
    "curso entalhe online",
    "oficina cigarra",
    "aprender entalhe",
    "escultura em madeira",
    "artesanato em madeira",
    "whittling",
    "curso de marcenaria",
  ],
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "https://curso.oficinacigarra.com.br",
    siteName: "Oficina Cigarra",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Curso de Entalhe em Madeira com Faca — Oficina Cigarra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Curso de Entalhe em Madeira com Faca",
  description:
    "Aprenda a entalhar em madeira com faca do zero. Mais de 30 aulas online com Mayra e Simone da Oficina Cigarra.",
  url: "https://curso.oficinacigarra.com.br",
  provider: {
    "@type": "Organization",
    name: "Oficina Cigarra",
    url: "https://curso.oficinacigarra.com.br",
    sameAs: ["https://www.instagram.com/oficinacigarra"],
  },
  hasCourseInstance: [
    {
      "@type": "CourseInstance",
      courseMode: "online",
      inLanguage: "pt-BR",
      courseWorkload: "PT30H",
    },
  ],
  teaches: [
    "Técnicas de entalhe em madeira com faca",
    "Como escolher e usar ferramentas de entalhe",
    "Escultura de madeira para iniciantes",
    "Criação de peças artísticas em madeira",
  ],
  image: "https://curso.oficinacigarra.com.br/og-image.png",
  inLanguage: "pt-BR",
  isAccessibleForFree: false,
  author: [
    {
      "@type": "Person",
      name: "Mayra",
      jobTitle: "Instrutora de Entalhe",
    },
    {
      "@type": "Person",
      name: "Simone",
      jobTitle: "Instrutora de Entalhe",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${playfair.variable} ${jost.variable}`}>
        {children}
        <DevDialKit />
      </body>
      <GoogleAnalytics gaId="G-RETWTCTJHQ" />
    </html>
  );
}
