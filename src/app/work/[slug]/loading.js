import Skeleton from "@/components/ui/Skeleton";

export default function CaseStudyLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Skeleton className="w-48 h-6" />
            <Skeleton className="w-32 h-4 mb-4" />
            <Skeleton className="w-full h-16 md:h-24 max-w-xl" />
            <div className="space-y-4 max-w-2xl mt-4">
              <Skeleton className="w-[90%] h-4" />
              <Skeleton className="w-[95%] h-4" />
              <Skeleton className="w-[80%] h-4" />
            </div>
            <div className="flex flex-wrap gap-8 pt-8">
               <div className="flex flex-col gap-2"><Skeleton className="w-16 h-8" /><Skeleton className="w-24 h-4" /></div>
               <div className="flex flex-col gap-2"><Skeleton className="w-16 h-8" /><Skeleton className="w-24 h-4" /></div>
               <div className="flex flex-col gap-2"><Skeleton className="w-16 h-8" /><Skeleton className="w-24 h-4" /></div>
            </div>
          </div>
          <div className="lg:col-span-5 mt-12 lg:mt-0">
             <Skeleton className="w-full aspect-[4/3] rounded-xl" />
          </div>
        </div>
      </section>
    </div>
  );
}
