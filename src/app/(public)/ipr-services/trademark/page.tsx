import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Search, Edit, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TrademarkPage() {
    return (
        <div className="bg-background">
             <section className="relative bg-background overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1600&h=600&auto=format=fit=crop"
                        alt="Trademark services background"
                        data-ai-hint="legal brand"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
                <div className="relative container mx-auto px-4 md:px-6 z-10 py-24 sm:py-32">
                    <div className="max-w-3xl">
                        <ol className="flex items-center gap-2 text-white/80">
                            <li><Link href="/" className="hover:text-primary">Home</Link></li>
                            <li>/ <Link href="/ipr-services" className="hover:text-primary">IPR Services</Link></li>
                            <li className="text-primary">/ Trademark</li>
                        </ol>
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mt-4 text-white">
                            Trademark Registration
                        </h1>
                    </div>
                </div>
            </section>
            <div className="container mx-auto px-4 py-12 md:py-20">
                <Card className="grid md:grid-cols-2 items-center mb-16 shadow-lg border-primary/20">
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-primary mb-4">Why Register a Trademark?</h2>
                        <ul className="space-y-4 text-muted-foreground">
                            <li className="flex items-start gap-3">
                                <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                <span><span className="font-semibold text-foreground">Nationwide Priority:</span> Establishes your rights to use the mark nationwide for your specific goods or services.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                <span><span className="font-semibold text-foreground">Legal Presumption of Ownership:</span> A registered trademark serves as legal evidence of your ownership and exclusive rights.</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                <span><span className="font-semibold text-foreground">Deters Others:</span> Discourages others from using confusingly similar marks and makes it easier to stop them if they do.</span>
                            </li>
                        </ul>
                         <Button className="mt-6" asChild>
                           <Link href="/contact-us">
                                Start Your Application <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                    <div className="relative h-full min-h-[300px] md:min-h-[400px] rounded-r-lg overflow-hidden">
                        <Image src="/photo5.jpg" alt="Trademark" data-ai-hint="brand logo" layout="fill" objectFit="cover" />
                    </div>
                </Card>

                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">Our Trademark Services</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Search className="text-primary"/>Clearance Search</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">We conduct comprehensive searches to ensure your desired mark is available for use and registration.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Edit className="text-primary"/>Application Filing</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Our experts prepare and file your trademark application with the appropriate national office to maximize success.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><ShieldCheck className="text-primary"/>Monitoring & Enforcement</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">We offer services to monitor for infringing marks and can assist with enforcement actions to protect your brand.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
