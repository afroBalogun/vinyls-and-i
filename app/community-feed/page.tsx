import prisma from "@/lib/db";
import FeedClient from "@/components/FeedClient";
import Link from "next/link";

export default async function CommunityFeed({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>; // Next.js 15+ searchParams are async
}) {
    const params = await searchParams;
    const itemsPerPage = 6;
    const currentPage = Number(params.page) || 1;

    const totalRecords = await prisma.record.count({
        where: { author: { role: 'USER' } }
    });

    // --- EMPTY STATE UI ---
    if (totalRecords === 0) {
        return (
            <main className="min-h-screen bg-primary flex flex-col items-center justify-center p-10">
                <div className="max-w-md w-full border border-secondary/10 p-12 text-center space-y-6 bg-white/50 backdrop-blur-sm">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-[0.5em] text-zinc-400 uppercase">Archive_Status</span>
                        <h2 className="text-2xl font-bold tracking-tighter uppercase italic">Empty_Vault</h2>
                    </div>
                    
                    <p className="text-xs text-zinc-500 leading-relaxed uppercase tracking-wide">
                        No public transmissions detected in the community sector. The database is currently awaiting its first entry.
                    </p>

                    <div className="pt-4">
                        <Link 
                            href="/dashboard/records" 
                            className="inline-block bg-secondary text-primary px-8 py-4 text-[10px] font-mono uppercase tracking-widest hover:bg-black transition-all"
                        >
                            Initialize_First_Record
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    const communityRecords = await prisma.record.findMany({
        where: { author: { role: 'USER' } },
        include: { author: true },
        orderBy: { createdAt: 'desc' },
        take: itemsPerPage,
        skip: (currentPage - 1) * itemsPerPage,
    });

    const totalPages = Math.ceil(totalRecords / itemsPerPage);

    return (
        <FeedClient 
            initialRecords={communityRecords} 
            currentPage={currentPage}
            totalPages={totalPages}
        />
    );
}