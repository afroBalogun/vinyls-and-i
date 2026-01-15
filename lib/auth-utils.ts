import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function validateAdmin() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // Check if user exists and has the ADMIN role
    if (!session || (session.user as any).role !== "ADMIN") {
        redirect("/"); 
    }

    return session;
}