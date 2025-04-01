import { useState } from "react"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
// import { useToast } from "@/hooks/use-toast"
import { mockCartItems } from "@/lib/mock-data"
import { Link } from "react-router-dom"
import { CartItem } from "@/components/user/cart/CartItem"
import { CartSummary } from "@/components/user/cart/CartSummary"
import Header from "@/components/user/home/Header"

export default function CartPage() {
//   const { toast } = useToast()
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
    // toast({
    //   title: "Item removed",
    //   description: "The course has been removed from your cart.",
    // })
  }

  const handleMoveToWishlist = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
    // toast({
    //   title: "Moved to wishlist",
    //   description: "The course has been moved to your wishlist.",
    // })
  }

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return

    setIsApplyingCoupon(true)

    // Simulate API call
    setTimeout(() => {
      setAppliedCoupon(couponCode)
      setCouponCode("")
      setIsApplyingCoupon(false)
    //   toast({
    //     title: "Coupon applied",
    //     description: `Discount code "${couponCode}" has been applied to your order.`,
    //   })
    }, 1000)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const discount = appliedCoupon ? subtotal * 0.08 : 0 // 8% discount
  const taxes = (subtotal - discount) * 0.29 // 29% tax
  const total = subtotal - discount + taxes

  return (
    <>
    <Header/>
    <div className="container mx-auto px-[4%] py-8">


      <h1 className="mb-8 text-2xl font-bold sm:text-xl">
        Shopping Cart {cartItems.length > 0 && `(${cartItems.length})`}
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
          <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
          <p className="mb-6 text-muted-foreground">Browse our courses and find something you'd like to learn!</p>
          <Button asChild className="bg-black text-white hover:bg-black/90">
            <Link to="/courses">Browse Courses</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-4 hidden grid-cols-12 gap-4 rounded-lg bg-muted p-4 sm:grid">
              <div className="col-span-6 font-medium">COURSE</div>
              <div className="col-span-3 text-center font-">PRICE</div>
              <div className="col-span-3 text-center font-medium">ACTION</div>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={() => handleRemoveItem(item.id)}
                  onMoveToWishlist={() => handleMoveToWishlist(item.id)}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <CartSummary
              subtotal={subtotal}
              discount={discount}
              taxes={taxes}
              total={total}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              onApplyCoupon={handleApplyCoupon}
              isApplyingCoupon={isApplyingCoupon}
              appliedCoupon={appliedCoupon}
            />
          </div>
        </div>
      )}
    </div>
    </>
  )
}

