// src/components/ui/life-science-conference-list.tsx
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getLifeScienceConferences, LifeScienceConference } from "@/services/lifeScienceConferenceService";
import Link from "next/link";
import { ArrowRight, FlaskConical } from "lucide-react";
import { Skeleton } from "./skeleton";

export default function LifeScienceConferenceList() {
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
        <Card className="bg-red-600 text-white">
            <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                    <FlaskConical />
                    Life Science Conferences
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                {isLoading ? (
                    <div className="space-y-3">
                        <Skeleton className="h-5 w-full bg-white/30" />
                        <Skeleton className="h-5 w-3/4 bg-white/30" />
                        <Skeleton className="h-5 w-full bg-white/30" />
                    </div>
                ) : conferences.length > 0 ? (
                    <ul className="space-y-3">
                        {conferences.map(conf => (
                             <li key={conf.id}>
                                <Link
                                    href={conf.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-3 rounded-md bg-white/10 hover:bg-white/20 transition-colors group"
                                >
                                    <span className="font-medium text-sm">{conf.heading}</span>
                                    <ArrowRight className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-sm text-white/80">No special conferences listed.</p>
                )}
            </CardContent>
        </Card>
    );
}
