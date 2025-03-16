"use client";
import Sidebar from "@/components/dashboard/layout/sidebar";
import TopNav from "@/components/dashboard/layout/top-nav";
import DepositCollateral from "@/components/dashboard/mintEQBL/DepositCollateral";
import MintEQBLComponent from "@/components/dashboard/mintEQBL/MintEQBL";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

export default function MintEQBL() {
  return (
    <div className={`flex h-screen`}>
      <Sidebar />
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16 border-b border-b-gray-300">
          <TopNav />
        </header>
        <main className="flex-1 overflow-auto px-6 md:p-0 xl:p-3 bg-color1">
          {/* deposit collateral and mint eqbl */}
          <div className="mt-20 max-w-lg mx-auto">
            <Tabs defaultValue="deposit" className="w-full">
              <TabsList className="grid w-fit gap-6 grid-cols-2 bg-transparent p-1 mb-4">
                <TabsTrigger
                  value="deposit"
                  className="text-base rounded-full px-3 py-2 w-fit data-[state=active]:bg-color5 data-[state=active]:text-white"
                >
                  Deposit Collateral
                </TabsTrigger>
                <TabsTrigger
                  value="mint"
                  className="text-base rounded-full px-3 py-2 data-[state=active]:bg-color5 data-[state=active]:text-white"
                >
                  Mint EQBL
                </TabsTrigger>
              </TabsList>

              <TabsContent value="deposit" className="space-y-4">
                <DepositCollateral />
              </TabsContent>

              <TabsContent value="mint" className="space-y-4">
                <MintEQBLComponent/>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
