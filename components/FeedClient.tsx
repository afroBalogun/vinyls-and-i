"use client";

import { useState } from "react";
import Link from "next/link";
import AudioVisualizer from "@/components/AudioVisualizer";
import Pagination from "./Pagination";

export default function FeedClient({ initialRecords, currentPage, totalPages }: { initialRecords: any[], currentPage: number, totalPages: number }) {
    const [viewMode, setViewMode] = useState<"album" | "list">("album");

    return (
        <main className="w-full py-24 px-5 md:px-20 font-mono text-secondary min-h-screen">
            <header className="mb-12 border-b border-secondary/20 pb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold uppercase tracking-tighter">Community_Feed</h1>
                    <div className="flex gap-4 mt-2">
                        <button
                            onClick={() => setViewMode("album")}
                            className={`text-[10px] uppercase tracking-widest ${viewMode === 'album' ? 'font-bold underline' : 'opacity-40'} transition-all hover:cursor-pointer duration-200`}
                        >
                            [01]_Album_View
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
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

            {viewMode === "album" ? (
                // Album view
                <div className="space-y-16">
                    {initialRecords.map((record) => (
                        <Link key={record.id} href={`/records/${record.slug}`} className="block group">
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="w-full md:w-1/3 aspect-square bg-primaryborder border-secondary/10 flex items-center justify-center relative overflow-hidden">
                                    <img src={record.artistImage} className="w-48 h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                                    <div className="absolute inset-0 border-10 border-white/20 pointer-events-none" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold uppercase">{record.title}</h2>
                                        <p className="text-[10px] opacity-50 uppercase mb-4">
                                            {record.author?.name} // {new Date(record.createdAt).toLocaleDateString()}
                                        </p>
                                        <h3 className="text-lg opacity-60 mb-4">{record.artistName}</h3>
                                        <p className="text-sm italic">"{record.description}"</p>
                                    </div>
                                    <div className="mt-8 opacity-20 group-hover:opacity-100">
                                        <AudioVisualizer />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (

                // List view
                <div className="border border-secondary/10">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-secondary/20 text-[10px] uppercase opacity-50 font-bold">
                        <div className="col-span-1">#</div>
                        <div className="col-span-4">Record_Title</div>
                        <div className="col-span-3">Artist</div>
                        <div className="col-span-2">Contributor</div>
                        <div className="col-span-2 text-right">Date</div>
                    </div>
                    {initialRecords.map((record, i) => (
                        <Link key={record.id} href={`/records/${record.slug}`}>
                            <div className="grid grid-cols-12 gap-4 p-4 border-b border-secondary/5 hover:bg-primarytransition-colors text-xs uppercase items-center group">
                                <div className="col-span-1 opacity-30">{(i + 1).toString().padStart(2, '0')}</div>
                                <div className="col-span-4 font-bold group-hover:underline">{record.title}</div>
                                <div className="col-span-3 opacity-70">{record.artistName}</div>
                                <div className="col-span-2 text-[10px]">{record.author?.name}</div>
                                <div className="col-span-2 text-right opacity-50">{new Date(record.createdAt).toLocaleDateString()}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            <Pagination current={currentPage} total={totalPages} />
        </main>
    );
}