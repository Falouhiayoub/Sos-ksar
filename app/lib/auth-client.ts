
import { createAuthClient } from "better-auth/react";
import { type auth } from "./auth"; // Import type from server

export const authClient = createAuthClient<typeof auth>({
    baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

export const { useSession, useListSessions, signIn, signOut, signUp } = authClient;
