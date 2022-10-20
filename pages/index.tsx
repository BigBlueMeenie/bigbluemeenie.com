import type { NextPage } from 'next';
import Head from 'next/head';
import Covers from '@/components/HomeCovers';
import HomeTitleSVG from '@/components/HomeTitleSVG';
import HomeSubtitleSVG from '@/components/HomeSubtitleSVG';

const Home: NextPage = () => {
  return (
    <div className="p-2">
      <Head>
        <title>Welcome to Big Blue Meenie</title>
        <meta name="description" content="Big Blue Meenie is one of the oldest, largest, and certainly the most prolific Open for Hire private production houses for rock music on the east coast of America." />
        <link rel="icon" href="/favicon.ico" />
        <script async defer data-website-id="e5593e8e-43b6-4351-8cad-9c4b13fb2ed8" src="https://umami.release.club/umami.js"></script>
      </Head>

      <main className="grid grid-cols-8 gap-px p-1 pt-24 max-w-max mx-auto">
        <div className="col-span-8">
          <HomeTitleSVG/>
        </div>
        <Covers />
        <div className="col-span-8">
          <HomeSubtitleSVG/>
        </div>
        <div className="col-span-8 flex text-[11px] tracking-[-.25px] pr-[4px]">
          <div>EST. 1991—2015</div>
          <div className="ml-auto">DESIGN TIM SHACKLETON</div>
        </div>
      </main>

    </div>
  )
};

export default Home
