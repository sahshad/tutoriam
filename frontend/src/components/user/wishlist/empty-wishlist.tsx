
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
      <h2 className="mb-2 text-xl font-semibold">Your wishlist is empty</h2>
      <p className="mb-6 max-w-md text-center text-muted-foreground">
        Courses you save to your wishlist will appear here. Find courses you're interested in and click the heart icon
        to add them.
      </p>
      <Button asChild className="bg-black text-white hover:bg-black/90">
        <Link to="/courses">Browse Courses</Link>
      </Button>
    </div>
  )
}

