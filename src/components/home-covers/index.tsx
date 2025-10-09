"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

import imageData from "./images";

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

  // Handle tile interaction - works for both mouse and touch
  const handleTileInteraction = useCallback(
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
      }, trailDelay);

      timeoutRefs.current.set(tileIndex, timeout);
    },
    [trailDelay]
  );

  // Handle container touch events for mobile trail effect
  const handleContainerTouchMove = useCallback(
    (e: React.TouchEvent) => {
      // Only respond to single-finger touches to allow zoom/pan gestures
      if (e.touches.length !== 1) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const rect = e.currentTarget.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      // Calculate which tile the touch is over
      const tileWidth = rect.width / 8; // 8 columns
      const tileHeight = rect.height / 4; // 4 rows (32 tiles / 8 columns = 4 rows)

      const col = Math.floor(x / tileWidth);
      const row = Math.floor(y / tileHeight);
      const tileIndex = row * 8 + col;

      // Make sure the tile index is valid
      if (tileIndex >= 0 && tileIndex < 32) {
        handleTileInteraction(tileIndex);
      }
    },
    [handleTileInteraction]
  );

  return (
    <div
      className={cn(
        "grid grid-cols-4 sm:grid-cols-8 gap-px touch-manipulation prevent-scroll",
        className
      )}
      onTouchMove={handleContainerTouchMove}
    >
      {imageData.map((src, i: number) => {
        const isFlipped = flippedTiles.has(i);

        return (
          <div
            key={i}
            className="aspect-square relative"
            onPointerEnter={() => handleTileInteraction(i)}
            onTouchStart={() => {
              handleTileInteraction(i);
            }}
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
