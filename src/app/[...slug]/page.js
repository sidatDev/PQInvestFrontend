import Link from "next/link";
import { notFound } from "next/navigation";
import { getPageBySlug } from "../../lib/strapi";
import Footer from "@/components/Footers/Footer";
import DynamicHeaderRenderer from "@/components/DynamicHeaderRenderer";
import TemplateRenderer from "@/components/TemplateRenderer";
import React from "react";

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const pageData = await getPageBySlug(slug);

    if (!pageData || !pageData.metaTag || !Array.isArray(pageData.metaTag)) {
        return {
            title: 'Pak-Qatar Investment',
            description: 'Pak-Qatar Investment - Together We Prosper',
        };
    }

    // Parse metaTag array to extract metadata
    const metaTagMap = {};
    pageData.metaTag.forEach(tag => {
        metaTagMap[tag.title] = tag.Content;
    });

    return {
        title: metaTagMap['title'] || 'Pak-Qatar Investment',
        description: metaTagMap['description'] || 'Pak-Qatar Investment - Together We Prosper',
        keywords: metaTagMap['keywords'] || '',
    };
}


export default async function Page({ params }) {
    const { slug } = await params;
    const pageData = await getPageBySlug(slug);

    if (!pageData) {
        console.log("Page not found for slug:", slug);
        notFound();
    }


    return (
        <React.Fragment>
            <DynamicHeaderRenderer data={pageData.header} />
            <main className="overflow-x-hidden">
                <TemplateRenderer pageData={pageData} />
            </main>
            <Footer data={pageData} />
        </React.Fragment>
    );
}
