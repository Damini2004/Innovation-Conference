// src/app/(public)/layout.tsx
"use client";

import Footer from "@/components/layout/footer";
import UserHeader from "@/components/layout/user-header";
import WhatsappFab from "@/components/layout/whatsapp-fab";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Twitter, Linkedin, Send, Pilcrow, MessageSquare, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MapSection = () => {
    return (
        <section id="map" className="w-full h-[450px]">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.574639922967!2d79.05361567512449!3d21.129424784742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c053d61f031b%3A0x838c645c3c2b1896!2sInnovation%20Conferences!5e0!3m2!1sen!2sin!4v1722339343355!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </section>
    );
};


const ContactSection = () => {
    return (
        <section id="contact" className="relative py-16 md:py-24 text-white">
            <Image
                src="https://picsum.photos/seed/contact-bg/1600/800"
                alt="Contact background"
                data-ai-hint="blurry office"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
            <div className="container relative z-10 mx-auto px-4 flex items-center justify-center h-full">
                <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 text-white">
                    <div className="grid md:grid-cols-2 items-stretch">
                        <div className="p-8">
                            <CardHeader className="flex-row items-center justify-between px-0 pt-0">
                                <CardTitle>Send us a message</CardTitle>
                                <Mail className="h-6 w-6 text-white/70" />
                            </CardHeader>
                            <CardContent className="px-0">
                                <form className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                                            <Input id="name" placeholder="Please enter your name" className="pl-10 bg-white/10 border-white/20 placeholder:text-white/50"/>
                                        </div>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                                            <Input id="email" type="email" placeholder="Please enter your email" className="pl-10 bg-white/10 border-white/20 placeholder:text-white/50"/>
                                        </div>
                                    </div>
                                    <div className="relative">
                                         <MessageSquare className="absolute left-3 top-5 h-5 w-5 text-white/50" />
                                        <Textarea id="message" placeholder="Write your message" rows={5} className="pl-10 pt-4 bg-white/10 border-white/20 placeholder:text-white/50" />
                                    </div>
                                    <Button type="submit">Send <Send className="ml-2 h-4 w-4" /></Button>
                                </form>
                            </CardContent>
                        </div>
                        <div className="bg-black/20 p-8 rounded-r-lg h-full flex flex-col">
                            <CardHeader className="px-0 pt-0">
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 px-0 flex-grow">
                                 <div className="flex items-start gap-4">
                                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div className="text-sm">
                                        <p>202-Innovation Conferences, Planet Apartment, Jaywant Nagar, Omkar Nagar, Nagpur</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div className="text-sm">
                                        <p>+91-7020095748</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div className="text-sm">
                                        <p>pureresearchinsights@gmail.com</p>
                                    </div>
                                </div>
                            </CardContent>
                            <div className="flex justify-center gap-4 pt-6">
                                <Link href="#" className="text-white/70 hover:text-primary"><Twitter /></Link>
                                <Link href="#" className="text-white/70 hover:text-primary"><Linkedin /></Link>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <UserHeader />
      <main className="flex-1">
        {children}
      </main>
      <div className="relative">
        <MapSection />
        <div className="relative -mt-48 flex items-center justify-center">
            <ContactSection />
        </div>
      </div>
      <Footer />
      <WhatsappFab />
    </div>
  );
}
