"use client";
import { useEffect, useRef, useState } from 'react';
import { ArchiveGrid } from "./ArchiveGrid";
import AudioVisualizer from "./AudioVisualizer";
import { BlueprintSpines } from "./BlueprintSpines";
import { gsap } from "gsap";
import { ScrollTrigger, TextPlugin } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function About() {
    const [activeSection, setActiveSection] = useState("idle");
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const orderImgRef = useRef<HTMLImageElement>(null);
    const initiatedTextRef = useRef<HTMLHeadingElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const pulseTitleRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        // --- 1. CONTINUOUS SPIN (Handled by GSAP to avoid conflicts) ---
        gsap.to(orderImgRef.current, {
            rotation: 360,
            duration: 12,
            repeat: -1,
            ease: "none",
            transformOrigin: "center center"
        });

        // --- 2. SLIDE IN FROM RIGHT (Half-past the edge) ---
        const introTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#featured",
                start: "top 80%",
            }
        });

        introTl.fromTo(orderImgRef.current,
            {
                xPercent: 150, // Start completely off-screen to the right
                opacity: 0
            },
            {
                xPercent: 50,  // End with exactly 50% of the image past the edge
                opacity: 0.2,
                duration: 2,
                ease: "power3.out"
            }
        )
            // --- 3. TYPING EFFECT ---
            .to(initiatedTextRef.current, {
                duration: 1.5,
                text: "ARCHIVE_INITIATED: 2026",
                ease: "none",
            }, "-=0.5");

        // --- 4. ADAPTIVE STAGGER ---
        const cards = gsap.utils.toArray(".community-card");
        const isMobile = window.innerWidth < 768;

        gsap.from(cards, {
            scrollTrigger: {
                trigger: cardsContainerRef.current,
                start: "top 85%",
            },
            opacity: 0,
            x: isMobile ? 0 : -60, // Slide from left on desktop
            y: isMobile ? 60 : 0,  // Slide from bottom on mobile
            stagger: 0.2,
            duration: 1,
            ease: "power2.out"
        });

        // --- 5. SYSTEM PULSE EFFECT ---
        const pulseTl = gsap.timeline({
            repeat: -1,
            repeatDelay: 2, // Time between "heartbeats"
            scrollTrigger: {
                trigger: "#system",
                start: "top center",
                toggleActions: "play pause resume reset"
            }
        });

        pulseTl
            // First Beat: Sudden sharp scale & opacity jump
            .to(pulseTitleRef.current, {
                opacity: 1,
                scale: 1.05,
                skewX: -10,
                duration: 0.05,
                ease: "steps(1)"
            })
            .to(pulseTitleRef.current, {
                opacity: 0.6,
                scale: 1,
                skewX: 0,
                duration: 0.05,
                ease: "steps(1)"
            })
            // Second Beat (Echo)
            .to(pulseTitleRef.current, {
                opacity: 0.9,
                scale: 1.02,
                skewX: 5,
                duration: 0.05,
                ease: "steps(1)",
                delay: 0.1
            })
            .to(pulseTitleRef.current, {
                opacity: 0.4,
                scale: 1,
                skewX: 0,
                duration: 0.08,
                ease: "steps(1)"
            })
            // Random "Noise" Flicker
            .to(pulseTitleRef.current, {
                x: () => (Math.random() - 0.5) * 4,
                opacity: () => Math.random(),
                duration: 0.1,
                repeat: 3,
                yoyo: true,
                ease: "none"
            })
            // Reset to idle
            .to(pulseTitleRef.current, { x: 0, opacity: 0.4, duration: 0.1 });

    }, { scope: containerRef });

    // ... (Keep your IntersectionObserver useEffects)

    return (
        <main ref={containerRef} className="w-full text-secondary font-agdasima bg-primary overflow-x-hidden">
            {isVisible && <BlueprintSpines activeSection={activeSection} />}

            {/* SECTION 1: FEATURED */}
            <section id="featured" className="min-h-screen w-full p-5 flex flex-col justify-center relative overflow-hidden">
                <div className="w-full relative flex justify-between items-center max-w-7xl mx-auto">

                    {/* The anchored vinyl */}
                    <img
                        ref={orderImgRef}
                        src="/order.png"
                        alt=""
                        className="absolute right-0 top-1/2 -translate-y-1/2 h-[60vh] md:h-[85vh] pointer-events-none z-40"
                    />

                    <div className="w-full text-right z-10 pr-4 md:pr-10">
                        <h2 className="text-4xl md:text-8xl font-bold uppercase tracking-tighter">
                            SYSTEM_STATUS: ACTIVE
                        </h2>
                        <h3 ref={initiatedTextRef} className="text-xl md:text-2xl font-mono text-secondary h-[1.5em]"></h3>
                    </div>
                </div>
            </section>

            {/* ... (Archive Section) */}

            {/* SECTION 3: COMMUNITY */}
            <section id="community" className="min-h-screen w-full p-5 flex flex-col justify-center">
                <h2 className="text-3xl md:text-5xl font-semibold uppercase mb-16 text-center">
                    Community Directives
                </h2>
                <div ref={cardsContainerRef} className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
                    {[
                        { title: "Crowdsourced Context", text: "Every archive entry is a living document. We provide the technical metadata; you provide the history." },
                        { title: "The Global Listening Room", text: "Integrating live trending data to create a real-time map of our shared sonic landscape." },
                        { title: "Open Dialogue", text: "Through our archive logs, listeners connect over the technical nuances of their favorite albums." }
                    ].map((dir, i) => (
                        <div key={i} className="community-card border-l border-secondary pl-6">
                            <h6 className="text-xl font-bold uppercase mb-4">{dir.title}</h6>
                            <p className="text-lg opacity-80">{dir.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 5: SYSTEM */}
            <section id="system" className="min-h-screen w-full p-5 flex flex-col items-center justify-center">
                <h2 ref={pulseTitleRef} className="text-sm font-mono uppercase tracking-[0.5em] mb-12 text-secondary opacity-40 whitespace-nowrap">
                    System Pulse Synchronization
                </h2>
                <div className="w-full opacity-60 max-w-5xl">
                    <AudioVisualizer />
                </div>
                <img
                    src="vinyles.png"
                    alt="vinyles"
                    className="w-40 md:w-64 mt-20 animate-pulse grayscale opacity-40"
                />
            </section>
        </main>
    );
}