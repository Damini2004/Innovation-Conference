// src/app/(public)/conference/about-conference/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Globe, Lightbulb, CheckCircle, Presentation, BookOpen, Users, Award, Handshake, Target, Group } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';

const corePrinciples = [
    {
        icon: Handshake,
        title: "Fostering Collaboration",
        description: "We create environments that encourage networking and interdisciplinary collaboration among academics, researchers, and industry professionals."
    },
    {
        icon: Lightbulb,
        title: "Promoting Innovation",
        description: "Our conferences are platforms for showcasing cutting-edge research and innovative ideas that have the potential to shape the future."
    },
    {
        icon: CheckCircle,
        title: "Ensuring Quality",
        description: "Through a rigorous peer-review process, we maintain the highest standards of academic integrity and quality for all presented work."
    },
    {
        icon: Globe,
        title: "Global Reach",
        description: "We aim to bring together diverse perspectives from around the world to enrich discussions and broaden the impact of research."
    }
];

const conferenceServices = [
    {
        icon: Presentation,
        title: "Event Management",
        description: "Comprehensive planning and execution for conferences of all sizes."
    },
    {
        icon: BookOpen,
        title: "Proceedings Publication",
        description: "Ensuring your research reaches a global audience through indexed publications."
    },
    {
        icon: Users,
        title: "Speaker & Sponsor Coordination",
        description: "Connecting your event with leading voices and industry partners."
    },
    {
        icon: Award,
        title: "Awards & Recognition",
        description: "Celebrating academic excellence and outstanding contributions."
    }
];

export default function AboutConferencePage() {
  return (
    <div className="bg-secondary/30">
        <section className="relative bg-background overflow-hidden">
          <div className="absolute inset-0 z-0">
              <Image
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&h=600&auto=format=fit=crop"
                  alt="Conference audience"
                  data-ai-hint="conference audience"
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
                      <li className="text-primary">/ About Conferences</li>
                  </ol>
                  <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mt-4 text-white">
                      About Innovation Conferences
                  </h1>
              </div>
          </div>
      </section>
        
        <section className="w-full py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105">
                         <Image
                            src="https://fourwaves.com/media/jjtaaupz/conference-speaker.jpg?quality=100&rnd=132864618244570000"
                            alt="Conference collaboration"
                            data-ai-hint="team meeting"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="space-y-6">
                        <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold text-primary">Our Mission</div>
                        <h2 className="text-3xl font-bold tracking-tighter">Advancing Knowledge Through Connection</h2>
                        <p className="text-muted-foreground text-justify">
                            At Innovation Conferences, our mission is to provide a premier platform for researchers, academics, and industry professionals to present and discuss the most recent innovations, trends, and concerns in various fields of engineering and technology. We believe in the power of collaboration to drive progress and shape the future.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section className="w-full py-16 md:py-24">
             <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter">Our Core Principles</h2>
                    <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                        These four pillars guide every event we organize and every paper we publish.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
                     {corePrinciples.map((principle) => (
                         <Card key={principle.title} className="text-center flex flex-col transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl bg-gradient-to-br from-background via-background to-secondary/30 border-primary/10 group">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/10 rounded-full w-fit mb-4 border-2 border-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:border-primary/40">
                                    <principle.icon className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle>{principle.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground text-sm">{principle.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
             </div>
        </section>
        
        <section className="pb-12 md:pb-24">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter">Conference Services</h2>
                    <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                        We offer a comprehensive range of services to make your conference a success.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
                    {conferenceServices.map((service) => (
                         <Card key={service.title} className="text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/10 rounded-full w-fit mb-3">
                                    <service.icon className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle>{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
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
