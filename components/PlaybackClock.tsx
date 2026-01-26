"use client";
import { useEffect, useState } from "react";

export default function PlaybackClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return null;

  const hh = String(time.getHours()).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");
  const ss = String(time.getSeconds()).padStart(2, "0");

  return (
    <div className="fixed bottom-8 right-5 md:right-10 z-50 mix-blend-difference">
      <div className="flex items-baseline gap-1 font-mono text-[10px] tracking-tighter uppercase text-zinc-500">
        <span className="text-zinc-400">Time /</span>
        <span>{hh}</span>
        <span className="opacity-50 text-[8px]">'</span>
        <span>{mm}</span>
        <span className="opacity-50 text-[8px]">"</span>
        <span>{ss}</span>
      </div>
    </div>
  );
}