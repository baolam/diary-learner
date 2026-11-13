import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { SITE_URL } from "@/lib/basePath";

const SITE_TITLE = "Nguyễn Đức Bảo Lâm, Nhật Ký Học Tập | Computer Vision & Edge AI | ĐH FPT";
const SITE_DESCRIPTION =
  "Nhật ký học tập của Nguyễn Đức Bảo Lâm, sinh viên ngành Trí tuệ nhân tạo tại Đại học FPT TP.HCM, ghi lại các dự án và quá trình học Computer Vision, Edge AI.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Nhật Ký Học Tập — Nguyễn Đức Bảo Lâm",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Nguyễn Đức Bảo Lâm",
    "Computer Vision",
    "Edge AI",
    "Trí tuệ nhân tạo",
    "Đại học FPT",
    "Nhật ký học tập",
    "Deep Learning",
    "Raspberry Pi",
    "AIoT",
    "Machine Learning",
    "YOLOv8",
    "PyTorch",
    "Arduino",
    "IoT",
    "NLP",
    "Transformer",
    "FPT University",
    "Sinh viên AI",
    "VEDC 2026",
    "Olympic AI",
    "RMIT Hackathon",
    "Coolest Projects Malaysia",
    "Trường Đống Đa",
    "Trường Phước Thành",
  ],
  authors: [{ name: "Nguyễn Đức Bảo Lâm", url: SITE_URL }],
  creator: "Nguyễn Đức Bảo Lâm",
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "GOEypyT455GDK33AmSAxKyde0tNFZYz63xFCfWBxBEE",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: "Nhật Ký Học Tập — Nguyễn Đức Bảo Lâm",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  formatDetection: {
    telephone: false,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nguyễn Đức Bảo Lâm",
  jobTitle: "Sinh viên ngành Trí Tuệ Nhân Tạo (AI)",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Đại học FPT TP.HCM",
  },
  url: SITE_URL,
  sameAs: [
    "https://github.com/baolam",
    "https://baolam.github.io/deep-ml/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-slate-900 antialiased selection:bg-sky-500/20 selection:text-sky-950">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
