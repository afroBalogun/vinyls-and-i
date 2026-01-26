"use client"
import React, { useMemo } from 'react';

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
    }, []);

    return (
        <svg viewBox="0 0 800 800" className="w-full h-full animate-spin-slow hover:pause-animation transition-transform will-change-transform cursor-crosshair">
            <defs>
                {paths.map((p) => <path key={p.id} id={p.id} d={p.d} />)}
            </defs>
            {paths.slice(0, innerCount).map((p, i) => (
                <text key={`inner-${i}`} className="fill-zinc-400 text-[6px] uppercase font-medium tracking-tighter opacity-60">
                    <textPath xlinkHref={`#${p.id}`} startOffset={i * 10}>{terms.repeat(10)}</textPath>
                </text>
            ))}
            {paths.slice(innerCount).map((p, i) => (
                <text key={`outer-${i}`} className="fill-zinc-900 text-[7px] uppercase font-bold tracking-widest">
                    <textPath xlinkHref={`#${p.id}`} startOffset={i * 5}>{terms.repeat(15)}</textPath>
                </text>
            ))}
            <circle cx="400" cy="400" r="1.5" className="fill-zinc-400" />
        </svg>
    );
});

VinylDisk.displayName = "VinylDisk";
export default VinylDisk;