"use client";

import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-primary border-t border-secondary/30 text-secondary font-mono p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* COLUMN 1: SYSTEM IDENTIFICATION */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-secondary animate-pulse" />
                        <h2 className="text-sm font-bold tracking-[0.2em]">DEEP_ARCHIVE // SYS_01</h2>
                    </div>
                    <p className="text-[10px] leading-relaxed opacity-60 max-w-[250px]">
                        A decentralized repository for the preservation of high-fidelity
                        sonic artifacts and community-driven metadata.
                    </p>
                    <div className="text-[10px] mt-4">
                        <span className="block">EST_INIT : 2026.01.15</span>
                        <span className="block">LOC_STATUS : NIGERIA_NODE_01</span>
                    </div>
                </div>

                {/* COLUMN 2: NAVIGATION NODES */}
                <div className="grid grid-cols-2 gap-4 text-[11px] uppercase tracking-widest">
                    <div className="flex flex-col gap-3">
                        <h3 className="opacity-40 mb-2 font-bold">Directories</h3>
                        <Link href="#featured" className="hover:text-secondary transition-colors">Featured</Link>
                        <Link href="/records" className="hover:text-secondary transition-colors">Records</Link>
                        <Link href="/community-feed" className="hover:text-secondary transition-colors">Community</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="opacity-40 mb-2 font-bold">External</h3>
                        <Link href="https://developer.spotify.com/documentation/web-api" className="hover:text-secondary transition-colors">Spotify_API</Link>
                        <Link href="https://github.com/afroBalogun/vinyls-and-i" className="hover:text-secondary transition-colors">GitHub_Src</Link>
                        <Link href="#" className="hover:text-secondary transition-colors">Documentation</Link>
                    </div>
                </div>

                {/* COLUMN 3: LOG SUBMISSION */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-[11px] uppercase tracking-widest opacity-40 font-bold">
                        Append_To_Archive
                    </h3>
                    <textarea
                        name="description"
                        rows={4}
                        className="border border-zinc-200 p-3 text-sm focus:border-secondary outline-none bg-transparent w-full text-secondary"
                        placeholder="Input final archival notes..."
                    />
                    <button className="mt-2 text-[10px] border border-secondary py-2 px-4 hover:bg-secondary hover:text-white transition-all uppercase font-bold self-start">
                        Transmit_Log
                    </button>
                </div>
            </div>

            {/* BOTTOM BAR: TECHNICAL READOUT */}
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-secondary/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] opacity-40 uppercase tracking-[0.3em]">
                <div>© {currentYear} // ALL_RIGHTS_RESERVED // SYSTEM_NULL</div>
                <div className="flex gap-8">
                    <span>Lat: 6.5244° N</span>
                    <span>Lon: 3.3792° E</span>
                    <span className="animate-pulse">Connection: Secure</span>
                </div>
            </div>
        </footer>
    );
}