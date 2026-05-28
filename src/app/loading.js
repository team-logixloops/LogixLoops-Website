import Skeleton from "@/components/ui/Skeleton";

export default function GlobalLoading() {
  return (
    <div className="min-h-[80vh] pt-[120px] pb-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto w-full flex flex-col gap-12">
      <div className="flex flex-col gap-6 max-w-3xl">
        <Skeleton className="w-24 h-6 rounded-full" />
        <Skeleton className="w-3/4 h-16 md:h-24" />
        <Skeleton className="w-full max-w-2xl h-8" />
        <div className="flex gap-4 mt-4">
          <Skeleton className="w-32 h-12 rounded-full" />
          <Skeleton className="w-32 h-12 rounded-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <Skeleton className="h-[300px] rounded-xl" />
        <Skeleton className="h-[300px] rounded-xl" />
        <Skeleton className="h-[300px] rounded-xl" />
      </div>
    </div>
  );
}
