"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import Image from "next/image"
import { useState, useCallback } from "react"
import { toast } from "sonner"
import { parseUnits } from "ethers"
import useFiboMarket from "@/hooks/useMarket";
type TokenType = {
  name: string
  symbol: string
  address: string
  image: string
}

const tokens: TokenType[] = [
  {
    name: "Ethereum",
    symbol: "ETH",
    address: "0x5300000000000000000000000000000000000004",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    name: "USDC",
    symbol: "USDC",
    address: "0x690000EF01deCE82d837B5fAa2719AE47b156697",
    image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=013",
  },
  {
    name: "DAI",
    symbol: "DAI",
    address: "0xFa94dA175bE505B915187EdC8aE2f62F4Ccbf848",
    image: "https://cryptologos.cc/logos/dai-dai-logo.png?v=013",
  },
  {
    name: "LINK",
    symbol: "LINK",
    address: "0x231d45b53C905c3d6201318156BDC725c9c3B9B1",
    image: "https://cryptologos.cc/logos/chainlink-link-logo.png?v=013",
  },
]

const Buy = () => {
  const [selectedToken, setSelectedToken] = useState<TokenType | null>(null)
  const [amount, setAmount] = useState<number | string>("")
  const [exchangedAmount, setExchangedAmount] = useState<number | string>("")
  const [slippage, setSlippage] = useState<number>(1);
  const [listingId, setListingId] = useState<number | string>("")

  const {buyFIBO} = useFiboMarket(); 

  const handleTokenSelect = (symbol: string) => {
    const token = tokens.find((t) => t.symbol === symbol)
    if (token) {
      setSelectedToken(token)
    }
  }


  const handleBuy = async () => {
    if (!selectedToken) {
      toast.error("Please select a token")
      return
    }

    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount")
      return
    }

    await buyFIBO(Number(listingId), Number(amount), Number(exchangedAmount), selectedToken.address)
  }

  return (
    <div className="max-w-lg mx-auto mt-10">
      <span className="text-xl px-4 py-2 font-sora font-medium">Buy FIBO</span>

      <Card className="w-full mt-6 bg-color0 rounded-xl">
        <CardContent className="p-6">
          <div className="w-full mb-4">
            <label className="text-sm text-color2 mb-1.5 block">Select Token</label>
            <Select onValueChange={handleTokenSelect}>
              <SelectTrigger className="w-full h-[42px] flex flex-wrap items-center gap-2 pointer-events-auto text-gray-500">
                {selectedToken ? (
                  <span className="text-gray-500">{selectedToken.symbol}</span>
                ) : (
                  <span className="text-gray-500">Select desired token</span>
                )}
              </SelectTrigger>
              <SelectContent className="bg-white text-color2">
                {tokens.map((token) => (
                  <SelectItem key={token.name} value={token.symbol}>
                    <span className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 bg-color0 rounded-full">
                        <Image
                          src={token?.image || "/placeholder.svg"}
                          alt={`${token?.symbol} logo`}
                          width={200}
                          height={200}
                          className="w-5 h-5 rounded-full"
                        />
                      </span>
                      {token.symbol}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full mb-4">
            <label className="text-sm text-color2 mb-1.5 block">Amount</label>
            <Input
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-[42px] border-0 bg-color1 text-color2 text-xl px-4 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="w-full mb-4">
            <label className="text-sm text-color2 mb-1.5 block">Expected FIBO Amount</label>
            <Input
              type="number"
              placeholder="0.0"
              value={exchangedAmount}
              onChange={(e) => setExchangedAmount(Number(e.target.value))}
              className="w-full h-[42px] border-0 bg-color1 text-color2 text-xl px-4 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="w-full mb-4">
            <label className="text-sm text-color2 mb-1.5 block">Listing ID</label>
            <Input
              type="number"
              placeholder=""
              value={listingId}
              onChange={(e) => setListingId(Number(e.target.value))}
              className="w-full h-[42px] border-0 bg-color1 text-color2 text-xl px-4 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <Button
            className="w-full bg-color5 mt-4 px-6 py-6 text-white text-base hover:text-white rounded-xl"
            onClick={handleBuy}
          >
            Buy FIBO
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Buy

