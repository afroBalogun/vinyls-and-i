import { ReactNode } from "react";
import { getCurrentUser } from "@/lib/auth";
import { AuthContext, User } from "./index";
interface ProviderProps {
    children: ReactNode;
}

export async function AuthProvider({ children }: ProviderProps) {
const currentUserPromise = getCurrentUser() as Promise<User | null>;
    return (
        <AuthContext value={currentUserPromise}>
            {children}
        </AuthContext>
    );
}