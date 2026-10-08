import Link from "next/link";
import React from "react";
import { getPageBySlug } from "@/lib/strapi";
import Footer from "@/components/Footers/Footer";
import DynamicHeaderRenderer from "@/components/DynamicHeaderRenderer";

export const metadata = {
    title: "Page Not Found | Pak-Qatar Investment",
    robots: { index: false },
};

export default async function NotFound() {
    // Header aur footer ka data home page se le rahe hain
    const homeData = await getPageBySlug(["home"]);

    return (
        <React.Fragment>
            <DynamicHeaderRenderer data={homeData?.header} />
            <main className="bg-[#F7F7F7] w-full py-20 px-4">
                <div className="max-w-3xl mx-auto bg-white shadow-2xl border border-gray-100 p-10 md:p-14 text-center">
                    <p className="text-[#b89733] text-[64px] font-bold leading-none">404</p>
                    <h1 className="text-[#8b0037] text-[28px] font-bold mt-4 uppercase">Page Not Found</h1>
                    <div className="w-16 h-[4px] bg-[#8b0037] mx-auto my-6"></div>
                    <p className="text-[#333] text-[15px]">
                        The page you are looking for does not exist or may have been moved.
                    </p>
                    <Link
                        href="/"
                        className="inline-block mt-8 bg-[#8b0037] text-white text-[15px] px-8 py-3 hover:opacity-90 transition-opacity"
                    >
                        Back to Home
                    </Link>
                </div>
            </main>
            <Footer data={homeData} />
        </React.Fragment>
    );
}
