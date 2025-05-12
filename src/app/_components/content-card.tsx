import Image from "next/image";

import { IMAGE_BASE_URL } from "@/utils/constants";
import { Card } from "@/components/ui/card";

interface ContentCardProps {
  title: string;
  posterPath: string;
}

export default function ContentCard({ title, posterPath }: ContentCardProps) {
  return (
    <Card className="p-0 border-0">
      <Image
        alt={`${title} Poster image`}
        className="overflow-hidden w-full h-full rounded-[0.625rem]"
        height={110}
        src={`${IMAGE_BASE_URL}${posterPath}`}
        width={110}
      />
    </Card>
  );
}
