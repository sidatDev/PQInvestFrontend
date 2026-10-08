import { SITE_URL } from "@/lib/api-endpoints";

export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/audit-logs"],
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
