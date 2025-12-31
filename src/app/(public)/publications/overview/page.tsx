

import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Publications Overview | Policies & Ethics',
    description: 'Understand the publication policies, terms, and ethics at Innovation Conferences, including our strict plagiarism policy. Learn how to publish with us.',
    keywords: ['how to publish a research paper', 'publication ethics', 'plagiarism policy', 'scholarly articles', 'peer-reviewed journals', 'manuscript peer-review process explained'],
};

const plagiarismPolicies = [
    { text: "Plagiarized articles will be rejected (Must be 20% below including references).", icon: AlertTriangle, iconColor: "text-destructive" },
    { text: "Copying of contents from other articles is strictly prohibited.", icon: AlertTriangle, iconColor: "text-destructive" },
    { text: "Only articles with 80% original content should be submitted with the expectation of being accepted for our conferences and journals.", icon: CheckCircle, iconColor: "text-green-500" },
    { text: "Innovation Conferences keenly discourages plagiarism in research articles, proposals and thesis submitted to us.", icon: CheckCircle, iconColor: "text-green-500" },
    { text: "All articles submitted to Innovation Conferences and Publications first undergo a plagiarism check before being sent to our editorial board for review.", icon: CheckCircle, iconColor: "text-green-500" },
    { text: "Articles failing plagiarism check will be subjected to rejection.", icon: AlertTriangle, iconColor: "text-destructive" },
];

const termsAndConditions = [
    { text: "Note that plagiarized articles will be rejected (Must be 20% below including references).", icon: AlertTriangle, iconColor: "text-destructive" },
    { text: "Copying of contents from other articles is strictly prohibited.", icon: AlertTriangle, iconColor: "text-destructive" },
    { text: "Review reports have to be answered by the author accurately. Malpractice will not be tolerated.", icon: CheckCircle, iconColor: "text-green-500" },
    { text: "The Publisher reserves the right to require payment before publishing.", icon: CheckCircle, iconColor: "text-green-500" },
    { text: "Payment is due upon receipt of invoices.", icon: CheckCircle, iconColor: "text-green-500" },
    { text: "All bank charges are payable by the customer.", icon: CheckCircle, iconColor: "text-green-500" },
    { text: "Any Plagiarism, Poor Figures, Flawed Science, and Uneven quality may lead to the rejection of the paper.", icon: AlertTriangle, iconColor: "text-destructive" },
]

export default function PublicationsOverviewPage() {
  return (
    <div className="bg-background">
        <section className="relative w-full py-20 md:py-32 bg-gray-800 text-white">
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1527192491265-7e626dcf327dd653?q=80&w=1200&auto=format&fit=crop"
                    alt="Publications Overview"
                    data-ai-hint="academic conference"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>
            <div className="relative container mx-auto px-4 md:px-6 z-10">
                <div className="max-w-3xl">
                    <ol className="flex items-center gap-2 text-white/80">
                      <li><Link href="/" className="hover:text-primary">Home</Link></li>
                      <li>/ <Link href="/publications" className="hover:text-primary">Publications</Link></li>
                      <li className="text-primary">/ Overview</li>
                    </ol>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mt-4 text-white">
                        Publications Overview
                    </h1>
                </div>
            </div>
        </section>
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
            
            <p className="text-center text-lg text-muted-foreground max-w-4xl mx-auto my-16">
                Innovation Conferences Journals are peer-reviewed and collaborative journals that strive to publish the most fascinating and dependable source of current information on Arts & Science, Management, Engineering, and Technology.
            </p>


            <Card className="overflow-hidden mb-16 shadow-xl border-2 border-primary/10 transition-shadow duration-300 hover:shadow-primary/20">
                <div className="grid md:grid-cols-2">
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold tracking-tight text-primary mb-4">Expert Publishing Assistance</h2>
                        <p className="text-muted-foreground text-lg">
                            Innovation Conferences provides help, assistance, and direction in preparation for SCI and SCIE journal publishing. The SCI & SCIE Indexed Journal Search might be exhausting. Get help with SCI and SCIE Indexed journal publishing.
                        </p>
                    </div>
                    <div className="relative min-h-[300px] md:min-h-0">
                         <Image
                            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&h=400&auto=format&fit=crop"
                            alt="Researchers collaborating"
                            data-ai-hint="research collaboration"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </Card>

            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-destructive/20 border-t-4 border-destructive">
                    <CardHeader>
                        <CardTitle className="text-2xl text-destructive">Plagiarism Policy & Publication Ethics</CardTitle>
                        <CardDescription>Maintaining the integrity of academic research.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {plagiarismPolicies.map((policy, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <policy.icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${policy.iconColor}`} />
                                    <span className="text-muted-foreground">{policy.text}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                <Card className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 border-t-4 border-primary">
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Publication Terms & Conditions</CardTitle>
                         <CardDescription>Guidelines for authors submitting their work.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-4">
                            {termsAndConditions.map((term, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <term.icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${term.iconColor}`} />
                                    <span className="text-muted-foreground">{term.text}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}