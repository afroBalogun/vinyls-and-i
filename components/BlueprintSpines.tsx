"use client";

export function BlueprintSpines({ activeSection }: { activeSection: string }) {
    const items = ["Featured", "Archive", "Community", "Logs", "System"];
    
    const normalizedActive = activeSection.toLowerCase();
    const isInsideAbout = items.some(item => item.toLowerCase() === normalizedActive);

    return (
        <nav 
            className={`fixed bottom-10 left-1/2 -translate-x-1/2 flex items-end justify-center z-[100] pointer-events-none transition-all duration-500 ease-out ${
                isInsideAbout ? 'gap-6' : 'gap-1'
            }`}
        >
            {items.map((item, i) => {
                const itemLower = item.toLowerCase();
                const isActive = normalizedActive === itemLower;

                return (
                    <div key={i} className="flex flex-col items-center">
                        {/* Label */}
                        <div className="h-6 overflow-hidden">
                            <span className={`text-[10px] font-mono text-secondary block transition-all duration-500 uppercase tracking-[0.2em] ${
                                isActive ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                            }`}>
                                {item}
                            </span>
                        </div>

                        {/* Spine Line */}
                        <div
                            className={`w-[1px] bg-secondary transition-all duration-500 ease-in-out ${
                                isActive 
                                    ? 'h-20 opacity-100' 
                                    : isInsideAbout 
                                        ? 'h-8 opacity-20' 
                                        : 'h-2 opacity-40' 
                            }`}
                        />
                    </div>
                );
            })}
        </nav>
    );
}