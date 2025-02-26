"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const timeframes = ["15M", "1H", "8H", "1D", "1W", "1M", "3M", "6M", "1Y", "ALL"]

interface CryptoCardProps {
  name: string
  price: string
  supply: string
  marketCap?: string
  chartData: any
  yAxisDomain: [number, number]
  supplyLabel?: string
  marketCapLabel?: string
}

export default function CryptoCard({
  name,
  price,
  supply,
  marketCap,
  chartData,
  yAxisDomain,
  supplyLabel = "SUPPLY",
  marketCapLabel = "MARKET CAP",
}: CryptoCardProps) {
  return (
    <Card className="bg-zinc-900 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border-b border-zinc-800">
        <div className="flex items-center gap-2 text-xl font-bold">{name}</div>
        <div className="flex items-center justify-between md:justify-center gap-2">
          <span className="text-gray-400">PRICE</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold">${price}</span>
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center justify-between md:justify-center gap-2">
          <span className="text-gray-400">{supplyLabel}</span>
          <span className="font-semibold">{supply}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {timeframes.map((timeframe) => (
              <Button key={timeframe} variant={timeframe === "3M" ? "secondary" : "ghost"} className="text-sm">
                {timeframe}
              </Button>
            ))}
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`gradient-${name}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280" }}
                tickFormatter={(value) => value.slice(0, 6)}
              />
              <YAxis
                domain={yAxisDomain}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280" }}
                tickFormatter={(value) =>
                  `$${typeof value === "number" && value < 10 ? value.toFixed(3) : value.toLocaleString()}`
                }
                tickCount={6}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#27272a",
                  border: "none",
                  borderRadius: "6px",
                  color: "#fff",
                }}
                itemStyle={{ color: "#fff" }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="rgb(59, 130, 246)"
                strokeWidth={2}
                fill={`url(#gradient-${name})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-6 border-t border-zinc-800">
        <p className="text-gray-400">
          Real-time CR and statistics are now on the{" "}
          <a href="#" className="text-white hover:underline">
            Frax Facts Balance Sheet
          </a>{" "}
          page.
        </p>
      </div>
    </Card>
  )
}