"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("CRITICAL_SYSTEM_FAILURE:", error);
    }, [error]);

    return (
        <main className="min-h-screen bg-primary text-secondary font-mono flex items-center justify-center p-5 selection:bg-zinc-200">
            <div className="max-w-2xl w-full border border-secondary/20 p-8 md:p-12 space-y-8 bg-white/50 backdrop-blur-sm relative overflow-hidden">

                {/* Error Header */}
                <header className="border-b border-secondary/10 pb-6">
                    <h1 className="text-xl font-bold tracking-[0.2em] uppercase text-red-600">
                        [Transmission_Failure]
                    </h1>
                    <p className="text-[10px] opacity-50 mt-2">
                        TIMESTAMP: {new Date().toISOString()} // REF_ID: {error.digest || "UNKNOWN"}
                    </p>
                </header>

                {/* Error Details */}
                <section className="space-y-4">
                    <p className="text-xs leading-relaxed uppercase tracking-wider">
                        The requested archival data could not be retrieved from the central database. The connection was terminated by the host.
                    </p>
                    <div className="bg-zinc-100 p-4 border border-zinc-200">
                        <p className="text-[10px] text-zinc-500 break-all uppercase italic">
                            Error_Log: "{error.message || "No specific error trace provided by the server."}"
                        </p>
                    </div>
                </section>

                {/* System Actions */}
                <footer className="pt-6 flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => reset()}
                        className="bg-secondary text-primary px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-black transition-all cursor-pointer"
                    >
                        Retry_Connection
                    </button>

                    <Link
                        href="/"
                        className="border border-secondary/20 px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-zinc-50 transition-all text-center"
                    >
                        Return_to_Hub
                    </Link>
                </footer>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-4 opacity-10 text-[8px] pointer-events-none">
                    SEC_LEVEL: 04 <br />
                    CORE_TEMP: NOMINAL
                </div>
            </div>

            {/* Grain/Noise Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50" />
        </main>
    );
}