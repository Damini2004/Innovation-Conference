
// src/app/(public)/publications/conference-proceedings/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileCheck2, Presentation, Globe, Database, Link as LinkIcon, BookLock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const benefits = [
    {
        icon: Globe,
        title: "Global Dissemination",
        description: "Present your work to an international audience and have it published in our indexed conference proceedings."
    },
    {
        icon: Presentation,
        title: "Oral & Poster Presentations",
        description: "Accepted abstracts are considered for both oral presentations and poster sessions at our conferences."
    },
    {
        icon: FileCheck2,
        title: "Peer-Reviewed Content",
        description: "All submissions undergo a rigorous peer-review process by our expert editorial committees."
    }
];

const services = [
    {
        icon: Database,
        title: "Indexing & Archiving",
        description: "We ensure your proceedings are indexed in major academic databases like Scopus and Web of Science for maximum visibility and citation."
    },
    {
        icon: LinkIcon,
        title: "DOI Assignment",
        description: "Every paper published in our proceedings is assigned a unique Digital Object Identifier (DOI) for permanent and reliable citation."
    },
    {
        icon: BookLock,
        title: "Open Access Options",
        description: "We offer flexible open access publishing options to make your research freely available to a global audience, increasing its impact."
    }
]

export default function ConferenceProceedingsPage() {
    return (
        <div>
             <section className="relative bg-background overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1600&h=600&auto=format&fit=crop"
                        alt="Conference proceedings background"
                        data-ai-hint="team collaboration"
                        fill
                        className="object-cover"
                    />
                    <div
                        className="absolute inset-0 bg-black/60"
                    ></div>
                </div>
                <div className="relative container mx-auto px-4 md:px-6 z-10 py-24 sm:py-32">
                    <div className="max-w-3xl">
                        <ol className="breadcrumb wow fadeInDown flex items-center gap-2 text-white/80" data-wow-delay="300ms">
                          <li><Link href="/" className="hover:text-primary">Home</Link></li>
                          <li>/ <Link href="/publications" className="hover:text-primary">Publications</Link></li>
                          <li className="text-primary">/ Conference Proceedings</li>
                        </ol>
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mt-4 text-white">
                            Conference Proceedings
                        </h1>
                        
                    </div>
                </div>
            </section>
            
            <section className="w-full py-16 md:py-24 bg-secondary/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative aspect-square rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105">
                            <Image
                                src="/photo3.jpg"
                                alt="Researchers collaborating"
                                data-ai-hint="research collaboration"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="space-y-6">
                             <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm font-semibold text-primary">Why Publish With Us?</div>
                            <h2 className="text-3xl font-bold tracking-tighter">Amplify Your Research Impact</h2>
                            <p className="text-muted-foreground">
                                Our conference proceedings offer a unique platform to disseminate your findings, gain valuable feedback, and connect with a global network of researchers and industry leaders.
                            </p>
                            <ul className="space-y-4">
                                {benefits.map((benefit) => (
                                    <li key={benefit.title} className="flex items-start gap-4">
                                        <div className="p-3 bg-background rounded-full mt-1">
                                            <benefit.icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">{benefit.title}</h4>
                                            <p className="text-muted-foreground text-sm">{benefit.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

             <section className="w-full py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tighter">Our Publishing Services</h2>
                        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                            We provide a complete suite of services to ensure your work is published professionally and reaches the widest possible audience.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((service) => (
                           <Card key={service.title} className="text-center flex flex-col transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 border-primary/10">
                                <CardHeader className="items-center">
                                    <div className="p-4 bg-primary/10 rounded-full w-fit mb-3">
                                        <service.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle>{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground">{service.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
