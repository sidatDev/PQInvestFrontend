import { getAllPageSlugs } from "@/lib/strapi";
import { SITE_URL } from "@/lib/api-endpoints";

// Har request par Strapi se fresh pages list
export const dynamic = "force-dynamic";

export default async function sitemap() {
    const pages = await getAllPageSlugs();

    return pages.map((page) => ({
        url: page.slug === "home" ? `${SITE_URL}/` : `${SITE_URL}/${page.slug}`,
        lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
        changeFrequency: "weekly",
        priority: page.slug === "home" ? 1 : 0.8,
    }));
}
