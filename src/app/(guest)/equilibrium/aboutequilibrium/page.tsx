import HeroSection from "@/components/equilibrium/about/HeroSection";
import KeyBenefits from "@/components/equilibrium/about/KeyBenefits";
import TabularAnalysis from "@/components/equilibrium/about/TabularAnalysis";
import WhatIsEquil from "@/components/equilibrium/about/WhatIsEquil";

export default function AboutEquilibrium() {

    return (
        <main className="w-full">
            <HeroSection />
            <WhatIsEquil />
            <KeyBenefits />
            <TabularAnalysis />
        </main>
    )
}