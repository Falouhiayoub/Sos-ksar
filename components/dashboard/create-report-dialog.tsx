"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createReport } from "@/app/actions/report-actions";
import { toast } from "sonner";
import { Loader2, PlusCircle } from "lucide-react";

export function CreateReportDialog() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);

        try {
            const data = {
                type: formData.get("type"),
                priority: formData.get("priority"),
                location: formData.get("location"),
                description: formData.get("description"),
            };

            const result = await createReport(data);

            if (result.success) {
                toast.success("Signalement envoyé avec succès");
                setOpen(false);
            } else {
                // @ts-ignore
                toast.error("Erreur lors de l'envoi");
            }
        } catch (error) {
            toast.error("Une erreur est survenue");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                    <PlusCircle className="h-4 w-4" />
                    Nouveau Signalement
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Signaler un incident</DialogTitle>
                    <DialogDescription>
                        Remplissez ce formulaire pour alerter les secours. Soyez précis.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="type">Type d'incident</Label>
                        <Select name="type" required>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="medical">🚑 Urgence Médicale</SelectItem>
                                <SelectItem value="security">🚨 Sécurité / Danger</SelectItem>
                                <SelectItem value="resource">💧 Besoin Ressource</SelectItem>
                                <SelectItem value="other">📝 Autre</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="priority">Niveau d'urgence</Label>
                        <Select name="priority" required defaultValue="medium">
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Faible</SelectItem>
                                <SelectItem value="medium">Moyen</SelectItem>
                                <SelectItem value="high">Élevé</SelectItem>
                                <SelectItem value="critical">Critique</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="location">Localisation</Label>
                        <Input id="location" name="location" placeholder="Ex: Quartier El Manar, Rue 12..." required minLength={5} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" placeholder="Décrivez la situation..." required minLength={10} />
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Envoyer le signalement
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
