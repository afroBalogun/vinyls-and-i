import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/db";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import DeleteRecordModal from "@/components/DeleteRecordModal";

export default async function PublicProfileArchive({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ page?: string }>
}) {
    const { id: profileId } = await params; 
    const { page } = await searchParams;
    const currentUser = await getCurrentUser();
    
    const isOwner = currentUser?.id === profileId;

    // Pagination Logic
    const itemsPerPage = 12;
    const currentPage = Number(page) || 1;

    const [records, totalRecords, profileOwner] = await Promise.all([
        prisma.record.findMany({
            where: { authorId: profileId },
            orderBy: { catalogNumber: 'asc' },
            take: itemsPerPage,
            skip: (currentPage - 1) * itemsPerPage,
        }),
        prisma.record.count({ where: { authorId: profileId } }),
        prisma.user.findUnique({ where: { id: profileId } })
    ]);

    const totalPages = Math.ceil(totalRecords / itemsPerPage);

    return (
        <main className="p-5 max-w-7xl mx-auto font-sans py-20 text-secondary">
            {/* Header: Minimalist & Archival */}
            <header className="flex max-md:flex-col justify-between gap-5 items-baseline border-b border-zinc-200 pb-8 mb-12">
                <div>
                    <h1 className="text-2xl md:text-4xl font-bold tracking-[ -0.05em] uppercase italic font-serif">
                        {profileOwner?.name || "Archive"}_Collection
                    </h1>
                    <div className="flex gap-4 mt-2">
                        <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                            Total_Entries: {totalRecords}
                        </p>
                        <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                            Loc: {profileId.slice(0, 8)}...
                        </p>
                    </div>
                </div>

                {isOwner && (
                    <Link 
                        href={`/dashboard/records/`} 
                        className="border border-secondary text-secondary px-6 py-2 text-[10px] font-mono uppercase hover:bg-secondary hover:text-white transition-all tracking-widest"
                    >
                        Manage Records
                    </Link>
                )}
            </header>

            {/* The Manifest Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                {records.map(record => (
                    <Link href={`/records/${record.id}`} key={record.id} className="group flex flex-col gap-4">
                        {/* Record Visual Container */}
                        <div className="aspect-square bg-zinc-100 border border-zinc-200 overflow-hidden relative">
                            {record.albumCover ? (
                                <img 
                                    src={record.albumCover} 
                                    alt={record.title} 
                                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-zinc-400">
                                    NO_VISUAL_ASSET
                                </div>
                            )}
                        </div>

                        {/* Record Metadata */}
                        <div className="space-y-1">
                            <div className="flex justify-between items-start">
                                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-tighter">
                                    VI-{record.catalogNumber || "N/A"} // {record.year || "----"}
                                </span>
                                <span className="text-[9px] font-mono text-zinc-500">
                                    {record.tempo} BPM
                                </span>
                            </div>
                                <h3 className="text-sm font-bold uppercase tracking-tight leading-none group-hover:underline">{record.title}</h3>
                            <p className="text-xs text-zinc-500 uppercase font-medium">{record.artistName}</p>
                            
                            <div className="flex gap-2 pt-2">
                                <span className="px-1.5 py-0.5 border border-zinc-200 text-[8px] font-mono text-zinc-400 uppercase">
                                    Key: {record.key || "UNSET"}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Pagination Footer */}
            <footer className="mt-20 border-t border-zinc-100 pt-10">
                <Pagination current={currentPage} total={totalPages} />
            </footer>
        </main>
    );
}