import About from "@/components/About";
import Hero from "@/components/Hero";
import SubText from "@/components/Subtext";

export default function HomePage() {
    return(
        <main className="flex flex-col gap-10 bg-primary">
            <Hero />
            <SubText/>
            <About/>
        </main>
    )
}