import Link from 'next/link';

const ArticleHero = ({ id, slug, title, category, catalogNumber, year, description, artistName, albumCover, artistImage }: { id: string, slug: string, title: string, category: string, catalogNumber: string, year: string, description: string, artistName: string, albumCover: string, artistImage: string }) => {
    return (
        <Link href={`/records/${slug}`}>
            <article className="relative min-h-screen w-full text-zinc-900 p-6 md:p-12 font-sans selection:bg-zinc-200">

                {/* Top Header - "Words" Style Logo */}
                <div className="absolute top-8 right-8 md:top-12 md:right-12">
                    <div className="border-2 border-zinc-500 p-1 leading-none text-right font-bold text-xl md:text-2xl uppercase tracking-tighter text-zinc-500 border- z-10 relative bg-[#fdfdfd]">
                        vinyls <br />& <br /> I.
                    </div>
                    <div className="bg-zinc-700 h-18 w-18 md:h-20 md:w-20 rounded-full absolute top-0 right-7 md:top-0.5 md:right-10 border-4 border-zinc-100 flex items-center justify-center">
                        <div className="bg-zinc-200 h-8 w-8 rounded-full">

                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="max-w-7xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 relative">

                    {/* Left Side: Vertical Metadata */}
                    <div className="hidden md:flex md:col-span-1 flex-col justify-start items-center space-y-12 py-10">
                        <div className="-rotate-90 whitespace-nowrap text-[10px] tracking-[0.3em] uppercase text-zinc-400 origin-center">
                            ({year}) ▼ "Nature of Analog Sound"
                        </div>
                    </div>

                    {/* Center: The Main Visual Area */}
                    <div className="md:col-span-7 relative group">
                        {/* Large Image/Visual Container */}
                        <div className="relative aspect-square bg-zinc-100 overflow-hidden border border-zinc-200 shadow-sm flex items-center justify-center">

                            {/* Background "Ghost" Image - Treated as a watermark */}
                            <div
                                className="absolute inset-0 grayscale opacity-10 mix-blend-multiply pointer-events-none"
                                style={{
                                    backgroundImage: `url(${albumCover})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    filter: 'brightness(1.2) contrast(0.8)' 
                                }}
                            />

                            {/* Small Artist Image - The "Specimen" */}
                            <div className="relative z-10 w-40 h-40 md:w-60 md:h-60 grayscale contrast-125 border border-zinc-300 shadow-lg opacity-80 group-hover:opacity-100 transition-all duration-500">
                                <img
                                    src={artistImage}
                                    alt={artistName}
                                    className="w-full h-full object-cover"
                                />
                                {/* Subtle inner shadow to make it look recessed into the page */}
                                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]" />
                            </div>

                            {/* THE FIX: Invisible Scrim behind where the text overlaps */}
                            {/* This creates a subtle "white glow" only on the left side to protect the text */}
                            <div className="absolute inset-y-0 left-0 w-1/2 bg-linear-to-r from-[#fdfdfd] via-[#fdfdfd]/40 to-transparent z-15 pointer-events-none" />

                            {/* Grainy Texture Overlay */}
                            <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-20" />
                        </div>

                        {/* Floating Title - Now perfectly legible thanks to the gradient above */}
                        <div className="absolute top-1/2 -left-4 md:-left-12 translate-y-[-50%] z-30">
                            <h1
                                className="text-6xl md:tl font-bold tracking-tighter leading-none text-zinc-900"
                                style={{
                                    paintOrder: 'stroke fill',
                                    WebkitTextStroke: '12px #fdfdfd',
                                }}
                            >
                                {title}<span className="text-zinc-400 ml-2">.</span>
                            </h1>
                            <p className="mt-2 text-zinc-500 italic font-serif text-lg md:text-xl px-2 inline-block bg-[#fdfdfd]/80 backdrop-blur-sm">
                                [{category}]
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Technical Specs */}
                    <div className="md:col-span-4 flex flex-col justify-between pt-10 md:pl-8">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-mono">{catalogNumber}</span>
                                <div className="h-px grow bg-zinc-300" />
                            </div>

                            {/* Vertical Name Overlay Effect */}
                            <div className="relative">
                                <h2 className="text-4xl uppercase font-light tracking-[0.2em] text-zinc-200 select-none rotate-90 absolute -right-20 top-20 origin-left">
                                    {artistName}
                                </h2>
                                <p className="text-sm leading-relaxed text-zinc-600 max-w-xs relative z-10">
                                    {description}
                                </p>
                            </div>
                        </div>

                        {/* Bottom Quote Style Info */}
                        <div className="mt-20 md:mt-0 pt-10 border-t border-zinc-100">
                            <p className="text-xs text-center md:text-left tracking-wide text-zinc-400">
                                “ the pleasant tactile sensation of the needle hitting the groove ”
                            </p>
                            <p className="text-center md:text-left mt-2 text-[10px] text-zinc-300">
                                針が溝に触れる心地よい感覚
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default ArticleHero;