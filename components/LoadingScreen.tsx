"use client"
import { useEffect, useState } from "react";

export function LoadingScreen({ isFinished, onComplete }: { isFinished: boolean, onComplete: () => void }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isFinished) {
            setProgress(0);
        }
    }, [isFinished]);

    // Counter Logic
    useEffect(() => {
        if (!isFinished) {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(onComplete, 300);
                        return 100;
                    }
                    return prev + 2;
                });
            }, 15);
            return () => clearInterval(interval);
        }
    }, [isFinished, onComplete]);

    return (
        <div
            className={`fixed inset-0 z-200 bg-[#fdfdfd] flex flex-col items-center justify-center transition-transform duration-1000 ease-luxury ${
                isFinished ? "-translate-y-full" : "translate-y-0"
            }`}
        >
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase italic text-zinc-900">
                    Vinyls <span className="text-zinc-300">&</span> I.
                </h1>
            </div>

            <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20">
                <p className="text-7xl md:text-[12rem] font-bold tracking-tighter leading-none text-zinc-100 tabular-nums">
                    {progress.toString().padStart(3, '0')}
                </p>
                <div
                    className="h-px bg-zinc-900 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}