import ContentCard from "./content-card";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ContentListProps {
  title: string;
  contents: Content[];
}

export default function ContentList({ title, contents }: ContentListProps) {
  return (
    <>
      <div>
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {title}
        </h3>
        <ScrollArea className="mt-2 max-w-screen whitespace rounded-md border">
          <div className="flex w-max space-x-4 p-4 overflow-x-auto ">
            {contents.map((result) => (
              <ContentCard
                key={result.id}
                posterPath={result.poster_path}
                title={result.title}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
}
