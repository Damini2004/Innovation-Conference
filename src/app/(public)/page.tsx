
import { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { ArrowRight, BookCheck, BrainCircuit, Microscope, ShieldCheck, Database, GitBranch, Cpu, Presentation, GraduationCap, Award, Briefcase, BookOpen, FileText, Shield, Facebook, Twitter, Linkedin, Dribbble, User, MapPin, Calendar, Wallet, Link as LinkIcon, Eye, CheckCircle, Zap, Users, BarChart, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getJournals, Journal } from "@/services/journalService";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import ConferenceCountdown from '@/components/ui/conference-countdown';
import { XCircle } from "lucide-react";
import { heroData } from "@/lib/data";

export const metadata: Metadata = {
  title: 'Home | Innovation Conferences | Best Publication in Nagpur',
  description: 'Innovation Conferences empowers researchers and businesses with expert solutions for journal submissions, conference organization, and publication consultancy. Leading publication house in Nagpur.',
  keywords: ['research publication', 'academic publication', 'journal indexing', 'Scopus', 'Web of Science', 'conference management', 'publication support services', 'call for papers', 'Best publication in Nagpur', 'Top publication in Nagpur'],
};

const indexedJournalCategories = [

  {
    title: "Scopus Indexed Journals",
    description: "Scopus Q1/Q2, A Scopus journal is a scholarly journal that is indexed (listed) in Scopus, which is one of the largest abstract and citation databases of peer-reviewed literature, maintained by a Elsevier.",
    imageSrc: "/scopus.png",
    imageHint: "medical biology",
  },
  {
    title: "Web of Science (WoS) Indexed Journals",
    description: "Featuring top-tier journals from SCIE, SSCI, and AHCI for maximum impact and citation.Globally recognized journals ensures high-quality, impactful research",
    imageSrc: "/wos.png",
    imageHint: "science research",
  },
  {
    title: "IEEE Xplore Indexed Journals",
    description: "IEEE Xplore is a leading digital library that hosts high-quality journals, conference papers, Journals and standards in engineering, technology, and computer science.",
    imageSrc: "/IEEE.png",
    imageHint: "engineering technology",
  },
  {
    title: "UGC Care / Peer Review Journals",
    description: "Trusted journals approved by UGC for authentic and credible research publications. Scholarly articles reviewed by experts to ensure quality, accuracy, and reliability.",
    imageSrc: "/photo7.png",
    imageHint: "academic books",
  },
];

const keyServices = [
    {
        icon: Cpu,
        title: "Software Solutions",
        description: "RAMS & SDGMapper for reliability and sustainable development goal tracking."
    },
    {
        icon: Presentation,
        title: "Conference Management",
        description: "End-to-end support for organizing successful academic conferences."
    },
    {
        icon: Award,
        title: "EB-1 Consultancy",
        description: "Expert assistance for navigating the EB-1 visa application process."
    },
    {
        icon: Briefcase,
        title: "Internship Services",
        description: "Connecting talented students with valuable research internship opportunities."
    },
    {
        icon: BookOpen,
        title: "PhD Services",
        description: "Comprehensive support throughout your entire PhD journey."
    },
    {
        icon: FileText,
        title: "Publications Consultancy",
        description: "Assistance with manuscript preparation and publishing in high-impact journals."
    },
]

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

const BehanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 4h16v16H4z"/><path d="M4 12h8"/><path d="M12 4v16"/><path d="M18 4v16"/></svg>
);

const speakers = [
    {
        name: "Jon Doe",
        title: "CEO, Peloton Cycle",
        description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those intereste.",
        imageSrc: "/teacher/img-1.png",
        imageHint: "person portrait",
        social: { facebook: "#", twitter: "#", linkedin: "#", dribbble: "#", behance: "#" }
    },
    {
        name: "Natali Aero",
        title: "Co-founder, Hometeam",
        description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those intereste.",
        imageSrc: "/teacher/img-2.png",
        imageHint: "person portrait",
        social: { facebook: "#", twitter: "#", linkedin: "#", dribbble: "#", behance: "#" }
    },
    {
        name: "Leo Amber",
        title: "Director, Via",
        description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those intereste.",
        imageSrc: "/teacher/img-3.png",
        imageHint: "person portrait",
        social: { facebook: "#", twitter: "#", linkedin: "#", dribbble: "#", behance: "#" }
    },
];

