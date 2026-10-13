import Skeleton from "@/components/ui/Skeleton";

export default function KitLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative min-h-[80vh] flex items-center px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto overflow-hidden pt-[120px] pb-stack-xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter w-full relative z-10 items-center">
          <div className="col-span-1 md:col-span-6 lg:col-span-7 flex flex-col gap-6">
            <Skeleton className="w-48 h-6" />
            <Skeleton className="w-40 h-8 rounded-full mb-2" />
            <Skeleton className="w-full h-16 md:h-24 max-w-xl" />
            <div className="space-y-4 max-w-2xl mt-4">
              <Skeleton className="w-[90%] h-4" />
              <Skeleton className="w-[95%] h-4" />
              <Skeleton className="w-[85%] h-4" />
            </div>
            <div className="flex gap-4 mt-8">
              <Skeleton className="w-32 h-12 rounded-full" />
            </div>
          </div>
          <div className="col-span-1 md:col-span-6 lg:col-span-5 relative mt-12 md:mt-0 flex justify-center">
            <Skeleton className="w-64 h-64 md:w-80 md:h-80 rounded-full" />
          </div>
        </div>
      </section>
    </div>
  );
}
