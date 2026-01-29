"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import AudioVisualizer from "@/components/AudioVisualizer";
import Pagination from "./Pagination";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function FeedClient({ initialRecords, currentPage, totalPages }: { initialRecords: any[], currentPage: number, totalPages: number }) {
    const [viewMode, setViewMode] = useState<"album" | "list">("album");
    const container = useRef(null);
    
    // Initial page load animation
    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1 } });

        tl.from(".feed-header", { y: -20, opacity: 0 })
          .from(".feed-item", { 
                y: 30, 
                opacity: 0, 
                stagger: 0.1,
                clearProps: "all" 
          }, "-=0.5");
    }, { scope: container });

    // Handle View Toggle Animation
    const handleViewChange = (newMode: "album" | "list") => {
        if (newMode === viewMode) return;
        
        gsap.to(".view-content", {
            opacity: 0,
            y: 10,
            duration: 0.3,
            onComplete: () => {
                setViewMode(newMode);
                gsap.fromTo(".view-content", 
                    { opacity: 0, y: -10 }, 
                    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
                );
            }
        });
    };

    return (
        <main ref={container} className="w-full py-24 px-5 md:px-20 font-mono text-secondary min-h-screen max-w-7xl mx-auto">
            <header className="feed-header mb-12 border-b border-secondary/20 pb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold uppercase tracking-tighter">Community_Feed</h1>
                    <div className="flex gap-4 mt-2">
                        <button
                            onClick={() => handleViewChange("album")}
                            className={`text-[10px] uppercase tracking-widest ${viewMode === 'album' ? 'font-bold underline' : 'opacity-40'} transition-all hover:cursor-pointer duration-200`}
                        >
                            [01]_Album_View
                        </button>
                        <button
                            onClick={() => handleViewChange("list")}
                            className={`text-[10px] uppercase tracking-widest ${viewMode === 'list' ? 'font-bold underline' : 'opacity-40'} transition-all hover:cursor-pointer duration-200`}
                        >
                            [02]_Data_List
                        </button>
                    </div>
                </div>
                <Link href="/dashboard/new">
                    <button className="border border-secondary px-6 py-2 text-[10px] uppercase hover:bg-secondary hover:text-white transition-all hover:cursor-pointer duration-200">
                        + Post_Record
                    </button>
                </Link>
            </header>

            <div className="view-content">
                {viewMode === "album" ? (
                    <div className="space-y-16">
                        {initialRecords.map((record) => (
                            <Link key={record.id} href={`/records/${record.slug}`} className="block group feed-item">
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="w-full md:w-1/3 aspect-square bg-zinc-100 border border-secondary/10 flex items-center justify-center relative overflow-hidden">
                                        <img 
                                            src={record.artistImage} 
                                            className="w-48 h-48 object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                                            alt="" 
                                        />
                                        <div className="absolute inset-0 border-12 border-white/20 pointer-events-none" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h2 className="text-2xl font-bold uppercase group-hover:translate-x-2 transition-transform duration-300">{record.title}</h2>
                                            <Link href={`/profile/${record.authorId}`} className="text-[10px] opacity-50 uppercase mb-4">
                                                {record.author?.name} // {new Date(record.createdAt).toLocaleDateString()}
                                            </Link>
                                            <h3 className="text-lg opacity-60 mb-4">{record.artistName}</h3>
                                            <p className="text-sm italic">"{record.description}"</p>
                                        </div>
                                        <div className="mt-8 opacity-20 group-hover:opacity-100 group-hover:-translate-y-1.25 transition-all duration-500">
                                            <AudioVisualizer />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="border border-secondary/10 view-content">
                        <div className="grid grid-cols-12 gap-4 p-4 border-b border-secondary/20 text-[10px] uppercase opacity-50 font-bold">
                            <div className="col-span-1">#</div>
                            <div className="col-span-4">Record_Title</div>
                            <div className="col-span-3">Artist</div>
                            <div className="col-span-2">Contributor</div>
                            <div className="col-span-2 text-right">Date</div>
                        </div>
                        {initialRecords.map((record, i) => (
                            <Link key={record.id} href={`/records/${record.slug}`} className="feed-item block">
                                <div className="grid grid-cols-12 gap-4 p-4 border-b border-secondary/5 hover:bg-secondary/5 transition-colors text-xs uppercase items-center group">
                                    <div className="col-span-1 opacity-30">{(i + 1).toString().padStart(2, '0')}</div>
                                    <div className="col-span-4 font-bold group-hover:underline group-hover:translate-x-1 transition-transform">{record.title}</div>
                                    <div className="col-span-3 opacity-70">{record.artistName}</div>
                                    <div className="col-span-2 text-[10px]">{record.author?.name}</div>
                                    <div className="col-span-2 text-right opacity-50">{new Date(record.createdAt).toLocaleDateString()}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-20">
                <Pagination current={currentPage} total={totalPages} />
            </div>
        </main>
    );
}