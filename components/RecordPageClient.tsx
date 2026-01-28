"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function RecordPageClient({ record, tracks, children }: any) {
    const container = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.from(".title-char", {
            opacity: 0,
            y: 40,
            rotateX: -90,
            stagger: 0.03,
            duration: 1,
        }, 0.2);

        tl.from(".visual-frame", {
            clipPath: "inset(0% 100% 0% 0%)",
            duration: 1.5,
            ease: "expo.inOut"
        }, 0.1);

        tl.from(".spec-box", {
            x: 20,
            opacity: 0,
            duration: 0.8,
        }, "-=0.5");

        tl.from(".meta-stagger", {
            y: 10,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8
        }, "-=1");

        gsap.utils.toArray(".track-row").forEach((row: any) => {
            gsap.from(row, {
                scrollTrigger: {
                    trigger: row,
                    start: "top 90%",
                },
                opacity: 0,
                x: -20,
                duration: 1,
                ease: "power2.out"
            });
        });

    }, { scope: container });

    return <div ref={container}>{children}</div>;
}