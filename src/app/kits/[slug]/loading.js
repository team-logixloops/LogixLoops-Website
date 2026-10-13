import Skeleton from "@/components/ui/Skeleton";

/* The same footprint as KitHero, block for block, so nothing jumps when the
   page arrives: breadcrumbs, line chip, a two-line H1, the summary, the price
   and timeline chips, the note, then the two buttons. One column, no art. */
export default function KitLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto pt-[120px] pb-stack-lg w-full">
        <div className="max-w-3xl flex flex-col">
          <Skeleton className="w-48 h-5 mb-4" />
          <Skeleton className="w-56 h-8 rounded-full" />
          <div className="mt-6 mb-6 space-y-3">
            <Skeleton className="w-full h-12 md:h-16" />
            <Skeleton className="w-[70%] h-12 md:h-16" />
          </div>
          <div className="mb-8 space-y-3">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-[95%] h-4" />
            <Skeleton className="w-[90%] h-4" />
            <Skeleton className="w-[60%] h-4" />
          </div>
          <div className="mb-8 flex flex-wrap gap-3">
            <Skeleton className="w-52 h-[68px] rounded-xl" />
            <Skeleton className="w-36 h-[68px] rounded-xl" />
          </div>
          <Skeleton className="-mt-4 mb-8 w-[80%] h-4" />
          <div className="flex flex-col gap-4 sm:flex-row">
            <Skeleton className="w-44 h-12 rounded-full" />
            <Skeleton className="w-48 h-12 rounded-full" />
          </div>
        </div>
      </section>
    </div>
  );
}
