import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert, HeartHandshake, Siren, MapPin, Activity } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center p-6 min-h-[80vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1454789476662-bddc4f440263?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

        <div className="relative z-10 max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Alerte Météo : Tempête Leonardo en cours
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            SOS <span className="text-red-500">Ksar</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">
            Plateforme citoyenne de gestion de crise. Signalez une urgence,
            localisez des ressources, ou proposez votre aide en temps réel.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/dashboard">
              <Button size="lg" className="h-16 px-8 text-lg gap-3 bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all hover:scale-105">
                <Siren className="h-6 w-6 animate-pulse" />
                J'AI BESOIN D'AIDE
              </Button>
            </Link>

            <Link href="/sign-in?tab=signup">
              <Button size="lg" variant="outline" className="h-16 px-8 text-lg gap-3 border-orange-500 text-orange-500 hover:bg-orange-500/10 hover:text-orange-400 shadow-lg shadow-orange-500/10 transition-all hover:scale-105">
                <HeartHandshake className="h-6 w-6" />
                JE VEUX AIDER
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background text-foreground">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-muted/30 border hover:border-primary/20 transition-colors">
              <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Signalement Rapide</h3>
              <p className="text-muted-foreground">
                Signalez une urgence médicale, sécuritaire ou un besoin de ressources en quelques clics. Géolocalisation automatique.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-muted/30 border hover:border-primary/20 transition-colors">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Suivi en Temps Réel</h3>
              <p className="text-muted-foreground">
                Suivez l'état de prise en charge de votre alerte. Les bénévoles et secours coordonnent leurs actions via le centre de commande.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-muted/30 border hover:border-primary/20 transition-colors">
              <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Cartographie des Ressources</h3>
              <p className="text-muted-foreground">
                Visualisez les stocks disponibles (eau, nourriture, médicaments) et les points de rassemblement sécurisés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer is handled by layout? Or we can add a simple one here */}
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        <p>© 2024 SOS Ksar - Plateforme open-source de gestion de crise.</p>
      </footer>
    </div>
  );
}
