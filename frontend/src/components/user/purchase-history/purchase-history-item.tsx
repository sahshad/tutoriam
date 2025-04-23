import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText } from "lucide-react"
import { IOrder } from "@/types/order"

interface PurchaseHistoryItemProps {
  purchase: IOrder
}

export default function PurchaseHistoryItem({ purchase }: PurchaseHistoryItemProps) {
  // Format date to display in a more readable format
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <tr className="bg-white">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{purchase._id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(purchase.createdAt )}</td>
      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{purchase.courseIds.length}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${Number(purchase.totalAmount).toFixed(2)}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          {purchase.status}
        </Badge>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="flex items-center">
            <Download className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Invoice</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center">
            <FileText className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Details</span>
          </Button>
        </div>
      </td>
    </tr>
  )
}
