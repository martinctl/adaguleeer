'use client';

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { GrGamepad } from "react-icons/gr";
import Link from "next/link";

interface NavbarProps {
    currentSection: string;
}

export function Navbar({ currentSection }: NavbarProps) {
    return (
        <NavigationMenu.Root className="fixed top-2 left-1/2 transform -translate-x-1/2 w-5/6 h-12 0 px-5 z-50 flex justify-between items-center backdrop-blur-3xl border border-amber-100/10 rounded-full bg-slate-700/20 shadow-lg">
            <GrGamepad/>
            <NavigationMenu.Sub className="flex justify-center list-none space-x-4">
                <NavigationMenu.Item className={`${currentSection == 'intro' ? "border-b border-slate-100" : ""} px-2 py-1`}>
                    <NavigationMenu.Link
                        className="NavigationMenuLink"
                        href="#intro"
                    >
                        Intro
                    </NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item className={`${currentSection == 'word-cloud' ? "border-b border-slate-100" : ""} px-2 py-1`}>
                    <NavigationMenu.Link
                        className="NavigationMenuLink"
                        href="#word-cloud"
                    >
                        Word Cloud
                    </NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item className={`${currentSection == 'top-games' ? "border-b border-slate-100" : ""} px-2 py-1`}>
                    <NavigationMenu.Link
                        className="NavigationMenuLink"
                        href="#top-games"
                    >
                        Top Games
                    </NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item className={`${currentSection == 'network' ? "border-b border-slate-100" : ""} px-2 py-1`}>
                    <NavigationMenu.Link
                        className="NavigationMenuLink"
                        href="#network"
                    >
                        Network
                    </NavigationMenu.Link>
                </NavigationMenu.Item>
            </NavigationMenu.Sub>
            <Link href="https://github.com/epfl-ada/ada-2024-project-padawan"><GitHubLogoIcon/></Link>
        </NavigationMenu.Root>
    );
}