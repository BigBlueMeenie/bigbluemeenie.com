import Image from "next/image";

import cover__1 from "./images/1.gif";
import cover__2 from "./images/2.gif";
import cover__3 from "./images/3.gif";
import cover__4 from "./images/4.gif";
import cover__5 from "./images/5.gif";
import cover__6 from "./images/6.gif";
import cover__7 from "./images/7.gif";
import cover__8 from "./images/8.gif";
import cover__9 from "./images/9.gif";
import cover_10 from "./images/10.gif";
import cover_11 from "./images/11.gif";
import cover_12 from "./images/12.gif";
import cover_13 from "./images/13.gif";
import cover_14 from "./images/14.gif";
import cover_15 from "./images/15.gif";
import cover_16 from "./images/16.gif";
import cover_17 from "./images/17.gif";
import cover_18 from "./images/18.gif";
import cover_19 from "./images/19.gif";
import cover_20 from "./images/20.gif";
import cover_21 from "./images/21.gif";
import cover_22 from "./images/22.gif";
import cover_23 from "./images/23.gif";
import cover_24 from "./images/24.gif";
import cover_25 from "./images/25.gif";
import cover_26 from "./images/26.gif";
import cover_27 from "./images/27.gif";
import cover_28 from "./images/28.gif";
import cover_29 from "./images/29.gif";
import cover_30 from "./images/30.gif";
import cover_31 from "./images/31.gif";
import cover_32 from "./images/32.gif";
import { cn } from "@/lib/utils";

export const data = [
  cover__1,
  cover__2,
  cover__3,
  cover__4,
  cover__5,
  cover__6,
  cover__7,
  cover__8,
  cover__9,
  cover_10,
  cover_11,
  cover_12,
  cover_13,
  cover_14,
  cover_15,
  cover_16,
  cover_17,
  cover_18,
  cover_19,
  cover_20,
  cover_21,
  cover_22,
  cover_23,
  cover_24,
  cover_25,
  cover_26,
  cover_27,
  cover_28,
  cover_29,
  cover_30,
  cover_31,
  cover_32,
];

function HomeCovers({
  className,
  delayOffset = 0,
}: {
  className?: string;
  delayOffset?: number;
}) {
  // Calculate grid dimensions (8 columns, 4 rows for 32 images)
  const cols = 8;
  const rows = Math.ceil(data.length / cols);
  // Use integer center positions to ensure minimum distance is 0
  const centerX = Math.floor(cols / 2);
  const centerY = Math.floor(rows / 2);

  return (
    <div
      className={cn(
        "grid grid-cols-8 gap-px group hover:animate-none touch-manipulation",
        className
      )}
    >
      {data.map((src, i: number) => {
        // Calculate grid position
        const row = Math.floor(i / cols);
        const col = i % cols;

        // Calculate distance from center
        const distanceFromCenter = Math.sqrt(
          Math.pow(col - centerX, 2) + Math.pow(row - centerY, 2)
        );

        // Create delay based on distance (closer to center = earlier fade)
        const distanceDelay = Math.round(distanceFromCenter * 100); // 100ms per unit distance
        const delay = delayOffset + distanceDelay;

        console.log(
          `${i}: ${delay} (offset: ${delayOffset}, distance: ${distanceDelay})`
        );
        return (
          <div key={i} className="aspect-square">
            <Image
              src={src}
              alt="Album cover image"
              width={200}
              height={200}
              className="w-full h-full object-cover transition-opacity duration-400 ease-in-out group-hover:opacity-0"
              style={{
                transitionDelay: `${delay}ms`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default HomeCovers;
