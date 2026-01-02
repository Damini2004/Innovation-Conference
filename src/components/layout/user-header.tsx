// src/components/layout/user-header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  ChevronDown,
  BookOpen,
  Users,
  Mail,
  ShieldCheck,
  Presentation,
  MapPin,
  Phone,
  Info,
  GalleryVertical,
  Heart,
  FileText,
  Award,
  Calendar,
  Video,
  Clapperboard,
  Home,
  Building,
  Library,
  Lightbulb,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect, ComponentType } from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

const conferenceSubItems = [
  { href: "/conference/about-conference", title: "About Conferences", icon: Info, description: "Our mission in conferencing." },
  { href: "/conference/upcoming-conferences", title: "Upcoming Conferences", icon: Calendar, description: "Find our next events." },
  { href: "/conference/past-conferences", title: "Past Conferences", icon: Heart, description: "Explore our event archive." },
  { href: "/conference/plan-conference", title: "Plan a Conference", icon: Briefcase, description: "Partner with us for your event." },
  { href: "/conference/upcoming-webinars", title: "Upcoming Webinars", icon: Video, description: "Join our live online sessions." },
  { href: "/conference/past-webinars", title: "Past Webinars", icon: Clapperboard, description: "Watch recordings of past webinars." },
  { href: "/conference/scientific-gallery", title: "Scientific Gallery", icon: GalleryVertical, description: "A showcase of research visuals." },
  { href: "/conference/conference-videos", title: "Conference Videos", icon: Presentation, description: "Watch sessions from our events." },
];

const publicationsSubItems = [
    { href: "/publications/overview", title: "Publication Policies", icon: FileText, description: "Ethics, plagiarism, and terms." },
    { href: "/publications/journal-support", title: "Journal Submission Support", icon: BookOpen, description: "Get help with your paper." },
    { href: "/publications/digital-library", title: "Digital Library", icon: Library, description: "Browse our published journals." },
];

const iprServicesSubItems = [
    { href: "/ipr-services/patent", title: "Patent", description: "Secure your inventions.", icon: FileText },
    { href: "/ipr-services/trademark", title: "Trademark", description: "Protect your brand identity.", icon: Award },
    { href: "/ipr-services/copyright", title: "Copyright", description: "Safeguard your creative works.", icon: ShieldCheck },
    { href: "/ipr-services/eb1-consultancy", title: "EB-1 Consultancy", description: "Expert visa assistance.", icon: Users },
];

const navItems = [
    { href: "/", label: "Home", icon: Home, description: "Return to the homepage." },
    { href: "/about", label: "About", icon: Building, description: "Learn about our mission." },
    {
      label: "Conference",
      href: "/conference",
      icon: Presentation,
      description: "Explore our events.",
      subItems: conferenceSubItems,
    },
    {
      label: "Publications",
      href: "/publications",
      icon: Library,
      description: "Browse published work.",
      subItems: publicationsSubItems,
    },
    { href: "/research-support", label: "Research Support", icon: Lightbulb, description: "Get expert assistance." },
    { href: "/contact-us", label: "Contact Us", icon: Mail, description: "Get in touch with our team." },
];


const DropdownNavLink = ({
  href,
  title,
  description,
  icon: Icon,
}: {
  href: string;
  title: string;
  description?: string;
  icon?: ComponentType<{ className?: string }>;
}) => (
  <Link
    href={href}
    className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/20 hover:scale-105 focus:bg-accent focus:text-accent-foreground"
  >
    <div className="flex items-center gap-2 text-sm font-medium leading-none">
      {Icon && <Icon className="h-4 w-4 text-primary/80 transition-colors group-hover:text-primary" />}
      <span>{title}</span>
    </div>
    {description && (
        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {description}
        </p>
    )}
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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
        isScrolled ? "shadow-md" : ""
      )}
    >
      <div
        id="roof"
        className="hidden md:block bg-primary text-primary-foreground text-xs py-1"
      >
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3" />
            <span>Nagpur, MH, India</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Phone className="h-3 w-3" />
              <span>+91-7020095748</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="h-3 w-3" />
              <a href="mailto:pureresearchinsights@gmail.com" className="hover:underline">
                pureresearchinsights@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
           <Image src="/InnovationConference.png" alt="Impression Logo" width={110} height={30} />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.subItems ? (
              <Popover key={item.label}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium",
                      pathname.startsWith(item.href) && item.href !== "/"
                        ? "text-primary"
                        : "text-foreground"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className={cn("p-2 w-[250px]")}>
                    <div className={cn("grid grid-cols-1 gap-1")}>
                      {item.subItems.map((subItem) => (
                        <DropdownNavLink 
                            key={subItem.href} 
                            {...subItem} 
                        />
                      ))}
                    </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Button key={item.label} variant="ghost" asChild>
                  <Link href={item.href} className="text-sm font-medium text-foreground">{item.label}</Link>
              </Button>
            )
          )}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button asChild className="hidden sm:flex animated bounceIn">
            <Link href="/submit-journal">Submit Paper</Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  <Link
                    href="/"
                    className="flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Image src="/InnovationConference.png" alt="Impression Logo" width={110} height={30} />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
                <div className="flex flex-col space-y-1 pr-4">
                  {navItems.map((item) =>
                    item.subItems ? (
                      <Accordion
                        key={item.label}
                        type="single"
                        collapsible
                        className="w-full"
                      >
                        <AccordionItem value="item-1" className="border-b-0">
                          <AccordionTrigger
                            className={cn(
                              "py-3 font-medium hover:no-underline rounded-md p-3",
                               pathname.startsWith(item.href) && item.href !== "/" ? "text-primary" : "text-foreground"
                            )}
                          >
                             <div className="flex items-center gap-3 text-md font-medium leading-none">
                                <item.icon className="h-5 w-5 text-primary/80" />
                                <span>{item.label}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pb-0 pl-8">
                            <div className="flex flex-col space-y-1">
                              {item.subItems.map((subItem) => (
                                <DropdownNavLink 
                                    key={subItem.href}
                                    href={subItem.href}
                                    title={subItem.title}
                                    icon={subItem.icon}
                                    description={subItem.description}
                                />
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                       <DropdownNavLink 
                          key={item.href}
                          href={item.href}
                          title={item.label}
                          icon={item.icon}
                          description={item.description}
                      />
                    )
                  )}
                  <div className="pt-4">
                    <Button asChild className="w-full">
                      <Link href="/submit-journal">Submit Paper</Link>
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
