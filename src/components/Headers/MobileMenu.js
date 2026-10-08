"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ChevronIcon from "./ChevronIcon";

export default function MobileMenu({ menu }) {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    // Escape key se menu band
    useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (e) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [isOpen]);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
        setOpenDropdown(null);
    };

    // Link click par menu band ho jaye
    const closeMenu = () => {
        setIsOpen(false);
        setOpenDropdown(null);
    };

    return (
        <div className="lg:hidden">
            <button
                type="button"
                onClick={toggleMenu}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                className="text-[#8b0037] text-2xl w-10 h-10 flex items-center justify-center cursor-pointer"
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={isOpen ? "close" : "open"}
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.15 }}
                    >
                        {isOpen ? "✕" : "☰"}
                    </motion.span>
                </AnimatePresence>
            </button>

            <AnimatePresence>
            {isOpen && (
                <motion.ul
                    id="mobile-menu"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-0 top-full w-full bg-white shadow-[0_15px_35px_rgba(0,0,0,0.1)] z-[100] border-t border-gray-100 max-h-[calc(100vh-120px)] overflow-y-auto"
                >
                    {menu?.map((item, index) => {
                        const hasDropdown = item?.Menu && item.Menu.length > 0;

                        if (hasDropdown) {
                            const isDropdownOpen = openDropdown === index;
                            return (
                                <li key={index} className="border-b border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setOpenDropdown(isDropdownOpen ? null : index)}
                                        aria-expanded={isDropdownOpen}
                                        className="w-full flex justify-between items-center px-6 py-3 text-[#8b0037] text-[15px] text-left cursor-pointer"
                                    >
                                        {item?.TItle}
                                        <ChevronIcon isOpen={isDropdownOpen} className="w-5 h-5" />
                                    </button>
                                    <AnimatePresence initial={false}>
                                    {isDropdownOpen && (
                                        <motion.ul
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                            className="bg-[#F7F7F7] overflow-hidden"
                                        >
                                            <div className="py-2">
                                            {item.Menu.map((subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <Link
                                                        href={`/${item?.Link}/${subItem?.Link}`}
                                                        onClick={closeMenu}
                                                        className="block px-10 py-2 text-[#333] text-[14px] hover:text-black"
                                                    >
                                                        {subItem?.Title}
                                                    </Link>
                                                </li>
                                            ))}
                                            </div>
                                        </motion.ul>
                                    )}
                                    </AnimatePresence>
                                </li>
                            );
                        }

                        return (
                            <li key={index} className="border-b border-gray-100">
                                <Link
                                    href={`/${item?.Link}`}
                                    onClick={closeMenu}
                                    className="block px-6 py-3 text-[#8b0037] text-[15px]"
                                >
                                    {item?.TItle}
                                </Link>
                            </li>
                        );
                    })}
                </motion.ul>
            )}
            </AnimatePresence>
        </div>
    );
}
