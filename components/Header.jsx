"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";
import { Button } from './ui/button';
import { Authenticated, Unauthenticated } from 'convex/react';
import { BarLoader } from "react-spinners";
import { useStoreUser } from '@/hooks/use-store-user';
import { useState } from 'react';
import { Building, Crown, Plus, Ticket } from 'lucide-react';
import OnboardingModal from './onboarding-modal';
import { useOnboarding } from './../hooks/use-onboarding';
import SearchLocationBar from './search-location-bar';
import { Badge } from './ui/badge';
import UpgradeModal from "./upgrade-modal";

const Header = () => {
    const { isLoading } = useStoreUser();

    const { showOnboarding, handleOnboardingComplete, handleOnboardingSkip } =
        useOnboarding();

    const { has } = useAuth();
    const hasPro = has?.({ plan: "pro" });

    const [showUpgradeModel, setshowUpgradeModel] = useState(false);

    return (
        <>
            <nav className=' fixed top-0 left-0  right-0 bg-background/80 backdrop-blur-xl z-20 border-b'>
                <div className=' max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
                    {/* logo */}
                    <Link href={"/"} className=' flex items-center'>
                        <Image src="/newlogo.png" alt='logo png' width={500}
                            height={500} className="w-auto h-10 " priority />

                        {/* pro member */}
                        {hasPro && (
                            <Badge className=" bg-linear-to-r from-pink-500 to-orange-500 gap-1 text-white ml-3">
                                <Crown className="w-3 h-3" />
                                Pro
                            </Badge>
                        )}
                    </Link>
                    {/* search and location for pc */}
                    <div className=" hidden md:flex flex-1 justify-center">
                        <SearchLocationBar />
                    </div>

                    {/* right side action */}
                    <div className='flex items-center gap-3'>
                        {/* Pricing button */}
                        {!hasPro && <Button
                            variant={"ghost"} size="sm" onClick={() => setshowUpgradeModel(true)} className="cursor-pointer">
                            pricing
                        </Button>}

                        <Button variant={"ghost"} size="sm" asChild className={"mr-2"}>
                            <Link href={"/explore"}>Explore</Link>
                        </Button>
                        {/* Show User button when user IS logged in */}
                        <Authenticated>
                            <Button size="sm" asChild className="flex gap-2 mr-4">
                                <Link href={"/create-event"}>
                                    <Plus className=" w-4 h-4" />
                                    <span className="hidden sm:inline">Create Event</span>
                                </Link>
                            </Button>
                            <UserButton >
                                <UserButton.MenuItems>
                                    <UserButton.Link label="My Tickets" labelIcon={<Ticket size={16} />}
                                        href="/my-tickets" />
                                    <UserButton.Link label="My Events"
                                        labelIcon={<Building size={16} />}
                                        href="/my-events" />
                                    <UserButton.Action label="manageAccount" />
                                </UserButton.MenuItems>
                            </UserButton>
                        </Authenticated>
                        {/* Show Sign In button when user is NOT logged in */}
                        <Unauthenticated>
                            <SignInButton mode="modal">
                                <Button size='sm'>
                                    Sign In
                                </Button>
                            </SignInButton>
                        </Unauthenticated>
                    </div>
                </div>
                {/* mobile search location below header */}
                <div className=" md:hidden border-t px-3 py-3">
                    <SearchLocationBar />
                </div>

                {/* Lodar */}
                {isLoading && (
                    <div className="absolute bottom-0 left-0 w-full">
                        <BarLoader width={"100%"} color="#a855f7" />
                    </div>)}
            </nav>
            {/* models */}
            <OnboardingModal
                isOpen={showOnboarding}
                onClose={handleOnboardingSkip}
                onComplete={handleOnboardingComplete}
            />

            <UpgradeModal
        isOpen={showUpgradeModel}
        onClose={() => setshowUpgradeModel(false)}
        trigger="header"
      />
        </>
    )
}

export default Header;