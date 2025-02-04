import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Nav() {
  return (
    <header className="fixed top-0 w-full z-50 bg-transparent  bg-opacity-30 backdrop-blur-lg backdrop-filter ">
      <nav className="container flex items-center justify-between py-6 px-4 mx-auto">
  
        <Link href="/" className="flex items-center">
          <Image
            src="/fibo-logo.png"
            alt="Circle Logo"
            width={100}
            height={100}
            className="h-12 w-auto"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="#" className="text-base font-medium text-gray-600 hover:text-gray-900">
            USDC
          </Link>
          <Link href="#" className="text-base font-medium text-gray-600 hover:text-gray-900">
            Platform
          </Link>
          <Link href="#" className="text-base font-medium text-gray-600 hover:text-gray-900">
            Solutions
          </Link>
          <Link href="#" className="text-base font-medium text-gray-600 hover:text-gray-900">
            Developer
          </Link>
          <Link href="#" className="text-base font-medium text-gray-600 hover:text-gray-900">
            Resources
          </Link>
          <Link href="#" className="text-base font-medium text-gray-600 hover:text-gray-900">
            Partners
          </Link>
          <Link href="#" className="text-base font-medium text-gray-600 hover:text-gray-900">
            Transparency
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button className="bg-[#120F1C] hover:bg-[#120F1C]/90 text-white">GET STARTED</Button>
        </div>
      </nav>
    </header>
  )
}

