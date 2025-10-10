"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

import { bbm, covers } from "./images";

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

  return (
    <div
      className={cn(
        "grid grid-cols-4 sm:grid-cols-8 gap-px touch-manipulation relative prevent-scroll",
        className
      )}
    >
      <Image
        src={bbm}
        alt="Big Blue Meenie"
        className="absolute inset-0 object-cover w-full h-full -z-10"
      />
      {covers.map((src, i: number) => {
        const isFlipped = flippedTiles.has(i);

        return (
          <div
            key={i}
            className="aspect-square relative pointer-events-auto outline outline-black"
            onPointerEnter={(e: React.PointerEvent<HTMLElement>) =>
              e.isPrimary && handleTileInteraction(i)
            }
            // Release pointer capture to allow enter/level events on mobile
            onGotPointerCapture={(e: React.PointerEvent<HTMLElement>) => {
              (e.target as HTMLElement).releasePointerCapture(e.pointerId);
            }}
            // Prevent element drag on desktop
            onPointerDown={(e: React.PointerEvent<HTMLElement>) =>
              e.preventDefault()
            }
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
