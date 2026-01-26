"use client"
import Image from 'next/image';
import React, { useState, useEffect, useMemo } from 'react';
import { LoadingScreen } from './LoadingScreen';


/**
 * VINYL DISK COMPONENT
 * Heavy SVG logic isolated and memoized.
 */
const VinylDisk = React.memo(() => {
    const terms = "ANALOG • GROOVE • VINYL • RHYTHM • SONIC • ARCHIVE • PRESSING • ";
    const innerCount = 10;
    const outerCount = 20;
    const stepSize = 8;
    const centerHole = 40;
    const innerStartRadius = centerHole + 20;
    const outerStartRadius = innerStartRadius + (innerCount * stepSize) + 10;

    const paths = useMemo(() => {
        return [...Array(innerCount + outerCount)].map((_, i) => {
            const radius = i < innerCount
                ? innerStartRadius + i * stepSize
                : outerStartRadius + (i - innerCount) * stepSize;
            return {
                id: `circle-${i}`,
                d: `M 400, 400 m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`
            };
        });
    }, [innerCount, outerCount, innerStartRadius, outerStartRadius, stepSize]);

    return (
        <svg
            viewBox="0 0 800 800"
            className="w-full h-full animate-spin-slow hover:pause-animation transition-transform will-change-transform cursor-crosshair"
        >
            <defs>
                {paths.map((p) => (
                    <path key={p.id} id={p.id} d={p.d} />
                ))}
            </defs>

            {paths.slice(0, innerCount).map((p, i) => (
                <text key={`inner-${i}`} className="fill-zinc-400 text-[6px] uppercase font-medium tracking-tighter opacity-60">
                    <textPath href={`#${p.id}`} startOffset={i * 10}>
                        {terms.repeat(10)}
                    </textPath>
                </text>
            ))}

            {paths.slice(innerCount).map((p, i) => (
                <text key={`outer-${i}`} className="fill-zinc-900 text-[7px] uppercase font-bold tracking-widest">
                    <textPath href={`#${p.id}`} startOffset={i * 5}>
                        {terms.repeat(15)}
                    </textPath>
                </text>
            ))}

            <circle cx="400" cy="400" r="1.5" className="fill-zinc-400" />
        </svg>
    );
});

VinylDisk.displayName = "VinylDisk";

/**
 * MAIN HERO COMPONENT
 */
export default function VinylHero() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        const handleResize = () => {
            setIsLoaded(false);
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        let resizeTimer: NodeJS.Timeout;
        const debouncedResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleResize, 150);
        };

        window.addEventListener('resize', debouncedResize);
        return () => window.removeEventListener('resize', debouncedResize);
    }, []);

    return (
        <>
            <LoadingScreen
                isFinished={isLoaded} 
                onComplete={() => setIsLoaded(true)} 
            />

            <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-primary">
                <HeroMetadata />

                {/* The Vinyl Disk as an Optimized Image */}
                <div className={`relative w-[85vw] h-[45vw] max-w-162.5 md:max-w-200 transition-all duration-1000 ease-out ${
                    isLoaded ? "opacity-100 scale-100 rotate-0 blur-0" : "opacity-0 scale-95 rotate-12 blur-sm"
                }`}>
                    <div className="relative w-full h-full animate-spin-">
                        <Image
                            src="/vinyl.png"
                            alt="Vinyl Record Archive"
                            fill
                            priority
                            className="object-contain"
                        />
                    </div>
                </div>

                <div className={`absolute bottom-12 text-center transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <h1 className="text-sm tracking-[0.5em] text-zinc-500 uppercase">
                        Vinyls <span className="italic font-serif">&</span> I
                    </h1>
                </div>
            </section>
        </>
    );
}

export function HeroMetadata() {
    return (
        <div className="absolute inset-0 px-5 md:px-10 py-20 pointer-events-none flex flex-col justify-between uppercase font-mono text-[8px] tracking-[0.2em] text-zinc-500">
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
                <div className="max-w-[190px]">
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