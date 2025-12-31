

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { getInternships, Internship } from "@/services/internshipService";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import ContactForm from "@/components/forms/contact-form";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function InternshipPage() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const data = await getInternships();
        setInternships(data);
      } catch (error) {
        console.error("Failed to fetch internships", error);
        toast({
            title: "Error",
            description: "Could not load internship opportunities. Please try again later.",
            variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInternships();
  }, [toast]); 

  const handleDownloadBrochure = (brochureUrl: string, internshipName: string) => {
    if (!brochureUrl) return;

    const link = document.createElement('a');
    link.href = brochureUrl;

    // Extract file type from data URI
    const mimeType = brochureUrl.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    let fileExtension = 'file';
    if (mimeType && mimeType.length > 1) {
        if (mimeType[1] === 'application/pdf') fileExtension = 'pdf';
        else if (mimeType[1] === 'application/msword') fileExtension = 'doc';
        else if (mimeType[1] === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') fileExtension = 'docx';
    }

    link.download = `Brochure-${internshipName.replace(/\s/g, '_')}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <>
      <section className="relative bg-background overflow-hidden">
          <div className="absolute inset-0 z-0">
              <Image
                  src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1600&h=600&auto=format=fit=crop"
                  alt="Internship opportunities background"
                  data-ai-hint="team working"
                  fill
                  className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative container mx-auto px-4 md:px-6 z-10 py-24 sm:py-32">
              <div className="max-w-3xl">
                  <ol className="flex items-center gap-2 text-white/80">
                      <li><Link href="/" className="hover:text-primary">Home</Link></li>
                      <li className="text-primary">/ Internship</li>
                  </ol>
                  <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mt-4 text-white">
                      Internship Opportunities
                  </h1>
                  <p className="mt-4 text-lg text-white/90 max-w-2xl">
                    Gain hands-on experience in the world of academic publishing and research.
                  </p>
              </div>
          </div>
      </section>
      <div className="container mx-auto px-4 py-12 md:py-24">
        <section>
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
                <Logo className="h-32 w-32" />
            </div>
          ) : internships.length > 0 ? (
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {internships.map(internship => (
                <div key={internship.id} className="speakers-member wow fadeIn animated group" data-wow-delay="0.1s">
                    <Card className="text-center overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu hover:-translate-y-2 flex flex-col h-full">
                      <div className="member-img bg-secondary relative h-60 w-full p-4 overflow-hidden">
                        <Image 
                          src={internship.imageSrc} 
                          alt={internship.name} 
                          data-ai-hint="internship opportunity"
                          fill
                          className="object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
                        />
                      </div>
                      <div className="member-desc flex-grow flex flex-col p-6">
                        <h3 className="text-lg font-bold">{internship.name}</h3>
                        <p className="text-sm text-muted-foreground mt-2 flex-grow">{internship.description}</p>
                        <div className="mt-6 flex flex-col items-start gap-3">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-full">
                                        Register Now <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
                                    <DialogHeader>
                                    <DialogTitle>Apply for: {internship.name}</DialogTitle>
                                    <DialogDescription>
                                        Please fill out your details below to apply. We will get back to you shortly.
                                    </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex-grow overflow-y-auto pr-6 -mr-2">
                                        <ScrollArea className="h-full">
                                            <ContactForm 
                                            inquiryType="Internship Application"
                                            details={internship.name}
                                            />
                                        </ScrollArea>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <Button 
                                variant="outline" 
                                className="w-full"
                                disabled={!internship.brochureUrl}
                                onClick={() => handleDownloadBrochure(internship.brochureUrl!, internship.name)}
                                >
                                <Download className="mr-2 h-4 w-4" />
                                Download Brochure
                            </Button>
                        </div>
                      </div>              
                    </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center text-center py-16 text-muted-foreground">
                <p>No internship opportunities are available at this time. Please check back later.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
