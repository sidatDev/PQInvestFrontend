"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ChevronIcon from "./ChevronIcon";

// Desktop menu dropdown - hover, click (touch) aur keyboard focus teeno se khulta hai
export default function DesktopDropdown({ item }) {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    const subMenu = item?.Menu || [];
    const midPoint = Math.ceil(subMenu.length / 2);
    const firstColumn = subMenu.slice(0, midPoint);
    const secondColumn = subMenu.slice(midPoint);

    // Bahar click ya Escape par band
    useEffect(() => {
        if (!isOpen) return;
        const onPointerDown = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setIsOpen(false);
        };
        const onKeyDown = (e) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen]);

    // Focus dropdown se bahar chala jaye to band
    const onBlur = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setIsOpen(false);
    };

    const renderColumn = (items) => (
        <div className="flex flex-col gap-2">
            {items.map((subItem, subIndex) => (
                <Link
                    key={subIndex}
                    href={`/${item?.Link}/${subItem?.Link}`}
                    onClick={() => setIsOpen(false)}
                    className="text-[#333] text-[14px] underline decoration-1 underline-offset-4 hover:text-black focus:text-black w-fit"
                >
                    {subItem?.Title}
                </Link>
            ))}
        </div>
    );

    return (
        <li
            ref={wrapperRef}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            onBlur={onBlur}
            className="group relative py-2 text-[#8b0037] text-[15px] font-[400]"
        >
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 cursor-pointer"
            >
                {item?.TItle} <ChevronIcon isOpen={isOpen} className="w-5 h-5" />
            </button>
            <span className={`absolute bottom-[-5px] left-0 h-[4px] bg-[#8b0037] transition-all duration-300 ${isOpen ? "w-full" : "w-0"}`}></span>

            <AnimatePresence>
            {isOpen && (
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-[100%] left-[-100px] bg-white shadow-[0_15px_35px_rgba(0,0,0,0.1)] min-w-[550px] p-8 mt-[2px] z-[100] border-t-0"
            >
                <h3 className="text-[#8b0037] text-[20px] font-bold mb-4 uppercase">
                    {item?.TItle}
                </h3>
                <div className="grid grid-cols-2 gap-x-16 gap-y-2">
                    {renderColumn(firstColumn)}
                    {renderColumn(secondColumn)}
                </div>
            </motion.div>
            )}
            </AnimatePresence>
        </li>
    );
}
