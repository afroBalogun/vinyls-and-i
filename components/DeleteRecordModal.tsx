"use client";

import { useState } from "react";
import { deleteRecord } from "@/lib/actions";

export default function DeleteRecordModal({ id, title }: { id: string; title: string }) {
    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) return (
        <button onClick={() => setIsOpen(true)} className="text-zinc-400 hover:text-red-600 transition-colors">
            TERMINATE_ENTRY
        </button>
    );

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white p-8 max-w-sm w-full border border-zinc-900 shadow-2xl space-y-6">
                <div className="space-y-2">
                    <h3 className="font-bold uppercase tracking-tighter text-xl">Confirm Deletion</h3>
                    <p className="text-xs font-mono text-zinc-500">You are about to remove <span className="text-zinc-900 font-bold">"{title}"</span> from the permanent archive.</p>
                </div>
                
                <div className="flex flex-col gap-2">
                    <button 
                        onClick={async () => {
                            await deleteRecord(id);
                            setIsOpen(false);
                        }}
                        className="bg-red-600 text-white p-3 text-[10px] font-mono uppercase hover:bg-red-700"
                    >
                        Confirm_Delete
                    </button>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="bg-zinc-100 text-zinc-900 p-3 text-[10px] font-mono uppercase hover:bg-zinc-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}