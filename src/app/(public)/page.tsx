

import { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { ArrowRight, BookCheck, BrainCircuit, Microscope, ShieldCheck, Database, GitBranch, Cpu, Presentation, GraduationCap, Award, Briefcase, BookOpen, FileText, Shield, Facebook, Twitter, Linkedin, Dribbble, User, MapPin, Calendar, Wallet, Link as LinkIcon, Eye, CheckCircle, Zap, Users, BarChart, CalendarDays, Check, FileUp, Search, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { heroData } from "@/lib/data";

export const metadata: Metadata = {
  title: 'Home | Innovation Conference Series',
  description: 'A global platform for advancing research and innovation. Host and manage academic conferences with end-to-end support from Researcher Connect Innovation and Impact Pvt. Ltd.',
  keywords: ['academic conferences', 'research innovation', 'interdisciplinary collaboration', 'Scopus publication', 'conference management', 'call for papers', 'RC-CMS', 'researcher connect'],
};

const whyICS = [
  {
    title: "Internationally Focused",
    description: "Academic conferences with a global reach and perspective.",
  },
  {
    title: "Interdisciplinary Events",
    description: "Covering both broad and domain-specific academic fields.",
  },
  {
    title: "Industry–Academia Collaboration",
    description: "Fostering meaningful partnerships between research and industry.",
  },
  {
    title: "Publication Opportunities",
    description: "Scopus, IEEE, and peer-review publication options available.",
  },
  {
    title: "End-to-End Support",
    description: "Comprehensive management for a seamless conference experience.",
  },
  {
    title: "Trusted Partnerships",
    description: "Collaborating with leading academic and institutional partners.",
  },
];


const conferenceDomains = [
    {
        icon: Cpu,
        title: "Engineering and Technology",
    },
    {
        icon: Zap,
        title: "Smart & Sustainable Development",
    },
    {
        icon: BrainCircuit,
        title: "Artificial Intelligence & Intelligent Systems",
    },
    {
        icon: Microscope,
        title: "Applied Sciences and Interdisciplinary Research",
    },
     {
        icon: GitBranch,
        title: "Healthcare, Agriculture & Environmental Sciences",
    },
    {
        icon: Briefcase,
        title: "Management, Innovation & Social Impact",
    },
]

const cmsFeatures = [
    { icon: FileUp, title: "Paper Submission & Tracking" },
    { icon: Users, title: "Reviewer Assignment & Management" },
    { icon: Check, title: "Acceptance/Rejection Workflow" },
    { icon: Wallet, title: "Registration & Payment Integration" },
    { icon: Award, title: "Automated Certificate Generation" },
    { icon: MessageSquare, title: "Email Notifications" },
];


const partnerLogos = [
  { src: "/army institute.png", alt: "army institute", hint: "logo company" },
  { src: "/Bharti vidyapith.png", alt: "Bharti vidyapith", hint: "logo company" },
  { src: "/city university punjab.jpeg", alt: "city university punjab", hint: "logo company" },
  { src: "/csmss.jpeg", alt: "csmss", hint: "logo company" },
  { src: "/data meghe wardha.png", alt: "data meghe wardha", hint: "logo company" },
  { src: "/deogiri aurangabad.jpeg", alt: "deogiri aurangabad", hint: "logo brand" },
  { src: "/dypatil.jpeg", alt: "Partner Logo 3", hint: "logo business" },
  { src: "/iiit.jpeg", alt: "Partner Logo 4", hint: "logo tech" },
  { src: "/kkr guntur.png", alt: "Partner Logo 5", hint: "logo education" },
  { src: "/krishana.png", alt: "deogiri aurangabad", hint: "logo brand" },
  { src: "/lovely university.png", alt: "Partner Logo 3", hint: "logo business" },
  { src: "/Mahsa Malaysiaya.png", alt: "Partner Logo 4", hint: "logo tech" },
  { src: "/manipal.png", alt: "Partner Logo 5", hint: "logo education" },
  { src: "/modern institute.jpeg", alt: "Partner Logo 5", hint: "logo education" },
  { src: "/nitwarangal.png", alt: "deogiri aurangabad", hint: "logo brand" },
  { src: "/noida.png", alt: "Partner Logo 3", hint: "logo business" },
  { src: "/Nus.png", alt: "Partner Logo 4", hint: "logo tech" },
  { src: "/priyadarshani.png", alt: "Partner Logo 5", hint: "logo education" },
  { src: "/ramdeobaba.jpeg", alt: "Partner Logo 5", hint: "logo education" },
  { src: "/rl jalapa.png", alt: "deogiri aurangabad", hint: "logo brand" },
  { src: "/sanjevini kopargoa.png", alt: "Partner Logo 3", hint: "logo business" },
  { src: "/ssvps.png", alt: "Partner Logo 4", hint: "logo tech" },
  { src: "/priyadarshani.png", alt: "Partner Logo 5", hint: "logo education" },
  { src: "/suryodaya.jpeg", alt: "Partner Logo 5", hint: "logo education" },
  { src: "/syboisis.png", alt: "deogiri aurangabad", hint: "logo brand" },
  { src: "/sanjevini kopargoa.png", alt: "Partner Logo 3", hint: "logo business" },
  { src: "/vincentpalloti.jpeg", alt: "Partner Logo 4", hint: "logo tech" },
  { src: "/Vnit.jpeg", alt: "Partner Logo 5", hint: "logo education" },
]


function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen min-h-[700px] w-full text-white"
    >
      <Image
        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
        alt="Hero Banner"
        fill
        priority
        className="object-cover"
        data-ai-hint="conference audience"
      />
       <div className="absolute inset-0 bg-black/60" />
       <div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-4">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-8">
            <div className="flex justify-center mb-4">
                <Image
                src="/InnovationConference.png"
                alt="Innovation Conference Series Logo"
                width={100}
                height={100}
                className="h-24 w-auto"
                priority
                />
            </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            {heroData.title}
          </h1>
           <p className="text-lg text-slate-200 md:text-xl lg:text-2xl max-w-3xl mx-auto">
            {heroData.subtitle}
          </p>
           <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8 text-base">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              <span>{heroData.date}</span>
            </div>
             <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>{heroData.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      
      <section id="about-ics" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">About Innovation Conference Series (ICS)</h2>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-lg">
                A structured conference ecosystem hosting multiple academic and research conferences across varied disciplines under a unified quality and management framework.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
              <Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&h=600&auto=format&fit=crop" alt="Team planning" data-ai-hint="team planning" fill className="object-cover"/>
            </div>
            <div className="space-y-6">
                <h3 className="text-2xl font-bold">Who We Are</h3>
                <p className="text-muted-foreground">
                    Each conference within the series is designed with a clear academic scope, peer-reviewed paper evaluation, transparent publication processes, and engagement from national and international experts. Our mission is to create sustainable platforms for research communication, encourage young researchers, and support institutions in delivering high-quality academic events.
                </p>
                <div className="space-y-4">
                  {whyICS.slice(0, 3).map(item => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1"><CheckCircle className="h-5 w-5 text-primary"/></div>
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </section>

       <section id="domains" className="w-full py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Conference Domains Covered</h2>
             <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
                Our conferences span a wide array of critical and emerging fields.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {conferenceDomains.map((service, index) => (
               <Card key={index} className="group flex items-center gap-4 p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="p-3 bg-primary/10 rounded-full">
                  <service.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <h3 className="text-md font-semibold">{service.title}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section id="conference-support" className="w-full py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
               <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold text-primary">Institutional Support</div>
                        <h2 className="text-3xl font-bold tracking-tighter">Host a Conference With Us</h2>
                        <p className="text-muted-foreground">
                            Innovation Conference Series actively supports colleges, universities, and institutions in organizing their own national and international conferences. From conceptualization to post-conference documentation, we provide end-to-end management services. Institutions can host conferences independently or jointly under the ICS framework.
                        </p>
                        <Button asChild>
                            <Link href="/contact-us">
                                Propose Your Conference <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                         <Image src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&h=600&auto=format&fit=crop" alt="Group discussion" data-ai-hint="group discussion" fill className="object-cover"/>
                    </div>
               </div>
          </div>
      </section>

      <section id="rc-cms" className="w-full py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">RC-CMS: Conference Management System</h2>
              <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-lg">
                A proprietary digital platform developed by Researcher Connect to manage conferences efficiently and professionally, also available as a standalone product.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cmsFeatures.map((feature) => (
                <div key={feature.title} className="flex items-center gap-4 rounded-lg bg-background p-4 shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium text-sm">{feature.title}</span>
                </div>
              ))}
            </div>
        </div>
      </section>

      <section id="sponsors" className="section py-12 md:py-24 bg-background">
        <div className="container">
            <div className="text-center">
                <h2 className="section-title wow fadeInUp animated text-3xl font-bold" data-wow-delay="0s">Our Associations & Partners</h2>
                <p className="section-subcontent wow fadeInUp animated text-muted-foreground mt-2" data-wow-delay="0.2s">We are proud to collaborate with leading institutions and organizations in the academic community.</p>
            </div>
            <div className="relative mt-12 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                <div className="flex w-max animate-scroll-x">
                    {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                        <div key={index} className="spnsors-logo wow fadeInUp animated mx-8" data-wow-delay={`${(index % 4) * 0.1}s`}>
                            <Link href="#">
                                <Image 
                                    src={logo.src} 
                                    width={150} 
                                    height={60} 
                                    alt={logo.alt} 
                                    data-ai-hint={logo.hint}
                                    className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all" 
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

    </>
  );
}
