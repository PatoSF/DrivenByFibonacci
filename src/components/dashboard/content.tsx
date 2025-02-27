import CryptoCard from "./chartCard";
import { token1, token2, token3 } from "@/utils/TokenData";
import TokenDistribution from "./token-distribution";

export default function Content() {
  return (
    <div className="space-y-4 p-3 w-full overflow-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CryptoCard
          name="Fibo"
          price="0.9977"
          supply="526.136M"
          marketCap="$524.93M"
          chartData={token1}
          yAxisDomain={[0.97, 1.08]}
        />
        <CryptoCard
          name="Fibo X"
          price="1.852"
          supply="87.475M"
          marketCap="$163.865M"
          chartData={token2}
          yAxisDomain={[1500, 5000]}
          supplyLabel="SUPPLY"
          marketCapLabel="CIRC. MARKET CAP"
        />

        <CryptoCard
          name="Euler"
          price="1.852"
          supply="87.475M"
          marketCap="$163.865M"
          chartData={token3}
          yAxisDomain={[1500, 5000]}
          supplyLabel="SUPPLY"
          marketCapLabel="CIRC. MARKET CAP"
        />

        <TokenDistribution />
      </div>

      {/* <div className="bg-white rounded-xl p-6 flex flex-col items-start justify-start border border-gray-200 ">
        <h2 className="text-lg font-bold text-gray-900 mb-4 text-left flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-zinc-900" />
          Upcoming Events
        </h2>
        <List03 />
      </div> */}
    </div>
  );
}
