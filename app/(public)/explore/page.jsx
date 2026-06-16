"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Users, ArrowRight, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { createLocationSlug } from "@/lib/location-utils";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { CATEGORIES } from "@/lib/data";
import Autoplay from "embla-carousel-autoplay";
import EventCard from "@/components/event-card";

export default function ExplorePage() {
    const router = useRouter();
    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    // Fetch current user for location
    const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);

    // Fetch events
    const { data: featuredEvents, isLoading: loadingFeatured } = useConvexQuery(
        api.explore.getFeaturedEvents,
        { limit: 3 }
    );

    const { data: localEvents, isLoading: loadingLocal } = useConvexQuery(
        api.explore.getEventsByLocation,
        {
            city: currentUser?.location?.city || "Gurgaon",
            state: currentUser?.location?.state || "Haryana",
            limit: 4,
        }
    );

    const { data: popularEvents, isLoading: loadingPopular } = useConvexQuery(
        api.explore.getPopularEvents,
        { limit: 6 }
    );

    const { data: categoryCounts } = useConvexQuery(
        api.explore.getCategoryCounts
    );

    const handleEventClick = (slug) => {
        router.push(`/events/${slug}`);
    };

    const handleCategoryClick = (categoryId) => {
        router.push(`/explore/${categoryId}`);
    };

    const handleViewLocalEvents = () => {
        const city = currentUser?.location?.city || "Gurgaon";
        const state = currentUser?.location?.state || "Haryana";
        const slug = createLocationSlug(city, state);
        router.push(`/explore/${slug}`);
    };

    // Format categories with counts
    const categoriesWithCounts = CATEGORIES.map((cat) => ({
        ...cat,
        count: categoryCounts?.[cat.id] || 0,
    }));

    // Loading state
    const isLoading = loadingFeatured || loadingLocal || loadingPopular;

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
        );
    }

    return (
        <>
            {/* Hero Title */}
            <div className="pb-12 text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">Discover Events</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Explore featured events, find what&apos;s happening locally, or browse
                    events across India
                </p>
            </div>

            {/* Featured Carousel */}
            {featuredEvents && featuredEvents.length > 0 && (
                <div className="mb-16">
                    <Carousel
                        plugins={[plugin.current]}
                        className="w-full"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                    >
                        <CarouselContent>
                            {featuredEvents.map((event) => (
                                <CarouselItem key={event._id}>
                                    <div
                                        className="relative h-[400px] rounded-xl overflow-hidden cursor-pointer"
                                        onClick={() => handleEventClick(event.slug)}
                                    >
                                        {event.coverImageUrl ? (
                                            <Image
                                                src={event.coverImageUrl}
                                                alt={event.title}
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                        ) : (
                                            <div
                                                className="absolute inset-0"
                                                style={{ backgroundColor: event.themeColor }}
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
                                        <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
                                            <Badge className="w-fit mb-4" variant="secondary">
                                                {event.city}, {event.state || event.country}
                                            </Badge>
                                            <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white">
                                                {event.title}
                                            </h2>
                                            <p className="text-lg text-white/90 mb-4 max-w-2xl line-clamp-2">
                                                {event.description}
                                            </p>
                                            <div className="flex items-center gap-4 text-white/80">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <span className="text-sm">
                                                        {format(event.startDate, "PPP")}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    <span className="text-sm">{event.city}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4" />
                                                    <span className="text-sm">
                                                        {event.registrationCount} registered
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                    </Carousel>
                </div>
            )}

            {/* Local Events */}
            <div className="mb-16">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-3xl font-bold mb-1">
                            Events Near You
                        </h2>

                        <p className="text-muted-foreground">
                            Happening in{" "}
                            {currentUser?.location?.city || "your area"}
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        className="gap-2"
                        onClick={handleViewLocalEvents}
                    >
                        View All <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>

                {/* EVENTS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {localEvents?.length > 0 ? (
                        localEvents.map((event) => (
                            <EventCard
                                key={event._id}
                                event={event}
                                variant="grid"
                                onClick={() =>
                                    handleEventClick(event.slug)
                                }
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 text-muted-foreground">
                            No local events found
                        </div>
                    )}
                </div>
            </div>

            {/* Browse by Category */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold mb-6">
                    Browse by Category
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5">

                    {categoriesWithCounts.map((category) => (

                        <Card
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}

                            className="
                py-2
                group
                cursor-pointer
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                transition-all
                duration-500

                hover:-translate-y-2
                hover:scale-[1.03]

                hover:border-purple-500/40

                hover:shadow-[0_0_45px_rgba(168,85,247,0.35)]

                before:absolute
                before:inset-0
                before:bg-gradient-to-r
                before:from-purple-500/0
                before:via-pink-500/10
                before:to-cyan-500/0
                before:opacity-0

                hover:before:opacity-100

                before:transition-opacity
                before:duration-500
                "
                        >

                            <CardContent className="px-3 sm:p-6 flex items-center gap-4 relative z-10">

                                {/* ICON */}
                                <div
                                    className="
                        text-3xl
                        sm:text-4xl

                        transition-all
                        duration-500

                        group-hover:scale-125
                        group-hover:rotate-6
                        "
                                >
                                    {category.icon}
                                </div>

                                {/* CONTENT */}
                                <div className="flex-1 min-w-0">

                                    {/* TITLE */}
                                    <h3
                                        className="
                            font-semibold
                            mb-1

                            transition-all
                            duration-300

                            group-hover:text-purple-400
                            group-hover:tracking-wide
                            "
                                    >
                                        {category.label}
                                    </h3>

                                    {/* EVENT COUNT */}
                                    <p className="text-sm text-muted-foreground">
                                        {category.count} Event
                                        {category.count !== 1 ? "s" : ""}
                                    </p>

                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Popular Events Across Country */}
            {popularEvents && popularEvents.length > 0 && (
                <div className="mb-16">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold mb-1">Popular Across India</h2>
                        <p className="text-muted-foreground">Trending events nationwide</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {popularEvents.map((event) => (
                            <EventCard
                                key={event._id}
                                event={event}
                                variant="list"
                                onClick={() => handleEventClick(event.slug)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!loadingFeatured &&
            !loadingLocal && 
            !loadingPopular &&
                (!featuredEvents || featuredEvents.length === 0) &&
                (!localEvents || localEvents.length === 0) &&
                (!popularEvents || popularEvents.length === 0) && (
                    <Card
                        className="
            relative
            overflow-hidden
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            rounded-3xl
            py-16
            px-6
            text-center
            shadow-[0_0_60px_rgba(168,85,247,0.15)]
            "
                    >
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 opacity-60" />
                        <div className="relative z-10 max-w-xl mx-auto">
                            {/* Emoji */}
                            <div
                                className="
                    text-7xl
                    mb-6
                    animate-bounce
                    "
                            >
                                🎉
                            </div>
                            {/* Title */}
                            <h2
                                className="
                    text-3xl
                    md:text-4xl
                    font-bold
                    mb-4
                    "
                            >
                                No Events Yet
                            </h2>
                            {/* Description */}
                            <p
                                className="
                    text-muted-foreground
                    text-lg
                    mb-8
                    "
                            >
                                Looks like there are no events available right now.
                                Be the first to create an amazing event in your area 🚀
                            </p>
                            {/* Button */}
                            <Button
                                asChild
                                size="lg"
                                className="
                    rounded-xl
                    px-8
                    py-6
                    text-base
                    font-semibold
                    shadow-lg
                    hover:scale-105
                    transition-transform
                    duration-300
                    "
                            >
                                <a
                                    href="/create-event"
                                    className="flex items-center gap-2"
                                >
                                    Create Event
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                            </Button>
                        </div>
                    </Card>
                )}
        </>
    );
}