
import { getCurrentUser, assertRole } from "@/app/lib/auth-utils";
import { RoleSwitcher } from "./role-switcher";
import { notFound } from "next/navigation";

export default async function TestAuthPage() {
    // SECURITY: This page is only for development
    if (process.env.NODE_ENV !== "development") {
        notFound();
    }

    const user = await getCurrentUser();

    if (!user) {
        return (
            <div className="p-10">
                <h1 className="text-2xl font-bold mb-4">Auth Test Page</h1>
                <p className="text-red-500">Not logged in.</p>
                <a href="/login" className="underline text-blue-500">Go to Login</a>
            </div>
        );
    }

    // specific test for admin role
    let adminCheck = "❌ Not an Admin (assertRole failed inside try/catch)";
    try {
        await assertRole("admin");
        adminCheck = "✅ You are an Admin (assertRole passed)";
    } catch (e) {
        // expected if not admin
    }

    return (
        <div className="p-10 max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Authentication Role Test</h1>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
                <p className="font-bold">Development Only</p>
                <p>This page is not visible in production.</p>
            </div>

            <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-zinc-900">
                <h2 className="text-xl font-semibold mb-2">Current Session</h2>
                <pre className="bg-gray-100 dark:bg-zinc-800 p-4 rounded overflow-auto">
                    {JSON.stringify(user, null, 2)}
                </pre>
            </div>

            <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-zinc-900">
                <h2 className="text-xl font-semibold mb-2">Role Checks</h2>
                <div className="space-y-2">
                    <p><strong>Current Role:</strong> <span className="font-mono bg-blue-100 px-2 py-1 rounded text-blue-800">{user.role}</span></p>
                    <p><strong>Admin Check:</strong> {adminCheck}</p>
                </div>
            </div>

            <div className="p-4 border border-blue-200 rounded-lg shadow-sm bg-blue-50 dark:bg-blue-900/20">
                <h2 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-300">Dev Tools: Switch Role</h2>
                <p className="text-sm mb-4 text-blue-600/80">Clicking these updates the DB and revalidates <code>/</code>.</p>
                <RoleSwitcher currentRole={user.role} />
            </div>
        </div>
    );
}
