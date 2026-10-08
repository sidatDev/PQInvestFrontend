import Script from "next/script";

// CMS se aane wali <script> tags ko Next.js Script mein badalna (innerHTML wali script browser nahi chalata)
export default function CmsScripts({ html, idPrefix }) {
    if (!html) return null;
    const scripts = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/gi)];

    return scripts.map((match, index) => {
        const [, attrs, code] = match;
        const src = attrs.match(/src=["']([^"']+)["']/)?.[1];
        const key = `${idPrefix}-${index}`;

        if (src) return <Script key={key} src={src} strategy="afterInteractive" />;
        return <Script key={key} id={key} strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: code }} />;
    });
}
