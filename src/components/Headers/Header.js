import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import DesktopDropdown from "./DesktopDropdown";
import { formatPhone } from "@/lib/links";

export default function Header({ data }) {
    console.log(data, 'headerData')
    
    return (
        <header className="w-full font-sans relative z-50 ">
            {/* Top Maroon Bar */}
            <div className="bg-[#8b0037] text-white text-[13px] sm:text-[15px] py-2 px-4 sm:px-6 md:px-8 leading-[25px]">
                <div className="max-w-7xl flex flex-wrap justify-between items-center gap-x-4 gap-y-1 mx-auto">
                    
                    {/* Left Side: Phone Numbers & Links */}
                    <div className="flex items-center gap-4">
                        {data?.LinkLeftSide?.map((item, index) => {
                            // isHidden Check
                            if (item?.isHidden === true || item?.isHidden === "TRUE") {
                                return null;
                            }

                            const isPhone = item?.Title?.toLowerCase().includes('phone') || item?.link?.startsWith('+');
                            const phone = isPhone ? formatPhone(item?.link) : null;
                            const hrefValue = isPhone ? phone.href : item?.link;
                            const label = isPhone ? phone.display : item?.link;

                            return (
                                <div key={index} className="flex items-center gap-2">
                                    <Image
                                        src="/phone.png"
                                        alt="Phone"
                                        width={16}
                                        height={16}
                                        className="object-contain"
                                    />
                                    <Link 
                                        href={hrefValue || '#'}
                                        target={(item?.isExternal === true || item?.isExternal === "TRUE") ? "_blank" : "_self"}
                                        rel="noopener noreferrer"
                                        className="hover:underline cursor-pointer"
                                    >
                                        {label}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Side Links (Media Room etc.) */}
                    <div className="flex gap-8 items-center">
                        {data?.LinkRightSide?.map((item, index) => {
                            // 1. isHidden Check: Agar CMS mein TRUE hai to show nahi hoga
                            if (item?.isHidden === true || item?.isHidden === "TRUE") {
                                return null;
                            }

                            return (
                                <Link 
                                    key={index} 
                                    href={`/${item?.link}` || '#'}
                                    // 2. isExternal Check: Naye tab mein khulne ke liye
                                    target={(item?.isExternal === true || item?.isExternal === "TRUE") ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                >
                                    <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                                        <Image
                                            src="/media_icon.png"
                                            alt="Media Room"
                                            width={18}
                                            height={18}
                                            className="object-contain"
                                        />
                                        {item?.Title}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Gold Divider Line */}
            <div className="w-full h-[5px] bg-[#b89733]"></div>

            {/* Main Navigation (Full code retained) */}
            <nav className="flex justify-between items-center py-4 bg-white relative max-w-7xl mx-auto px-6 md:px-8">
                <div className="flex items-center">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="Pak-Qatar Logo"
                            width={343}
                            height={86}
                            className="h-14 md:h-20 w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>

                <ul className="hidden lg:flex gap-10">
                    {data?.web_menu?.Menu?.map((item, index) => {
                        const hasDropdown = item?.Menu && item.Menu.length > 0;

                        if (hasDropdown) {
                            return <DesktopDropdown key={index} item={item} />;
                        } else {
                            return (
                                <li key={index} className="group relative cursor-pointer py-2 text-[#8b0037] text-[15px] font-[400]">
                                    <Link href={`/${item?.Link}` || '#'}>{item?.TItle}</Link>
                                    <span className="absolute bottom-[-5px] left-0 w-0 h-[4px] bg-[#8b0037] transition-all duration-300 group-hover:w-full"></span>
                                </li>
                            );
                        }
                    })}
                </ul>

                <MobileMenu menu={data?.web_menu?.Menu} />
            </nav>
        </header>
    );
}