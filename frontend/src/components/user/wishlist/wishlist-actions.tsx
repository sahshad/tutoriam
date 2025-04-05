
import { ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WishlistActionsProps {
  selectedCount: number
  totalCount: number
  onAddToCart: () => void
  onRemoveSelected: () => void
}

export function WishlistActions({ selectedCount, totalCount, onAddToCart, onRemoveSelected }: WishlistActionsProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm">
          {selectedCount === 0 ? (
            <span>No courses selected</span>
          ) : (
            <span>
              <span className="font-medium">{selectedCount}</span> of <span className="font-medium">{totalCount}</span>{" "}
              courses selected
            </span>
          )}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={onRemoveSelected}
          disabled={selectedCount === 0}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remove Selected
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-black hover:bg-black/5"
          onClick={onAddToCart}
          disabled={selectedCount === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add Selected to Cart
        </Button>
      </div>
    </div>
  )
}

