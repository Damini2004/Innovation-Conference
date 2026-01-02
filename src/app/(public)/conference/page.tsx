
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
import { Calendar, Search as SearchIcon, Eye, MapPin, ArrowRight } from "lucide-react";
import { getCurrentDateInIndia } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
           <div className="container mx-auto px-4">
                <section>
                    <div className="space-y-8">
                        {isLoading ? (
                            [...Array(3)].map((_, i) => (
                                <Card key={i} className="p-4"><Skeleton className="h-40 w-full" /></Card>
                            ))
                        ) : paginatedConferences.length > 0 ? (
                            paginatedConferences.map(conference => (
                                <Card key={conference.id} className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-transparent hover:border-primary">
                                    <div className="grid grid-cols-1 md:grid-cols-12 items-center">
                                        <div className="md:col-span-3 lg:col-span-2 p-6 flex justify-center items-center bg-muted/30 h-full">
                                            <Image 
                                                src={conference.imageSrc || 'https://placehold.co/150x150.png'} 
                                                alt={conference.shortTitle} 
                                                width={150} 
                                                height={150} 
                                                className="w-32 h-32 object-contain group-hover:scale-105 transition-transform" 
                                                data-ai-hint="logo brand"
                                            />
                                        </div>
                                        <div className="md:col-span-6 lg:col-span-7 p-6">
                                            <h3 className="text-xl font-bold text-primary group-hover:text-primary/90 transition-colors">
                                                <Link href={`/conference/${conference.id}`}>{conference.title}</Link>
                                            </h3>
                                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{conference.tagline || conference.shortTitle}</p>
                                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm mt-4">
                                                <div className="flex items-center gap-2 font-medium">
                                                    <Calendar className="h-4 w-4 text-primary/80"/>
                                                    <span>{conference.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2 font-medium">
                                                    <MapPin className="h-4 w-4 text-primary/80"/>
                                                    <span>{conference.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-3 lg:col-span-3 p-6 flex flex-col items-center justify-center md:items-end h-full border-t md:border-t-0 md:border-l">
                                            <Button asChild className="w-full md:w-auto">
                                                <Link href={`/conference/${conference.id}`}>
                                                    View Details <ArrowRight className="ml-2 h-4 w-4"/>
                                                </Link>
                                            </Button>
                                            <Link href="/submit-journal" className="mt-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                                Submit Abstract
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
        </div>
    </div>
  );
}
