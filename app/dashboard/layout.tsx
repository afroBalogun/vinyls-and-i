export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-primary text-secondary font-sans">
            <nav className=" bg-primary p-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-2 justify-between items-center">
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
                        Archive_Dashboard
                    </span>
                    
                    {/* <div className="flex gap-4 md:gap-6 text-[10px] font-mono uppercase">
                        <a href="/dashboard" className="hover:underline">Dashboard</a>
                        <a href="/" className="text-zinc-400 hover:text-secondary transition-colors">
                            View Public Site <span className="hidden sm:inline">→</span>
                        </a>
                    </div> */}
                </div>
            </nav>
            
            <main className="w-full">
                {children}
            </main>
        </div>
    );
}