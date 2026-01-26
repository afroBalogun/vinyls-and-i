"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUserDetails } from "@/lib/actions";

export default function ProfileEditForm({ user }: { user: any }) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);

    async function handleAction(formData: FormData) {
        setIsPending(true);
        try {
            await updateUserDetails(formData);
        } catch (error) {
            console.error(error);
            setIsPending(false);
        }
    }

    return (
        <form action={handleAction} className="space-y-10">
            <input type="hidden" name="userId" value={user.id} />

            <section className="space-y-6">
                <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400">01_Public_Identity</h2>
                
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono uppercase text-zinc-500">Display Name</label>
                    <input 
                        name="name"
                        defaultValue={user.name || ""}
                        className="border border-zinc-200 p-3 text-sm focus:border-secondary outline-none font-sans"
                        placeholder="IDENTIFIER"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono uppercase text-zinc-500">Profile Image URL</label>
                    <input 
                        name="image"
                        defaultValue={user.image || ""}
                        className="border border-zinc-200 p-3 text-xs font-mono focus:border-secondary outline-none opacity-50 bg-zinc-50"
                        placeholder="https://..."
                        readOnly
                    />
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400">02_Archivist_Notes</h2>
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono uppercase text-zinc-500">Biography</label>
                    <textarea
                        name="description"
                        rows={4}
                        defaultValue={user.bio || ""}
                        className="border border-zinc-200 p-3 text-sm focus:border-secondary outline-none"
                    />
                </div>
            </section>

            <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-secondary text-white px-8 py-4 text-[10px] font-mono uppercase tracking-widest hover:bg-black disabled:bg-zinc-300 transition-all hover:cursor-pointer duration-200"
                >
                    {isPending ? "UPDATING_MANIFEST..." : "Commit_Changes"}
                </button>
                
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="border border-zinc-200 px-8 py-4 text-[10px] font-mono uppercase tracking-widest hover:bg-zinc-50 transition-all hover:cursor-pointer duration-200"
                >
                    Abort_Changes
                </button>
            </div>
        </form>
    );
}