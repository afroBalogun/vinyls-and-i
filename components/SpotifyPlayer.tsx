"use client";

import { useState } from "react";

interface SpotifyPlayerProps {
    spotifyId: string;
    recordTitle: string;
}

const SpotifyPlayer = ({ spotifyId, recordTitle }: SpotifyPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="w-full space-y-2 font-mono">
            {/* Minimalist Trigger Bar */}
            <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-full border border-zinc-200 p-4 flex items-center justify-between group transition-all duration-300 hover:border-zinc-900 bg-white"
            >
                <div className="flex items-center gap-4">
                    {/* Signal Visualizer */}
                    <div className="w-6 h-6 flex items-center justify-center">
                        {isPlaying ? (
                            <div className="flex gap-[2px] items-end h-3">
                                <div className="w-[2px] bg-zinc-900 animate-[signal_0.8s_ease-in-out_infinite]" />
                                <div className="w-[2px] bg-zinc-900 animate-[signal_1.2s_ease-in-out_infinite_0.2s]" />
                                <div className="w-[2px] bg-zinc-900 animate-[signal_1s_ease-in-out_infinite_0.4s]" />
                            </div>
                        ) : (
                            <div className="w-2 h-2 rounded-full bg-zinc-300 group-hover:bg-zinc-900 transition-colors" />
                        )}
                    </div>

                    <div className="text-left">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-900">
                            {isPlaying ? "Audio_Signal_Active" : "Initialize_Playback"}
                        </p>
                        <p className="text-[9px] text-zinc-400 uppercase tracking-widest">
                            {recordTitle} // {spotifyId.slice(0, 8)}...
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                     <span className="text-[9px] text-zinc-400 group-hover:text-zinc-900 transition-colors uppercase">
                        {isPlaying ? "Terminate" : "Execute"}
                    </span>
                </div>
            </button>

            {/* Grayscale Player Embed */}
            {isPlaying && (
                <div className="animate-in fade-in slide-in-from-top-1 duration-500">
                    <iframe
                        src={`https://open.spotify.com/embed/album/${spotifyId}?utm_source=generator&theme=0`}
                        width="100%"
                        height="80" // Compact version
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="grayscale contrast-125 opacity-90 hover:opacity-100 transition-opacity"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default SpotifyPlayer;