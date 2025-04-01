"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface CartSummaryProps {
  subtotal: number
  discount: number
  taxes: number
  total: number
  couponCode: string
  setCouponCode: (code: string) => void
  onApplyCoupon: () => void
  isApplyingCoupon: boolean
  appliedCoupon: string | null
}

export function CartSummary({
  subtotal,
  discount,
  taxes,
  total,
  couponCode,
  setCouponCode,
  onApplyCoupon,
  isApplyingCoupon,
  appliedCoupon,
}: CartSummaryProps) {
  return (
    <div className="rounded-lg border p-6">
      <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${subtotal.toFixed(2)} USD</span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Coupon Discount</span>
            <span className="text-green-600">-${discount.toFixed(2)} USD</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Taxes</span>
          <span>${taxes.toFixed(2)} USD</span>
        </div>

        <Separator />

        <div className="flex items-center justify-between font-medium">
          <span>Total:</span>
          <span className="text-xl">${total.toFixed(2)} USD</span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">Apply coupon code</div>
          <div className="flex gap-2">
            <Input
              placeholder="Coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              disabled={isApplyingCoupon || !!appliedCoupon}
            />
            <Button
              variant="secondary"
              onClick={onApplyCoupon}
              disabled={!couponCode || isApplyingCoupon || !!appliedCoupon}
            >
              {isApplyingCoupon ? "Applying..." : "Apply"}
            </Button>
          </div>
          {appliedCoupon && (
            <div className="text-sm text-green-600">Coupon "{appliedCoupon}" applied successfully!</div>
          )}
        </div>

        <Button className="w-full bg-black text-white hover:bg-black/90">Proceed To Checkout</Button>

        <div className="text-center text-xs text-muted-foreground">
          By completing your purchase you agree to our{" "}
          <a href="#" className="underline hover:text-foreground">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  )
}

