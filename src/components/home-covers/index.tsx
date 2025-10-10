"use client";

import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

import { bbm, covers } from "./images";

export default function HomeCovers({
  className,
  trailDelay = 2000,
  trailInterval = 50,
}: {
  className?: string;
  trailDelay?: number;
  trailInterval?: number;
}) {
  // State for tracking the set of flipped tiles
  const [flippedTiles, setFlippedTiles] = useState<Set<number>>(new Set());

  // FIFO queue to track tiles that need to be unflipped
  const queueRef = useRef<number[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  // Process the queue one tile at a time with proper spacing
  const processQueue = useCallback(
    (queue: number[]) => {
      if (!isMountedRef.current) return;
      if (queue.length === 0) return;
      const [first, ...rest] = queue;

      // Process the first tile immediately
      setFlippedTiles((prev) => {
        const newSet = new Set(prev);
        newSet.delete(first);
        return newSet;
      });

      // If there are more tiles, schedule the next one
      if (rest.length > 0) {
        setTimeout(() => {
          processQueue(rest);
        }, trailInterval);
      }
    },
    [trailInterval]
  );

  // Start timer if not already running
  const startTimer = useCallback(() => {
    if (timeoutRef.current) return;
    // Use trailDelay for initial delay, then process the queue
    timeoutRef.current = setTimeout(() => {
      // Copy the current queue and clear it, then process the copy
      const queue = [...queueRef.current];
      queueRef.current = [];
      processQueue(queue);
      timeoutRef.current = null;
    }, trailDelay);
  }, [processQueue, trailDelay]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (isMountedRef.current) {
        isMountedRef.current = false;
      }
    };
  }, []);

  // Handle tile interaction - works for both mouse and touch
  const handleTileInteraction = useCallback(
    (tileIndex: number) => {
      // Remove any existing entry for this tile from the queue
      queueRef.current = queueRef.current.filter(
        (index) => index !== tileIndex
      );

      // Add tile to flipped set immediately
      setFlippedTiles((prev) => new Set([...prev, tileIndex]));

      // Add tile to the queue
      queueRef.current.push(tileIndex);

      // Start timer if queue was empty (this is the first tile)
      if (queueRef.current.length === 1) {
        startTimer();
      }
    },
    [startTimer]
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
