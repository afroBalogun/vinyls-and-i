"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRecord(formData: FormData) {
    const title = formData.get("title") as string;
    const slug = title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

    const trackListRaw = formData.get("trackListJson") as string;
    const parsedTracks = JSON.parse(trackListRaw || "[]");

    // Map the Spotify tracks and merge them with the "story" textareas from the form
    const tracksWithStories = parsedTracks.map((track: any, index: number) => ({
        number: track.number.toString(),
        title: track.title,
        duration: track.duration,
        // Match the 'name' attribute from your form: name={`track_story_${index}`}
        story: (formData.get(`track_story_${index}`) as string) || ""
    }));

    const numPart = formData.get("catalogNumberOnly") as string;
    const finalCatalogNumber = `VI-${numPart}`;

    await prisma.record.create({
        data: {
            id: slug, 
            slug: slug,
            title: title,
            artistName: formData.get("artistName") as string,
            year: formData.get("year") as string || "2024",
            description: formData.get("description") as string || "",
            catalogNumber: finalCatalogNumber,
            tempo: formData.get("tempo") as string || "N/A",
            key: formData.get("key") as string || "N/A",
            category: formData.get("category") as string || "Archive Entry",
            metadataTagline: formData.get("metadataTagline") as string || "DIGITAL PRESSING",
            phoneticOrCategory: formData.get("phoneticOrCategory") as string || "[ENTRY]",
            etymology: formData.get("etymology") as string || "Default archival data.",
            albumCover: formData.get("albumCover") as string || "/placeholder.jpeg",
            artistImage: formData.get("artistImage") as string || "/placeholder-artist.jpeg",
            loudness: formData.get("loudness") as string || "-0.0 dB",
            spotifyId: formData.get("spotifyId") as string || "none",
            tracks: {
                create: tracksWithStories
            }
        }
    });

    revalidatePath("/records");
    revalidatePath("/admin");

    redirect("/admin");
}

export async function deleteRecord(id: string) {
    await prisma.record.delete({ where: { id } });
    revalidatePath("/admin");
    revalidatePath("/records");
}

export async function updateRecord(formData: FormData) {
    const id = formData.get("id") as string;

    await prisma.record.update({
        where: { id },
        data: {
            title: formData.get("title") as string,
            artistName: formData.get("artistName") as string,
            description: formData.get("description") as string,
            catalogNumber: formData.get("catalogNumber") as string || "000",
            tempo: formData.get("tempo") as string || "N/A",
            key: formData.get("key") as string || "N/A",
            category: formData.get("category") as string || "Archive Entry",
            year: formData.get("year") as string,
            metadataTagline: formData.get("metadataTagline") as string,
            phoneticOrCategory: formData.get("phoneticOrCategory") as string,
            etymology: formData.get("etymology") as string,
            albumCover: formData.get("albumCover") as string,
            artistImage: formData.get("artistImage") as string,
            loudness: formData.get("loudness") as string,
            spotifyId: formData.get("spotifyId") as string,
            tracks: {
                create: []
            }
        }
    });

    revalidatePath("/admin");
    revalidatePath(`/records/${id}`);
    redirect("/admin");
}

export async function getNextCatalogNumber() {
    const lastRecord = await prisma.record.findFirst({
        orderBy: { createdAt: 'desc' },
        select: { catalogNumber: true }
    });

    if (!lastRecord || !lastRecord.catalogNumber.includes('-')) return "VI-1001";

    const lastNum = parseInt(lastRecord.catalogNumber.split('-')[1]);
    return `VI-${lastNum + 1}`;
}

export async function addComment(recordId: string, userId: string, formData: FormData) {
    const text = formData.get("text") as string;

    await prisma.comment.create({
        data: {
            text: text,
            // Use 'connect' instead of passing the string directly to 'user'
            user: {
                connect: { id: userId }
            },
            record: {
                connect: { id: recordId }
            }
        }
    });

    revalidatePath(`/records/${recordId}`);
}

export async function toggleSaveRecord(recordId: string, userId: string, isCurrentlySaved: boolean) {
    await prisma.user.update({
        where: { id: userId },
        data: {
            savedRecords: isCurrentlySaved 
                ? { disconnect: { id: recordId } } 
                : { connect: { id: recordId } }
        }
    });
    
    revalidatePath(`/records/${recordId}`);
}