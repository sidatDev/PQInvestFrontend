'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { resolveSectionLink } from "@/lib/links";

export default function TableOfContent({ data }) {
    const pathname = usePathname();

    // Use menu items from Strapi data
    const menuItems = data?.TableOfContent || [];

    return (
        <div className="w-full lg:w-1/3 shrink-0">
            <div className="border border-gray-200">
                <div className="bg-[#8b0037] text-white p-4 font-bold text-lg uppercase">
                    About Us
                </div>
                <ul className="flex flex-col bg-white">
                    {menuItems.map((item, index) => {
                        // CMS se relative link aata hai (e.g. "directors") - current section ke saath jor dete hain
                        const href = resolveSectionLink(item?.link, pathname);
                        const isActive = pathname === href;

                        return (
                            <li key={index} className="border-b border-gray-100 last:border-none">
                                <Link
                                    href={href}
                                    className={`flex items-center px-4 py-3 text-[14px] font-semibold transition-all duration-200 ${isActive
                                        ? "text-[#8b0037] bg-gray-50"
                                        : "text-gray-700 hover:text-[#8b0037] hover:bg-gray-50"
                                        }`}
                                >
                                    <span className={`mr-2 transition-colors ${isActive ? "text-[#8b0037]" : "text-gray-400"}`}>
                                        &gt;
                                    </span>
                                    {item?.Title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
