import Image from 'next/future/image';

import cover__1 from '@/public/covers/1.gif';
import cover__2 from '@/public/covers/2.gif';
import cover__3 from '@/public/covers/3.gif';
import cover__4 from '@/public/covers/4.gif';
import cover__5 from '@/public/covers/5.gif';
import cover__6 from '@/public/covers/6.gif';
import cover__7 from '@/public/covers/7.gif';
import cover__8 from '@/public/covers/8.gif';
import cover__9 from '@/public/covers/9.gif';
import cover_10 from '@/public/covers/10.gif';
import cover_11 from '@/public/covers/11.gif';
import cover_12 from '@/public/covers/12.gif';
import cover_13 from '@/public/covers/13.gif';
import cover_14 from '@/public/covers/14.gif';
import cover_15 from '@/public/covers/15.gif';
import cover_16 from '@/public/covers/16.gif';
import cover_17 from '@/public/covers/17.gif';
import cover_18 from '@/public/covers/18.gif';
import cover_19 from '@/public/covers/19.gif';
import cover_20 from '@/public/covers/20.gif';
import cover_21 from '@/public/covers/21.gif';
import cover_22 from '@/public/covers/22.gif';
import cover_23 from '@/public/covers/23.gif';
import cover_24 from '@/public/covers/24.gif';
import cover_25 from '@/public/covers/25.gif';
import cover_26 from '@/public/covers/26.gif';
import cover_27 from '@/public/covers/27.gif';
import cover_28 from '@/public/covers/28.gif';
import cover_29 from '@/public/covers/29.gif';
import cover_30 from '@/public/covers/30.gif';
import cover_31 from '@/public/covers/31.gif';
import cover_32 from '@/public/covers/32.gif';

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
  cover_32
];

function HomeCovers() {
  return (
    <>
      {data.map((src, i: number) => {
        return (
          <Image src={src} key={i} alt="Album cover image" />
        );
      })}
    </>
  );
}

export default HomeCovers;
