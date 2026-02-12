"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/app/lib/auth-client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Siren, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export function Navbar() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleSignOut = async () => {
        await signOut();
        router.push("/");
    };

    const isActive = (path: string) => pathname === path;

    const NavItems = () => (
        <>
            <Link href="/" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/") ? "text-foreground" : "text-muted-foreground"}`} onClick={() => setIsOpen(false)}>
                Accueil
            </Link>
            {session && (
                <Link href="/dashboard" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/dashboard") ? "text-foreground" : "text-muted-foreground"}`} onClick={() => setIsOpen(false)}>
                    Dashboard
                </Link>
            )}
            {session && (session.user.role === "admin" || session.user.role === "volunteer") && (
                <Link href="/command" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/command") ? "text-foreground" : "text-muted-foreground"}`} onClick={() => setIsOpen(false)}>
                    Command Center
                </Link>
            )}
            {session && session.user.role === "admin" && (
                <Link href="/admin/users" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/admin/users") ? "text-foreground" : "text-muted-foreground"}`} onClick={() => setIsOpen(false)}>
                    Utilisateurs
                </Link>
            )}
        </>
    );

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between mx-auto px-4">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
                        <Siren className="h-6 w-6" />
                        <span>SOS Ksar</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <NavItems />
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={session.user.image || ""} alt={session.user.name} />
                                        <AvatarFallback>{session.user.name?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{session.user.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard">Mon Espace</Link>
                                </DropdownMenuItem>
                                {(session.user.role === "admin" || session.user.role === "volunteer") && (
                                    <DropdownMenuItem asChild>
                                        <Link href="/command">Centre de Commande</Link>
                                    </DropdownMenuItem>
                                )}
                                {session.user.role === "admin" && (
                                    <DropdownMenuItem asChild>
                                        <Link href="/admin/users">Gestion Utilisateurs</Link>
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
                                    Se déconnecter
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="hidden md:flex items-center gap-2">
                            <Link href="/sign-in">
                                <Button variant="ghost" size="sm">Se connecter</Button>
                            </Link>
                            <Link href="/sign-in?tab=signup">
                                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">S'inscrire</Button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <div className="flex flex-col gap-4 mt-8">
                                <NavItems />
                                {!session && (
                                    <>
                                        <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                                            <Button className="w-full" variant="outline">Se connecter</Button>
                                        </Link>
                                        <Link href="/sign-in?tab=signup" onClick={() => setIsOpen(false)}>
                                            <Button className="w-full">S'inscrire</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
