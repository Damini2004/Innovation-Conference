
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Info, Handshake, TrendingUp, DraftingCompass, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";


const pagesSubItems = [
    { href: "/about", icon: Info, title: "About Us", description: "Learn more about our mission and team." },
    { href: "/conference/scientific-gallery", icon: DraftingCompass, title: "Gallery", description: "Explore photos from our past events." },
    { href: "/#pricing", icon: TrendingUp, title: "Pricing Table", description: "Find the perfect plan for your needs." },
    { href: "/#sponsors", icon: Handshake, title: "Sponsors", description: "Our valued partners and collaborators." },
];

const NavLink = ({ href, children, className, ...props }: { href: string, children: React.ReactNode, className?: string }) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Link href={href} className={cn("text-sm font-medium transition-colors hover:text-primary", isActive ? "text-primary" : "text-foreground", className)} {...props}>
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
    { href: "/#schedule", label: "Schedule" },
    { href: "/#speakers", label: "Speakers" },
    { href: "/#blog", label: "Blog" },
    { href: "/contact-us", label: "Contact" },
  ];

  return (
    <header className={cn("sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300", isScrolled ? 'shadow-md' : '')}>
       <div id="roof" className="hidden md:block bg-primary text-primary-foreground text-xs py-1">
          <div className="container flex justify-between items-center">
            <div className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                <span>San Francisco, CA, United States</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                    <Phone className="h-3 w-3" />
                    <span>(00) 123 456 789</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Mail className="h-3 w-3" />
                    <a href="mailto:email@gmail.com" className="hover:underline">email@gmail.com</a>
                </div>
            </div>
          </div>
      </div>
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Image src="/logo1.png" alt="Impression Logo" width={110} height={30} />
        </Link>
        <nav className="hidden items-center gap-4 md:flex">
          {menuItems.map((item) => (
             <NavLink key={item.label} href={item.href}>
                {item.label}
              </NavLink>
          ))}
          <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className={cn("flex items-center gap-1 text-sm font-medium", pathname.startsWith('/about') ? "text-primary" : "text-foreground")}>
                Pages
                <ChevronDown className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-2 grid grid-cols-1">
                {pagesSubItems.map((subItem) => (
                <DropdownNavLink key={subItem.href} {...subItem} />
                ))}
            </PopoverContent>
          </Popover>

        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button asChild className="hidden sm:flex animated bounceIn">
            <Link href="/#pricing">
              Buy Tickets
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
                            <Image src="/logo1.png" alt="Impression Logo" width={110} height={30} />
                        </Link>
                    </SheetTitle>
                </SheetHeader>
              <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-3">
                  {menuItems.map((item) => (
                    <NavLink key={item.label} href={item.href} onClick={() => setIsOpen(false)} className="py-2 text-md font-medium">
                        {item.label}
                    </NavLink>
                  ))}
                  
                   <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="pages" className="border-b-0">
                            <AccordionTrigger className="py-2 text-md font-medium text-foreground hover:text-primary hover:no-underline [&[data-state=open]]:text-primary">
                                Pages
                            </AccordionTrigger>
                            <AccordionContent className="pb-0 pl-4">
                               <div className="flex flex-col space-y-1">
                                {pagesSubItems.map(subItem => (
                                    <NavLink key={subItem.href} href={subItem.href} onClick={() => setIsOpen(false)} className="py-2 text-foreground">
                                        {subItem.title}
                                    </NavLink>
                                ))}
                               </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                     <Button asChild>
                        <Link href="/#pricing">
                        Buy Tickets
                        </Link>
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
