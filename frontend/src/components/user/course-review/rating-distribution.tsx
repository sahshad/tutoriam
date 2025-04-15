import { Progress } from "@/components/ui/progress"
import { StarRating } from "./start-rating"

interface RatingDistributionProps {
  distribution: {
    stars: number
    percentage: number
  }[]
}

export function RatingDistribution({ distribution }: RatingDistributionProps) {
  return (
    <div className="space-y-3">
      {distribution.map((item) => (
        <div key={item.stars} className="flex items-center gap-3">
          <div className="w-24 flex-shrink-0">
            <StarRating rating={item.stars} size="sm" />
          </div>
          <Progress value={item.percentage} className="h-2 flex-grow" />
          <div className="w-12 text-sm text-right">
            {item.percentage < 1 ? `<1%` : `${Math.round(item.percentage)}%`}
          </div>
        </div>
      ))}
    </div>
  )
}
