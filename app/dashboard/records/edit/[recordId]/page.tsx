import { validateAdmin } from "@/lib/auth-utils";
import prisma from "@/lib/db";
import { updateRecord } from "@/lib/actions";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function EditRecordPage({ params }: { params: Promise<{ id: string, recordId: string }> }) {
    // await validateAdmin();
    const { id: profileId, recordId } = await params;
    const currentUser = await getCurrentUser();

    const record = await prisma.record.findUnique({
        where: { id: recordId },
        include: { tracks: { orderBy: { number: 'asc' } } }
    });

    if (!record) return <div>Record Not Found</div>;

    if (record.authorId !== currentUser?.id) {
        redirect(`/profile/${profileId}/records?error=unauthorized`);
    }

    return (
        <main className="max-w-7xl mx-auto p-8 font-sans text-secondary">
            <h1 className="text-2xl font-bold uppercase tracking-tighter mb-12 border-b pb-4">
                Update_Archive_Entry: {record.catalogNumber}
            </h1>

            <form action={updateRecord} className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <input type="hidden" name="id" value={record.id} />

                {/* Left Column: Editorial & Metadata */}
                <div className="md:col-span-7 space-y-8">
                    <section className="space-y-4">
                        <h2 className="text-[10px] font-mono uppercase tracking-widest text-secondary">Editorial_Data</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">Title</label>
                                <input name="title" defaultValue={record.title} className="border border-zinc-200 p-2 text-sm bg-zinc-50 outline-secondary/20" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">Artist</label>
                                <input name="artistName" defaultValue={record.artistName} className="border border-zinc-200 p-2 text-sm bg-zinc-50 outline-secondary/20" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-mono uppercase text-zinc-500">Tagline (Metadata)</label>
                            <input name="metadataTagline" defaultValue={record.metadataTagline} className="border border-zinc-200 p-2 text-sm bg-zinc-50 outline-secondary/20" placeholder="e.g. A THRESHOLD OF ANALOG CONSCIOUSNESS" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-mono uppercase text-zinc-500">Etymology</label>
                            <textarea name="etymology" defaultValue={record.etymology} rows={3} className="border border-zinc-200 p-2 text-sm bg-zinc-50 outline-secondary/20" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-mono uppercase text-zinc-500">Description</label>
                            <textarea name="description" defaultValue={record.description} rows={6} className="border border-zinc-200 p-2 text-sm bg-zinc-50 outline-secondary/20" />
                        </div>
                    </section>
                </div>

                {/* Right Column: Technical & Specs */}
                <div className="md:col-span-5 space-y-8">
                    <section className="space-y-4">
                        <h2 className="text-[10px] font-mono uppercase tracking-widest text-secondary">Technical_Manifest</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">Catalog #</label>
                                <input name="catalogNumber" defaultValue={record.catalogNumber} className="border border-zinc-200 p-2 text-sm bg-zinc-50 outline-secondary/20" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">Year</label>
                                <input name="year" defaultValue={record.year} className="border border-zinc-200 p-2 text-sm bg-zinc-50 outline-secondary/20" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">BPM / Tempo</label>
                                <input name="tempo" defaultValue={record.tempo} className="border border-zinc-200 p-2 text-sm bg-zinc-50 outline-secondary/20" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-mono uppercase text-zinc-500">Key</label>
                                <input name="key" defaultValue={record.key} className="border border-zinc-200 p-2 text-sm bg-zinc-50 outline-secondary/20" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-mono uppercase text-zinc-500">Loudness (LUFS/dB)</label>
                            <input name="loudness" defaultValue={record.loudness} className="border border-zinc-200 p-2 text-sm bg-zinc-50 outline-secondary/20" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-mono uppercase text-zinc-500">Category / Phonetic</label>
                            <input name="phoneticOrCategory" defaultValue={record.phoneticOrCategory} className="border border-zinc-200 p-2 text-sm bg-zinc-50 outline-secondary/20" />
                        </div>
                    </section>

                    <section className="space-y-4 pt-4 border-t">
                        <h2 className="text-[10px] font-mono uppercase tracking-widest text-secondary">Asset_Links</h2>
                        <div className="space-y-2">
                            <input name="albumCover" defaultValue={record.albumCover} placeholder="Album Cover URL" className="w-full border border-zinc-200 p-2 text-xs bg-zinc-50" />
                            <input name="artistImage" defaultValue={record.artistImage} placeholder="Artist Image URL" className="w-full border border-zinc-200 p-2 text-xs bg-zinc-50" />
                            <input name="spotifyId" defaultValue={record.spotifyId} placeholder="Spotify ID" className="w-full border border-zinc-200 p-2 text-xs bg-zinc-50" />
                        </div>
                    </section>

                    {/* THE TRACK EDITOR SECTION */}
                    <section className="space-y-4">
                        <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-secondary border-b pb-2">03_Tracklist_Refinement</h2>
                        <div className="border border-zinc-200 divide-y divide-zinc-100 bg-zinc-50/30">
                            {record.tracks.map((track, index) => (
                                <div key={track.id} className="flex gap-6 items-start p-4 hover:bg-white transition-colors">
                                    <span className="font-mono text-[10px] text-secondary pt-1">{track.number}</span>
                                    <div className="flex-1 space-y-2">
                                        <p className="text-xs font-bold uppercase tracking-tight">{track.title}</p>
                                        <textarea
                                            name={`track_story_${index}`}
                                            defaultValue={track.story}
                                            className="w-full text-xs font-serif italic bg-transparent p-0 focus:ring-0 resize-none outline-secondary/20 border border-secondary/10"
                                            rows={4}
                                        />
                                        <input
                                            type="hidden"
                                            name={`track_id_${index}`}
                                            value={track.id}
                                        />
                                    </div>
                                    <span className="font-mono text-[10px] text-zinc-500 pt-1">
                                        {track.duration}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <button type="submit" className="w-full bg-secondary text-white p-4 font-mono text-xs uppercase tracking-widest hover:bg-black">
                        Commit_Changes
                    </button>
                </div>
            </form>
        </main>
    );
}