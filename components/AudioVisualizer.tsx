"use client";
import { useEffect, useState } from 'react';

export default function AudioVisualizer() {
    const [lineCount, setLineCount] = useState(0);

    useEffect(() => {

        const calculateLines = () => {
            const count = Math.floor(window.innerWidth / 8);
            setLineCount(count);
        };

        calculateLines();
        window.addEventListener('resize', calculateLines);
        return () => window.removeEventListener('resize', calculateLines);
    }, []);

    return (
        <article className="flex h-16 w-full items-center justify-between px-4 gap-1 overflow-hidden pointer-events-none opacity-50">
            {Array.from({ length: lineCount }).map((_, i) => (
                <div
                    key={i}
                    className="w-px bg-secondary rounded-full transition-all duration-300"
                    style={{
                        height: `${Math.floor(Math.random() * 40) + 10}%`,
                        animation: `wave-pulse ${1 + Math.random()}s infinite ease-in-out`,
                        animationDelay: `${Math.random() * 2}s`
                    }}
                />
            ))}
            
            <style jsx>{`
                @keyframes wave-pulse {
                    0%, 100% { transform: scaleY(1); opacity: 0.5; }
                    50% { transform: scaleY(2.5); opacity: 1; }
                }
            `}</style>
        </article>
    );
}