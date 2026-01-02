// src/app/(public)/conference/life-science/page.tsx
"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getLifeScienceConferences, LifeScienceConference } from "@/services/lifeScienceConferenceService";
import Link from "next/link";
import { ArrowRight, FlaskConical } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function LifeScienceConferencesPage() {
    const [conferences, setConferences] = React.useState<LifeScienceConference[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const { toast } = useToast();

    React.useEffect(() => {
        const fetchConferences = async () => {
            setIsLoading(true);
            try {
                const data = await getLifeScienceConferences();
                setConferences(data);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Could not fetch Life Science conferences.",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchConferences();
    }, [toast]);

    return (
        <div className="bg-secondary/30">
            <section className="relative bg-background overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1579165466949-518dd7d995df?q=80&w=1600&h=600&auto=format=fit=crop"
                        alt="Life Science background"
                        data-ai-hint="science laboratory"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
                <div className="relative container mx-auto px-4 md:px-6 z-10 py-24 sm:py-32">
                    <div className="max-w-3xl">
                        <ol className="flex items-center gap-2 text-white/80">
                            <li><Link href="/" className="hover:text-primary">Home</Link></li>
                            <li>/ <Link href="/conference" className="hover:text-primary">Conferences</Link></li>
                            <li className="text-primary">/ Life Science Conferences</li>
                        </ol>
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mt-4 text-white">
                            Life Science Conferences
                        </h1>
                        <p className="mt-4 text-lg text-white/90 max-w-2xl">
                           A curated list of special upcoming conferences in the field of Life Sciences.
                        </p>
                    </div>
                </div>
            </section>
            <section className="container mx-auto px-4 md:px-6 py-12 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <Skeleton className="h-5 w-3/4" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-1/2 mt-2" />
                            </CardContent>
                             <CardFooter>
                                <Skeleton className="h-10 w-full" />
                            </CardFooter>
                        </Card>
                    ))
                ) : conferences.length > 0 ? (
                    conferences.map((conf) => (
                        <Card key={conf.id} className="flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-lg border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <FlaskConical className="h-6 w-6 text-primary" />
                                    {conf.heading}
                                </CardTitle>
                                <CardDescription>Special Listing</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm text-muted-foreground">This is a featured conference in the life sciences. Click below for more details and registration information.</p>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full">
                                    <Link href={conf.link} target="_blank" rel="noopener noreferrer">
                                        Visit Conference Site <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-16">
                        <p className="text-muted-foreground">No special life science conferences are listed at this time.</p>
                    </div>
                )}
                </div>
            </section>
        </div>
    );
}
