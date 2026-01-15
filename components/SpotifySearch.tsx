"use client";

import { useState } from "react";
import { searchSpotifyOptions, getDeepArchiveData } from "@/lib/spotify";

export default function SpotifySearch({ onResult, onLoading }: { onResult: (data: any) => void, onLoading: (val: boolean) => void }) {
    const [query, setQuery] = useState("");
    const [options, setOptions] = useState<any[]>([]);

    const handleSearch = async () => {
        const results = await searchSpotifyOptions(query);
        setOptions(results);
    };

    const handleSelect = async (album: any) => {
        onLoading(true);
        setOptions([]); // Clear list
        const deepData = await getDeepArchiveData(album.spotifyId);
        onResult({ ...album, ...deepData });
        onLoading(false);
        console.log(deepData);

    };

    return (
        <div className="space-y-4 mb-12">
            <div className="flex gap-2">
                <input
                    placeholder="Search Archive..."
                    className="flex-1 border p-3 font-mono text-xs uppercase"
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button type="button" onClick={handleSearch} className="bg-zinc-900 text-white px-6 text-[10px] font-mono">SEARCH</button>
            </div>

            {options.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-zinc-50 border border-zinc-200">
                    {options.map((album) => (
                        <button
                            key={`${album.spotifyId}`}
                            type="button"
                            onClick={() => handleSelect(album)}
                            className="text-left group space-y-2"
                        >
                            <img src={album.albumCover} className="aspect-square object-cover grayscale group-hover:grayscale-0 transition-all border border-zinc-300" />
                            <div>
                                <p className="text-[10px] font-bold truncate uppercase">{album.title}</p>
                                <p className="text-[9px] font-mono text-zinc-500">{album.artistName} • {album.year}</p>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}