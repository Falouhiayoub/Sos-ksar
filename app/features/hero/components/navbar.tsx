"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, LogIn, UserPlus, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // Simuler l'état de connexion (à remplacer par votre logique d'auth)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const menuItems = [
        { label: "Accueil", href: "/" },
        { label: "SOS", href: "/sos" },
        { label: "Bénévoles", href: "/benevoles" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <nav className="bg-gradient-to-r from-[#1B263B] via-[#1B263B] to-[#0D1B2A] border-b border-[#E85D04]/30 sticky top-0 z-50 backdrop-blur-md shadow-xl">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo - Plus luxueux */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#E85D04] rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                            <div className="relative w-12 h-12 bg-gradient-to-br from-[#E85D04] to-[#A67C52] rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                                <span className="text-white font-black text-2xl">S</span>
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-[#E0E1DD] font-black text-xl tracking-tight">
                                SOS Ksar
                            </span>
                            <p className="text-[#778DA9] text-xs font-medium">Ensemble pour l'avenir</p>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="px-4 py-2 text-[#E0E1DD] hover:text-[#E85D04] transition-all font-semibold relative group rounded-lg hover:bg-[#E85D04]/10"
                            >
                                {item.label}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-[#E85D04] to-[#A67C52] group-hover:w-3/4 transition-all duration-300 rounded-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons - Desktop */}
                    <div className="hidden lg:flex items-center space-x-3">
                        {isLoggedIn ? (
                            <>
                                <Button
                                    variant="ghost"
                                    className="text-[#E0E1DD] hover:text-[#E85D04] hover:bg-[#E85D04]/10 rounded-xl font-semibold"
                                >
                                    <User className="w-4 h-4 mr-2" />
                                    Mon Profil
                                </Button>
                                <Button
                                    onClick={() => setIsLoggedIn(false)}
                                    className="bg-gradient-to-r from-[#A67C52] to-[#778DA9] hover:from-[#E85D04] hover:to-[#A67C52] text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Déconnexion
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="text-[#E0E1DD] hover:text-[#E85D04] hover:bg-[#E85D04]/10 rounded-xl font-semibold border border-[#778DA9]/30 hover:border-[#E85D04]"
                                >
                                    <Link href="/login">
                                        <LogIn className="w-4 h-4 mr-2" />
                                        Connexion
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    className="bg-gradient-to-r from-[#E85D04] to-[#A67C52] hover:from-[#A67C52] hover:to-[#E85D04] text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                                >
                                    <Link href="/login">
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        Inscription
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden text-[#E0E1DD] hover:text-[#E85D04] hover:bg-[#E85D04]/10 rounded-xl"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden py-6 border-t border-[#778DA9]/20 animate-in slide-in-from-top">
                        <div className="flex flex-col space-y-3">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-[#E0E1DD] hover:text-[#E85D04] transition-colors font-semibold px-4 py-3 hover:bg-[#E85D04]/10 rounded-xl"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <div className="h-px bg-[#778DA9]/20 my-2" />

                            {isLoggedIn ? (
                                <>
                                    <Button
                                        variant="ghost"
                                        className="text-[#E0E1DD] hover:text-[#E85D04] hover:bg-[#E85D04]/10 rounded-xl font-semibold justify-start"
                                    >
                                        <User className="w-4 h-4 mr-2" />
                                        Mon Profil
                                    </Button>
                                    <Button
                                        onClick={() => setIsLoggedIn(false)}
                                        className="bg-gradient-to-r from-[#A67C52] to-[#778DA9] hover:from-[#E85D04] hover:to-[#A67C52] text-white rounded-xl font-bold shadow-lg justify-start"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Déconnexion
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="text-[#E0E1DD] border-[#778DA9]/30 hover:text-[#E85D04] hover:border-[#E85D04] rounded-xl font-semibold justify-start"
                                    >
                                        <Link href="/login">
                                            <LogIn className="w-4 h-4 mr-2" />
                                            Connexion
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        className="bg-gradient-to-r from-[#E85D04] to-[#A67C52] hover:from-[#A67C52] hover:to-[#E85D04] text-white rounded-xl font-bold shadow-lg justify-start"
                                    >
                                        <Link href="/login">
                                            <UserPlus className="w-4 h-4 mr-2" />
                                            Inscription
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
