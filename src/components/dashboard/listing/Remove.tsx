"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";
import useFiboMarket from "@/hooks/useMarket";

const Remove = () => {
  const [listingId, setListingId] = useState("");
  const { removeListing } = useFiboMarket();

  const handleRemove = async () => {
    const id = Number(listingId);

    if (isNaN(id) || id < 0) {
      toast.error("Please enter a valid listing ID.");
      return;
    }

    try {
      await removeListing(id);
      setListingId("");
    } catch (error) {
      toast.error("Failed to remove listing.");
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-color2 text-xl font-sora font-medium">
        Remove Listing
      </h3>

      <Card className="w-full mt-3 bg-color0 rounded-xl">
        <CardContent className="p-6">
          <div className="w-full mb-4">
            <label className="text-sm text-color2 mb-1.5 block">
              Listing ID
            </label>
            <Input
              type="text"
              placeholder="Enter listing ID"
              value={listingId}
              onChange={(e) => setListingId(e.target.value)}
              className="w-full h-[42px] border-0 bg-color1 text-color2 text-base px-4 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <Button
            onClick={handleRemove}
            className="w-full bg-color5 mt-7 text-white text-lg hover:text-white rounded-lg"
          >
            Remove Listing
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Remove;
