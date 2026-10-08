import React from "react";
import DynamicComponentRenderer from "../DynamicComponentRenderer";
import TableOfContent from "../DynamicComponent/TableOfContent";
import Banner from "../DynamicComponent/Banner";
import Breadcrumbs from "../DynamicComponent/Breadcrumbs";

/**
 * Template1 - Content with Sidebar Layout
 * Used for: About Us, Services, and other content pages
 * Features: Max-width container, shadow/border, two-column layout
 */
export default function Template1({ pageData }) {
    // About Us ke saare pages par side menu consistent dikhe (CMS mein kuch pages par isHidden true hai)
    const hasTocItems = pageData.TableOfContent?.TableOfContent?.length > 0;
    const isAboutPage = pageData.slug?.startsWith('about-us/');
    const showToc = pageData.TableOfContent?.isHidden === false || (isAboutPage && hasTocItems);

    return (
        <>
            {/* Banner (if not home page) */}
            {pageData.slug !== 'home' && (
                <Banner data={pageData.Banner} />
            )}

            {/* Main Content with Sidebar */}
            <div className="bg-[#F7F7F7] w-full pt-5 pb-12">
                <div className="max-w-7xl mx-auto px-4">
                    <Breadcrumbs data={pageData.BreadCrumbs} />

                    <div className="bg-white shadow-2xl border border-gray-100 p-5 sm:p-8 lg:p-14">

                        {/* Breadcrumbs */}

                        {/* Content & Sidebar Wrapper - 1024px se chhoti screen par sidebar content ke neechay */}
                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Left: Content1 components */}
                            <div className="flex-grow min-w-0 lg:w-2/3">
                                {pageData.Content1?.map((component, index) => (
                                    <DynamicComponentRenderer
                                        key={`${component.__component}-${index}`}
                                        component={component}
                                        index={index}
                                        tableOfContent={null}
                                        pageSlug={pageData.slug}
                                        isLast={index === pageData.Content1.length - 1}
                                    />
                                ))}
                            </div>

                            {/* Right: Table of Contents Sidebar */}
                            {showToc && (
                                <TableOfContent data={pageData.TableOfContent} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
