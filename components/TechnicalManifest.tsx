// components/record/TechnicalManifest.tsx
"use client";
import { useState } from "react";

export default function TechnicalManifest({ record }: { record: any }) {
    const [showJson, setShowJson] = useState(false);

    return (
        <div className="border border-zinc-200 bg-zinc-50 p-6 font-mono text-[10px] uppercase tracking-wider">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-zinc-400">System_Output // Technical_Specs</h3>
                <button 
                    onClick={() => setShowJson(!showJson)}
                    className="hover:bg-zinc-900 hover:text-white px-2 py-1 border border-zinc-900 transition-colors"
                >
                    {showJson ? "Close_Source" : "View_Source"}
                </button>
            </div>

            {!showJson ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <p className="text-zinc-500 mb-1">Tempo</p>
                        <p className="text-sm font-bold">{record.tempo}</p>
                    </div>
                    <div>
                        <p className="text-zinc-500 mb-1">Harmonic_Key</p>
                        <p className="text-sm font-bold">{record.key}</p>
                    </div>
                    <div>
                        <p className="text-zinc-500 mb-1">Loudness</p>
                        <p className="text-sm font-bold">{record.loudness}</p>
                    </div>
                    <div>
                        <p className="text-zinc-500 mb-1">Spotify_ID</p>
                        <p className="text-sm font-bold truncate">{record.spotifyId}</p>
                    </div>
                </div>
            ) : (
                <pre className="bg-zinc-900 text-green-400 p-4 overflow-x-auto lowercase normal-case text-[11px]">
                    {JSON.stringify({
                        id: record.id,
                        technical: {
                            bpm: record.tempo,
                            key: record.key,
                            db: record.loudness
                        },
                        source: "Spotify API v1"
                    }, null, 2)}
                </pre>
            )}
        </div>
    );
}