import type { Metadata } from "next";
import { SITE_URL } from "@/lib/basePath";

const URL = `${SITE_URL}skills`;
const TITLE = "Kỹ Năng";
const DESCRIPTION =
  "Các công nghệ và kỹ năng Nguyễn Đức Bảo Lâm đã dùng thực tế trong các dự án Computer Vision, Edge AI và phát triển phần mềm, gắn với từng dự án cụ thể.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Python",
    "C++",
    "TypeScript",
    "PyTorch",
    "YOLOv8",
    "OpenCV",
    "LLM",
    "Raspberry Pi",
    "Arduino",
    "Cấu trúc dữ liệu & giải thuật",
    "Next.js",
    "Graph Neural Networks",
  ],
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
