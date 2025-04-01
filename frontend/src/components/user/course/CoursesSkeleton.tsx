import { Skeleton } from "@/components/ui/skeleton"
import { CourseCardSkeleton } from "./CourseCardSkeleton"

export function CoursesSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Skeleton className="h-10 w-full sm:flex-1" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-[160px]" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-5 w-24" />
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-7 w-20 rounded-full" />
            ))}
        </div>

        <Skeleton className="h-5 w-64" />
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-[200px] w-full" />
                </div>
              ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array(9)
              .fill(0)
              .map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Skeleton className="h-10 w-64" />
          </div>
        </div>
      </div>
    </div>
  )
}

