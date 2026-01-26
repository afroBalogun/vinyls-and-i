import ArticleHero from "@/components/ArticleHero";
import prisma from "@/lib/db";

export default async function RecordsPage() {
    const records = await prisma.record.findMany({
        orderBy: { createdAt: 'desc' },
        where: {
            author: {
                role: 'ADMIN'
            }
        },
    });
    return (
        <main className="min-h-screen flex flex-col items-center justify-center py-20 px-5 md:px-10">
            <div className="w-screen h-screen fixed top-0 left-0 -z-10 overflow-hidden flex items-center justify-center">
                <video src="/player.webm"
                    autoPlay
                    loop
                    muted
                    className=""
                />

            </div>
            <div className="flex flex-col gap-[100vh] w-full max-w-7xl">
                {records.map((record) => (
                    <ArticleHero
                        id={record.id}
                        slug={record.slug}
                        key={record.id}
                        title={record.title}
                        category={record.category}
                        year={record.year}
                        description={record.description}
                        artistName={record.artistName}
                        albumCover={record.albumCover}
                        artistImage={record.artistImage}
                        catalogNumber={record.catalogNumber}
                    />
                ))}
                {/* <ArticleHero
                    title="Love you less"
                    category="Pop"
                    year="2024"
                    description="A deeply personal exploration of love and loss through the lens of analog sound."
                    artistName="The Velvet Vines"
                    albumCover="./obongjayar.jpeg"
                    artistImage="./obong-tiny.jpeg"
                /> */}
            </div>
        </main>
    );
}