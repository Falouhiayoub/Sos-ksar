"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { AlertCircle, CheckCircle2, HeartHandshake, ShieldAlert } from "lucide-react";

export function HeroSection() {
    const [activeSos, setActiveSos] = useState(0);
    const [resolvedSos, setResolvedSos] = useState(0);

    const targetActive = 124;
    const targetResolved = 482;

    useEffect(() => {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const interval = duration / steps;

        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            setActiveSos(Math.floor((targetActive / steps) * currentStep));
            setResolvedSos(Math.floor((targetResolved / steps) * currentStep));

            if (currentStep >= steps) {
                setActiveSos(targetActive);
                setResolvedSos(targetResolved);
                clearInterval(timer);
            }
        }, interval);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#F5E8C7]">
            {/* Background Image with Moroccan Palette Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale-[20%] opacity-40"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2070&auto=format&fit=crop')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#EB2411]/90 via-[#EB2411]/70 to-[#F5E8C7]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center">
                {/* Crisis Badge */}
                <Badge variant="outline" className="mb-6 px-4 py-1.5 border-white text-white backdrop-blur-md animate-pulse">
                    <ShieldAlert className="w-4 h-4 mr-2" />
                    Urgence Humanitaire : Tempête Leonardo
                </Badge>

                {/* Main Content */}
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl tracking-tight uppercase">
                        Ksar El Kebir – <span className="text-[#D4AF37]">Tempête Leonardo</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
                        Face à l'urgence climatique, unissons nos forces. Signalez vos besoins critiques ou rejoignez nos équipes de secours pour soutenir les familles touchées.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            asChild
                            size="lg"
                            className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white border-none rounded-xl px-8 h-14 text-lg font-bold shadow-2xl hover:scale-105 transition-all w-full sm:w-auto"
                        >
                            <Link href="/login">
                                <AlertCircle className="w-5 h-5 mr-2" />
                                J'ai besoin d'aide
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="bg-white/10 hover:bg-white/20 text-white border-2 border-white rounded-xl px-8 h-14 text-lg font-bold backdrop-blur-md hover:scale-105 transition-all w-full sm:w-auto"
                        >
                            <Link href="/login">
                                <HeartHandshake className="w-5 h-5 mr-2" />
                                Je veux être bénévole
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Stats Counter */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mt-8">
                    <Card className="bg-white/95 border-none shadow-xl rounded-2xl overflow-hidden hover:translate-y-[-5px] transition-transform">
                        <CardContent className="p-8 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Signals SOS Actifs</span>
                                <span className="text-4xl font-black text-[#EB2411]">{activeSos}</span>
                            </div>
                            <div className="w-14 h-14 bg-[#EB2411]/10 rounded-full flex items-center justify-center">
                                <ShieldAlert className="w-8 h-8 text-[#EB2411]" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/95 border-none shadow-xl rounded-2xl overflow-hidden hover:translate-y-[-5px] transition-transform">
                        <CardContent className="p-8 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Interventions Réussies</span>
                                <span className="text-4xl font-black text-[#2F9BA6]">{resolvedSos}</span>
                            </div>
                            <div className="w-14 h-14 bg-[#2F9BA6]/10 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-8 h-8 text-[#2F9BA6]" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Decorative Wave at the bottom */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] fill-[#F5E8C7]">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>
        </section>
    );
}
