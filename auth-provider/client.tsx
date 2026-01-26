import { ReactNode } from "react";
import { getCurrentUser } from "@/lib/auth";
import { AuthContext } from "./index";
interface ProviderProps {
    children: ReactNode;
}

export async function AuthProvider({ children }: ProviderProps) {
    const currentUserPromise = getCurrentUser();

    return (
        <AuthContext value={currentUserPromise}>
            {children}
        </AuthContext>
    );
}