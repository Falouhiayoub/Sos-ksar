"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";

export default function LoginPage() {
    const [isPending, setIsPending] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const router = useRouter();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);

        try {
            if (isSignUp) {
                await authClient.signUp.email({
                    email,
                    password,
                    name,
                    callbackURL: "/",
                }, {
                    onSuccess: () => {
                        toast.success("Account created successfully!");
                        setIsSignUp(false);
                    },
                    onError: (ctx) => {
                        console.error("Auth error:", ctx.error);
                        toast.error(ctx.error.message);
                    }
                });
            } else {
                await authClient.signIn.email({
                    email,
                    password,
                    callbackURL: "/",
                }, {
                    onSuccess: () => {
                        toast.success("Logged in successfully!");
                        router.push("/");
                    },
                    onError: (ctx) => {
                        toast.error(ctx.error.message);
                    }
                });
            }
        } finally {
            setIsPending(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsPending(true);
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            }, {
                onSuccess: () => {
                    toast.success("Redirecting to Google...");
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                }
            });
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden bg-background">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="w-full max-w-md animate-in fade-in-50 zoom-in-95 duration-500">
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>

                <Card className="border-border/50 bg-card/95 backdrop-blur shadow-2xl">
                    <CardHeader className="space-y-1 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                                <span className="text-xl font-bold">K</span>
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold tracking-tight">
                            {isSignUp ? "Create an account" : "Welcome back"}
                        </CardTitle>
                        <CardDescription>
                            {isSignUp
                                ? "Enter your details to join the network"
                                : "Sign in to access your dashboard"
                            }
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleAuth}>
                        <CardContent className="space-y-4">
                            {isSignUp && (
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="bg-background/50"
                                    />
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-background/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    {!isSignUp && (
                                        <Link href="#" className="text-xs text-primary hover:underline">
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-background/50"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <Button className="w-full h-10 text-base shadow-md" type="submit" disabled={isPending}>
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </>
                                ) : (
                                    isSignUp ? "Sign Up" : "Sign In"
                                )}
                            </Button>

                            <div className="relative w-full">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-border" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                type="button"
                                className="w-full h-10"
                                onClick={handleGoogleSignIn}
                                disabled={isPending}
                            >
                                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                </svg>
                                Google
                            </Button>

                            <div className="text-center text-sm text-muted-foreground">
                                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                                <button
                                    type="button"
                                    onClick={() => setIsSignUp(!isSignUp)}
                                    className="font-medium text-primary hover:underline"
                                >
                                    {isSignUp ? "Log In" : "Sign Up"}
                                </button>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
