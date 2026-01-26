import Link from "next/link";

export default function Pagination({ current, total }: { current: number, total: number }) {
    if (total <= 1) return null;

    return (
        <div className="flex items-center gap-6 font-mono text-[10px] mt-12 pb-20">
            <Link
                href={`?page=${current - 1}`}
                className={`border border-secondary px-4 py-2 uppercase hover:bg-secondary hover:text-primary transition-all ${current <= 1 ? 'pointer-events-none opacity-20' : ''}`}
            >
                [PREV_PAGE]
            </Link>

            <div className="flex gap-2">
                {Array.from({ length: total }).map((_, i) => (
                    <Link
                        key={i}
                        href={`?page=${i + 1}`}
                        className={`w-8 h-8 flex items-center justify-center border ${current === i + 1 ? 'bg-secondary text-primary' : 'border-secondary/10 hover:border-secondary'}`}
                    >
                        {(i + 1).toString().padStart(2, '0')}
                    </Link>
                ))}
            </div>

            <Link
                href={`?page=${current + 1}`}
                className={`border border-secondary px-4 py-2 uppercase hover:bg-secondary hover:text-primary transition-all ${current >= total ? 'pointer-events-none opacity-20' : ''}`}
            >
                [NEXT_PAGE]
            </Link>
        </div>
    );
}