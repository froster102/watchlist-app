import { ScrollArea } from "@radix-ui/react-scroll-area";

import PopularMovies from "./_components/popular-movies";
import SearchBox from "./_components/search-box";
import TrendingList from "./_components/trending-list";
import Watchlist from "./_components/watchlist";

import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className=" font-[family-name:var(--font-geist-sans)]">
      {/* <ModeToggle className="absolute right-10 top-10 z-50" /> */}
      <main className="h-screen p-2 md:p-6 overflow-hidden">
        <Card className="h-full bg-background relative">
          <ScrollArea className="h-screen overflow-y-auto scrollbar-hidden">
            <CardContent className="p-0 h-full">
              <div className="flex justify-end">
                <SearchBox />
              </div>
              <div className="flex flex-col gap-4 px-4 h-full">
                <TrendingList />
                <PopularMovies />
                <Watchlist />
              </div>
            </CardContent>
          </ScrollArea>
        </Card>
      </main>
    </div>
  );
}
