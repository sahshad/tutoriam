import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
// import { useToast } from "@/hooks/use-toast"
import { WishlistItemType } from "@/lib/mock-data"
import { Link } from "react-router-dom"
import { EmptyWishlist } from "@/components/user/wishlist/EmptyWishlist"
import { WishlistItem } from "@/components/user/wishlist/WishlistItmes"
import Header from "@/components/user/home/Header"
import { addCourseToCart, getWishlistItems, removeCourseFromWishlist } from "@/services/userServices"
import { toast } from "sonner"

export default function WishlistPage() {
//   const { toast } = useToast()
  const [wishlistItems, setWishlistItems] = useState<WishlistItemType[]>([])

  useEffect(()=> {
   const getWishlistData = async () => {
    try {
        const res = await getWishlistItems()
        console.log(res.wishlist.courses)
        setWishlistItems(res.wishlist.courses)
    } catch (error) {
        console.log(error)
    }
   }
   getWishlistData()
  },[])

  const handleRemoveItem = async (id: string) => {
      try {
          const res = await removeCourseFromWishlist(id)
          console.log(res)
          setWishlistItems(wishlistItems.filter((item) => item._id !== id))
    } catch (error) {
        console.log(error)
    }

  }

  const handleMoveToCart = async (_id: string) => {
      try {
          await addCourseToCart(_id)
          await removeCourseFromWishlist(_id)
          toast.success("course moved to cart successfully", {position:"top-right"})
          // setCartItems(cartItems.filter((item) => item._id !== _id))
          setWishlistItems(wishlistItems.filter((item) => item._id !== _id))
      } catch (error) {
        console.log(error)
        toast.error("course is alredy in your cart", {position:"top-right"})
      }


  }


  return (
    <>
    <Header/>
    <div className="container mx-auto px-[4%] py-8">

      <h1 className="mb-8 text-2xl font-bold sm:text-xl">
        My Wishlist {wishlistItems.length > 0 && `(${wishlistItems.length})`}
      </h1>

      {wishlistItems.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <>
          {/* <div className="mb-6">
            <WishlistActions
              selectedCount={selectedItems.length}
              totalCount={wishlistItems.length}
              onAddToCart={handleAddSelectedToCart}
              onRemoveSelected={handleRemoveSelected}
            />
          </div> */}

          <div className="mb-4 hidden grid-cols-12 gap-4 rounded-lg bg-muted p-4 sm:grid">
            <div className="col-span-1">
            </div>
            <div className="col-span-6 font-medium">COURSE</div>
            <div className="col-span-2 text-center font-medium">PRICE</div>
            <div className="col-span-3 text-center font-medium">ACTION</div>
          </div>

          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <WishlistItem
                key={item._id}
                item={item}
                onRemove={() => handleRemoveItem(item._id)}
                onMoveToCart={() => handleMoveToCart(item._id)}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Button asChild className="bg-black text-white hover:bg-black/90">
              <Link to="/courses">Explore courses</Link>
            </Button>
          </div>
        </>
      )}
    </div>
    </>
  )
}

