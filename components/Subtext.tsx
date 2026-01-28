
"use client"
import { gsap } from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function SubText() {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const subTextArticleRef = useRef<HTMLElement>(null);
    const SubTextRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        if (!SubTextRef.current) return;

        const splitSubText = new SplitText(SubTextRef.current, {
            type: "lines, words",
            linesClass: "overflow-hidden"
        });

        gsap.set(splitSubText.words, { color: "#CFCFCF" });

        gsap.to(splitSubText.words, {
            scrollTrigger: {
                trigger: subTextArticleRef.current,
                start: "top 60%", 
                toggleActions: "play none none reverse",
            },
            y: 0,
            duration: 0.8,
            ease: "power4.out",
            color: "#3a3a3a",
            stagger: {
                each: 0.1,
                from: "start"
            },
        });
    }, { scope: subTextArticleRef });

    return (
        <article
            className="h-screen text-secondary flex justify-center items-center px-5"
            ref={subTextArticleRef}
        >
            <p
                className="md:max-w-146 text-2xl md:text-3xl lg:text-4xl font-agdasima font-semibold"
                ref={SubTextRef}
            >
                <span className="mr-10 font-normal text-base">
                    (ETHOS_01)
                </span>
                Every beat, every rhythm, everytime you hit play, it washes down on you, the beauty of what we call music.
                We're creating a safe space to protect that euphoric moment in time, like a camera preserves a memory in time,
                we hold on to your favourite catalogues, one Vinyl at a time.
            </p>
        </article>
    );
}