import Link from 'next/link';
import React from 'react';
import { toAbsolutePath } from '@/lib/links';

// Ye sections ka apna page nahi hai - inke breadcrumb par click karne se user usi page par rahe
const SECTIONS_WITHOUT_PAGE = ['/about-us'];

export default function Breadcrumbs({ data, pageSlug }) {
    if (!data || data.length === 0) return null;

    const currentPath = pageSlug ? `/${pageSlug}` : null;

    return (
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center text-sm md:text-base mb-5 uppercase tracking-wide font-medium">
            {data.map((item, index) => {
                const isLast = index === data.length - 1;
                // Pehla item (Home) ka link khali ho to "/" par jaye
                let href = toAbsolutePath(item.link) || (index === 0 ? '/' : null);
                if (href && currentPath && SECTIONS_WITHOUT_PAGE.includes(href)) href = currentPath;

                return (
                    <div key={index} className="flex items-center">
                        {/* Separator */}
                        {index > 0 && <span className="mx-2 text-gray-400 font-light">&gt;</span>}

                        {/* Last item current page hai - link nahi; jis item ka link na ho wo bhi plain text */}
                        {isLast || !href ? (
                            <span
                                className={`text-[13px] ${isLast ? 'text-[#85a0ca]' : 'text-[#002e5b]'}`}
                                aria-current={isLast ? 'page' : undefined}
                            >
                                {item.Title}
                            </span>
                        ) : (
                            <Link
                                href={href}
                                className="text-[13px] transition-colors duration-200 text-[#002e5b] hover:text-[#8b0037]"
                            >
                                {item.Title}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
