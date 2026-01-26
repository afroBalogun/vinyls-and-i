"use client";

import { createContext, use, ReactNode } from "react";

export type User = {
    id: string;
    name: string;
    email: string;
    role?: "USER" | "ADMIN";
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
} | null | undefined;

const Context = createContext<Promise<User> | null>(null);

interface AuthContextProps {
    value: Promise<User>;
    children: ReactNode;
}

export function AuthContext({ value, children }: AuthContextProps) {
    return (
        <Context value={value}>
            {children}
        </Context>
    );
}

export function useCurrentUser() {
    const currentUserPromise = use(Context);

    if (!currentUserPromise) return null;

    const currentUser = use(currentUserPromise);
    return currentUser;
}