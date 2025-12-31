
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, BookOpen, ChevronDown, FileText, Book, Presentation, MessageSquare, ThumbsUp, Library, Users, Award, DraftingCompass, TrendingUp, Globe, ArrowRight, User, Info, Handshake, PenTool, HelpCircle, Briefcase, MapPin, Phone, Mail, XCircle } from "lucide-react";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";


// Custom Icons for Conference Menu
const UpcomingConferencesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M12 18h.01"/><path d="M16 14h.01"/><path d="M8 14h.01"/><path d="M12 14h.01"/></svg>
);
const ScientificGalleryIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 14h18"/><path d="m14 10-2.5 2.5a1.5 1.5 0 0 1-2.12 0L8 11"/></svg>
);
const PastWebinarsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const UpcomingWebinarsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>
);
const PastConferencesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const ConferenceVideosIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.934a.5.5 0 0 0-.777-.416L16 11"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>
);
const PlanConferenceIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
);

const publicationSubItems = [
    { href: "/publications/overview", icon: Library, title: "Publications Overview", description: "Policies, ethics, and terms for publishing with us." },
    { href: "/publications/journal-support", icon: ThumbsUp, title: "Journal Publication Support", description: "Expert guidance for abstract submission and review." },
    { href: "/publications/conference-proceedings", icon: Presentation, title: "Conference Proceedings", description: "Publish your work in our indexed proceedings." },
    { href: "/publications/peer-review", icon: Users, title: "Peer Review Process", description: "Upholding academic integrity through rigorous review." },
    { href: "/publications/digital-library", icon: Book, title: "Digital Library", description: "Explore our extensive collection of journals." },
];

const iprSubItems = [
    { href: "/ipr-services/patent", icon: DraftingCompass, title: "Patent Services", description: "Secure exclusive rights to your inventions." },
    { href: "/ipr-services/trademark", icon: Award, title: "Trademark Registration", description: "Protect your brand identity and logos." },
    { href: "/ipr-services/copyright", icon: BookOpen, title: "Copyright Protection", description: "Safeguard your creative and academic works." },
    { href: "/ipr-services/eb1-consultancy", icon: TrendingUp, title: "EB-1 Consultancy", description: "Expert guidance for extraordinary ability visas." },
];

const conferenceSubItems = [
    { href: "/conference/about-conference", icon: Info, title: "About Innovation Conferences", description: "Our mission to advance knowledge and innovation." },
    { href: "/conference/plan-conference", icon: Handshake, title: "Plan a Conference", description: "Collaborate with us to organize your next event." },
    { href: "/conference/awards", icon: Award, title: "Awards & Recognition", description: "Celebrating excellence in research and innovation." },
    { href: "/conference/faq", icon: HelpCircle, title: "FAQ", description: "Find answers to common questions about our conferences." },
];

const conferenceSubItemsTwo = [
    { href: "/conference/upcoming-conferences", icon: UpcomingConferencesIcon, title: "Upcoming Conferences" },
    { href: "/conference/past-conferences", icon: PastConferencesIcon, title: "Past Conferences" },
    { href: "/conference/upcoming-webinars", icon: UpcomingWebinarsIcon, title: "Upcoming Webinars" },
    { href: "/conference/past-webinars", icon: PastWebinarsIcon, title: "Past Webinars" },
    { href: "/conference/scientific-gallery", icon: ScientificGalleryIcon, title: "Scientific Gallery" },
    { href: "/conference/conference-videos", icon: ConferenceVideosIcon, title: "Conference Videos" },
];

const NavLink = ({ href, children, className, ...props }: { href: string, children: React.ReactNode, className?: string }) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Link href={href} className={cn("text-sm font-medium transition-colors hover:text-primary", isActive ? "text-primary" : "text-muted-foreground", className)} {...props}>
            {children}
        </Link>
    );
};

const DropdownNavLink = ({ href, title, description, icon: Icon }: { href: string, title: string, description: string, icon: React.ElementType }) => (
    <Link href={href} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
        <div className="flex items-start gap-3">
            <div className="p-1.5 bg-primary/10 rounded-md mt-0.5"><Icon className="h-5 w-5 text-primary" /></div>
            <div>
                <div className="text-sm font-medium leading-none">{title}</div>
                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">{description}</p>
            </div>
        </div>
    </Link>
);


