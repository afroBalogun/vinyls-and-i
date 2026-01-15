"use client"; // Note: This page becomes a client component to handle the auto-fill state

import { useState } from "react";
import { createRecord } from "@/lib/actions";
import SpotifySearch from "@/components/SpotifySearch";

export default function NewRecordPage() {
    // State for the fields Spotify will fill
    const [formData, setFormData] = useState({
        title: "",
        artistName: "",
        year: "",
        albumCover: "",
        artistImage: "",
        spotifyId: "",
        tempo: "",
        key: "",
        loudness: "",
        metadataTagline: "", // Add these if they are in your form too
        etymology: "",
        description: ""
    });

    const [tracks, setTracks] = useState<any[]>([]);

    const handleSpotifyResult = (data: any) => {
        setFormData({
            title: data.title || "",
            artistName: data.artistName || "",
            year: data.year || "",
            albumCover: data.albumCover || "",
            artistImage: data.artistImage || "",
            spotifyId: data.spotifyId || "",
            tempo: data.tempo || "",
            key: data.key || "",
            loudness: data.loudness || "",
            metadataTagline: "DIGITAL PRESSING", // Default or from data
            etymology: "",
            description: ""
        });
        setTracks(data.tracks || []);
    };

    return (
        <main className="max-w-5xl mx-auto p-8 font-sans">
            <h1 className="text-2xl font-bold uppercase tracking-tighter mb-8">New_Archive_Entry</h1>

            {/* 1. The Search Bar */}
            <SpotifySearch
                onResult={handleSpotifyResult}
                onLoading={(val) => {
                    if (val) {
                        setFormData(prev => ({
                            ...prev,
                            title: "Fetching...",
                            artistName: "Fetching...",
                            year: "",
                            albumCover: "",
                            artistImage: "",
                            spotifyId: "",
                            tempo: "",
                            key: "",
                            loudness: ""
                        }));
                        setTracks([]);
                    }
                }}
            />

            {/* 2. The Main Form */}
            <form action={createRecord} className="space-y-12">
                {/* Hidden inputs */}
                <input type="hidden" name="trackListJson" value={JSON.stringify(tracks)} />
                <input type="hidden" name="loudness" value={formData.loudness} />

                {/* SECTION 01: PRIMARY METADATA */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-8 space-y-6">
                        <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-400 border-b pb-2">01_Primary_Identity</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">Title</label>
                                <input name="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="border border-zinc-200 p-3 text-sm focus:border-zinc-900 outline-none" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">Artist</label>
                                <input name="artistName" value={formData.artistName} onChange={(e) => setFormData({ ...formData, artistName: e.target.value })} className="border border-zinc-200 p-3 text-sm focus:border-zinc-900 outline-none" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-mono uppercase text-zinc-500">Metadata_Tagline</label>
                            <input name="metadataTagline" value={formData.metadataTagline} onChange={(e) => setFormData({ ...formData, metadataTagline: e.target.value })} placeholder="e.g. A THRESHOLD OF ANALOG CONSCIOUSNESS" className="border border-zinc-200 p-3 text-sm italic font-serif" />
                        </div>
                    </div>

                    {/* SECTION 02: TECHNICAL SPECS (Compact Side Column) */}
                    <div className="md:col-span-4 space-y-6">
                        <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-400 border-b pb-2">
                            02_Tech_Manifest
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {/* YEAR */}
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">Year</label>
                                <input
                                    name="year"
                                    value={formData.year}
                                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                    className="border border-zinc-200 p-3 text-xs font-mono focus:border-zinc-900 outline-none"
                                />
                            </div>

                            {/* CATALOG INDEX */}
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">Catalog_Index</label>
                                <div className="relative flex items-center">
                                    <span className="absolute left-3 font-mono text-xs text-zinc-400 select-none">VI-</span>
                                    <input
                                        name="catalogNumberOnly"
                                        className="w-full border border-zinc-200 p-3 pl-9 text-xs font-mono focus:border-zinc-900 outline-none"
                                    />
                                </div>
                            </div>

                            {/* TEMPO / BPM */}
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">BPM</label>
                                <input
                                    name="tempo"
                                    value={formData.tempo}
                                    onChange={(e) => setFormData({ ...formData, tempo: e.target.value })}
                                    className="border border-zinc-200 p-3 text-xs font-mono focus:border-zinc-900 outline-none"
                                />
                            </div>

                            {/* MUSICAL KEY */}
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">Key</label>
                                <input
                                    name="key"
                                    value={formData.key}
                                    onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                                    className="border border-zinc-200 p-3 text-xs font-mono focus:border-zinc-900 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 03: THE TRACKLIST (Large View) */}
                <section className="space-y-4">
                    <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-400 border-b pb-2">03_Tracklist_Manifest</h2>
                    <div className="border border-zinc-200 rounded-sm divide-y divide-zinc-100 max-h-[500px] overflow-y-auto bg-zinc-50/30">
                        {tracks.length > 0 ? tracks.map((track, index) => (
                            <div key={index} className="flex gap-6 items-start p-4 hover:bg-white transition-colors">
                                <span className="font-mono text-[10px] text-zinc-400 pt-1">{track.number}</span>
                                <div className="flex-1 space-y-2">
                                    <p className="text-xs font-bold uppercase tracking-tight">{track.title}</p>
                                    <textarea
                                        name={`track_story_${index}`}
                                        placeholder="Describe the sonic petrichor or narrative context..."
                                        className="w-full text-xs font-serif italic border-none bg-transparent p-0 focus:ring-0 resize-none"
                                        rows={2}
                                    />
                                </div>
                                <span className="font-mono text-[10px] text-zinc-500 pt-1">{track.duration}</span>
                            </div>
                        )) : (
                            <div className="p-12 text-center text-zinc-400 font-mono text-[10px] uppercase">No_Tracks_Loaded</div>
                        )}
                    </div>
                </section>

                {/* SECTION 04: NARRATIVE & ASSETS (Bottom Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-400 border-b pb-2">
                            04_Narrative_Analysis
                        </h2>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">
                                    Etymology
                                </label>
                                <textarea
                                    name="etymology"
                                    rows={4}
                                    className="border border-zinc-200 p-3 text-sm focus:border-zinc-900 outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">
                                    Full Description
                                </label>
                                <textarea
                                    name="description"
                                    rows={4}
                                    className="border border-zinc-200 p-3 text-sm focus:border-zinc-900 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-400 border-b pb-2">
                            05_Asset_Architecture
                        </h2>
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">
                                    Album_Cover_Source
                                </label>
                                <input
                                    name="albumCover"
                                    value={formData.albumCover}
                                    onChange={(e) => setFormData({ ...formData, albumCover: e.target.value })}
                                    className="border border-zinc-200 p-3 text-[10px] font-mono truncate focus:border-zinc-900 outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">
                                    Artist_Visual_Source
                                </label>
                                <input
                                    name="artistImage"
                                    value={formData.artistImage}
                                    onChange={(e) => setFormData({ ...formData, artistImage: e.target.value })}
                                    className="border border-zinc-200 p-3 text-[10px] font-mono truncate focus:border-zinc-900 outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500 flex justify-between">
                                    Internal_Spotify_ID
                                    {formData.spotifyId && (
                                        <span className="text-green-600 text-[8px] font-bold tracking-widest animate-pulse">
                                        // VERIFIED_OK
                                        </span>
                                    )}
                                </label>
                                <input
                                    name="spotifyId"
                                    value={formData.spotifyId || ""}
                                    readOnly
                                    className="border border-zinc-100 p-3 text-[10px] font-mono bg-zinc-50 text-zinc-400 cursor-not-allowed italic"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-zinc-900 text-white p-6 font-mono text-xs uppercase tracking-[0.4em] hover:bg-black transition-all mt-4 border border-zinc-900 hover:border-zinc-500"
                        >
                            Commit_Record_To_Archive
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
}