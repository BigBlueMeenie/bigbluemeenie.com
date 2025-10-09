import Covers from "@/components/home-covers";
import HomeTitleSVG from "@/components/home-title";
import HomeSubtitleSVG from "@/components/home-subtitle";

export default function Home() {
  return (
    <div className="p-2">
      <main className="flex flex-col px-1 py-5 md:py-24 max-w-max mx-auto gap-px">
        <div className="col-span-full">
          <HomeTitleSVG className="w-full h-auto" />
        </div>
        <Covers className="col-span-full" />
        <div className="col-span-full">
          <HomeSubtitleSVG className="w-full h-auto" />
        </div>
        <div className="col-span-full flex flex-wrap-reverse text-[11px] tracking-[-.25px] pr-[4px]">
          <div className="mr-1">EST. 1991—2015</div>
          <div className="ml-auto">DESIGN TIM SHACKLETON</div>
        </div>
      </main>
    </div>
  );
}
