import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, Presentation, BookOpen, Users, Award } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';

const corePrinciples = [
    "Fostering Collaboration: We create environments that encourage networking and interdisciplinary collaboration among academics, researchers, and industry professionals.",
    "Promoting Innovation: Our conferences are platforms for showcasing cutting-edge research and innovative ideas that have the potential to shape the future.",
    "Ensuring Quality: Through a rigorous peer-review process, we maintain the highest standards of academic integrity and quality for all presented work.",
    "Global Reach: We aim to bring together diverse perspectives from around the world to enrich discussions and broaden the impact of research."
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
        
        <section className="w-full py-12 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <Card className="shadow-xl overflow-hidden border-primary/10">
                        <div className="grid md:grid-cols-2 items-center">
                            <div className="relative h-64 md:h-full min-h-[400px]">
                                <Image
                                    src="https://fourwaves.com/media/jjtaaupz/conference-speaker.jpg?quality=100&rnd=132864618244570000"
                                    alt="Conference collaboration"
                                    data-ai-hint="team meeting"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                            <div className="p-8 md:p-12">
                                <CardHeader className="p-0">
                                    <CardTitle>Our Mission in Conferencing</CardTitle>
                                    <CardDescription className="pt-2">
                                        At Innovation Conferences, our mission is to provide a premier platform for researchers, academics, and industry professionals to present and discuss the most recent innovations, trends, and concerns in various fields of engineering and technology.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-0 mt-8">
                                    <h3 className="font-semibold mb-4">Core Principles</h3>
                                    <ul className="space-y-4">
                                        {corePrinciples.map((principle, index) => (
                                            <li key={index} className="flex items-start">
                                                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                                <span className="text-muted-foreground text-sm">{principle}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </div>
                        </div>
                    </Card>
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
