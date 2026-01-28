"use client";
import { useEffect, useState, useRef } from 'react';

export default function AudioVisualizer() {
    const [lineCount, setLineCount] = useState(0);
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const calculateLines = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const count = Math.floor(containerWidth / 6); 
                setLineCount(count);
            }
        };

        calculateLines();

        const observer = new ResizeObserver(calculateLines);
        if (containerRef.current) observer.observe(containerRef.current);

        window.addEventListener('resize', calculateLines);
        return () => {
            window.removeEventListener('resize', calculateLines);
            observer.disconnect();
        };
    }, []);

    return (
        <article 
            ref={containerRef} 
            className="flex h-12 w-full items-center justify-between gap-[2px] overflow-hidden pointer-events-none opacity-50"
        >
            {Array.from({ length: lineCount }).map((_, i) => (
                <div
                    key={i}
                    className="w-[2px] bg-secondary rounded-full transition-all duration-300 will-change-transform"
                    style={{
                        height: `${Math.floor(Math.random() * 30) + 10}%`,
                        animation: `wave-pulse ${0.8 + Math.random()}s infinite ease-in-out`,
                        animationDelay: `${Math.random() * 0.5}s`
                    }}
                />
            ))}
            
            <style jsx>{`
                @keyframes wave-pulse {
                    0%, 100% { transform: scaleY(1); opacity: 0.3; }
                    50% { transform: scaleY(2.8); opacity: 1; }
                }
            `}</style>
        </article>
    );
}