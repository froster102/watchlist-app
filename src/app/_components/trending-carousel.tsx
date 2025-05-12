import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAllTrending } from "@/lib/api/tmdb/services";
import { IMAGE_BASE_URL } from "@/utils/constants";

export default async function TrendingCarousel() {
  const data = await getAllTrending({ timeWindow: "week" });

  return (
    <>
      <Carousel>
        <CarouselContent>
          {data.results.map((result) => (
            <CarouselItem key={result.id}>
              <Image
                alt={`${result.title} poster image`}
                className="w-full h-[66vh] object-cover rounded-[0.625rem]"
                height={500}
                quality={100}
                src={`${IMAGE_BASE_URL}/${result.backdrop_path}`}
                width={500}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-2" />
        <CarouselNext className="-right-2" />
      </Carousel>
    </>
  );
}
