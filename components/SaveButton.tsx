"use client";
import { useState } from "react";
import { toggleSaveRecord } from "@/lib/actions";
import { useSession } from "@/lib/auth-client";

interface SaveButtonProps {
    recordId: string;
    initialSaved: boolean;
}

const SaveButton = ({ recordId, initialSaved }: SaveButtonProps) => {
    const { data: session } = useSession();
    const userId = session?.user?.id;



    const [isSaved, setIsSaved] = useState(initialSaved);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = async () => {
        if (!userId || isLoading) return;
        
        setIsLoading(true);
        const newState = !isSaved;
        setIsSaved(newState);

        try {
            await toggleSaveRecord(recordId, userId, isSaved);
        } catch (error) {
            // Revert if it fails
            setIsSaved(!newState);
            console.error("Archive sync failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!userId) return null;

    return (
        <button
            onClick={handleToggle}
            disabled={isLoading}
            className={`flex items-center gap-3 group transition-opacity ${isLoading ? 'opacity-50' : 'opacity-100'}`}
        >
            <div className={`w-4 h-4 border border-zinc-900 flex items-center justify-center transition-all ${isSaved ? 'bg-zinc-900' : 'bg-transparent'}`}>
                {isSaved && <div className="w-1 h-1 bg-white" />}
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] group-hover:underline">
                {isSaved ? "Stored in Archive" : "Add to Archive"}
            </span>
        </button>
    );
};

export default SaveButton;