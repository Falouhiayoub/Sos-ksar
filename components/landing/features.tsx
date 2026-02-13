import { Shield, Radio, Map, Users, Bell, Clock } from "lucide-react";

const features = [
    {
        name: "Instant Alerts",
        description: "Trigger immediate SOS alerts that reach nearby volunteers and authorities within seconds.",
        icon: Bell,
    },
    {
        name: "Live Tracking",
        description: "Real-time geolocation tracking to guide responders exactly where help is needed most.",
        icon: Map,
    },
    {
        name: "Community Network",
        description: "A verified network of trained volunteers and medical professionals ready to assist.",
        icon: Users,
    },
    {
        name: "Direct Communication",
        description: "Secure, encrypted channels for coordination between victims and responders.",
        icon: Radio,
    },
    {
        name: "24/7 Monitoring",
        description: "Platform active round the clock to ensure safety at any hour of the day.",
        icon: Clock,
    },
    {
        name: "Secure Data",
        description: "Enterprise-grade encryption protecting sensitive personal and location data.",
        icon: Shield,
    },
];

export function Features() {
    return (
        <section id="features" className="py-24 bg-muted/50">
            <div className="container px-4 max-w-screen-2xl mx-auto">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Designed for <span className="text-primary">Rapid Response</span>
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Every second counts during an emergency. Our platform is optimized for speed, reliability, and ease of use.
                    </p>
                </div>

                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {features.map((feature) => (
                        <div key={feature.name} className="flex flex-col items-start bg-background p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                            <div className="rounded-lg bg-primary/10 p-3 mb-4">
                                <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                            </div>
                            <h3 className="text-xl font-semibold leading-7 text-foreground mb-2">
                                {feature.name}
                            </h3>
                            <p className="text-base leading-7 text-muted-foreground">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
