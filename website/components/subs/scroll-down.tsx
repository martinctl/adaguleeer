'use client';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export function ScrollDown() {
    useGSAP(() => {
        gsap.to(".scroll-down-icon", {
            y: 10,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    });

    return (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/75">
            <ChevronDownIcon 
                className="scroll-down-icon w-8 h-8" 
                aria-label="Scroll down"
            />
        </div>
    );
}
