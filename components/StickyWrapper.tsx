"use client";

import { useEffect, useState } from "react";

export default function StickyWrapper({ children }: { children: React.ReactNode }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Trigger transition after 10px of movement
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-100 transition-all duration-500 ease-in-out ${
                isScrolled 
                ? "bg-white/80 backdrop-blur-lg border-b border-zinc-200 py-2" 
                : "bg-transparent border-b border-transparent py-4"
            }`}
        >
            {children}
        </header>
    );
}