import prisma from "@/lib/db";


const recordsData = [
    {
        id: "obongjayar-some-nights-i-dream-of-doors",
        slug: "obongjayar-some-nights-i-dream-of-doors",
        year: "2022",
        metadataTagline: "A THRESHOLD OF ANALOG CONSCIOUSNESS",
        catalogNumber: "001",
        category: "indie / afro-fusion",
        title: "Some Nights I Dream of Doors",
        phoneticOrCategory: "[transition]",
        etymology: "From the dream-state of threshold-crossing; the internal architecture of the soul as it moves from silence into rhythmic vibration.",
        artistName: "Obongjayar",
        albumCover: "/obongjayar.jpeg",
        artistImage: "/obong-tiny.jpeg",
        tempo: "78 BPM",
        key: "C Minor",
        loudness: "-8.2 dB",
        spotifyId: "4n0668X778...",
        description: "A masterful debut that blends Afrobeats, soul, and spoken word into a singular, earthy texture...",
        tracks: [
            { number: "01", title: "Try", duration: "2:52", story: "A gentle opening that acts as the 'front door' to the project. It sets the tone of vulnerability and persistence." },
            { number: "02", title: "Message in a Hammer", duration: "3:26", story: "The sonic petrichor hits here. Aggressive, industrial rhythms that represent the breaking of barriers." },
            { number: "03", title: "No Regrets", duration: "3:14", story: "A rhythmic cleansing. If 'Petrichor' is the smell of rain, 'No Regrets' is the moment the storm actually breaks. It features a percussive architecture that feels like water hitting tin—organized, relentless, and deeply refreshing." },
            { number: "04", title: "Sugar", duration: "4:02", story: "The sonic sweetness here acts as a counterweight to the industrial 'Hammer' of earlier tracks. It explores the 'nature of argillaceous odour' through a softer lens, focusing on the intimate, humid atmosphere of a room after the doors have finally been opened." }
        ]
    }
];

async function main() {
    console.log('--- INITIALIZING ARCHIVE SEEDING ---');

    for (const r of recordsData) {
        const { tracks, ...recordDetails } = r;

        await prisma.record.upsert({
            where: { id: r.id },
            update: {}, // Skip update if it exists
            create: {
                ...recordDetails,
                tracks: {
                    create: tracks
                }
            }
        });
    }

    console.log('--- SEEDING COMPLETE: ARCHIVE UPDATED ---');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });