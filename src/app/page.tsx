import About from "@/components/landing/About";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/hero";
import ListOfPartners from "@/components/landing/ListOfPartners";


export default function Home() {

  return (
    <main className="w-full">
      <Hero />
      <ListOfPartners />
      <About />
      <Features />
    </main>
  )
}
