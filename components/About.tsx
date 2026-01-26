"use client";
import React, { useEffect, useRef, useState } from 'react';
import { ArchiveGrid } from "./ArchiveGrid";
import AudioVisualizer from "./AudioVisualizer";
import { BlueprintSpines } from "./BlueprintSpines";

export default function About() {
    const [activeSection, setActiveSection] = useState("idle");
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: "-10% 0px -10% 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            let found = false;
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                    found = true;
                }
            });

            if (!found && activeSection !== "idle") {
                const bounds = containerRef.current?.getBoundingClientRect();
                if (bounds && (bounds.top > window.innerHeight || bounds.bottom < 0)) {
                    setActiveSection("idle");
                }
            }
        }, observerOptions);

        const internalSections = containerRef.current?.querySelectorAll("section[id]");
        internalSections?.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [activeSection]);

    useEffect(() => {
        const observeContainer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observeContainer.observe(containerRef.current);
        }

        return () => observeContainer.disconnect();
    }, []);

    return (
        <main ref={containerRef} className="w-full text-secondary font-agdasima bg-primary">

            {isVisible && <BlueprintSpines activeSection={activeSection} />}

            {/* SECTION 1: FEATURED (Intro) */}
            <section id="featured" className="min-h-screen w-full p-5 flex flex-col justify-center relative overflow-hidden">
                <div className="w-full relative flex justify-between items-center">
                    <img
                        src="/order.png"
                        alt=""
                        className="animate-spin-slow -translate-x-1/2 md:h-[50vh] xl:h-[70vh] max-md:hidden opacity-20"
                    />
                    <div className="max-w-4xl text-right">
                        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                            SYSTEM_STATUS: ACTIVE
                        </h2>
                        <h3 className="text-xl font-mono text-secondary">ARCHIVE_INITIATED: 2026</h3>
                    </div>
                </div>
            </section>

            {/* SECTION 2: ARCHIVE (Mission) */}
            <section id="archive" className="min-h-screen w-full p-5 flex items-center justify-center bg-[#f4f4f4]/5">
                <div className="max-w-3xl text-center">
                    <p className="text-2xl md:text-4xl leading-tight">
                        The Deep Archive is a digital repository engineered to bridge the gap between
                        high-velocity streaming data and the physical legacy of 33⅓ RPM vinyl.
                        We don't just play music; we catalogue the vibration.
                    </p>
                    <ArchiveGrid />
                </div>
            </section>

            {/* SECTION 3: COMMUNITY (Directives) */}
            <section id="community" className="min-h-screen w-full p-5 flex flex-col justify-center">
                <h2 className="text-3xl md:text-5xl font-semibold uppercase mb-12 text-center">
                    Community Directives
                </h2>
                <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
                    {[
                        { title: "Crowdsourced Context", text: "Every archive entry is a living document. We provide the technical metadata; you provide the history." },
                        { title: "The Global Listening Room", text: "Integrating live trending data to create a real-time map of our shared sonic landscape." },
                        { title: "Open Dialogue", text: "Through our archive logs, listeners connect over the technical nuances of their favorite albums." }
                    ].map((dir, i) => (
                        <div key={i} className="border-l border-secondary pl-6">
                            <h6 className="text-xl font-bold uppercase mb-4">{dir.title}</h6>
                            <p className="text-lg opacity-80">{dir.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 4: LOGS (Ledger) */}
            <section id="logs" className="min-h-screen w-full p-5 flex flex-col items-center justify-center">
                <div className="w-full max-w-2xl">
                    <h2 className="text-3xl font-bold uppercase mb-8 italic">The Collaborative Ledger</h2>
                    <p className="mb-6 text-secondary font-mono text-sm">COMMUNITY_INPUT_NODE_REQ_01...</p>
                    <textarea
                        name="description"
                        rows={4}
                        className="w-full border border-zinc-200 p-3 text-sm focus:border-zinc-900 outline-none bg-transparent"
                        placeholder="ADD_TO_ARCHIVE_LOGS..."
                    />
                </div>
            </section>

            {/* SECTION 5: SYSTEM (Visuals) */}
            <section id="system" className="min-h-screen w-full p-5 flex flex-col items-center justify-center">
                <h2 className="text-sm font-mono uppercase tracking-[0.5em] mb-12 text-secondary">
                    System Pulse Synchronization
                </h2>
                <div className="w-full opacity-60 max-w-5xl">
                    <AudioVisualizer/>
                </div>
                <img
                    src="vinyles.png"
                    alt="vinyles"
                    className="w-64 mt-20 animate-pulse grayscale opacity-40"
                />
            </section>
        </main>
    );
}