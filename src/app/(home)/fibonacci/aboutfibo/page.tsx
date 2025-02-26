
import About from "@/components/fibonacci/aboutFIBO/About";
import AboutFiboHero from "@/components/fibonacci/aboutFIBO/Hero";
import Steps from "@/components/fibonacci/aboutFIBO/Steps";


export default function AboutFIBO() {

    return (
        <main className="w-full">
            <AboutFiboHero />
            <About />
            <Steps />
        </main>
    )
}
