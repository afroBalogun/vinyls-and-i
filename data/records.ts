export interface RecordData {
    id: string;
    slug: string;
    logoText: string; // e.g., "vinyls & I."

    // Header Metadata
    year: string;
    metadataTagline: string; // e.g., "NATURE OF ARGILLACEOUS ODOUR"
    catalogNumber: string; // e.g., "001"
    category: string; // e.g., "pop"

    // Main Content
    title: string;
    phoneticOrCategory: string; // e.g., "[noun]"
    etymology: string; // The "constructed from Greek..." text

    // Visuals
    albumCover: string;
    artistImage: string;
    artistName: string;

    // Technical Stats (The "Spotify" box style)
    technicalSpecs: {
        tempo: string;
        key: string;
        loudness: string;
        spotifyId: string;
    };

    // Body Content
    description: string;
    quoteEnglish: string;
    quoteTranslated: string; // e.g., the Japanese text
    tracks?: Track[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Track {
    number: string;
    title: string;
    duration: string;
    story: string;
    tempo?: string;
}

export const records: RecordData[] = [
    {
        id: "obongjayar-some-nights-i-dream-of-doors",
        slug: "obongjayar-some-nights-i-dream-of-doors",
        logoText: "vinyls\n&\nI.",
        year: "2022", // Corrected release year
        metadataTagline: "A THRESHOLD OF ANALOG CONSCIOUSNESS",
        catalogNumber: "001",
        category: "indie / afro-fusion",
        title: "Some Nights I Dream of Doors",
        phoneticOrCategory: "[transition]",
        etymology: "From the dream-state of threshold-crossing; the internal architecture of the soul as it moves from silence into rhythmic vibration.",
        artistName: "Obongjayar",
        albumCover: "/obongjayar.jpeg",
        artistImage: "/obong-tiny.jpeg",
        technicalSpecs: {
            tempo: "78 BPM",
            key: "C Minor",
            loudness: "-8.2 dB",
            spotifyId: "4n0668X778..."
        },
        description: "A masterful debut that blends Afrobeats, soul, and spoken word into a singular, earthy texture. It represents the 'petrichor' of modern music—the refreshing, heavy scent of a new creative era washing over the listener.",
        quoteEnglish: "the pleasant earthy smell after rain",
        quoteTranslated: "雨後の気味",
        tracks: [
            {
                number: "01",
                title: "Try",
                duration: "2:52",
                story: "A gentle opening that acts as the 'front door' to the project. It sets the tone of vulnerability and persistence."
            },
            {
                number: "02",
                title: "Message in a Hammer",
                duration: "3:26",
                story: "The sonic petrichor hits here. Aggressive, industrial rhythms that represent the breaking of barriers."
            },
            {
                number: "03",
                title: "No Regrets",
                duration: "3:14",
                story: "A rhythmic cleansing. If 'Petrichor' is the smell of rain, 'No Regrets' is the moment the storm actually breaks. It features a percussive architecture that feels like water hitting tin—organized, relentless, and deeply refreshing."
            },
            {
                number: "04",
                title: "Sugar",
                duration: "4:02",
                story: "The sonic sweetness here acts as a counterweight to the industrial 'Hammer' of earlier tracks. It explores the 'nature of argillaceous odour' through a softer lens, focusing on the intimate, humid atmosphere of a room after the doors have finally been opened."
            }
        ]
    }
];