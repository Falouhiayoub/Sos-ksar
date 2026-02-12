"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Send, Heart, Utensils, LifeBuoy, MapPin, FileText, AlertCircle } from "lucide-react";

// Schéma de validation
const reportSchema = z.object({
    type: z.enum(["medical", "food", "rescue"]),
    location: z.string().min(1, "La localisation est requise"),
    description: z.string().min(1, "La description est requise"),
});

type ReportFormValues = z.infer<typeof reportSchema>;

export function ReportForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<ReportFormValues>({
        resolver: zodResolver(reportSchema),
        defaultValues: {
            type: "medical",
            location: "",
            description: "",
        },
    });

    const selectedType = watch("type");

    const onSubmit = async (data: ReportFormValues) => {
        setIsSubmitting(true);
        // Simulation d'envoi
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("SOS Signalé:", data);
        setIsSubmitting(false);
        setIsSuccess(true);
        reset();
    };

    if (isSuccess) {
        return (
            <Card className="max-w-md mx-auto shadow-2xl border-[#778DA9]/20 rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-300 bg-gradient-to-br from-white to-[#E0E1DD]/30">
                <CardContent className="pt-12 pb-12 flex flex-col items-center text-center space-y-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#A67C52] rounded-full blur-xl opacity-30 animate-pulse" />
                        <div className="relative w-20 h-20 bg-gradient-to-br from-[#A67C52] to-[#778DA9] rounded-full flex items-center justify-center shadow-xl">
                            <Send className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-black text-[#1B263B]">Merci !</CardTitle>
                    <p className="text-[#778DA9] text-lg leading-relaxed max-w-sm">
                        Votre signalement SOS a été envoyé avec succès. Une équipe sera prévenue sous peu.
                    </p>
                    <Button
                        onClick={() => setIsSuccess(false)}
                        className="mt-4 rounded-xl bg-[#A67C52] hover:bg-[#E85D04] text-white font-bold shadow-lg hover:scale-105 transition-all px-6"
                    >
                        Signaler un autre besoin
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="max-w-md mx-auto shadow-2xl border-[#778DA9]/20 rounded-2xl overflow-hidden bg-white">
            <CardHeader className="bg-gradient-to-r from-[#1B263B] to-[#0D1B2A] text-white p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E85D04]/10 rounded-full blur-3xl" />
                <div className="relative flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[#E85D04]/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <AlertCircle className="w-6 h-6 text-[#E85D04]" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-black">Signaler un SOS</CardTitle>
                        <CardDescription className="text-[#E0E1DD]/80 mt-1">
                            Remplissez les informations pour demander de l'aide
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="p-8 space-y-6 bg-gradient-to-b from-white to-[#E0E1DD]/10">
                    {/* Type d'urgence */}
                    <div className="space-y-3">
                        <Label htmlFor="type" className="text-sm font-bold text-[#1B263B] flex items-center">
                            <LifeBuoy className="w-4 h-4 mr-2 text-[#778DA9]" />
                            Type d'urgence
                        </Label>
                        <Select
                            onValueChange={(value) => setValue("type", value as any)}
                            defaultValue={selectedType}
                        >
                            <SelectTrigger
                                id="type"
                                className="rounded-xl border-[#778DA9]/30 bg-[#E0E1DD]/20 focus:ring-2 focus:ring-[#A67C52] focus:border-[#A67C52] h-12 font-medium text-[#1B263B] shadow-sm hover:shadow-md transition-all"
                            >
                                <SelectValue placeholder="Choisir un type" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-[#778DA9]/30">
                                <SelectItem value="medical" className="font-medium">
                                    <div className="flex items-center">
                                        <Heart className="w-4 h-4 mr-2 text-[#E85D04]" />
                                        Médical
                                    </div>
                                </SelectItem>
                                <SelectItem value="food" className="font-medium">
                                    <div className="flex items-center">
                                        <Utensils className="w-4 h-4 mr-2 text-[#A67C52]" />
                                        Nourriture
                                    </div>
                                </SelectItem>
                                <SelectItem value="rescue" className="font-medium">
                                    <div className="flex items-center">
                                        <LifeBuoy className="w-4 h-4 mr-2 text-[#778DA9]" />
                                        Secours / Sauvetage
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Localisation */}
                    <div className="space-y-3">
                        <Label htmlFor="location" className="text-sm font-bold text-[#1B263B] flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-[#778DA9]" />
                            Localisation
                        </Label>
                        <Input
                            id="location"
                            placeholder="Ex: Quartier El Ksar, Rue 4..."
                            {...register("location")}
                            className={`rounded-xl border-[#778DA9]/30 bg-[#E0E1DD]/20 focus:ring-2 focus:ring-[#A67C52] focus:border-[#A67C52] h-12 font-medium text-[#1B263B] placeholder:text-[#778DA9]/50 shadow-sm hover:shadow-md transition-all ${errors.location ? "border-[#E85D04] focus:ring-[#E85D04]" : ""
                                }`}
                        />
                        {errors.location && (
                            <div className="flex items-center space-x-1">
                                <AlertCircle className="w-3 h-3 text-[#E85D04]" />
                                <p className="text-xs text-[#E85D04] font-semibold">{errors.location.message}</p>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                        <Label htmlFor="description" className="text-sm font-bold text-[#1B263B] flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-[#778DA9]" />
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Décrivez brièvement la situation..."
                            {...register("description")}
                            rows={4}
                            className={`rounded-xl border-[#778DA9]/30 bg-[#E0E1DD]/20 focus:ring-2 focus:ring-[#A67C52] focus:border-[#A67C52] resize-none font-medium text-[#1B263B] placeholder:text-[#778DA9]/50 shadow-sm hover:shadow-md transition-all ${errors.description ? "border-[#E85D04] focus:ring-[#E85D04]" : ""
                                }`}
                        />
                        {errors.description && (
                            <div className="flex items-center space-x-1">
                                <AlertCircle className="w-3 h-3 text-[#E85D04]" />
                                <p className="text-xs text-[#E85D04] font-semibold">{errors.description.message}</p>
                            </div>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="p-8 pt-0 bg-gradient-to-b from-[#E0E1DD]/10 to-white">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 text-lg font-black bg-gradient-to-r from-[#A67C52] to-[#778DA9] hover:from-[#E85D04] hover:to-[#A67C52] text-white rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Envoi en cours...
                            </>
                        ) : (
                            <>
                                <Send className="mr-2 h-5 w-5" />
                                Envoyer l'alerte SOS
                            </>
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
