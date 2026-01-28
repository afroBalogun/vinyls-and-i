import React from 'react';
import prisma from '@/lib/db';
import SaveButton from '@/components/SaveButton';
import TechnicalManifest from '@/components/TechnicalManifest';
import RecordComments from '@/components/Comments';
import { getCurrentUser } from '@/lib/auth';
import SpotifyPlayer from '@/components/SpotifyPlayer';
import RecordPageClient from '@/components/RecordPageClient';

export default async function RecordPage(params: { params: Promise<{ slug: string }> }) {
    const currentUser = await getCurrentUser();
    const userId = currentUser?.id;
    const { slug } = await params.params;

    const record = await prisma.record.findUnique({
        where: { slug: slug },
        include: {
            comments: { include: { user: true }, orderBy: { createdAt: 'desc' } },
            savedBy: { where: { id: userId } },
        }
    });

    if (!record) return <div>Record Not Found</div>;

    const isSaved = record.savedBy.length > 0;
    const tracks = await prisma.track.findMany({ where: { recordId: slug } });
    const BRAND_LOGO = "vinyls\n&\nI.";

    const splitTitle = record.title.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
            {word.split("").map((char, charIndex) => (
                <span key={charIndex} className="title-char inline-block whitespace-pre will-change-transform">
                    {char}
                </span>
            ))}
            <span className="title-char inline-block whitespace-pre">&nbsp;</span>
        </span>
    ));

    return (
        <RecordPageClient>
            <main className="min-h-screen bg-primary text-secondary font-sans selection:bg-zinc-200 px-5 md:px-10 overflow-x-hidden py-24">

                {/* 1. TOP HEADER SECTION */}
                <header className="flex justify-between items-start mb-12 relative z-50">
                    <div className="flex flex-col space-y-1 meta-stagger">
                        <span className="text-xs font-bold tracking-widest">({record.year}) "{record.metadataTagline}"</span>
                        <span className="text-[10px] text-zinc-400 font-mono tracking-tighter">Published: {record.id}</span>
                    </div>

                    <div className="relative meta-stagger">
                        <div className="border-[1.5px] border-secondary p-2 leading-none text-right font-bold text-xl md:text-2xl uppercase tracking-tighter bg-[#fdfdfd] relative z-10">
                            {BRAND_LOGO.split('\n').map((line, i) => (
                                <React.Fragment key={i}>{line}<br /></React.Fragment>
                            ))}
                        </div>
                        <div className="absolute -top-1 -right-8 w-16 h-16 md:w-20 md:h-20 bg-zinc-800 rounded-full border-4 border-zinc-100 flex items-center justify-center -z-10 shadow-sm opacity-20">
                            <div className="w-6 h-6 bg-zinc-200 rounded-full" />
                        </div>
                    </div>
                </header>

                {/* 2. MAIN CONTENT GRID */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                    {/* LEFT COLUMN */}
                    <div className="md:col-span-6 space-y-12">
                        <div className="relative group visual-frame">
                            <div className="aspect-square bg-zinc-50  border-zinc-200 p-8 flex items-center justify-center overflow-hidden">
                                <div
                                    className="parallax-bg absolute inset-0 opacity-10 grayscale mix-blend-multiply"
                                    style={{ backgroundImage: `url(${record.albumCover})`, backgroundSize: 'cover' }}
                                />
                                <div className="relative z-10 w-3/4 h-3/4 border border-zinc-300 shadow-2xl grayscale transition-transform duration-1000 group-hover:scale-[1.02]">
                                    <img src={record.artistImage} alt={record.artistName} className="w-full h-full object-cover" />
                                    <div className="spec-box absolute top-4 right-4 bg-black text-white p-3 font-mono text-[10px] leading-tight space-y-1">
                                        <p className="border-b border-white/20 pb-1 opacity-70">Specs:</p>
                                        <p>Tempo: {record.tempo}</p>
                                        <p>Key: {record.key}</p>
                                        <p>Loudness: {record.loudness}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex flex-col text-[10px] tracking-widest text-zinc-500 uppercase font-medium meta-stagger p-2">
                                <span>Artist: {record.artistName}</span>
                                <span>Catalog: {record.catalogNumber}</span>
                            </div>
                        </div>

                        <div className="meta-stagger">
                            <SpotifyPlayer spotifyId={record.spotifyId} recordTitle={record.title} />
                        </div>
                        <div className="meta-stagger">
                            <SaveButton recordId={record.id} initialSaved={isSaved} />
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="md:col-span-6 md:pl-12 pt-12 md:pt-24 space-y-12 relative">
                        <div className="relative" style={{ perspective: '1000px' }}>
                            <h1 className="text-6xl md:text-8xl capitalize font-bold tracking-tighter leading-[0.85] text-secondary relative z-10">
                                {splitTitle}<span className="text-zinc-300">.</span>
                            </h1>
                            <p className="text-2xl md:text-3xl italic font-serif text-zinc-500 mt-4 meta-stagger">{record.phoneticOrCategory}</p>
                        </div>

                        <div className="max-w-md meta-stagger">
                            <p className="text-sm md:text-base text-zinc-600 leading-relaxed tracking-tight">
                                {record.etymology}
                            </p>
                        </div>

                        <div className="h-[1px] w-full bg-zinc-200 meta-stagger" />

                        <div className="space-y-6 meta-stagger">
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter opacity-10 select-none absolute top-1/2 right-0 -z-10 rotate-12">
                                {record.title} {record.title}
                            </h2>
                            <p className="text-sm leading-loose text-zinc-500 max-w-lg">
                                {record.description}
                            </p>
                        </div>

                        <footer className="pt-12 border-t border-zinc-100 flex flex-col items-center md:items-start text-center md:text-left meta-stagger">
                            <blockquote className="text-sm text-zinc-400 font-medium italic">
                                “ the pleasant earthy smell after rain" ”
                            </blockquote>
                            <span className="mt-2 text-[11px] text-zinc-300 tracking-[0.4em] uppercase">
                                雨後の気味
                            </span>
                        </footer>
                    </div>
                </div>

                {/* 3. TRACKLIST SECTION */}
                {tracks && (
                    <section className="max-w-7xl mx-auto mt-40 px-4 pb-40">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                            <div className="md:col-span-4 track-row">
                                <div className="md:sticky md:top-12 space-y-4">
                                    <h3 className="text-[10px] font-mono tracking-[0.5em] uppercase text-zinc-400">Index / 0.01</h3>
                                    <p className="text-2xl font-serif italic text-secondary leading-tight">
                                        A track-by-track <br /> examination of the <br /> dream-state.
                                    </p>
                                    <div className="h-[2px] w-8 bg-secondary mt-8" />
                                </div>
                            </div>

                            <div className="md:col-span-8 space-y-12">
                                {tracks.map((track, index) => (
                                    <div key={index} className="track-row grid grid-cols-1 md:grid-cols-8 gap-6 border-t border-zinc-100 pt-8 group">
                                        <div className="md:col-span-1">
                                            <span className="font-mono text-[10px] text-zinc-400 group-hover:text-secondary transition-colors">
                                                [{track.number}]
                                            </span>
                                        </div>
                                        <div className="md:col-span-7 space-y-4">
                                            <div className="flex justify-between items-baseline">
                                                <h4 className="text-3xl font-bold tracking-tighter uppercase italic">{track.title}</h4>
                                                <span className="font-mono text-[10px] text-zinc-300">{track.duration}</span>
                                            </div>
                                            <p className="text-sm leading-relaxed text-zinc-500 max-w-lg">{track.story}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <RecordComments recordId={record.id} initialComments={record.comments} />
                <TechnicalManifest record={record} />
                <div className="fixed top-0 left-12 w-[1px] h-full bg-zinc-100 -z-50 hidden md:block" />
                <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-[100]" />
            </main>
        </RecordPageClient>
    );
}