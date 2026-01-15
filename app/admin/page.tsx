import DeleteRecordModal from "@/components/DeleteRecordModal";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function AdminDashboard() {
    const records = await prisma.record.findMany({
        orderBy: { catalogNumber: 'asc' }
    });

    return (
        <main className="p-8 max-w-5xl mx-auto font-sans">
            <header className="flex justify-between items-end border-b pb-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tighter uppercase">Archive Management</h1>
                    <p className="text-xs font-mono text-zinc-500 uppercase">Authorized Personnel Only</p>
                </div>
                <Link href="/admin/new" className="bg-black text-white px-4 py-2 text-xs font-mono uppercase">
                    + New Entry
                </Link>
            </header>

            <div className="space-y-2">
                {records.map(record => (
                    <div key={record.id} className="flex justify-between items-center p-4 bg-zinc-50 border border-zinc-100 hover:border-zinc-300 transition-colors">
                        <div>
                            <span className="text-[10px] font-mono text-zinc-400">[{record.catalogNumber}]</span>
                            <h3 className="font-bold uppercase">{record.title}</h3>
                        </div>
                        <div className="flex gap-4 text-[10px] font-mono uppercase">
                            <Link href={`/admin/edit/${record.id}`} className="text-blue-600 hover:underline">
                                Edit
                            </Link>
                            <DeleteRecordModal id={record.id} title={record.title} />
                        </div>
                    </div>

                ))}
            </div>
        </main>
    );
}