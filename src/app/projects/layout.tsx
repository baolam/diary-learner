import type { Metadata } from "next";
import { SITE_URL } from "@/lib/basePath";

const URL = `${SITE_URL}projects`;
const TITLE = "Dự Án";
const DESCRIPTION =
  "Các dự án Computer Vision, Edge AI và AIoT mà Nguyễn Đức Bảo Lâm đã thực hiện, từ hệ thống giám sát rừng, ước lượng tốc độ giao thông đến robot hỗ trợ người khiếm thị.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "EdgeFlow AI",
    "YOLOv8",
    "ByteTrack",
    "Computer Vision",
    "Edge AI",
    "AIoT",
    "Vehicle Speed Estimation",
    "Graph Attention Networks",
    "Transformer PyTorch",
    "SUMO Simulation",
    "Smart Traffic",
    "Forest Guard AI",
    "Raspberry Pi",
    "Arduino",
  ],
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
