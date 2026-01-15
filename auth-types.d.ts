import { auth } from "@/lib/auth";

declare module "@/lib/auth" {
    interface User {
        role: "ADMIN" | "USER";
    }
}