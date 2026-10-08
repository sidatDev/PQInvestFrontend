import Image from "next/image";

// components/Hero.js
export default function Banner({ data }) {

    // Construct full image URL
    const imageUrl = data?.bannerImg?.[0]?.url ? `${data.bannerImg[0].url}` : '/career-1200x346.png';
    // CMS heading mein kabhi double space hota hai ("Contact  US") - extra spaces hata kar words alag
    const headingWords = (data?.heading || "").trim().split(/\s+/).filter(Boolean);
    return (
        <div className="relative w-full h-[180px] sm:h-[240px] lg:h-[346px] overflow-hidden">
            {/*
              Banner images mein grey frame bana hua hai (dono sides ~25px, upar ~24px).
              Halka sa scale kar ke frame crop karte hain taake desktop par side gaps na dikhein.
              Mobile/Tablet par image right side (emblem wali) se align hoti hai taake emblem crop na ho.
            */}
            <Image
                src={imageUrl}
                alt={data?.heading || "Banner"}
                fill
                sizes="100vw"
                loading="eager"
                fetchPriority="high"
                className="object-cover object-right lg:object-center scale-[1.12] origin-[50%_85%]"
                unoptimized
            />
            {/* Heading usi container mein jis mein page ka content hai (Template1: max-w-7xl mx-auto px-4) taake left se aligned ho */}
            <div className="absolute inset-0 flex items-center">
                <div className="w-full max-w-7xl mx-auto px-4">
                    <div className="w-16 h-[6px] bg-white mb-3"></div>
                    {/* Pehla word upar (bold), baqi words neechay (halka bold) - dono beech mein aligned */}
                    <h1 className="w-fit text-center text-white leading-[1] uppercase text-[26px] sm:text-[32px] lg:text-[40px]">
                        <span className="block font-bold">{headingWords[0]}</span>
                        {headingWords.length > 1 && (
                            <span className="block font-medium">{headingWords.slice(1).join(" ")}</span>
                        )}
                    </h1>
                </div>
            </div>
        </div>
    );
}
