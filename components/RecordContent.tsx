// @/components/RecordContent.tsx
"use client";

import { useState } from 'react';
import SpotifyPlayer from './SpotifyPlayer';
import SaveButton from './SaveButton';

export default function RecordContent({ record, tracks, isSaved }: any) {
    const [activeSpotifyId, setActiveSpotifyId] = useState(record.spotifyId);

    return (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN */}
            <div className="md:col-span-6 space-y-12">
                {/* Main Visual Frame */}
                <div className="relative group">
                    <div className="aspect-square bg-zinc-50 border border-zinc-200 p-8 flex items-center justify-center overflow-hidden">
                        {/* Background Album Cover (Faint) */}
                        <div
                            className="absolute inset-0 opacity-10 grayscale mix-blend-multiply transition-opacity duration-700 group-hover:opacity-20"
                            style={{ backgroundImage: `url(${record.albumCover})`, backgroundSize: 'cover' }}
                        />

                        {/* Central Artist Image (The Specimen) */}
                        <div className="relative z-10 w-3/4 h-3/4 border border-zinc-300 shadow-2xl grayscale transition-transform duration-1000 group-hover:scale-[1.02]">
                            <img src={record.artistImage} alt={record.artistName} className="w-full h-full object-cover" />

                            {/* Technical Spec Overlay (Black Box from Image) */}
                            <div className="absolute top-4 right-4 bg-black text-white p-3 font-mono text-[10px] leading-tight space-y-1">
                                <p className="border-b border-white/20 pb-1 opacity-70">Specs:</p>
                                <p>Tempo: {record.tempo}</p>
                                <p>Key: {record.key}</p>
                                <p>Loudness: {record.loudness}</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual Metadata Footer */}
                    <div className="mt-4 flex flex-col text-[10px] tracking-widest text-zinc-500 uppercase font-medium">
                        <span>Artist: {record.artistName}</span>
                        <span>Catalog: {record.catalogNumber}</span>
                    </div>
                </div>

                {/* The Player - now responds to activeSpotifyId */}
                <SpotifyPlayer
                    spotifyId={activeSpotifyId}
                    recordTitle={record.title}
                />
                <SaveButton recordId={record.id} initialSaved={isSaved} />
            </div>

            {/* RIGHT COLUMN */}
            <div className="md:col-span-6 md:pl-12 pt-12 md:pt-24 space-y-12 relative">

                {/* Large Editorial Title */}
                <div className="relative">
                    <h1 className="text-6xl md:text-8xl capitalize font-bold tracking-tighter leading-[0.85] text-zinc-900 relative z-10">
                        {record.title}<span className="text-zinc-300">.</span>
                    </h1>
                    <p className="text-2xl md:text-3xl italic font-serif text-zinc-500 mt-4">{record.phoneticOrCategory}</p>
                </div>

                {/* Etymology Section */}
                <div className="max-w-md">
                    <p className="text-sm md:text-base text-zinc-600 leading-relaxed tracking-tight">
                        {record.etymology}
                    </p>
                </div>

                <div className="h-[1px] w-full bg-zinc-200" />

                {/* Body Description */}
                <div className="space-y-6">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter opacity-10 select-none absolute top-1/2 right-0 -z-10 rotate-12">
                        {record.title} {record.title}
                    </h2>
                    <p className="text-sm leading-loose text-zinc-500 max-w-lg">
                        {record.description}
                    </p>
                </div>

                {/* Bottom Quote Block */}
                <footer className="pt-12 border-t border-zinc-100 flex flex-col items-center md:items-start text-center md:text-left">
                    <blockquote className="text-sm text-zinc-400 font-medium italic">
                        “ the pleasant earthy smell after rain" ”
                    </blockquote>
                    <span className="mt-2 text-[11px] text-zinc-300 tracking-[0.4em] uppercase">
                        雨後の気味
                    </span>
                </footer>
            </div>
            {/* TRACKLIST (Move the logic here) */}
            <section className="mt-20">
                <div className="space-y-8">
                    {tracks.map((track: any, index: number) => (
                        <div
                            key={index}
                            onClick={() => setActiveSpotifyId(track.spotifyId || track.id)}
                            className="grid grid-cols-1 md:grid-cols-8 gap-6 border-t border-zinc-100 pt-8 group cursor-pointer hover:bg-zinc-50/50 transition-all p-2 -mx-2 rounded-lg"
                        >
                            <div className="md:col-span-1">
                                <span className="font-mono text-[10px] text-zinc-400 group-hover:text-zinc-900 transition-colors">
                                    [{track.number}]
                                </span>
                            </div>
                            <div className="md:col-span-7 space-y-2">
                                <div className="flex justify-between items-baseline">
                                    <h4 className="text-2xl font-bold tracking-tighter uppercase italic group-hover:text-primary transition-colors">
                                        {track.title}
                                    </h4>
                                    <span className="font-mono text-[10px] text-zinc-300">{track.duration}</span>
                                </div>
                                <p className="text-xs text-zinc-400 font-mono uppercase tracking-tighter">
                                    Click to Preview track
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}