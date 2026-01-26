"use client"
export function ArchiveGrid() {
    return (
        <div className="relative w-full h-64 bg-transparent overflow-hidden">
            {/* 2D Technical Grid */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(#3a3a3a 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    opacity: 0.2
                }}
            />

            {/* Animated Crosshair (The "Scanner") */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {/* Horizontal line moving Y-axis */}
                <div className="absolute left-0 w-full h-px bg-secondary/40 animate-scan-y" />
                {/* Vertical line moving X-axis */}
                <div className="absolute top-0 w-px h-full bg-secondary/40 animate-scan-x" />
            </div>

            <style jsx>{`
                @keyframes scan-y {
                    0% { top: 0%; }
                    100% { top: 100%; }
                }
                @keyframes scan-x {
                    0% { left: 0%; }
                    100% { left: 100%; }
                }
                /* 'alternate' makes it go back and forth; 'ease-in-out' makes the turn smooth */
                .animate-scan-y { 
                    animation: scan-y 8s ease-in-out infinite alternate; 
                }
                .animate-scan-x { 
                    animation: scan-x 12s ease-in-out infinite alternate; 
                }
            `}</style>
        </div>
    );
}