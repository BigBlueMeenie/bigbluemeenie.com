"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

import imageData from "./images";

// Shared rendering function - ensures static and interactive versions match
function CoverTiles(
  flippedTiles: Set<number> = new Set(),
  onTileEnter?: (tileIndex: number) => void,
  className?: string
) {
  return (
    <div
      className={cn("grid grid-cols-8 gap-px touch-manipulation", className)}
    >
      {imageData.map((src, i: number) => {
        const isFlipped = flippedTiles.has(i);

        return (
          <div
            key={i}
            className="aspect-square relative"
            onMouseEnter={onTileEnter ? () => onTileEnter(i) : undefined}
          >
            <Image
              src={src}
              alt="Album cover image"
              width={200}
              height={200}
              className={cn(
                "w-full h-full object-cover transition-opacity duration-500 ease-in-out",
                isFlipped ? "opacity-0" : "opacity-100"
              )}
            />
          </div>
        );
      })}
    </div>
  );
}

// Interactive component
export default function HomeCovers({
  className,
  trailDelay = 1000,
}: {
  className?: string;
  trailDelay?: number;
}) {
  // State for tracking the set of flipped tiles
  const [flippedTiles, setFlippedTiles] = useState<Set<number>>(new Set());
  const timeoutRefs = useRef<Map<number, NodeJS.Timeout>>(new Map());

  // Handle tile entry - only runs when entering a new tile
  const handleTileEnter = useCallback(
    (tileIndex: number) => {
      // Clear any existing timeout for this tile
      const existingTimeout = timeoutRefs.current.get(tileIndex);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
        timeoutRefs.current.delete(tileIndex);
      }

      // Add tile to flipped set immediately
      setFlippedTiles((prev) => new Set([...prev, tileIndex]));

      // Set timeout to remove tile after delay (creating trail effect)
      const timeout = setTimeout(() => {
        setFlippedTiles((prev) => {
          const newSet = new Set(prev);
          newSet.delete(tileIndex);
          return newSet;
        });
        timeoutRefs.current.delete(tileIndex);
      }, trailDelay); // Configurable delay for trail effect

      timeoutRefs.current.set(tileIndex, timeout);
    },
    [trailDelay]
  );

  return CoverTiles(flippedTiles, handleTileEnter, className);
}
