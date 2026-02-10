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
import { Loader2, Send } from "lucide-react";

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
            <Card className="max-w-md mx-auto shadow-md border-zinc-100 rounded-xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <CardContent className="pt-12 pb-12 flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-[#2F9BA6]/10 rounded-full flex items-center justify-center">
                        <Send className="w-8 h-8 text-[#2F9BA6]" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-[#2F9BA6]">Merci !</CardTitle>
                    <p className="text-zinc-600">
                        Votre signalement SOS a été envoyé avec succès. Une équipe sera prévenue sous peu.
                    </p>
                    <Button
                        onClick={() => setIsSuccess(false)}
                        variant="outline"
                        className="mt-4 rounded-xl hover:scale-105 transition-transform"
                    >
                        Signaler un autre besoin
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="max-w-md mx-auto shadow-md border-zinc-100 rounded-xl overflow-hidden">
            <CardHeader className="bg-[#EB2411] text-white p-6">
                <CardTitle className="text-2xl font-bold">Signaler un SOS</CardTitle>
                <CardDescription className="text-white/80">
                    Veuillez remplir les informations ci-dessous pour demander de l'aide.
                </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="p-8 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="type" className="text-sm font-medium text-zinc-700">Type d'urgence</Label>
                        <Select
                            onValueChange={(value) => setValue("type", value as any)}
                            defaultValue={selectedType}
                        >
                            <SelectTrigger id="type" className="rounded-lg border-zinc-200 focus:ring-[#2F9BA6] focus:border-[#2F9BA6]">
                                <SelectValue placeholder="Choisir un type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="medical">🚑 Médical</SelectItem>
                                <SelectItem value="food">🍱 Nourriture</SelectItem>
                                <SelectItem value="rescue">🆘 Secours / Sauvetage</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location" className="text-sm font-medium text-zinc-700">Localisation</Label>
                        <Input
                            id="location"
                            placeholder="Ex: Quartier El Ksar, Rue 4..."
                            {...register("location")}
                            className={`rounded-lg border-zinc-200 focus:ring-[#2F9BA6] focus:border-[#2F9BA6] ${errors.location ? "border-red-500" : ""}`}
                        />
                        {errors.location && (
                            <p className="text-xs text-red-500 font-medium">{errors.location.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium text-zinc-700">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Décrivez brièvement la situation..."
                            {...register("description")}
                            rows={4}
                            className={`rounded-lg border-zinc-200 focus:ring-[#2F9BA6] focus:border-[#2F9BA6] resize-none ${errors.description ? "border-red-500" : ""}`}
                        />
                        {errors.description && (
                            <p className="text-xs text-red-500 font-medium">{errors.description.message}</p>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="p-8 pt-0">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 text-lg font-bold bg-[#EB2411] hover:bg-[#D4AF37] text-white rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-70"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Envoi en cours...
                            </>
                        ) : (
                            "Envoyer l'alerte SOS"
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
