"use client"
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signIn, signOut } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { useCurrentUser } from "@/auth-provider";
import { FaGithub, FaGoogle } from "react-icons/fa";


export default function AuthButton({ authProvider }: { authProvider: string }) {
    const currentUser = useCurrentUser();

    const signInBtn = async () => {
        await signIn.social({
            provider: authProvider,
        })
    };

    if (currentUser) {
        return (
            <div className="flex items-center gap-4">
                <Link href="/profile" className="flex items-center gap-2 group cursor-pointer">
                    <Avatar className="w-6 h-6 grayscale border border-secondary/20">
                        <AvatarImage src={currentUser.image || ""} />
                        <AvatarFallback className="text-[10px] bg-transparent">{currentUser.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-[10px] font-mono uppercase tracking-tight text-secondary">
                        {currentUser.name?.split(' ')[0] || "User"}
                    </span>
                </Link>
                <button
                    onClick={() => signOut()}
                    className="text-secondary opacity-40 hover:opacity-100 transition-opacity"
                >
                    <LogOut className="w-3.5 h-3.5" />
                </button> 
            </div>
        );
    }

    return (
        <Button
            onClick={signInBtn}
            variant="outline"
            className="w-full rounded-none border-secondary/30 font-mono text-[10px] uppercase tracking-widest hover:bg-secondary hover:text-white transition-all h-10 px-4 hover:cursor-pointer duration-200"
        >
            {
                authProvider === "github" ?
                    <FaGithub className="w-3 h-3 mr-2" />
                    : < FaGoogle className="w-3 h-3 mr-2" />

            }
            Connect_ID using {authProvider}
        </Button>
    )
}