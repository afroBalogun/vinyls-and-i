import Link from "next/link";
import { Suspense } from "react";
import LoginBtn from "./LoginBtn";
import { getCurrentUser } from "@/lib/auth";

export default async function Navbar() {
    const currentUser = await getCurrentUser();
    return (
        <nav className="fixed w-full px-4 md:px-10 py-4 flex flex-wrap items-center justify-between border-b border-zinc-200/50 bg-primary backdrop-blur-md z-100">
            {/* Logo */}
            <Link href="/" className="font-semibold font-mono text-sm tracking-widest text-secondary hover:text-zinc-900 transition-colors">
                Vinyls & I
            </Link>

            {/* Links - Scrollable on very small screens */}
            <div className="flex order-3 w-full mt-4 md:mt-0 md:w-auto md:order-2 gap-4 md:gap-8 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                <Link href="/community-feed" className="font-mono text-[10px] md:text-xs tracking-widest text-secondary hover:text-zinc-500 transition-all uppercase whitespace-nowrap">
                    Community
                </Link>
                <Link href="/records" className="font-mono text-[10px] md:text-xs tracking-widest text-decondary hover:text-zinc-500 transition-all uppercase whitespace-nowrap">
                    Records
                </Link>
                <Link href={`/profile/${currentUser?.id}`} className="font-mono text-[10px] md:text-xs tracking-widest text-secondary hover:text-zinc-500 transition-all uppercase whitespace-nowrap">
                    Profile
                </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 md:gap-6 order-2 md:order-3">
                <Suspense fallback={<div className="w-10 h-4 bg-zinc-100 animate-pulse" />}>
                    <LoginBtn />
                </Suspense>
            </div>
        </nav>
    )
}