"use client";

import { useEffect, useState } from "react";
import { createRecord, getNextCatalogNumber } from "@/lib/actions";
import SpotifySearch from "@/components/SpotifySearch";
import { useCurrentUser } from "@/auth-provider";

export default function NewRecordPage() {
    const currentUser = useCurrentUser();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [catNum, setCatNum] = useState("....");

    useEffect(() => {
        async function fetchCat() {
            const nextId = await getNextCatalogNumber();
            setCatNum(nextId);
        }
        fetchCat();
    }, []);

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
        metadataTagline: "DIGITAL PRESSING",
        etymology: "",
        description: "",
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
            metadataTagline: "DIGITAL PRESSING",
            etymology: "",
            description: ""
        });
        setTracks(data.tracks || []);
    };

    // Client-side validation & submission lock
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        if (!currentUser?.id) {
            event.preventDefault();
            alert("AUTHENTICATION_REQUIRED: No valid User_ID found.");
            return;
        }
        setIsSubmitting(true);
    }

    // We bind the userId to the action so the server-side action knows the author
    const createRecordWithId = createRecord.bind(null, currentUser?.id as string);

    return (
        <main className="max-w-7xl mx-auto py-20 px-5 md:px-20 font-sans text-secondary">
            <header className="mb-8">
                <h1 className="text-2xl font-bold uppercase tracking-tighter">New_Archive_Entry</h1>
                <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-1">
                    Status: {currentUser ? `Authenticated_as_${currentUser.id}` : "Awaiting_Auth..."}
                </p>
            </header>

            {/* 1. The Spotify Search Interface */}
            <SpotifySearch
                onResult={handleSpotifyResult}
                onLoading={(val) => {
                    if (val) {
                        setFormData(prev => ({
                            ...prev,
                            title: "FETCHING_DATA...",
                            artistName: "FETCHING_DATA..."
                        }));
                        setTracks([]);
                    }
                }}
            />

            {/* 2. The Main Archive Form */}
            <form
                action={createRecordWithId}
                onSubmit={handleSubmit}
                className={`space-y-12 transition-opacity duration-300 ${isSubmitting ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}
            >
                {/* Hidden Data Buffers */}
                <input type="hidden" name="trackListJson" value={JSON.stringify(tracks)} />
                <input type="hidden" name="loudness" value={formData.loudness} />
                <input type="hidden" name="spotifyId" value={formData.spotifyId} />

                {/* SECTION 01: PRIMARY METADATA */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-8 space-y-6">
                        <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-400 border-b pb-2">01_Primary_Identity</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">Title*</label>
                                <input
                                    required
                                    name="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="border border-zinc-200 p-3 text-sm focus:border-secondary outline-none placeholder:text-zinc-200"
                                    placeholder="ENTRY_TITLE"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">Artist*</label>
                                <input
                                    required
                                    name="artistName"
                                    value={formData.artistName}
                                    onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                                    className="border border-zinc-200 p-3 text-sm focus:border-secondary outline-none placeholder:text-zinc-200"
                                    placeholder="ARTIST_NAME"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-mono uppercase text-zinc-500">Metadata_Tagline</label>
                            <input
                                name="metadataTagline"
                                value={formData.metadataTagline}
                                onChange={(e) => setFormData({ ...formData, metadataTagline: e.target.value })}
                                className="border border-zinc-200 p-3 text-sm italic font-serif focus:border-secondary outline-none"
                            />
                        </div>
                    </div>

                    {/* SECTION 02: TECHNICAL MANIFEST */}
                    <div className="md:col-span-4 space-y-6">
                        <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-400 border-b pb-2">02_Tech_Manifest</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">Year</label>
                                <input
                                    name="year"
                                    value={formData.year}
                                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                    className="border border-zinc-200 p-3 text-xs font-mono focus:border-secondary outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">Catalog_Index</label>
                                <div className="relative flex items-center">
                                    <span className="absolute left-3 font-mono text-xs text-zinc-400 select-none">VI-</span>
                                    <input
                                        name="catalogNumberOnly"
                                        readOnly
                                        className="w-full border border-zinc-200 p-3 pl-9 text-xs font-mono bg-zinc-50/50 outline-none cursor-not-allowed"
                                        value={catNum}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">BPM</label>
                                <input
                                    name="tempo"
                                    value={formData.tempo}
                                    onChange={(e) => setFormData({ ...formData, tempo: e.target.value })}
                                    className="border border-zinc-200 p-3 text-xs font-mono focus:border-secondary outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">Key</label>
                                <input
                                    name="key"
                                    value={formData.key}
                                    onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                                    className="border border-zinc-200 p-3 text-xs font-mono focus:border-secondary outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 03: TRACKLIST MANIFEST */}
                <section className="space-y-4">
                    <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-400 border-b pb-2">03_Tracklist_Manifest</h2>
                    <div className="border border-zinc-200 rounded-sm divide-y divide-zinc-100 max-h-[400px] overflow-y-auto bg-zinc-50/30">
                        {tracks.length > 0 ? tracks.map((track, index) => (
                            <div key={index} className="flex gap-6 items-start p-4 hover:bg-white transition-colors">
                                <span className="font-mono text-[10px] text-zinc-400 pt-1">{track.number}</span>
                                <div className="flex-1 space-y-2">
                                    <p className="text-xs font-bold uppercase tracking-tight">{track.title}</p>
                                    <textarea
                                        name={`track_story_${index}`}
                                        placeholder="Add sonic context or narrative notes..."
                                        className="w-full text-xs font-serif italic border-none bg-transparent p-0 focus:ring-0 resize-none outline-none"
                                        rows={2}
                                    />
                                </div>
                                <span className="font-mono text-[10px] text-zinc-500 pt-1">{track.duration}</span>
                            </div>
                        )) : (
                            <div className="p-12 text-center text-zinc-400 font-mono text-[10px] uppercase">No_Tracks_Loaded_From_Search</div>
                        )}
                    </div>
                </section>

                {/* SECTION 04: NARRATIVE & ASSETS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-400 border-b pb-2">04_Narrative_Analysis</h2>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-mono uppercase text-zinc-500">Etymology</label>
                            <textarea
                                name="etymology"
                                rows={4}
                                className="border border-zinc-200 p-3 text-sm focus:border-secondary outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-mono uppercase text-zinc-500">Full Description</label>
                            <textarea
                                name="description"
                                rows={4}
                                className="border border-zinc-200 p-3 text-sm focus:border-secondary outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-400 border-b pb-2">05_Asset_Architecture</h2>
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">Album_Cover_URL</label>
                                <input
                                    name="albumCover"
                                    value={formData.albumCover}
                                    onChange={(e) => setFormData({ ...formData, albumCover: e.target.value })}
                                    className="border border-zinc-200 p-3 text-[10px] font-mono truncate focus:border-secondary outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">Artist_Image_URL</label>
                                <input
                                    name="artistImage"
                                    value={formData.artistImage}
                                    onChange={(e) => setFormData({ ...formData, artistImage: e.target.value })}
                                    className="border border-zinc-200 p-3 text-[10px] font-mono truncate focus:border-secondary outline-none"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-secondary text-white p-4 font-mono text-xs uppercase tracking-[0.4em] hover:bg-secondary/90 transition-all mt-4 border border-secondary hover:border-zinc-500 disabled:bg-zinc-400 disabled:cursor-wait hover:cursor-pointer duration-200"
                        >
                            {isSubmitting ? "COMMITTING_DATA..." : "Commit_Record_To_Archive"}
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
}