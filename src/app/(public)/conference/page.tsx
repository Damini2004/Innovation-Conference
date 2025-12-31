
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState, useCallback, useMemo } from "react";
import { getConferences } from "@/services/conferenceService";
import type { Conference } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Search as SearchIcon, Eye } from "lucide-react";
import { getCurrentDateInIndia } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ConferenceSidebarForm from "@/components/forms/conference-sidebar-form";
import { countries } from "@/lib/countries";


const months = [
    { name: "January", value: 0 }, { name: "February", value: 1 }, { name: "March", value: 2 },
    { name: "April", value: 3 }, { name: "May", value: 4 }, { name: "June", value: 5 },
    { name: "July", value: 6 }, { name: "August", value: 7 }, { name: "September", value: 8 },
    { name: "October", value: 9 }, { name: "November", value: 10 }, { name: "December", value: 11 }
];


export default function ConferencesPage() {
  const [allConferences, setAllConferences] = useState<Conference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

   useEffect(() => {
    setCurrentDate(getCurrentDateInIndia());
  }, []);

  const fetchConferences = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getConferences();
      setAllConferences(data);
    } catch (error) {
      console.error("Error fetching conferences:", error);
      toast({
        title: "Error",
        description: "Could not fetch conferences.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchConferences();
  }, [fetchConferences]);

  const { upcomingConferences } = useMemo(() => {
    if (!currentDate) return { upcomingConferences: [] };
    
    const upcoming = allConferences
      .filter(conf => conf.dateObject && conf.dateObject.getTime() >= currentDate.getTime())
      .sort((a, b) => a.dateObject.getTime() - b.dateObject.getTime());

    return { 
        upcomingConferences: upcoming, 
    };
  }, [allConferences, currentDate]);


  const totalPages = Math.ceil(upcomingConferences.length / rowsPerPage);
  const paginatedConferences = upcomingConferences.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  
  return (
    <div className="bg-secondary/30">
        
        <section className="relative bg-background overflow-hidden">
          <div className="absolute inset-0 z-0">
              <Image
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&h=600&auto=format=fit=crop"
                  alt="Conference background"
                  data-ai-hint="conference audience"
                  fill
                  className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative container mx-auto px-4 md:px-6 z-10 py-24 sm:py-32">
              <div className="max-w-3xl">
                  <ol className="flex items-center gap-2 text-white/80">
                      <li><Link href="/" className="hover:text-primary">Home</Link></li>
                      <li className="text-primary">/ Conferences</li>
                  </ol>
                  <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mt-4 text-white">
                      Upcoming Conferences
                  </h1>
              </div>
          </div>
      </section>

        <div className="py-12 md:py-16">
           <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-8">
                    <section>
                        <div className="space-y-6">
                            {isLoading ? (
                                [...Array(5)].map((_, i) => (
                                    <Card key={i} className="p-4"><Skeleton className="h-24 w-full" /></Card>
                                ))
                            ) : paginatedConferences.length > 0 ? (
                                paginatedConferences.map(conference => (
                                    <Card key={conference.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        <div className="p-4 flex flex-col md:flex-row items-center gap-4">
                                            <Image src={conference.imageSrc || 'https://placehold.co/120x120.png'} alt={conference.shortTitle} width={120} height={120} className="w-28 h-28 object-contain" data-ai-hint="logo brand"/>
                                            <div className="text-center md:text-left flex-1 space-y-2">
                                                <h4 className="font-bold text-base hover:text-primary"><Link href={`/conference/${conference.id}`}>{conference.title}</Link></h4>
                                                <p className="text-sm text-primary font-semibold flex items-center justify-center md:justify-start gap-2"><Calendar className="h-4 w-4"/>{conference.date}</p>
                                            </div>
                                            <div className="text-center md:text-right space-y-2">
                                                 <p className="text-sm font-bold flex items-center justify-center md:justify-end gap-2 text-primary hover:underline">
                                                    <Image src="/gps-tracker.gif" alt="Location" width={24} height={24} unoptimized />
                                                    {conference.location}
                                                 </p>
                                                 <Link href={`/conference/${conference.id}`} className="text-sm text-muted-foreground hover:text-primary flex items-center justify-center md:justify-end gap-1">
                                                    <Eye className="h-4 w-4"/> View Details
                                                 </Link>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <div className="text-center py-16">
                                    <p className="text-muted-foreground">
                                        No upcoming conferences found. Please check back later.
                                    </p>
                                </div>
                            )}
                        </div>
                         {upcomingConferences.length > 0 && (
                             <div className="flex items-center justify-between mt-8">
                                <div className="text-sm text-muted-foreground">
                                    Showing {paginatedConferences.length} of {upcomingConferences.length} conferences.
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium">Rows per page</p>
                                        <Select
                                            value={`${rowsPerPage}`}
                                            onValueChange={(value) => {
                                                setRowsPerPage(Number(value))
                                                setCurrentPage(1)
                                            }}
                                        >
                                            <SelectTrigger className="h-8 w-[70px]">
                                                <SelectValue placeholder={`${rowsPerPage}`} />
                                            </SelectTrigger>
                                            <SelectContent side="top">
                                                {[5, 10, 20, 30].map((pageSize) => (
                                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                                        {pageSize}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="text-sm font-medium">
                                        Page {currentPage} of {totalPages}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
                {/* Sidebar */}
                <aside className="lg:col-span-4 space-y-6">
                     <Card>
                        <CardHeader className="text-center bg-muted/50">
                            <CardTitle>Indexed By</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                             <div className="grid grid-cols-2 gap-4">
                                <div className="p-2 border rounded-md flex items-center justify-center"><Image src="/photo (1).png" width={120} height={50} alt="DOAJ" data-ai-hint="logo brand" className="object-contain" /></div>
                                <div className="p-2 border rounded-md flex items-center justify-center"><Image src="/photo (2).png" width={120} height={50} alt="Scopus" data-ai-hint="logo company" className="object-contain" /></div>
                                <div className="p-2 border rounded-md flex items-center justify-center"><Image src="/photo (3).png" width={120} height={50} alt="EBSCO" data-ai-hint="logo tech" className="object-contain" /></div>
                                <div className="p-2 border rounded-md flex items-center justify-center"><Image src="/photo (4).png" width={120} height={50} alt="Crossref" data-ai-hint="logo business" className="object-contain" /></div>
                                <div className="p-2 border rounded-md flex items-center justify-center"><Image src="/photo (5).png" width={120} height={50} alt="DOAJ" data-ai-hint="logo brand" className="object-contain" /></div>
                                <div className="p-2 border rounded-md flex items-center justify-center"><Image src="/photo (6).png" width={120} height={50} alt="Scopus" data-ai-hint="logo company" className="object-contain" /></div>
                                <div className="p-2 border rounded-md flex items-center justify-center"><Image src="/photo (7).png" width={120} height={50} alt="EBSCO" data-ai-hint="logo tech" className="object-contain" /></div>
                                <div className="p-2 border rounded-md flex items-center justify-center"><Image src="/photo (8).png" width={120} height={50} alt="Crossref" data-ai-hint="logo business" className="object-contain" /></div>
                           
                           </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-red-600 text-white text-center p-6 animated bounceIn">
                        <h3 className="text-xl font-bold">Life Science Conferences</h3>
                        <Button variant="outline" className="mt-4 bg-white text-red-600 hover:bg-white/90">Visit Now</Button>
                    </Card>
                    <ConferenceSidebarForm />
                </aside>
            </div>
        </div>
    </div>
  );
}
