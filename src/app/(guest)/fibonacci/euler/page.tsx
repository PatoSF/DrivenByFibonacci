import HowEulerWorks from "@/components/fibonacci/euler/HowEulerWorks";
import TabularAnalysis from "@/components/fibonacci/euler/TabularAnalysis";
import TopSection from "@/components/fibonacci/euler/TopSection";


export default function Euler() {

    return (
        <main className="w-full">
            <TopSection />
            <HowEulerWorks />
            <TabularAnalysis />
        </main>
    )
}
