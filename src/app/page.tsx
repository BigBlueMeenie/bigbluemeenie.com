import Covers from "@/components/home-covers";
import HomeTitleSVG from "@/components/home-title";
import HomeSubtitleSVG from "@/components/home-subtitle";

export default function Home() {
  return (
    <main className="flex flex-col px-3 py-6 md:py-26 max-w-max max-h-dvh mx-auto gap-px select-none">
      <div>
        <HomeTitleSVG className="w-full h-auto" />
      </div>
      <div className="overflow-hidden relative">
        <Covers />
        <div className="absolute left-0 right-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-black pointer-events-none" />
      </div>
      <div>
        <HomeSubtitleSVG className="w-full h-auto" />
      </div>
      <div className="flex flex-wrap-reverse text-[11px] tracking-[-.25px] pr-[4px]">
        <div className="mr-1">EST. 1991—2015</div>
        <div className="ml-auto">DESIGN TIM SHACKLETON</div>
      </div>
    </main>
  );
}
