import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert, HeartHandshake, Siren, MapPin, Activity, Send, Users, CheckCircle2, ArrowRight, Quote, Clock, Heart, Package, AlertTriangle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center p-6 min-h-[80vh] text-white overflow-hidden">
        {/* Background Image with Blur */}
        <div
          className="absolute inset-0 bg-[url('/image.jpg')] bg-cover bg-center transition-all duration-700"
          style={{
            filter: 'blur(1px) brightness(2)',
            transform: 'scale(1)' // Prevent white edges from blur
          }}
        ></div>

        {/* Overlays for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-slate-900/60"></div>
        <div className="absolute inset-0 bg-black/20"></div>

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
                J&apos;AI BESOIN D&apos;AIDE
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

      {/* Comment ça marche – 3-step flow */}
      <section className="py-20 bg-gradient-to-b from-muted/40 to-background text-foreground overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 animate-in fade-in slide-in-from-bottom-4 duration-600">
            Comment ça marche
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-600 delay-75">
            En trois étapes, votre alerte est signalée, prise en charge et résolue.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-start max-w-4xl mx-auto">
            {/* Step 1 – Signaler */}
            <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-6 duration-700 delay-0 md:delay-0 transition-transform duration-300 hover:scale-[1.02]">
              <div className="relative mb-5">
                <span className="absolute inset-0 rounded-full border-2 border-red-500/40 bg-transparent animate-pulse-ring" aria-hidden />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-white text-xl font-bold shadow-lg shadow-red-500/30 ring-4 ring-red-500/20 animate-step-float">
                  <Send className="h-7 w-7" />
                </span>
                <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-background border-2 border-red-500 text-sm font-bold text-red-600">
                  1
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Signaler</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Décrivez l&apos;urgence et votre position. Votre alerte est envoyée au centre de commande en quelques secondes.
              </p>
            </div>

            {/* Connector 1 → 2 */}
            <div className="hidden md:flex items-center justify-center pt-12 animate-in fade-in duration-500 delay-200">
              <ArrowRight className="h-8 w-8 text-muted-foreground/50 animate-in slide-in-from-left-4 duration-500 delay-300" />
            </div>

            {/* Step 2 – Prise en charge */}
            <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 md:delay-200 transition-transform duration-300 hover:scale-[1.02]">
              <div className="relative mb-5">
                <span className="absolute inset-0 rounded-full border-2 border-blue-500/40 bg-transparent animate-pulse-ring" aria-hidden style={{ animationDelay: "0.3s" }} />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white text-xl font-bold shadow-lg shadow-blue-500/30 ring-4 ring-blue-500/20 animate-step-float" style={{ animationDelay: "0.2s" }}>
                  <Users className="h-7 w-7" />
                </span>
                <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-background border-2 border-blue-500 text-sm font-bold text-blue-600">
                  2
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Prise en charge</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Les bénévoles et secours reçoivent l&apos;alerte et se coordonnent. Vous pouvez suivre le statut en temps réel.
              </p>
            </div>

            {/* Connector 2 → 3 */}
            <div className="hidden md:flex items-center justify-center pt-12 animate-in fade-in duration-500 delay-300">
              <ArrowRight className="h-8 w-8 text-muted-foreground/50 animate-in slide-in-from-left-4 duration-500 delay-500" />
            </div>

            {/* Step 3 – Résolution */}
            <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 md:delay-400 transition-transform duration-300 hover:scale-[1.02]">
              <div className="relative mb-5">
                <span className="absolute inset-0 rounded-full border-2 border-emerald-500/40 bg-transparent animate-pulse-ring" aria-hidden style={{ animationDelay: "0.6s" }} />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white text-xl font-bold shadow-lg shadow-emerald-500/30 ring-4 ring-emerald-500/20 animate-step-float" style={{ animationDelay: "0.4s" }}>
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-background border-2 border-emerald-500 text-sm font-bold text-emerald-600">
                  3
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Résolution</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Une fois l&apos;aide sur place, l&apos;alerte est clôturée. Vous restez informé jusqu&apos;à la fin.
              </p>
            </div>
          </div>

          {/* Mobile: vertical connector line (decorative) */}
          <div className="md:hidden flex justify-center gap-2 mt-6 animate-in fade-in duration-700 delay-500">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span className="h-8 w-px bg-gradient-to-b from-red-500 via-blue-500 to-emerald-500" />
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="h-8 w-px bg-gradient-to-b from-blue-500 to-emerald-500" />
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
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
                Suivez l&apos;état de prise en charge de votre alerte. Les bénévoles et secours coordonnent leurs actions via le centre de commande.
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

      {/* Témoignages */}
      <section className="py-20 bg-muted/30 text-foreground overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 animate-in fade-in slide-in-from-bottom-4 duration-600">
            Ils nous font confiance
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-14 animate-in fade-in slide-in-from-bottom-4 duration-600 delay-75">
            Citoyens et bénévoles témoignent de leur expérience avec SOS Ksar.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Témoignage 1 – Citoyen */}
            <article
              className="relative rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:-translate-y-1 opacity-0 animate-testimonial-enter"
              style={{ animationDelay: "0.1s" }}
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20 animate-quote-float" aria-hidden />
              <p className="text-foreground/90 text-sm leading-relaxed mb-6 pr-8">
                &quot;Pendant les inondations, j&apos;ai signalé un arbre tombé sur la route. En moins d&apos;une heure une équipe était sur place. Simple et efficace.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 font-semibold text-sm shrink-0 ring-2 ring-red-500/20">
                  MK
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Meriem K.</p>
                  <p className="text-xs text-muted-foreground">Citoyenne</p>
                </div>
              </div>
            </article>

            {/* Témoignage 2 – Bénévole */}
            <article
              className="relative rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:-translate-y-1 opacity-0 animate-testimonial-enter"
              style={{ animationDelay: "0.3s" }}
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20 animate-quote-float" aria-hidden style={{ animationDelay: "0.5s" }} />
              <p className="text-foreground/90 text-sm leading-relaxed mb-6 pr-8">
                &quot;En tant que bénévole, je vois les alertes en direct et je peux me proposer tout de suite. La carte et le suivi m&apos;aident à prioriser.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 font-semibold text-sm shrink-0 ring-2 ring-orange-500/20">
                  SB
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Salah B.</p>
                  <p className="text-xs text-muted-foreground">Bénévole</p>
                </div>
              </div>
            </article>

            {/* Témoignage 3 – Citoyen */}
            <article
              className="relative rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:-translate-y-1 opacity-0 animate-testimonial-enter"
              style={{ animationDelay: "0.5s" }}
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20 animate-quote-float" aria-hidden style={{ animationDelay: "1s" }} />
              <p className="text-foreground/90 text-sm leading-relaxed mb-6 pr-8">
                &quot;Ma mère avait besoin de médicaments, impossible de sortir. J&apos;ai posté une alerte : un voisin bénévole a pu nous dépanner le jour même.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-semibold text-sm shrink-0 ring-2 ring-blue-500/20">
                  YT
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Youssef T.</p>
                  <p className="text-xs text-muted-foreground">Citoyen</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Situation en cours – Dernières alertes (non géolocalisées) */}
      <section className="py-16 bg-background text-foreground border-t">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl md:text-3xl font-bold">Situation en cours</h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                En direct
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Dernières alertes, sans localisation précise.
            </p>
          </div>

          <ul className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-600">
            {[
              {
                type: "medical" as const,
                label: "Besoin médical",
                description: "Personne isolée, besoin de médicaments.",
                status: "Prise en charge" as const,
                time: "Il y a 12 min",
              },
              {
                type: "resources" as const,
                label: "Ressources",
                description: "Demande d'eau et denrées, quartier nord.",
                status: "En cours" as const,
                time: "Il y a 28 min",
              },
              {
                type: "safety" as const,
                label: "Sécurité",
                description: "Arbre tombé sur voie, circulation gênée.",
                status: "Résolu" as const,
                time: "Il y a 1 h",
              },
              {
                type: "medical" as const,
                label: "Besoin médical",
                description: "Accident domestique, premiers secours demandés.",
                status: "Prise en charge" as const,
                time: "Il y a 45 min",
              },
            ].map((alert, i) => (
              <li
                key={i}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 rounded-xl border bg-card hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="shrink-0 flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    {alert.type === "medical" && <Heart className="h-4 w-4 text-red-500" />}
                    {alert.type === "resources" && <Package className="h-4 w-4 text-orange-500" />}
                    {alert.type === "safety" && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-sm">{alert.label}</p>
                    <p className="text-muted-foreground text-sm truncate">{alert.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 sm:ml-auto">
                  <span
                    className={
                      alert.status === "Résolu"
                        ? "text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium"
                        : alert.status === "Prise en charge"
                          ? "text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium"
                          : "text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium"
                    }
                  >
                    {alert.status}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {alert.time}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Connectez-vous pour voir la carte et les détails en temps réel.
          </p>
          <div className="mt-4 flex justify-center">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="gap-2">
                <Activity className="h-4 w-4" />
                Tableau de bord
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        <p>© 2024 SOS Ksar - Plateforme open-source de gestion de crise.</p>
      </footer>
    </div>
  );
}
