import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ReportForm } from "../components/report-form";

// Mock des animations Framer Motion ou autres si nécessaire
// Ici on en n'a pas besoin car on utilise des classes Tailwind standard

describe("ReportForm", () => {
    it("va rendre le formulaire et afficher un message de succès après soumission", async () => {
        render(<ReportForm />);

        // Vérifier que les éléments sont présents
        expect(screen.getByText("Signaler un SOS")).toBeDefined();
        expect(screen.getByLabelText(/Localisation/i)).toBeDefined();
        expect(screen.getByLabelText(/Description/i)).toBeDefined();

        // Remplir les champs
        const locationInput = screen.getByLabelText(/Localisation/i);
        const descriptionInput = screen.getByLabelText(/Description/i);
        const submitButton = screen.getByRole("button", { name: /Envoyer l'alerte SOS/i });

        fireEvent.change(locationInput, { target: { value: "Marrakech, Medina" } });
        fireEvent.change(descriptionInput, { target: { value: "Besoin de secours immédiat" } });

        // Note: Le Select de Radix est difficile à tester avec fireEvent standard. 
        // Comme il a une valeur par défaut "medical", on peut continuer sans le changer 
        // ou utiliser user-event si installé. Ici on garde la simplicité.

        // Cliquer sur envoyer
        fireEvent.click(submitButton);

        // Vérifier l'état de chargement
        expect(await screen.findByText(/Envoi en cours.../i)).toBeDefined();

        // Attendre le message de succès (on a un délai de 1500ms dans le composant)
        await waitFor(() => {
            expect(screen.getByText("Merci !")).toBeDefined();
            expect(screen.getByText(/Votre signalement SOS a été envoyé avec succès/i)).toBeDefined();
        }, { timeout: 3000 });
    });

    it("va afficher des erreurs de validation si les champs sont vides", async () => {
        render(<ReportForm />);

        const submitButton = screen.getByRole("button", { name: /Envoyer l'alerte SOS/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText("La localisation est requise")).toBeDefined();
            expect(screen.getByText("La description est requise")).toBeDefined();
        });
    });
});
