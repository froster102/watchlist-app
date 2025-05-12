import { ScrollArea } from "@radix-ui/react-scroll-area";

import PopularMovies from "./_components/popular-movies";
import PopularShows from "./_components/popular-shows";
import SearchBox from "./_components/search-box";
import TrendingCarousel from "./_components/trending-carousel";

import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className=" font-[family-name:var(--font-geist-sans)]">
      {/* <ModeToggle className="absolute right-10 top-10 z-50" /> */}
      <main className="h-screen p-2 md:p-6 overflow-hidden">
        <Card className="h-full bg-background relative p-0">
          <ScrollArea className="h-screen overflow-y-auto scrollbar-hidden">
            <CardContent className="p-0">
              <div className="absolute top-10 right-10 z-10">
                <SearchBox />
              </div>
              <TrendingCarousel />
              <PopularMovies />
              <PopularShows />
            </CardContent>
          </ScrollArea>
        </Card>
      </main>
    </div>
  );
}
