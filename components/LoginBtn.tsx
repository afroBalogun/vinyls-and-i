"use client"
import { useCurrentUser } from "@/auth-provider";
import Link from "next/link";
import SignOutBtn from "./SignOutBtn";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function LoginBtn() {
    const currentUser = useCurrentUser();

    if (currentUser) {
        return (
            <div className="flex items-center gap-4">
                <Link href="/profile" className="flex items-center gap-2 group cursor-pointer">
                    <Avatar className="w-6 h-6 grayscale border border-secondary/20">
                        <AvatarImage src={currentUser.image || ""} />
                        <AvatarFallback className="text-[10px] bg-transparent">
                            {currentUser.name?.[0]}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-[10px] font-mono uppercase tracking-tight text-secondary">
                        {currentUser.name?.split(' ')[0] || "User"}
                    </span>
                </Link>
                <SignOutBtn />
            </div>
        )
    }

    return (
        <Link 
            href="/login" 
            className="rounded-none border-secondary/30 border font-mono text-[10px] uppercase tracking-widest hover:bg-secondary hover:text-white transition-all h-8 px-4 flex items-center"
        >
            Login
        </Link>
    )
}