// --- API Helpers ---

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:2555";

/**
 * Generic fetcher for Strapi API
 * @param {string} path - API path (e.g. '/api/web-pages')
 * @returns {Promise<any>} - JSON data or null
 */
export async function fetchStrapi(path) {
    try {
        const url = new URL(path, STRAPI_URL);
        console.log("Fetching Strapi URL:", url.href);
        const res = await fetch(url.href, {
            headers: {
                'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
            },
            cache: "no-store"
        }); // Disable cache for dev
        if (!res.ok) {
            console.error("Strapi Response Error:", res.status, res.statusText);
            // Try to get the actual error message
            try {
                const errorBody = await res.json();
                console.error("Strapi Error Details:", errorBody);
            } catch (e) {
                console.error("Could not parse error response");
            }
            return null;
        }
        const json = await res.json();
        return json.data;
    } catch (error) {
        console.error("Strapi fetch error:", error);
        return null;
    }
}

/**
 * Get a single page by its full slug path
 * @param {string[]} slugPoints - Array of slug segments (e.g. ['about-us', 'company'])
 * @returns {Promise<Object|null>} - Page object or null
 */
export async function getPageBySlug(slugPoints) {
    const slugPath = slugPoints.join("/");

    console.log("Looking for slug:", slugPath);

    // Build query URL - template field is included automatically (it's an enumeration, not a relation)
    const queryUrl = `/api/web-pages?filters[slug][$eq]=${slugPath}&populate[header][populate][web_menu][populate][Menu][populate]=*&populate[header][populate][LinkLeftSide]=*&populate[header][populate][LinkRightSide]=*&populate[Content1][populate]=*&populate[Content1][on][layout.content-with-image][populate][contentWithImage2][populate]=*&populate[Content1][on][layout.content-horizontal-image][populate][ContentHorizonalImage][populate]=*&populate[TableOfContent][populate]=*&populate[Banner][populate]=*&populate[BreadCrumbs][populate]=*`;
    const data = await fetchStrapi(queryUrl);
    console.log("Received data:", data);
    return data && data.length > 0 ? data[0] : null;
}
