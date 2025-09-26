import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: {
    default:
      "Sante - Cirugía Plástica y Medicina Estética | Dr. German Miranda Marini",
    template: "%s | Sante Cirugía Plástica"
  },
  description:
    "Sante es una clínica de cirugía plástica y medicina estética en Argentina. Dr. German Miranda Marini especialista en cirugía plástica estética y reconstructiva. Tratamientos personalizados y atención humana.",
  keywords: [
    "cirugía plástica",
    "medicina estética",
    "Dr. German Miranda Marini",
    "clínica estética Argentina",
    "cirugía estética",
    "tratamientos estéticos",
    "cirugía reconstructiva",
    "medicina estética ética",
    "Santë",
    "centrosante"
  ],
  authors: [{ name: "Dr. German Miranda Marini" }],
  creator: "Dr. German Miranda Marini",
  publisher: "Sante Cirugía Plástica",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://centrosante.com.ar",
    siteName: "Sante Cirugía Plástica y Medicina Estética",
    title:
      "Sante - Cirugía Plástica y Medicina Estética | Dr. German Miranda Marini",
    description:
      "Sante es una clínica de cirugía plástica y medicina estética en Argentina. Dr. German Miranda Marini especialista en cirugía plástica estética y reconstructiva.",
    images: [
      {
        url: "https://centrosante.com.ar/logo.png",
        width: 1200,
        height: 630,
        alt: "Sante Cirugía Plástica y Medicina Estética"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sante - Cirugía Plástica y Medicina Estética",
    description:
      "Dr. German Miranda Marini especialista en cirugía plástica estética y reconstructiva. Tratamientos personalizados y atención humana.",
    images: ["https://centrosante.com.ar/logo.png"]
  },
  alternates: {
    canonical: "https://centrosante.com.ar"
  },
  category: "Health & Medical",
  classification: "Medical Practice",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico", sizes: "any" }
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ],
    other: [
      {
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  },
  manifest: "/favicon/site.webmanifest"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              name: "Sante Cirugía Plástica y Medicina Estética",
              alternateName: "Santë",
              url: "https://centrosante.com.ar",
              logo: "https://centrosante.com.ar/logo.png",
              description:
                "Sante es una clínica de cirugía plástica y medicina estética en Argentina. Dr. German Miranda Marini especialista en cirugía plástica estética y reconstructiva.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "AR",
                addressLocality: "Argentina"
              },
              telephone: "+54-264-439-0203",
              email: "info@centrosante.com.ar",
              founder: {
                "@type": "Person",
                name: "Dr. German Miranda Marini",
                jobTitle: "Director Médico",
                description:
                  "Médico cirujano especializado en cirugía plástica estética y reconstructiva"
              },
              medicalSpecialty: [
                "Cirugía Plástica",
                "Medicina Estética",
                "Cirugía Reconstructiva"
              ],
              serviceType: [
                "Cirugía Plástica",
                "Estética Médica",
                "Tratamientos Mini Invasivos"
              ],
              sameAs: ["https://www.instagram.com/centrosantesj"]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
