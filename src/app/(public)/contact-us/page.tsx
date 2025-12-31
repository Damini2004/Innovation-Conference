import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "@/components/forms/contact-form";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us | Innovation Conferences | Nagpur",
  description: "Get in touch with the Innovation Conferences team in Nagpur. Contact us for the best publication services, research support, and partnership inquiries.",
  keywords: [
    "contact", "support", "inquiry", "email", "phone number", "address",
    "Best publication in Nagpur", "Top publication in Nagpur", "Leading publication house in Nagpur",
    "Top-rated publication in Nagpur", "No.1 publication in Nagpur", "Award-winning publication in Nagpur",
    "Most trusted publication in Nagpur", "Professional publication services in Nagpur", "Top publishing companies in Nagpur",
    "Renowned publication house", "Trusted publisher in Nagpur", "Professional publishing support", "Affordable publishing solutions"
  ],
};


export default function ContactUsPage() {
  return (
    <div className="bg-secondary/50">
        <section className="relative bg-background overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1600&h=600&auto=format&fit=crop"
                    alt="Contact Us background"
                    data-ai-hint="customer support"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>
            <div className="relative container mx-auto px-4 md:px-6 z-10 py-24 sm:py-32">
                <div className="max-w-3xl">
                    <ol className="flex items-center gap-2 text-white/80">
                        <li><Link href="/" className="hover:text-primary">Home</Link></li>
                        <li className="text-primary">/ Contact Us</li>
                    </ol>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mt-4 text-white">
                        Get in Touch
                    </h1>
                </div>
            </div>
        </section>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">We'd love to hear from you. Whether you have a question, feedback, or need support, our team is ready to help.</p>
        </div>

        <Card className="max-w-3xl mx-auto mb-16 shadow-xl border-primary/10">
          <CardHeader>
            <CardTitle className="text-center text-3xl">Send us a Message</CardTitle>
            <CardDescription className="text-center">Fill out the form and we'll get back to you shortly.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Other Ways to Connect</h2>
            <p className="mt-3 text-muted-foreground">Find us through our other channels.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card className="p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="p-4 bg-primary/10 rounded-full inline-flex mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">General: <a href="mailto:pureresearchinsights@gmail.com" className="text-primary hover:underline">pureresearchinsights@gmail.com</a></p>
                <p className="text-muted-foreground">Support: <a href="mailto:pureresearchinsights@gmail.com" className="text-primary hover:underline">pureresearchinsights@gmail.com</a></p>
            </Card>
             <Card className="p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="p-4 bg-primary/10 rounded-full inline-flex mb-4">
                    <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p className="text-muted-foreground">+91-7020095748</p>
                <p className="text-muted-foreground">Mon-Fri, 9am-5pm EST</p>
            </Card>
            <Card className="p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="p-4 bg-primary/10 rounded-full inline-flex mb-4">
                    <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Office</h3>
                <p className="text-muted-foreground">202-Innovation Conferences, Planet Apartment, Jaywant Nagar, Omkar Nagar,</p>
            </Card>
        </div>
      </div>
    </div>
  );
}
