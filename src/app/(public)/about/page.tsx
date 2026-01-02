// src/app/(public)/about/page.tsx
import { getPageContent } from "@/services/cmsService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { Target, Eye, Presentation, BookOpen, GraduationCap, Calendar, Clock, Compass } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Innovation Conferences",
  description: "Learn about Innovation Conferences' mission to advance knowledge and foster innovation by connecting the brightest minds from around the globe through conference management, publications, and PhD services.",
  keywords: ["about us", "mission", "vision", "academic services", "conference management", "Leading publication house in Nagpur", "Trusted publisher in Nagpur"],
};

const aboutEvent = [
    {
        imageSrc: "https://picsum.photos/seed/a1/600/400",
        imageHint: "team meeting",
        title: "Why we are doing this?",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque"
    },
    {
        imageSrc: "https://picsum.photos/seed/a2/600/400",
        imageHint: "learning book",
        title: "What you will learn?",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque"
    },
    {
        imageSrc: "https://picsum.photos/seed/a3/600/400",
        imageHint: "achievement award",
        title: "What are the benefits?",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque"
    },
];

const features = [
    {
        icon: Calendar,
        title: "Issues",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque"
    },
    {
        icon: Clock,
        title: "Maintenance",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque"
    },
    {
        icon: Compass,
        title: "Destination",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque"
    }
]

export default async function AboutPage() {
  return (
    <>
      <section className="relative bg-background overflow-hidden">
          <div className="absolute inset-0 z-0">
              <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&h=600&auto=format=fit=crop"
                  alt="About us background"
                  data-ai-hint="team collaboration"
                  fill
                  className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative container mx-auto px-4 md:px-6 z-10 py-24 sm:py-32">
              <div className="max-w-3xl">
                  <ol className="flex items-center gap-2 text-white/80">
                      <li><Link href="/" className="hover:text-primary">Home</Link></li>
                      <li className="text-primary">/ About Us</li>
                  </ol>
                  <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mt-4 text-white">
                      About Us
                  </h1>
              </div>
          </div>
      </section>
      
      <section id="about" className="section py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 wow fadeInUp animated" data-wow-delay="0s">About This Event</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {aboutEvent.map((item, index) => (
              <div key={item.title} className="service-block wow fadeInDown animated" data-wow-delay={`${(index + 1) * 0.1}s`}>
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="relative h-56">
                        <Image src={item.imageSrc} alt={item.title} data-ai-hint={item.imageHint} fill className="object-cover"/>
                    </div>
                    <CardContent className="p-6 text-center">
                        <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                        <p className="text-muted-foreground">{item.description}</p>
                        <Button variant="link" className="mt-4 text-primary">Read More</Button>
                    </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="featured" className="section py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 wow fadeInUp animated" data-wow-delay="0s">Our Feature</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                     <div key={feature.title} className="featured-box wow fadeInLeft animated" data-wow-delay={`${(index + 1) * 0.1}s`}>
                        <Card className="p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                            <div className="icon inline-block p-4 mb-4 bg-primary/10 rounded-full">
                                <feature.icon className="h-10 w-10 text-primary" />
                            </div>
                            <div className="featured-content">
                                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        </Card>
                     </div>
                ))}
            </div>
        </div>
      </section>
    </>
  );
}
