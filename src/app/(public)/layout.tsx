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
                    <div className="grid md:grid-cols-12 gap-8 items-start">
                        <div className="md:col-span-8">
                            <Card>
                                <CardHeader className="flex-row items-center justify-between">
                                    <CardTitle>Send us a message</CardTitle>
                                    <Mail className="h-6 w-6 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <form className="space-y-6">
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Name</Label>
                                                <Input id="name" placeholder="Please enter your name" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input id="email" type="email" placeholder="Please enter your email" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="message">Message</Label>
                                            <Textarea id="message" placeholder="Write your message" />
                                        </div>
                                        <Button type="submit">Send <Send className="ml-2 h-4 w-4" /></Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="md:col-span-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Contact Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
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
                            </Card>
                        </div>
                    </div>
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
