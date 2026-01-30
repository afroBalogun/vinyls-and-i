"use client"
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { LoadingScreen } from './LoadingScreen';

/**
 * MAIN HERO COMPONENT
 */

export default function VinylHero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-primary">
            <HeroMetadata />

            {/* The Vinyl Disk - Animation state controlled by 'mounted' */}
            <div className={`relative w-[85vw] h-[45vw] max-w-162.5 md:max-w-200 transition-all duration-1000 delay-300 ease-out ${
                mounted ? "opacity-100 scale-100 rotate-0 blur-0" : "opacity-0 scale-95 rotate-12 blur-sm"
            }`}>
                <div className="relative w-full h-full">
                    <Image
                        src="/vinyl.png"
                        alt="Vinyl Record Archive"
                        fill
                        priority
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Bottom Title */}
            <div className={`absolute bottom-12 text-center transition-all duration-700 delay-500 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
                <h1 className="text-sm tracking-[0.5em] text-zinc-500 uppercase">
                    Vinyls <span className="italic font-serif">&</span> I
                </h1>
            </div>
        </section>
    );
}

export function HeroMetadata() {
    return (
        <div className="absolute inset-0 px-5 md:px-10 py-20 pointer-events-none flex flex-col justify-between uppercase font-mono text-[6px] md:text-[8px] tracking-[0.2em] text-zinc-500">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <p>Vinyls & I</p>
                    <p>Ed. No. 2026.01</p>
                </div>
                <div className="text-right">
                    <p>Stockholm / SYST.</p>
                    <p>59.3293° N, 18.0686° E</p>
                </div>
            </div>

            <div className="flex justify-between items-end">
                <div className="max-w-36 md:max-w-47.5">
                    <p className="leading-relaxed">
                        A digital archive dedicated to the intersection of tactile sound and modern prose.
                    </p>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <p className="text-zinc-900">System Live</p>
                    </div>
                    <p>© All Rights Reserved</p>
                </div>
            </div>
        </div>
    );
}