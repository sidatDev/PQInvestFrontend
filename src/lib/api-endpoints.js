// API Endpoints Configuration
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://127.0.0.1:2555";

export const API_ENDPOINTS = {
    // Web Pages
    WEB_PAGES: '/api/web-pages',

    // Google Analytics
    GOOGLE_TAG: '/api/gtag',

    // Audit Logs
    AUDIT_LOGS: '/api/audit-logs',

    // Add more endpoints here as needed
};

// Public website URL (sitemap.xml / robots.txt ke liye)
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

export { STRAPI_URL, SITE_URL };
