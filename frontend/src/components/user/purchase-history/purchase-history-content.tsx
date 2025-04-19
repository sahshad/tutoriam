import { useEffect, useState } from "react"
// import PurchaseHistoryHeader from "@/components/purchase-history/purchase-history-header"
// import PurchaseGroup from "@/components/purchase-history/purchase-group"
import type { IOrder } from "@/types/order"
import PurchaseHistoryHeader from "./purchase-history-header"
import PurchaseGroup from "./purchase-group"
import { fetchUserOrders } from "@/services/orderService"

export default function PurchaseHistoryContent() {
  const [orders, setOrders] = useState<IOrder[]>([])
//   (
    // [
//     {
//       id: "purchase-1",
//       date: "1st September, 2021 at 11:30 PM",
//       totalAmount: 75.0,
//       currency: "USD",
//       paymentMethod: "Credit Card",
//       cardNumber: "4142 **** **** ****",
//       cardExpiry: "04/24",
//       courseCount: 3,
//       courses: [
//         {
//           id: 1,
//           title: "Learn Ethical Hacking From Scratch",
//           image: "/placeholder.svg?height=80&width=120",
//           rating: 4.7,
//           reviews: 451444,
//           instructor: "Marvin McKinney",
//           price: 13.99,
//         },
//         {
//           id: 2,
//           title: "Mega Digital Marketing Course A-Z: 12 Courses in 1 + Updates",
//           image: "/placeholder.svg?height=80&width=120",
//           rating: 4.7,
//           reviews: 451444,
//           instructor: "Esther Howard",
//           price: 49.0,
//         },
//         {
//           id: 3,
//           title: "Complete Adobe Lightroom Megacourse: Beginner to Expert",
//           image: "/placeholder.svg?height=80&width=120",
//           rating: 4.8,
//           reviews: 325789,
//           instructor: "Kevin Gilbert",
//           price: 12.01,
//         },
//       ],
//     },
//     {
//       id: "purchase-2",
//       date: "31st August, 2021 at 11:30 PM",
//       totalAmount: 507.0,
//       currency: "USD",
//       paymentMethod: "Credit Card",
//       cardNumber: "4142 **** **** ****",
//       cardExpiry: "04/24",
//       courseCount: 52,
//       courses: [
//         {
//           id: 4,
//           title: "Machine Learning A-Z™: Hands-On Python & R In Data Science",
//           image: "/placeholder.svg?height=80&width=120",
//           rating: 4.9,
//           reviews: 587412,
//           instructor: "John Wick",
//           price: 19.99,
//         },
//         {
//           id: 5,
//           title: "The Complete 2023 Web Development Bootcamp",
//           image: "/placeholder.svg?height=80&width=120",
//           rating: 4.8,
//           reviews: 412365,
//           instructor: "Harry Potter",
//           price: 15.99,
//         },
//         // Other courses not shown for brevity
//       ],
//     },
//     {
//       id: "purchase-3",
//       date: "15th August, 2021 at 09:45 AM",
//       totalAmount: 125.5,
//       currency: "USD",
//       paymentMethod: "Credit Card",
//       cardNumber: "4142 **** **** ****",
//       cardExpiry: "04/24",
//       courseCount: 5,
//       courses: [
//         {
//           id: 6,
//           title: "Angular - The Complete Guide (2023 Edition)",
//           image: "/placeholder.svg?height=80&width=120",
//           rating: 4.6,
//           reviews: 321456,
//           instructor: "Kevin Gilbert",
//           price: 24.99,
//         },
//         {
//           id: 7,
//           title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
//           image: "/placeholder.svg?height=80&width=120",
//           rating: 4.7,
//           reviews: 412365,
//           instructor: "John Doe",
//           price: 19.99,
//         },
//         // Other courses not shown for brevity
//       ],
//     },
//   ])

  const getOrders = async () => {
    try {
        const data = await fetchUserOrders()
        console.log(data)
        setOrders(data.orders)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(()=> {
    getOrders()
  }, [])

  return (
    <div className="p-6">
      <PurchaseHistoryHeader />
      <div className="mt-6 space-y-4">
        {orders.map((group) => (
          <PurchaseGroup key={group._id} purchaseGroup={group} />
        ))}
      </div>
    </div>
  )
}
