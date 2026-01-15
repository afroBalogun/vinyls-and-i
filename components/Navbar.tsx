import Link from "next/link";
import PlaybackClock from "./PlaybackClock";
import AuthButton from "./AuthButton";

export default function Navbar() {
    return (
        <nav className="fixed w-full px-5 md:px-10 py-4 flex justify-between border-zinc-200  z-90">
            <Link href="/" className="font-semibold font-mono text-sm tracking-widest text-zinc-700 hover:text-zinc-900 transition-colors">
                Vinyls & I
            </Link>

            <div className="flex gap-4">
                <Link href="/records" className="font-mono text-sm tracking-widest text-zinc-900 hover:text-zinc-700 transition-all cursor-pointer duration-200">
                    Records
                </Link>
                <Link href="/profile" className="font-mono text-sm tracking-widest text-zinc-900 hover:text-zinc-700 transition-all cursor-pointer duration-200">
                    Profile
                </Link>
            </div>

            <AuthButton/>
            <PlaybackClock />
        </nav>
    )
}