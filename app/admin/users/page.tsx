import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/app/lib/drizzle";
import { user } from "@/app/db/schema";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateUserRole } from "@/app/actions/admin-actions";
import { revalidatePath } from "next/cache";

export default async function AdminUsersPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        redirect("/");
    }

    const allUsers = await db.select().from(user).orderBy(user.name);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Gestion des Utilisateurs</h1>
            <div className="bg-white rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nom</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Rôle Actuel</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allUsers.map((u) => (
                            <TableRow key={u.id}>
                                <TableCell className="font-medium">{u.name}</TableCell>
                                <TableCell>{u.email}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs ${u.role === 'admin' ? 'bg-red-100 text-red-800' :
                                            u.role === 'volunteer' ? 'bg-orange-100 text-orange-800' :
                                                'bg-slate-100 text-slate-800'
                                        }`}>
                                        {u.role}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <form action={async (formData) => {
                                        "use server";
                                        const newRole = formData.get("role") as "citizen" | "volunteer" | "admin";
                                        await updateUserRole(u.id, newRole);
                                        revalidatePath("/admin/users");
                                    }}>
                                        <Select name="role" defaultValue={u.role}>
                                            <SelectTrigger className="w-[140px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="citizen">Citoyen</SelectItem>
                                                <SelectItem value="volunteer">Bénévole</SelectItem>
                                                <SelectItem value="admin">Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {/* Hack to submit on change? No, let's add a button for now or use client component. 
                                            Server Actions in forms need a submit button.
                                            For simplicity in this server component, let's just add a "Save" button next to it.
                                            Or better, make a client component for the row.
                                         */}
                                        <button type="submit" className="ml-2 text-primary hover:underline text-sm">
                                            Enregistrer
                                        </button>
                                    </form>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
