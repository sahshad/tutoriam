import { StarRating } from "./start-rating"

interface CourseRatingOverviewProps {
  rating: number
}

export function CourseRatingOverview({ rating }: CourseRatingOverviewProps) {
  return (
    <div className="border rounded-lg p-6 flex flex-col items-center justify-center h-full">
      <div className="text-5xl font-bold mb-2">{rating.toFixed(1)}</div>
      <StarRating rating={rating} size="md" className="mb-2" />
      <p className="text-sm text-muted-foreground text-center">Course Rating</p>
    </div>
  )
}
