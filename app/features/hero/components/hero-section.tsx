"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle, HeartHandshake } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
    return (
        <section className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/heroSection.png"
                    alt="Ksar El Kebir - Tempête Leonardo"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                />
                {/* Gradient Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1B263B]/80 via-[#1B263B]/60 to-[#1B263B]/90" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Decorative Top Line */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px w-16 bg-[#778DA9]" />
                        <div className="w-2 h-2 rounded-full bg-[#E85D04]" />
                        <div className="h-px w-16 bg-[#778DA9]" />
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#E0E1DD] leading-tight">
                        Ksar El Kebir –{" "}
                        <span className="text-[#E85D04] drop-shadow-lg">
                            Tempête Leonardo
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl lg:text-2xl text-[#E0E1DD]/90 font-medium leading-relaxed max-w-3xl mx-auto">
                        Face à la catastrophe naturelle qui frappe notre région, nous devons nous unir.
                        Que vous ayez besoin d'aide ou que vous souhaitiez apporter votre soutien,
                        chaque action compte pour reconstruire notre communauté.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                        <Button
                            asChild
                            size="lg"
                            className="bg-[#A67C52] hover:bg-[#E85D04] text-white border-none rounded-xl px-8 h-14 text-lg font-bold shadow-2xl hover:scale-105 transition-all w-full sm:w-auto"
                        >
                            <Link href="/login">
                                <AlertCircle className="w-5 h-5 mr-2" />
                                J'ai besoin d'aide
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            className="bg-[#A67C52] hover:bg-[#E85D04] text-white border-none rounded-xl px-8 h-14 text-lg font-bold shadow-2xl hover:scale-105 transition-all w-full sm:w-auto"
                        >
                            <Link href="/login">
                                <HeartHandshake className="w-5 h-5 mr-2" />
                                Je veux être bénévole
                            </Link>
                        </Button>
                    </div>

                    {/* Decorative Bottom Line */}
                    <div className="flex items-center justify-center gap-4 mt-12">
                        <div className="h-px w-24 bg-[#778DA9]" />
                        <div className="w-2 h-2 rounded-full bg-[#E85D04]" />
                        <div className="h-px w-24 bg-[#778DA9]" />
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                <div className="w-6 h-10 border-2 border-[#E0E1DD]/50 rounded-full flex items-start justify-center p-2">
                    <div className="w-1.5 h-2 bg-[#E85D04] rounded-full" />
                </div>
            </div>
        </section>
    );
}
