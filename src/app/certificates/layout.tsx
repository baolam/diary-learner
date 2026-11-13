import type { Metadata } from "next";
import { SITE_URL } from "@/lib/basePath";

const URL = `${SITE_URL}certificates`;
const TITLE = "Chứng Chỉ";
const DESCRIPTION =
  "Các chứng chỉ Nguyễn Đức Bảo Lâm đã hoàn thành trong quá trình tự học và học tập về AI, Machine Learning và Computer Vision.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "DeepLearning.AI",
    "Coursera",
    "IBM Machine Learning",
    "Google Data Analytics",
    "Python for Everybody",
    "Generative AI",
    "Chứng chỉ AI",
  ],
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function CertificatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
