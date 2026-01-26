import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";
import { cache } from "react";
import { headers } from "next/headers";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    user: {
        additionalFields: {
            bio: { type: "string" },
            archiveId: { type: "string" },
            role: {
                type: "string",
                required: true,
                defaultValue: "USER",
            },
        }
    },
    socialProviders: {
        spotify: {
            clientId: process.env.SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});

export const getCurrentUser = cache(async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        return session?.user;
    } catch (e) {
        return null;
    }
});