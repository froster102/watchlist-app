"use client";

import React, { ChangeEvent } from "react";
import { Loader2, Search, X } from "lucide-react";

import ContentCard from "./content-card";

import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useSearch } from "@/hooks/useSearch";
import InfiniteScrollContainer from "@/components/infinite-scroll-container";

interface MovieSearchProps {}

export default function SearchBox({}: MovieSearchProps) {
  const [searchValue, setSearchValue] = React.useState("");
  const { data, isFetching, fetchNextPage, isFetchingNextPage } = useSearch({
    query: searchValue,
    enabled: searchValue !== "",
  });

  const results = data?.pages.flatMap((page) => page.results);

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    setSearchValue(value);
  };

  return (
    <>
      <div className="relative max-w-sm">
        <Dialog onOpenChange={() => setSearchValue("")}>
          <DialogTrigger>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                className="pl-10 focus-visible:ring-0 focus:border border-0 "
                placeholder="Search for movies and shows"
                type="text"
              />
            </div>
          </DialogTrigger>
          <DialogOverlay className="backdrop-blur-sm" />
          <DialogContent
            hideClose
            aria-describedby="Movie search results"
            className="sm:max-w-[625px] p-0 gap-0"
          >
            <DialogHeader>
              <DialogTitle className="hidden">Search movie</DialogTitle>
              <div className="relative">
                <Input
                  className="pr-10 h-16 focus-visible:ring-0 border-0 dark:bg-background"
                  placeholder="Enter movie or show name"
                  value={searchValue}
                  onChange={handleSearch}
                />
                {searchValue && (
                  <X
                    className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-500"
                    onClick={() => setSearchValue("")}
                  />
                )}
              </div>
            </DialogHeader>
            <Separator />
            <ScrollArea className="h-[425px] rounded-md p-4">
              <InfiniteScrollContainer
                onBottomReached={() => !isFetching && fetchNextPage()}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {results && results.length > 0 ? (
                    results.map((movie) => {
                      if (
                        movie.media_type === "movie" ||
                        movie.media_type === "tv"
                      ) {
                        return (
                          <ContentCard
                            key={movie.id}
                            posterPath={movie.poster_path}
                            title={movie.title}
                          />
                        );
                      }
                    })
                  ) : (
                    <p>Nothing found</p>
                  )}
                </div>
                {isFetchingNextPage && (
                  <div className="flex justify-center">
                    <Loader2 className="animate-spin" />{" "}
                  </div>
                )}
              </InfiniteScrollContainer>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
