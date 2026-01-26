import ProfileEditForm from "@/components/ProfileEditForm";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect, notFound } from "next/navigation";

export default async function EditProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.id !== id) {
        redirect(`/profile/${id}?error=unauthorized`);
    }

    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
        }
    });

    if (!user) notFound();

    return (
        <main className="max-w-7xl mx-auto py-24 px-8">
            <header className="mb-12 border-b border-zinc-200 pb-8">
                <h1 className="text-3xl font-bold uppercase tracking-tighter font-serif italic">
                    Edit_User_Manifest
                </h1>
                <p className="text-[10px] font-mono text-zinc-400 uppercase mt-2">
                    UID: {user.id} // SECURE_ACCESS_GRANTED
                </p>
            </header>

            <ProfileEditForm user={user} />
        </main>
    );
}