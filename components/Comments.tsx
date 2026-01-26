"use client";

import React, { useEffect, useRef, useState } from 'react';
import { addComment } from '@/lib/actions';
import { useSession } from '@/lib/auth-client';
import { useCurrentUser } from '@/auth-provider';

interface CommentProps {
    recordId: string;
    initialComments: any[]; 
}

export default function RecordComments({ recordId, initialComments }: CommentProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const currentUser = useCurrentUser();

    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    
    const userId = currentUser?.id;
    const userName = currentUser?.name || "GUEST";
    console.log(initialComments)


    if (!mounted) return <div className="md:col-span-4 min-h-50" />;

    return (
        <section className="max-w-7xl mx-auto mt-32 px-6 pb-20 border-t border-zinc-100 pt-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-4 space-y-6">
                    <h3 className="text-[10px] font-mono tracking-[0.4em] uppercase text-zinc-400">Add Observation</h3>
                    <p className="text-zinc-400 mb-8 text-[9px] font-mono italic">
                        Field logs are permanently appended to the archive.
                    </p>
                    
                    {/* Hide form if not logged in, or show a 'Sign in' message */}
                    {userId ? (
                        <form
                            ref={formRef}
                            action={async (formData) => {
                                await addComment(recordId, userId, formData);
                                formRef.current?.reset();
                            }}
                            className="space-y-4"
                        >
                            <div className="flex flex-col gap-1">
                                <label className="text-[9px] font-mono uppercase text-zinc-500">ID_TAG</label>
                                <input
                                    readOnly
                                    value={userName}
                                    className="w-full bg-transparent border-b border-zinc-200 py-2 text-xs font-mono text-zinc-400 cursor-not-allowed outline-none uppercase"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[9px] font-mono uppercase text-zinc-500">Log_Entry</label>
                                <textarea
                                    name="text"
                                    placeholder="YOUR OBSERVATION..."
                                    rows={4}
                                    required
                                    className="w-full bg-transparent border-b border-zinc-200 py-2 text-sm focus:outline-none focus:border-zinc-900 transition-colors resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="text-[10px] font-bold uppercase tracking-widest border border-zinc-900 px-6 py-3 hover:bg-zinc-900 hover:text-white transition-all active:scale-95"
                            >
                                Submit Log
                            </button>
                        </form>
                    ) : (
                        <p className="text-[10px] font-mono text-red-500 uppercase border border-red-100 p-4">
                            AUTH_REQUIRED: Sign in via Spotify to append logs.
                        </p>
                    )}
                </div>

                <div className="md:col-span-8 space-y-12">
                    <h3 className="text-[10px] font-mono tracking-[0.4em] uppercase text-zinc-400 mb-8">Public Archive</h3>
                    <div className="space-y-10">
                        {initialComments.length > 0 ? initialComments.map((comment) => (
                            <div key={comment.id} className="group border-l-2 border-zinc-100 pl-8 relative py-1">
                                <div className="absolute -left-1.5 top-0 w-2.5 h-2.5 bg-[#fdfdfd] border-2 border-zinc-300 rounded-full z-10" />

                                <div className="flex items-center gap-4 mb-2">
                                    {/* Accessing the name via the included user object */}
                                    <span className="text-[10px] font-mono font-bold text-zinc-800 uppercase">
                                        {comment.user?.name || `ANONYMOUS_${comment.userId.substring(0, 6)}`}
                                    </span>
                                    <span className="text-[9px] font-mono text-zinc-400">
                                        {new Date(comment.createdAt).toLocaleDateString('en-GB').replace(/\//g, '.')}
                                    </span>
                                </div>
                                <p className="text-sm text-zinc-600 leading-relaxed italic">
                                    "{comment.text}"
                                </p>
                            </div>
                        )) : (
                            <p className="text-[10px] font-mono text-zinc-400 uppercase italic">No observations recorded for this entry.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}