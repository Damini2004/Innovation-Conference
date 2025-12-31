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
import Link from "next/link";

const ContactSection = () => {
    return (
        <>
            {/* We can integrate a map library here if needed in the future */}
            {/* <section id="map" className="h-96 bg-gray-200"></section> */}
            <section id="contact" className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4">
                    <Card>
                        <div className="grid md:grid-cols-12 gap-8 items-start">
                            <div className="md:col-span-8 p-6">
                                <CardHeader className="flex-row items-center justify-between px-0 pt-0">
                                    <CardTitle>Send us a message</CardTitle>
                                    <Mail className="h-6 w-6 text-muted-foreground" />
                                </CardHeader>
                                <CardContent className="px-0">
                                    <form className="space-y-6">
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                                <Input id="name" placeholder="Please enter your name" className="pl-10"/>
                                            </div>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                                <Input id="email" type="email" placeholder="Please enter your email" className="pl-10"/>
                                            </div>
                                        </div>
                                        <div className="relative">
                                             <MessageSquare className="absolute left-3 top-5 h-5 w-5 text-muted-foreground" />
                                            <Textarea id="message" placeholder="Write your message" className="pl-10 pt-4" />
                                        </div>
                                        <Button type="submit">Send <Send className="ml-2 h-4 w-4" /></Button>
                                    </form>
                                </CardContent>
                            </div>
                            <div className="md:col-span-4 bg-muted/50 p-6 rounded-r-lg h-full">
                                <CardHeader className="px-0 pt-0">
                                    <CardTitle>Contact Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 px-0">
                                     <div className="flex items-start gap-4">
                                        <MapPin className="h-5 w-5 text-primary mt-1" />
                                        <div className="text-sm">
                                            <p>Marriott Marquis, San Francisco, CA<br/>United States</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Phone className="h-5 w-5 text-primary mt-1" />
                                        <div className="text-sm">
                                            <p>+123456789000</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Mail className="h-5 w-5 text-primary mt-1" />
                                        <div className="text-sm">
                                            <p>info@abcd.com</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
                                        <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin /></Link>
                                    </div>
                                </CardContent>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </>
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
      <ContactSection />
      <Footer />
      <WhatsappFab />
    </div>
  );
}
