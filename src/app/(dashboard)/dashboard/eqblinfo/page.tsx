'use client'
import AccountInfoAndBal from "@/components/dashboard/EQBLinfo/AccountInfoAndBal";
import Sidebar from "@/components/dashboard/layout/sidebar";
import TopNav from "@/components/dashboard/layout/top-nav";

export default function EQBLInfo() {
    return (
        <div className={`flex h-screen`}>
            <Sidebar />
            <div className="w-full flex flex-1 flex-col">
                <header className="h-16 border-b border-b-gray-300">
                    <TopNav />
                </header>
                <main className="flex-1 overflow-auto px-6 md:p-0 xl:p-3 bg-color1">
                    {/* getting user account info */}
                    <AccountInfoAndBal />
                </main>
            </div>
        </div>
    );
}