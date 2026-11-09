import type { Metadata } from "next";
import { SITE_URL } from "@/lib/basePath";

const URL = `${SITE_URL}about`;
const TITLE = "Về Mình";
const DESCRIPTION =
  "Câu chuyện học Trí tuệ nhân tạo của Nguyễn Đức Bảo Lâm, từ những ngày đầu làm quen với Arduino đến các dự án Computer Vision và Edge AI tại Đại học FPT TP.HCM.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
