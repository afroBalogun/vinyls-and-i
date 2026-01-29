import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/db";
import Link from 'next/link';
import { redirect } from "next/navigation";

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect("/login")
    }
    const user = await prisma.user.findUnique({
        where: { id: id },
        include: {
            savedRecords: true,
            observations: true,
        }
    });

    if (!user) return null;

    const isOwner = currentUser?.id === user.id;

    return (
        <main className="min-h-screen bg-primary text-secondary font-sans selection:bg-zinc-200 py-20 px-5 md:px-20 overflow-x-hidden">
            {/* HEADER: Archive Identity */}
            <header className="max-w-7xl mx-auto mb-24 flex flex-col md:flex-row justify-between md:items-end gap-8 border-b border-secondary pb-12">
                <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-[0.5em] text-zinc-400 uppercase">Archive Identity</span>
                    <h1 className="text-5xl md:text-9xl font-bold tracking-tighter leading-none">
                        {user.name}<span className="text-zinc-300">.</span>
                    </h1>
                </div>
                <div className="text-right font-mono text-[10px] flex flex-col md:items-end space-y-1 uppercase tracking-widest text-zinc-500">
                    <div className="flex flex-col sm:flex-row gap-3 mb-4">
                        {/* THE EDIT BUTTON */}
                        {isOwner && (
                            <Link
                                href={`/profile/${user.id}/edit`}
                                className="rounded-none border-secondary/20 font-mono text-[10px] hover:bg-zinc-100 transition-all px-4 py-2 w-max border bg-transparent text-secondary"
                            >
                                [Modify_Profile]
                            </Link>
                        )}

                        <Link
                            href={`/profile/${user.id}/records`}
                            className="rounded-none border-secondary font-mono text-[10px] hover:bg-secondary/90 hover:text-white transition-all px-4 py-2 w-max border bg-secondary text-primary"
                        >
                            Catalogue Inventory
                        </Link>
                    </div>
                    <p>Status: {user.role === 'ADMIN' ? 'Lead Curator' : 'Active Curator'}</p>
                    <p>ID: {user.archiveId}</p>
                    <p>Since: {new Date(user.createdAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }).toUpperCase()}</p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
                {/* LEFT SIDE: Bio & Stats */}
                <div className="md:col-span-4 space-y-12">
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-mono tracking-[0.4em] uppercase text-zinc-400">Biography</h3>
                        <p className="text-sm leading-relaxed text-zinc-600 italic">
                            "{user.bio || 'No editorial bio provided.'}"
                        </p>
                    </div>

                    <div className="pt-12 border-t border-zinc-100">
                        <h3 className="text-[10px] font-mono tracking-[0.4em] uppercase text-zinc-400 mb-6">Archive Statistics</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-zinc-50 p-4 border border-zinc-100">
                                <p className="text-2xl font-bold">{user.savedRecords.length}</p>
                                <p className="text-[9px] font-mono text-zinc-400 uppercase">Saved Items</p>
                            </div>
                            <div className="bg-zinc-50 p-4 border border-zinc-100">
                                <p className="text-2xl font-bold">{user.observations.length}</p>
                                <p className="text-[9px] font-mono text-zinc-400 uppercase">Observations</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: The Live Collection */}
                <div className="md:col-span-8 space-y-12">
                    <h3 className="text-[10px] font-mono tracking-[0.4em] uppercase text-zinc-400">Saved Records</h3>

                    <div className="space-y-0 border-t border-secondary">
                        {user.savedRecords.length > 0 ? (
                            user.savedRecords.map((record) => (
                                <Link key={record.id} href={`/records/${record.slug}`} className="group flex justify-between items-center py-8 border-b border-zinc-100 hover:bg-zinc-50 transition-colors px-4">
                                    <div className="flex gap-6 items-center">
                                        <span className="font-mono text-[10px] text-zinc-300">[{record.catalogNumber}]</span>
                                        <div>
                                            <h4 className="text-2xl font-bold tracking-tighter uppercase group-hover:italic transition-all">
                                                {record.title}
                                            </h4>
                                            <p className="text-[10px] text-zinc-400 uppercase tracking-widest">{record.artistName}</p>
                                        </div>
                                    </div>
                                    <div className="text-right hidden md:block">
                                        <span className="text-[10px] font-mono uppercase text-zinc-300 group-hover:text-secondary">View File →</span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="py-20 text-center border-b border-zinc-100">
                                <p className="text-[10px] font-mono uppercase text-zinc-300 italic">Archive is currently empty.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-100" />
        </main>
    );
}