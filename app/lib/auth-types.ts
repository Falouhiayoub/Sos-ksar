
import type { auth } from "./auth";
import type { UserRole } from "@/app/db/schema";

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user & { role: UserRole };
