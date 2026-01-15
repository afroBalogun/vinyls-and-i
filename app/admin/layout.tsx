export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans">
            <nav className="border-b border-zinc-200 bg-white p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Archive_Admin_v1.0</span>
                    <div className="flex gap-6 text-[10px] font-mono uppercase">
                        <a href="/admin" className="hover:underline">Dashboard</a>
                        <a href="/" className="text-zinc-400 hover:text-zinc-900">View Public Site →</a>
                    </div>
                </div>
            </nav>
            {children}
        </div>
    );
}