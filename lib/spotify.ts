"use server";

const mapKeyToNote = (key: number, mode: number) => {
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const keyName = notes[key] || "N/A";
    const modeName = mode === 1 ? "Major" : "Minor";
    return `${keyName} ${modeName}`;
};

export async function getSpotifyToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
                process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
            ).toString("base64")}`,
        },
        body: "grant_type=client_credentials",
    });

    const data = await response.json();
    return data.access_token;
}

export async function searchSpotifyOptions(query: string) {
    const token = await getSpotifyToken();
    const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=8`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();

    return data.albums.items.map((album: any) => ({
        spotifyId: album.id,
        title: album.name,
        artistName: album.artists[0].name,
        albumCover: album.images[0]?.url,
        year: album.release_date.split("-")[0],
    }));
}


export async function getDeepArchiveData(albumId: string) {
    const token = await getSpotifyToken();

    const albumRes = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!albumRes.ok) return null;

    const album = await albumRes.json();
    const artistId = album.artists?.[0]?.id;
    let artistImage = "";

    if (artistId) {
        const artistRes = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const artistData = await artistRes.json();
        artistImage = artistData.images?.[0]?.url || "";
    }

    const firstTrackId = album.tracks.items[0]?.id;
    let technicalData = { tempo: "N/A", key: "N/A", loudness: "N/A" };
    let debugInfo = {};

    if (firstTrackId) {
        const featRes = await fetch(`https://api.spotify.com/v1/audio-features/${firstTrackId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        debugInfo = { status: featRes.status, trackId: firstTrackId };
        if (featRes.ok) {
            const featData = await featRes.json();
            debugInfo = { ...debugInfo, featData };
            technicalData = {
                tempo: featData.tempo ? Math.round(featData.tempo).toString() : "N/A",
                key: (featData.key != null && featData.mode != null)
                    ? mapKeyToNote(featData.key, featData.mode)
                    : "N/A",
                loudness: typeof featData.loudness === 'number'
                    ? featData.loudness.toFixed(1)
                    : "N/A"
            };
        }
    }

    return {
        ...technicalData,
        artistImage,
        spotifyId: album.id,
        debug: debugInfo,
        tracks: album.tracks.items.map((t: any, index: number) => ({
            number: (index + 1).toString().padStart(2, '0'),
            title: t.name,
            duration: `${Math.floor(t.duration_ms / 60000)}:${Math.floor((t.duration_ms % 60000) / 1000).toString().padStart(2, '0')}`
        }))
    };
}

export async function getTrendingAlbums() {
    try {
        const token = await getSpotifyToken();
        
        // Use the official Spotify 'New Releases' endpoint
        const response = await fetch(
            "https://api.spotify.com/v1/browse/new-releases?limit=10",
            {
                headers: { 
                    Authorization: `Bearer ${token}` 
                },
                next: { revalidate: 3600 } 
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error("SPOTIFY_API_ERROR:", response.status, errorData);
            return [];
        }

        const data = await response.json();

        // New Releases returns an 'albums' object containing an 'items' array
        return data.albums.items.map((album: any) => ({
            spotifyId: album.id,
            title: album.name,
            artistName: album.artists[0].name,
            albumCover: album.images[0]?.url,
            year: album.release_date.split("-")[0],
            totalTracks: album.total_tracks
        }));
    } catch (error) {
        console.error("CRITICAL_CONNECTION_FAILURE:", error);
        return [];
    }
}