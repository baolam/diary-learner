import type { Metadata } from "next";
import { SITE_URL } from "@/lib/basePath";

const URL = `${SITE_URL}awards`;
const TITLE = "Giải Thưởng";
const DESCRIPTION =
  "Các giải thưởng và bài báo đã đưa tin về Nguyễn Đức Bảo Lâm trong các cuộc thi lập trình, nghiên cứu AI và Khoa học kỹ thuật.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "VEDC 2026",
    "Olympic AI",
    "RMIT Hackathon",
    "Coolest Projects Malaysia",
    "Khoa học Kỹ thuật Lâm Đồng",
    "Sinh viên Xuất sắc FPT",
    "Giải thưởng AI",
    "Hackathon sinh viên",
  ],
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function AwardsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
