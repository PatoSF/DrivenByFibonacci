import HeroSection from "@/components/fibonacci/fundamentalDashboard/HeroSection";
import Insight from "@/components/fibonacci/fundamentalDashboard/Insight";
import Metrics from "@/components/fibonacci/fundamentalDashboard/Metrics";


export default function FundamentalDashboard() {

    return (
        <main className="w-full">
            <HeroSection />
            <Metrics />
            <Insight />
        </main>
    )
}
