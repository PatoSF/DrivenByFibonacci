'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

const Remove = () => {
    const [listingId, setListingId] = useState("")

    return (
        <div className="w-full">
            <h3 className="text-color2 text-xl font-sora font-medium">Remove Listing</h3>

            <Card className="w-full mt-3 bg-color0 rounded-xl">
                <CardContent className="p-6">
                    <div className="w-full mb-4">
                        <label className="text-sm text-color2 mb-1.5 block">Amount</label>
                        <Input
                            type="text"
                            placeholder="Enter listing Id"
                            value={listingId}
                            onChange={(e) => setListingId(e.target.value)}
                            className="w-full h-[42px] border-0 bg-color1 text-color2 text-base px-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>

                    <Button
                        className="w-full bg-color5 mt-7 text-white text-lg hover:text-white rounded-lg"
                    >
                        Remove Listing
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default Remove