"use client";

import { useState } from "react";

interface SpotifyPlayerProps {
    spotifyId: string;
    recordTitle: string;
}

const SpotifyPlayer = ({ spotifyId, recordTitle }: SpotifyPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="space-y-4 duration-200 transition-all">
            {/* The Trigger Button */}
            <div
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-[#18181b] text-white p-4 rounded-md flex items-center justify-between group cursor-pointer hover:bg-black transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 ${isPlaying ? 'bg-[#1DB954]' : 'bg-[#1DB954]'} rounded-full flex items-center justify-center transition-all`}>
                        {isPlaying ? (
                            <div className="flex gap-0.5 items-center">
                                <div className="w-1 h-3 bg-black animate-[pulse_0.8s_ease-in-out_infinite]" />
                                <div className="w-1 h-4 bg-black animate-[pulse_1.2s_ease-in-out_infinite]" />
                                <div className="w-1 h-2 bg-black animate-[pulse_1s_ease-in-out_infinite]" />
                            </div>
                        ) : (
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black">
                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.491 17.306c-.215.353-.671.462-1.024.247-2.813-1.718-6.353-2.107-10.521-1.155-.404.092-.808-.162-.9-.566-.092-.404.162-.808.566-.9 4.562-1.043 8.47-.6 11.612 1.32.353.215.462.671.247 1.024zm1.466-3.263c-.271.44-.847.579-1.287.308-3.22-1.977-8.125-2.551-11.93-1.397-.494.15-1.018-.129-1.167-.623-.149-.495.13-1.019.624-1.167 4.346-1.319 9.763-.67 13.454 1.593.44.27.579.847.308 1.287zm.129-3.393c-3.858-2.291-10.218-2.503-13.886-1.389-.591.18-1.218-.155-1.398-.746-.179-.591.155-1.219.746-1.398 4.218-1.28 11.238-1.029 15.65 1.593.533.317.707 1.002.39 1.535-.316.533-1.001.707-1.535.39z" />
                            </svg>
                        )}
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest leading-none">
                            {isPlaying ? "Now Playing" : "Play Album on Spotify"}
                        </p>
                        <p className="text-[9px] text-zinc-500 font-mono tracking-tighter">REF: {spotifyId}</p>
                    </div>
                </div>
                <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">
                    {isPlaying ? "[ CLOSE ]" : "[ PLAY ]"}
                </span>
            </div>

            {/* The Actual Iframe Player */}
            {isPlaying && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-700">
                    <iframe
                        src={`https://open.spotify.com/embed/album/${spotifyId}?utm_source=generator&theme=0`}
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="rounded-sm filter grayscale contrast-125 invert-[0.05]"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default SpotifyPlayer;