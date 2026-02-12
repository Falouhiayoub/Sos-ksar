
"use client";

import { switchRole } from "@/app/actions/dev-tools";
import { useTransition } from "react";
import { type UserRole } from "@/app/db/schema";
import { toast } from "sonner";

export function RoleSwitcher({ currentRole }: { currentRole: string }) {
    const [isPending, startTransition] = useTransition();

    const handleSwitch = (role: UserRole) => {
        startTransition(async () => {
            try {
                await switchRole(role);
                toast.success(`Switched to ${role}`);
            } catch (error) {
                toast.error("Failed to switch role");
                console.error(error);
            }
        });
    };

    const roles: UserRole[] = ["citizen", "volunteer", "admin"];

    return (
        <div className="flex gap-2">
            {roles.map((role) => (
                <button
                    key={role}
                    onClick={() => handleSwitch(role)}
                    disabled={isPending || role === currentRole}
                    className={`px-4 py-2 rounded font-medium transition-colors ${role === currentRole
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                >
                    {isPending ? "..." : `Become ${role.charAt(0).toUpperCase() + role.slice(1)}`}
                </button>
            ))}
        </div>
    );
}
