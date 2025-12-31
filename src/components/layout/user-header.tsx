// src/components/layout/user-header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  ChevronDown,
  BookOpen,
  Briefcase,
  Users,
  Mail,
  ShieldCheck,
  GraduationCap,
  FileText,
  Presentation,
  MapPin,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
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
  { href: "/conference/about-conference", title: "About Conferences", description: "Our mission in conferencing." },
  { href: "/conference/upcoming-conferences", title: "Upcoming Conferences", description: "Find our next events." },
  { href: "/conference/past-conferences", title: "Past Conferences", description: "Explore our event archive." },
  { href: "/conference/plan-conference", title: "Plan a Conference", description: "Partner with us for your event." },
  { href: "/conference/awards", title: "Awards", description: "Recognizing academic excellence." },
  { href: "/conference/faq", title: "FAQs", description: "Answers to common questions." },
  { href: "/conference/upcoming-webinars", title: "Upcoming Webinars", description: "Join our live online sessions." },
  { href: "/conference/past-webinars", title: "Past Webinars", description: "Watch recordings of past webinars." },
  { href: "/conference/scientific-gallery", title: "Scientific Gallery", description: "A showcase of research visuals." },
  { href: "/conference/conference-videos", title: "Conference Videos", description: "Watch sessions from our events." },
];

const publicationsSubItems = [
    { href: "/publications/overview", title: "Publication Policies", description: "Ethics, plagiarism, and terms." },
    { href: "/publications/journal-support", title: "Journal Submission Support", description: "Get help with your paper." },
    { href: "/publications/conference-proceedings", title: "Conference Proceedings", description: "Publish your conference paper." },
    { href: "/publications/peer-review", title: "Peer Review Process", description: "How we ensure quality." },
    { href: "/publications/digital-library", title: "Digital Library", description: "Browse our published journals." },
];

const iprSubItems = [
    { href: "/ipr-services/patent", title: "Patent Services", description: "Protect your inventions." },
    { href: "/ipr-services/trademark", title: "Trademark Services", description: "Secure your brand identity." },
    { href: "/ipr-services/copyright", title: "Copyright Services", description: "Safeguard your creative works." },
    { href: "/ipr-services/eb1-consultancy", title: "EB-1 Consultancy", description: "Expert visa assistance." },
];

const NavLink = ({
  href,
  children,
  className,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive ? "text-primary" : "text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

const DropdownNavLink = ({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) => (
  <Link
    href={href}
    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
  >
    <div className="text-sm font-medium leading-none">{title}</div>
    <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
      {description}
    </p>
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

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    {
      label: "Conference",
      href: "/conference",
      subItems: conferenceSubItems,
    },
    {
      label: "Publications",
      href: "/publications",
      subItems: publicationsSubItems,
    },
    {
      label: "IPR Services",
      href: "/ipr-services",
      subItems: iprSubItems,
    },
    { href: "/internship", label: "Internship" },
    { href: "/research-support", label: "Research Support" },
    { href: "/contact-us", label: "Contact Us" },
  ];

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
           <Image src="/logo1.png" alt="Impression Logo" width={110} height={30} />
        </Link>
        <nav className="hidden items-center gap-3 lg:flex">
          {navItems.map((item) =>
            item.subItems ? (
              <Popover key={item.label}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium",
                      pathname.startsWith(item.href)
                        ? "text-primary"
                        : "text-foreground"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[500px] p-2 grid grid-cols-2 gap-1">
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
            <SheetContent side="left" className="pr-0">
              <SheetHeader>
                <SheetTitle>
                  <Link
                    href="/"
                    className="flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Image src="/logo1.png" alt="Impression Logo" width={110} height={30} />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-3">
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
                              "py-2 text-md font-medium hover:no-underline",
                               pathname.startsWith(item.href) ? "text-primary" : "text-foreground"
                            )}
                          >
                            {item.label}
                          </AccordionTrigger>
                          <AccordionContent className="pb-0 pl-4">
                            <div className="flex flex-col space-y-1">
                              {item.subItems.map((subItem) => (
                                <NavLink
                                  key={subItem.href}
                                  href={subItem.href}
                                  onClick={() => setIsOpen(false)}
                                  className="py-2 text-foreground"
                                >
                                  {subItem.title}
                                </NavLink>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <NavLink
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="py-2 text-md font-medium"
                      >
                        {item.label}
                      </NavLink>
                    )
                  )}
                  <Button asChild>
                    <Link href="/submit-journal">Submit Paper</Link>
                  </Button>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
