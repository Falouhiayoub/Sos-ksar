import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-background border-t border-border">
            <div className="container px-4 max-w-screen-2xl mx-auto py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <span className="text-lg">K</span>
                            </div>
                            <span>SOS Ksar</span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Empowering communities with rapid emergency response coordination and support.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Product</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">Features</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Mobile App</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">About Us</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} SOS Ksar. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
