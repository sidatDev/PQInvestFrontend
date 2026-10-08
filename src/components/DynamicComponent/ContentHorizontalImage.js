import Image from 'next/image';
import React from 'react';

export default function ContentHorizontalImage({ data }) {
    // The data structure based on schema:
    // data.ContentHorizonalImage = [ { Text: "...", Image: { ... } }, ... ]

    if (!data?.ContentHorizonalImage) return null;

    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:2555";

    return (
        <div className="flex flex-col gap-12">
            {data.ContentHorizonalImage.map((item, index) => {
                const imageUrl = item.Image?.url
                    ? (item.Image.url.startsWith('/') ? `${STRAPI_URL}${item.Image.url}` : item.Image.url)
                    : null;

                return (
                    <div key={index} className="flex flex-col md:flex-row gap-6">
                        {/* Image - Mobile par full width, text ke upar */}
                        {imageUrl && (
                            <div className="w-full md:w-1/2 relative h-[220px] sm:h-[300px] md:h-[400px] shrink-0">
                                <Image
                                    src={imageUrl}
                                    alt="Content Image"
                                    fill
                                    className="object-cover rounded-md shadow-sm"
                                    unoptimized
                                />
                            </div>
                        )}

                        {/* Text Content */}
                        <div className="w-full md:w-1/2 min-w-0">
                            <div
                                className="rich-text-content text-gray-700 leading-relaxed text-[15px] space-y-4"
                                dangerouslySetInnerHTML={{ __html: item.Text || '' }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
