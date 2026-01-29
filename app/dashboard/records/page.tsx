// app/dashboard/[id]/page.tsx
import DeleteRecordModal from "@/components/DeleteRecordModal";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/db";
import Link from "next/link";
import Pagination from "@/components/Pagination"; // Reusing the component from earlier

export default async function Dashboard({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ page?: string }>
}) {
    const { page } = await searchParams;
    const currentUser = await getCurrentUser();
    
    const id = currentUser?.id;


    // Pagination Logic
    const itemsPerPage = 10;
    const currentPage = Number(page) || 1;

    const totalRecords = await prisma.record.count({
        where: { authorId: id }
    });

    const records = await prisma.record.findMany({
        orderBy: { catalogNumber: 'asc' },
        where: { authorId: id },
        take: itemsPerPage,
        skip: (currentPage - 1) * itemsPerPage,
    });

    const totalPages = Math.ceil(totalRecords / itemsPerPage);

    return (
        <main className="px-5 py-20 max-w-7xl mx-auto font-sans text-secondary">
            <header className="flex justify-between items-end border-b pb-6 mb-8">
                <div>
                    <h1 className="text-xl md:text-3xl font-bold tracking-tighter uppercase">Archive Management</h1>
                    <p className="text-xs font-mono text-zinc-500 uppercase">Authorized Personnel: {currentUser?.name}</p>
                </div>
                <Link href={`/dashboard/records/new`} className="bg-secondary text-white px-4 py-2 text-xs font-mono uppercase">
                    + New Entry
                </Link>
            </header>

            <div className="space-y-2">
                {records.map(record => (
                    <div key={record.id} className="flex justify-between items-center p-4 bg-primary border border-zinc-100 hover:border-zinc-300 transition-colors">
                        <div>
                            <span className="text-[10px] font-mono text-zinc-400">[{record.catalogNumber}]</span>
                            <h3 className="font-bold uppercase">{record.title}</h3>
                        </div>
                        <div className="flex gap-4 text-[10px] font-mono uppercase">
                            <Link href={`/dashboard/records/edit/${record.id}`} className="text-blue-600 hover:underline">
                                Edit
                            </Link>
                            <DeleteRecordModal id={record.id} title={record.title} />
                        </div>
                    </div>
                ))}
            </div>

            <Pagination current={currentPage} total={totalPages} />
        </main>
    );
}