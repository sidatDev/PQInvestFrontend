'use client'
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Accordion({ data }) {
    const accordionItems = data?.accordion || [];
    const [openDirector, setOpenDirector] = useState(0);

    return (
        <div className="flex-grow md:w-2/3">
            <div className="space-y-4">
                {accordionItems.map((director, index) => (
                    <div key={index} className="border border-gray-200 overflow-hidden">
                        <button
                            onClick={() => setOpenDirector(openDirector === index ? -1 : index)}
                            aria-expanded={openDirector === index}
                            className={`w-full flex justify-between items-center p-4 text-left transition-colors ${openDirector === index ? "bg-[#8b0037] text-white" : "bg-white text-black hover:bg-gray-50"
                                }`}
                        >
                            <span className="text-[18px] font-bold">{director.Title}</span>
                            <span className="text-2xl font-light">
                                {openDirector === index ? "−" : "+"}
                            </span>
                        </button>

                        <AnimatePresence initial={false}>
                            {openDirector === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div
                                        className="p-5 rich-text-content text-[15px] text-[#8b0037] space-y-6 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: director.Content || '' }}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}