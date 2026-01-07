export default function Banner() {
    return (
        <section className="relative h-[75vh] w-full flex items-center justify-center overflow-hidden">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute z-[-1] w-full h-full object-cover"
            >
                <source src="/banner.mp4" type="video/mp4" />
            </video>

            {/* Background Overlay - Halka sa dark effect */}
            <div className="absolute inset-0 bg-black/15 z-0"></div>

            {/* Single Border Container */}
            <div className="z-10 border-[2px] border-white p-2">

                {/* Inner White Box - Transparency ko bohot kam (yani solid) kar diya hai */}
                <div className="bg-white/65 backdrop-blur-none px-12 py-5 shadow-xl">
                    <h1 className="text-[#800032] text-2xl md:text-3xl font-bold tracking-tight text-center py-3">
                        Together We Prosper
                    </h1>
                </div>

            </div>
        </section>
    );
}