import { Suspense } from "react";
import AuthButton from "@/components/AuthButton";

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-primary text-secondary font-mono flex items-center justify-center p-5 relative overflow-hidden">
            <div className="absolute top-10 left-10 opacity-20 text-[8px] leading-relaxed hidden md:block">
                PROTOCOL: AUTH_GATE_v2.0.4<br />
                ENCRYPTION: AES_256_GCM<br />
                STATUS: AWAITING_CREDENTIALS
            </div>

            <div className="max-w-sm w-full border border-secondary/20 p-5 bg-white/40 backdrop-blur-md relative z-10">
                <header className="mb-10 space-y-2 border-b border-secondary/10 pb-6">
                    <span className="text-[10px] tracking-[0.4em] text-zinc-400 uppercase">System_Access</span>
                    <h1 className="text-2xl font-bold tracking-tighter uppercase italic">
                        Login_Portal<span className="text-zinc-300">_</span>
                    </h1>
                </header>

                <div className="space-y-8">
                    <p className="text-[11px] leading-relaxed text-zinc-500 uppercase tracking-wide">
                        Authorized personnel only. Please verify your curator identity to access the central archive and manage your inventory.
                    </p>

                    <div className="space-y-4">
                        <Suspense fallback={<div className="h-12 w-full bg-zinc-100 animate-pulse" />}>
                            <div className="group relative flex flex-col gap-5">
                                <AuthButton
                                    authProvider="google"
                                />
                                <AuthButton
                                    authProvider="github"
                                />
                            </div>
                        </Suspense>
                    </div>

                    <div className="pt-4 border-t border-secondary/10">
                        <p className="text-[9px] text-zinc-400 uppercase leading-loose">
                            By proceeding, you acknowledge that all archival transmissions are logged and monitored by the Lead Curator.
                        </p>
                    </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-secondary/30" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-secondary/30" />
            </div>

            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50" />

            <div className="absolute bottom-10 right-10 opacity-20 text-[8px] font-mono">
                [ ARCHIVE_VERSION_2026.01 ]
            </div>
        </main>
    );
}