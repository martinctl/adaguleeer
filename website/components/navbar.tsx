'use client';

import { GamepadIcon } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button, Flex } from '@radix-ui/themes';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

export function Navbar() {
    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="sticky top-0 z-50 border-b border-secondary bg-background/80 backdrop-blur-sm"
        >
            <NavigationMenu.Root>
                <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center space-x-2">
                        <GamepadIcon className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold">Gaming Trends</span>
                    </Link>
                    <Flex gap="6" align="center">
                        <NavigationMenu.Item>
                            <Button variant="ghost" asChild>
                                <Link href="#trends">Trends</Link>
                            </Button>
                        </NavigationMenu.Item>
                        <NavigationMenu.Item>
                            <Button variant="ghost" asChild>
                                <Link href="#categories">Categories</Link>
                            </Button>
                        </NavigationMenu.Item>
                        <NavigationMenu.Item>
                            <Button variant="ghost" asChild>
                                <Link href="#network">Network</Link>
                            </Button>
                        </NavigationMenu.Item>
                    </Flex>
                </nav>
            </NavigationMenu.Root>
        </motion.header>
    );
}