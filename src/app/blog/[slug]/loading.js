import Skeleton from "@/components/ui/Skeleton";

export default function BlogLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <article className="pt-32 pb-stack-xl px-margin-x-mobile md:px-margin-x-desktop max-w-4xl mx-auto w-full">
         <div className="flex flex-col items-center text-center mb-16">
            <Skeleton className="w-32 h-6 rounded-full mb-6" />
            <Skeleton className="w-full h-16 md:h-20 mb-8 max-w-3xl" />
            <div className="flex items-center gap-4 mt-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-16 h-3" />
              </div>
            </div>
         </div>
         <div className="max-w-3xl mx-auto space-y-6">
           <Skeleton className="w-full h-4" />
           <Skeleton className="w-[95%] h-4" />
           <Skeleton className="w-[90%] h-4" />
           <Skeleton className="w-[92%] h-4" />
           <Skeleton className="w-full h-64 my-12 rounded-xl" />
           <Skeleton className="w-[85%] h-4" />
           <Skeleton className="w-[98%] h-4" />
           <Skeleton className="w-[90%] h-4" />
         </div>
      </article>
    </div>
  );
}