export default function UserHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/ipr-services", label: "IPR Services", subItems: iprSubItems, grid: true },
    { href: "/internship", label: "Internship" },
    { href: "/research-support", label: "Research Support" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  return (
    <header className={cn("sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300", isScrolled ? 'shadow-md' : '')}>
       <div id="roof" className="hidden md:block bg-primary text-primary-foreground text-xs py-1">
          <div className="container flex justify-between items-center">
            <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" />
                    <span>Nagpur, MH, India</span>
                 </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                    <Phone className="h-3 w-3" />
                    <span>+91-7020095748</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Mail className="h-3 w-3" />
                    <a href="mailto:pureresearchinsights@gmail.com" className="hover:underline">pureresearchinsights@gmail.com</a>
                </div>
            </div>
          </div>
      </div>
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Logo className="h-10 w-10" />
          <span className="hidden font-bold sm:inline-block text-lg">Innovation Conferences</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {menuItems.map((item) =>
            item.subItems ? (
              <Popover key={item.label}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className={cn("flex items-center gap-1 text-sm font-medium", pathname.startsWith(item.href) ? "text-primary" : "text-muted-foreground")}>
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className={cn("w-[500px] p-4", item.grid ? 'grid grid-cols-2 gap-2' : '')}>
                  {item.subItems.map((subItem) => (
                    <DropdownNavLink key={subItem.href} {...subItem} />
                  ))}
                </PopoverContent>
              </Popover>
            ) : (
              <NavLink key={item.label} href={item.href}>
                {item.label}
              </NavLink>
            )
          )}

          {/* Conference Menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className={cn("flex items-center gap-1 text-sm font-medium", pathname.startsWith('/conference') ? "text-primary" : "text-muted-foreground")}>
                Conference
                <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[600px] p-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 space-y-2">
                    <h4 className="font-medium text-primary text-sm px-3">Discover</h4>
                    {conferenceSubItemsTwo.map(item => (
                       <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md p-3 text-sm font-medium text-muted-foreground no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <item.icon className="h-5 w-5" />
                            <span>{item.title}</span>
                       </Link>
                    ))}
                </div>
                 <div className="col-span-2 grid grid-cols-2 gap-2">
                    <div>
                        <h4 className="font-medium text-primary text-sm px-3 mb-2">Engage & Learn</h4>
                         {conferenceSubItems.map(item => <DropdownNavLink key={item.href} {...item} />)}
                    </div>
                     <div>
                        <h4 className="font-medium text-primary text-sm px-3 mb-2">Publish With Us</h4>
                        {publicationSubItems.map(item => <DropdownNavLink key={item.href} {...item} />)}
                    </div>
                 </div>
              </div>
            </PopoverContent>
          </Popover>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button asChild className="hidden sm:flex animated bounceIn">
            <Link href="/submit-journal">
              Submit Paper
            </Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <SheetHeader>
                     <SheetTitle>
                        <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                            <Logo className="h-8 w-8" />
                            <span className="font-bold">Innovation Conferences</span>
                        </Link>
                    </SheetTitle>
                </SheetHeader>
              <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-3">
                  {menuItems.map((item) => (
                    item.subItems ? (
                         <Accordion key={item.label} type="single" collapsible className="w-full">
                            <AccordionItem value={item.label} className="border-b-0">
                                <AccordionTrigger className="py-2 text-md font-medium text-muted-foreground hover:text-primary hover:no-underline [&[data-state=open]]:text-primary">
                                    {item.label}
                                </AccordionTrigger>
                                <AccordionContent className="pb-0 pl-4">
                                   <div className="flex flex-col space-y-1">
                                    {item.subItems.map(subItem => (
                                        <NavLink key={subItem.href} href={subItem.href} onClick={() => setIsOpen(false)} className="py-2 text-muted-foreground">
                                            {subItem.title}
                                        </NavLink>
                                    ))}
                                   </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ) : (
                        <NavLink key={item.label} href={item.href} onClick={() => setIsOpen(false)} className="py-2 text-md font-medium">
                            {item.label}
                        </NavLink>
                    )
                  ))}
                  
                   <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="conference" className="border-b-0">
                            <AccordionTrigger className="py-2 text-md font-medium text-muted-foreground hover:text-primary hover:no-underline [&[data-state=open]]:text-primary">
                                Conference
                            </AccordionTrigger>
                            <AccordionContent className="pb-0 pl-4">
                               <div className="flex flex-col space-y-1">
                                {conferenceSubItems.map(subItem => (
                                    <NavLink key={subItem.href} href={subItem.href} onClick={() => setIsOpen(false)} className="py-2 text-muted-foreground">
                                        {subItem.title}
                                    </NavLink>
                                ))}
                                {conferenceSubItemsTwo.map(subItem => (
                                     <NavLink key={subItem.href} href={subItem.href} onClick={() => setIsOpen(false)} className="py-2 text-muted-foreground">
                                        {subItem.title}
                                    </NavLink>
                                ))}
                               </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
