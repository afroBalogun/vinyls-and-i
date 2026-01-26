"use client"

import { signOut } from "@/lib/auth-client"; 
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignOutBtn() {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.refresh(); 
                },
            },
        });
    };

    return (
        <button
            onClick={handleSignOut}
            className="text-secondary opacity-40 hover:opacity-100 transition-opacity"
        >
            <LogOut className="w-3.5 h-3.5" />
        </button>
    )
}