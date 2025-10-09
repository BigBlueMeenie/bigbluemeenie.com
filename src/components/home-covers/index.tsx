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

function HomeCovers() {
  return (
    <>
      {data.map((src, i: number) => {
        return (
          <Image
            src={src}
            key={i}
            alt="Album cover image"
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        );
      })}
    </>
  );
}

export default HomeCovers;