const welcomeFeatures = [
    { icon: MapPin, title: "Location", description: "Marriott Marquis, San Francisco" },
    { icon: Calendar, title: "Date & Time", description: "1PM - 11PM, 25- 28 Jan" },
    { icon: User, title: "Speakers", description: "10 Tech Icons and Professionals" },
    { icon: Wallet, title: "Tickets", description: "150 People" },
];

const whyJoinFeatures = [
    { icon: Zap, title: "Get Inspired", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque" },
    { icon: Users, title: "Meet New Faces", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque" },
    { icon: BarChart, title: "Fresh Tech Insights", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque" },
]

const galleryImages = [
    { src: "/gallery/img-1.jpg", hint: "conference event" },
    { src: "/gallery/img-2.jpg", hint: "team meeting" },
    { src: "/gallery/img-3.jpg", hint: "audience listening" },
    { src: "/gallery/img-4.jpg", hint: "networking session" },
    { src: "/gallery/img-5.jpg", hint: "speaker presentation" },
    { src: "/gallery/img-6.jpg", hint: "workshop activity" },
    { src: "/gallery/img-7.jpg", hint: "panel discussion" },
];

const blogPosts = [
    {
        imageSrc: "/blog/img1.jpg",
        imageHint: "city skyline",
        title: "We make beautiful days with older adults",
        views: 2500,
        comments: 100,
        date: "21 Mar, 2016",
        excerpt: "Lorem ipsum dolor sit amet  cons tetuer adipiscing elit. dolor sit..."
    },
    {
        imageSrc: "/blog/img2.jpg",
        imageHint: "business meeting",
        title: "Change-makers economic",
        views: 2500,
        comments: 100,
        date: "21 Mar, 2016",
        excerpt: "Lorem ipsum dolor sit amet  cons tetuer adipiscing elit. dolor sit..."
    },
    {
        imageSrc: "/blog/img3.jpg",
        imageHint: "virtual reality",
        title: "It’s no secret that virtual reality",
        views: 2500,
        comments: 100,
        date: "21 Mar, 2016",
        excerpt: "Lorem ipsum dolor sit amet  cons tetuer adipiscing elit. dolor sit..."
    }
];

const pricingTiers = [
    {
        icon: User,
        name: "BASIC",
        price: "$0.00",
        features: [
            { text: "Access to Booth", included: true },
            { text: "Conference Tickets", included: false },
            { text: "Printed Materials", included: false },
        ]
    },
    {
        icon: Presentation,
        name: "STANDARD",
        price: "$99",
        features: [
            { text: "Access to Booth", included: true },
            { text: "Conference Tickets", included: true },
            { text: "Printed Materials", included: false },
        ],
        active: true
    },
    {
        icon: Shield,
        name: "PREMIUM",
        price: "$149",
        features: [
            { text: "Access to Booth", included: true },
            { text: "Conference Tickets", included: true },
            { text: "Printed Materials", included: true },
        ]
    }
];

function HeroSection() {
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
                src="/reframed_logo-preview.png"
                alt="SustainTechCon Logo"
                width={100}
                height={100}
                className="h-24 w-auto"
                priority
                />
            </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            {heroData.title}
          </h1>
           <p className="text-lg text-slate-200 md:text-xl lg:text-2xl max-w-2xl mx-auto">
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
           <div className="pt-4">
            <div className="flex justify-center gap-4">
                <Button asChild size="lg" variant="secondary">
                    <Link href="#preamble">View Highlights</Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/registration">Buy Ticket</Link>
                </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}

function IndexedJournalsSection() {
  return (
    <section id="highlights" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium">Indexed Journals</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Publish in High-Impact Journals</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We provide comprehensive support for publishing in a wide range of prestigious, indexed journals.
            </p>
          </div>
        </div>
        <div className="mx-auto grid items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4 mt-12">
          {indexedJournalCategories.map((category, index) => (
             <div key={category.title} className="speakers-member wow fadeIn animated group" data-wow-delay={`${(index + 1) * 0.1}s`}>
              <Card className="text-center overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu hover:-translate-y-2">
                <div className="member-img bg-secondary relative h-60 w-full p-4 overflow-hidden">
                  <Image 
                    src={category.imageSrc} 
                    alt={category.title} 
                    data-ai-hint={category.imageHint}
                    fill
                    className="object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </div>
                <CardContent className="member-desc p-6">
                  <h3 className="text-lg font-bold">{category.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{category.description}</p>
                </CardContent>              
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SpeakersSection() {
    return (
        <section id="speakers" className="section py-12 md:py-24 lg:py-32">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-title wow fadeInUp animated text-3xl font-bold" data-wow-delay="0s">Meet Our Speakers</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {speakers.map((speaker, index) => (
                         <div key={index} className="speakers-member wow fadeIn animated group" data-wow-delay={`${(index + 1) * 0.1}s`}>
                            <Card className="text-center overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu hover:-translate-y-2">
                              <div className="member-img bg-secondary relative h-60 w-full p-4 overflow-hidden">
                                <Image 
                                  src={speaker.imageSrc} 
                                  alt={speaker.name} 
                                  data-ai-hint={speaker.imageHint}
                                  fill
                                  className="object-contain rounded-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                                />
                              </div>
                              <CardContent className="member-desc p-6">
                                <h3 className="text-xl font-bold">{speaker.name}</h3>
                                <h5 className="text-sm text-muted-foreground mb-4">{speaker.title}</h5>
                                <p className="text-sm text-muted-foreground mb-4">{speaker.description}</p>
                                <div className="social-icon flex justify-center gap-2">
                                  <Link className="social" href={speaker.social.facebook} target="_blank"><Facebook className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" /></Link>
                                  <Link className="social" href={speaker.social.twitter} target="_blank"><Twitter className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" /></Link>
                                  <Link className="social" href={speaker.social.linkedin} target="_blank"><Linkedin className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" /></Link>
                                  <Link className="social" href={speaker.social.dribbble} target="_blank"><Dribbble className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" /></Link>
                                  <Link className="social" href={speaker.social.behance} target="_blank"><BehanceIcon className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" /></Link>
                                </div>
                              </CardContent>              
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function WhyJoinSection() {
    return (
        <section id="featured" className="section py-12 md:py-24">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-title wow fadeInUp animated text-3xl font-bold" data-wow-delay="0s">Why Join</h2>
                    <p className="section-subcontent wow fadeInUp animated text-muted-foreground mt-2 max-w-2xl mx-auto" data-wow-delay="0.2s">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {whyJoinFeatures.map((feature, index) => (
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
    );
}


export default function HomePage() {
  return (
    <>
      <HeroSection />
      
      <section className="countdown-timer section py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-around gap-8 text-center">
            <div className="wow fadeInLeft animated" data-wow-delay="0.2s">
              <h2 className="text-3xl font-bold">Impression <br/>Startup Event</h2>
              <h4 className="text-muted-foreground mt-2">Marriott Marquis, San Francisco, CA <br/> Jan 25, 2025 - Jan 28, 2025 </h4>
              <Link href="#pricing" className="btn-common inline-block mt-4">Buy Tickets</Link>
            </div>
            <div className="wow fadeInRight animated" data-wow-delay="0.2s">
                <ConferenceCountdown targetDate="2025-01-25T09:00:00" />
            </div>
          </div>
        </div>
      </section>
      
      <section id="event" className="section py-12 bg-secondary/30">
        <div className="container">
            <div className="grid md:grid-cols-4 gap-8">
                {welcomeFeatures.map((feature, index) => (
                    <div key={feature.title} className="tab-block wow fadeInDown animated" data-wow-delay={`${index * 0.2}s`}>
                        <Card className="text-center p-6">
                            <div className="icon inline-block mb-4">
                                <feature.icon className="h-10 w-10 text-primary" />
                            </div>
                            <div className="desc">
                                <h4 className='font-bold text-lg'>{feature.title}</h4>
                                <p className='text-muted-foreground mt-2'>{feature.description}</p>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
            <div className="col-md-12 text-center mt-12">
                <div className="content-text">
                    <h3 className="wow fadeInUp animated text-2xl font-bold" data-wow-delay="0.8s">Get fresh insights into the world of tech and startups</h3>
                    <p className="wow fadeInUp animated text-muted-foreground max-w-3xl mx-auto mt-4" data-wow-delay="1s">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. A enean massa. Cum sociis natoque penatibus et magnis dis parturient montes Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
                </div>
            </div>
        </div>
      </section>
      
      <IndexedJournalsSection />

      <WhyJoinSection />
      
      <section id="sponsors" className="section py-12 md:py-24">
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

      <section id="gallery" className="section py-12 md:py-24 bg-secondary/30">
          <div className="container">        
            <div className="text-center">
              <h2 className="section-title wow fadeInUp animated text-3xl font-bold" data-wow-delay="0s">Our Gallery</h2>
              <p className="section-subcontent wow fadeInUp animated text-muted-foreground mt-2" data-wow-delay="0.2s">A visual journey through our most memorable events and moments.</p>                      
            </div>  
            <div className="gallery-wrap wow fadeInDown animated grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-8">
                {galleryImages.map((image, index) => (
                    <div key={index} className="gallery-item group relative overflow-hidden">
                        <Link href="#">
                            <Image src={image.src} alt="Gallery image" width={400} height={300} data-ai-hint={image.hint} className='w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-110' />
                        </Link>
                        <div className="overlay absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <Link className="preview lightbox" href={image.src}><Eye className="h-8 w-8 p-1.5 border-2 rounded-full text-white border-white hover:bg-white hover:text-primary transition-colors" /></Link>
                            <Link className="link" href="#"><LinkIcon className="h-8 w-8 p-1.5 border-2 rounded-full text-white border-white hover:bg-white hover:text-primary transition-colors" /></Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-8">
                <Button asChild className="wow fadeInUp animated" data-wow-delay="0.3s">
                    <Link href="#">Show More</Link>
                </Button>   
            </div>    
          </div>
      </section>

      <SpeakersSection />

      <section id="blog" className="section py-12 md:py-24 bg-secondary/30">
          <div className="container">
              <div className="text-center">
                <h2 className="section-title wow fadeInUp animated text-3xl font-bold" data-wow-delay="0s">Blog</h2>
                <p className="section-subcontent wow fadeInUp animated text-muted-foreground mt-2" data-wow-delay="0.2s">Stay updated with our latest news, articles, and insights.</p>                      
              </div> 
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                  {blogPosts.map((post, index) => (
                      <div key={post.title} className="blog-item wow fadeInRight animated group" data-wow-delay={`${(index + 1) * 0.2}s`}>
                        <Card className='overflow-hidden shadow-lg hover:shadow-xl transition-shadow'>
                            <div className="blog-image relative h-56">
                                <Link href="#">
                                    <Image src={post.imageSrc} alt={post.title} fill data-ai-hint={post.imageHint} className="object-cover transform transition-transform duration-500 group-hover:scale-110" />
                                </Link>
                            </div>
                            <CardContent className="blog-info p-6">
                                <h3 className="font-bold text-lg hover:text-primary transition-colors"><Link href="#">{post.title}</Link></h3>
                                <div className="meta text-xs text-muted-foreground flex items-center gap-4 mt-2">
                                    <span className="meta-part flex items-center gap-1"><Eye className="h-4 w-4" /> {post.views}</span>
                                    <span className="meta-part flex items-center gap-1"><BookOpen className="h-4 w-4" /> {post.comments}</span>
                                    <span className="meta-part flex items-center gap-1"><Calendar className="h-4 w-4" /> {post.date}</span>
                                </div>
                                <p className='mt-2 text-sm text-muted-foreground'>{post.excerpt}</p>
                                <Button variant="link" asChild className="p-0 mt-2"><Link href="#">Read More <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
                            </CardContent>
                        </Card>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      <section id="pricing" className="section py-12 md:py-24">
        <div className="container">
            <div className="text-center">
                <h2 className="section-title wow fadeInUp animated text-3xl font-bold" data-wow-delay="0s">Take a look at Our Pricing</h2>
                <p className="section-subcontent wow fadeInUp animated text-muted-foreground mt-2" data-wow-delay="0.2s">Choose the perfect plan for your needs.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
                {pricingTiers.map((tier, index) => (
                  <div
                    key={tier.name}
                    className={`wow ${index === 0 ? 'fadeInLeft' : index === 1 ? 'fadeInDown' : 'fadeInRight'} animated`}
                    data-wow-delay="0.3s"
                  >
                    <Card className={`pricing-table text-center ${tier.active ? 'shadow-2xl border-primary' : 'shadow-lg'}`}>
                        <CardHeader>
                            <div className = "table-icon p-4 bg-primary/10 inline-block rounded-full mb-4">
                                <tier.icon className="h-10 w-10 text-primary" />
                            </div>
                            <CardTitle className="text-2xl">{tier.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="plan-info space-y-2 text-muted-foreground">
                                {tier.features.map(feature => (
                                    <li key={feature.text} className={`flex items-center justify-center gap-2 ${!feature.included && 'line-through text-muted-foreground/60'}`}>
                                        {feature.included ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}
                                        {feature.text}
                                    </li>
                                ))}
                            </ul>
                            <div className="price py-6">
                                <h4 className="text-4xl font-bold">{tier.price}</h4>
                            </div>
                        </CardContent>
                        <CardFooter>
                              <Button className="w-full">Buy Now</Button>
                        </CardFooter>
                    </Card>
                  </div>
                ))}
            </div>
        </div>
      </section>
    </>
  );
}
