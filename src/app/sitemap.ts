import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/basePath";

export const dynamic = "force-static";

const ROUTES = ["", "about", "projects", "awards", "certificates", "skills"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
