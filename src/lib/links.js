// Link helpers - CMS se aane wale relative links ko sahi absolute path mein badalna

const EXTERNAL_LINK = /^(https?:|mailto:|tel:|#)/i;

/**
 * Site-root relative link: "about-us/sponsors/" -> "/about-us/sponsors"
 * External links (http, mailto, tel, #) waise hi rehte hain
 * @param {string|null} link
 * @returns {string|null} - null agar link khali ho
 */
export function toAbsolutePath(link) {
    const value = typeof link === "string" ? link.trim() : "";
    if (!value) return null;
    if (EXTERNAL_LINK.test(value)) return value;

    const path = "/" + value.replace(/^\/+/, "").replace(/\/+$/, "");
    return path;
}

/**
 * Phone number ko display format aur tel: link mein badalna
 * "+92213431174756" -> { display: "(+92 21) 34311747-56", href: "tel:+922134311747" }
 * Aakhri 2 digits PABX extension range hain (47-56), dial ke liye pehla number use hota hai
 * @param {string} raw
 * @returns {{display: string, href: string}}
 */
export function formatPhone(raw) {
    const value = typeof raw === "string" ? raw.trim() : "";
    const digits = value.replace(/\D/g, "");

    // Pakistan landline: 92 + area code (2) + number (8) + optional extension range (2)
    const match = digits.match(/^92(\d{2})(\d{8})(\d{2})?$/);
    if (match) {
        const [, area, number, range] = match;
        return {
            display: `(+92 ${area}) ${number}${range ? `-${range}` : ""}`,
            href: `tel:+92${area}${number}`,
        };
    }

    return { display: value, href: digits ? `tel:+${digits}` : "#" };
}

/**
 * Section relative link: "directors" on "/about-us/sponsors" -> "/about-us/directors"
 * Agar link mein pehle se "/" ho (e.g. "about-us/directors") to root se treat hota hai
 * @param {string|null} link
 * @param {string} pathname - current page path
 * @returns {string}
 */
export function resolveSectionLink(link, pathname) {
    const value = typeof link === "string" ? link.trim() : "";
    if (!value) return "#";
    if (EXTERNAL_LINK.test(value)) return value;

    const clean = value.replace(/^\/+/, "").replace(/\/+$/, "");
    if (value.startsWith("/") || clean.includes("/")) return "/" + clean;

    const segments = (pathname || "/").split("/").filter(Boolean);
    const section = segments.slice(0, -1);
    return "/" + [...section, clean].join("/");
}
