// components/admin/category/columns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils/formatDate"
import { Category } from "@/types/category"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Eye, EyeOff } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const categoryColumns = (
  handleEdit: (category: Category) => void,
  handleToggleVisibility: (category: Category) => void
): ColumnDef<Category>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "subcategories",
    header: "Subcategories",
    cell: ({ row }) => {
      const subcategories = row.original.subcategories
      return (
        <div className="flex flex-wrap gap-1">
          {subcategories.map((sub) => (
            <Badge key={sub._id} variant="outline">
              {sub.name}
            </Badge>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: "courses",
    header: "Courses",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      return <Badge variant={status ? "default" : "secondary"}>{status ? "Listed" : "Unlisted"}</Badge>
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: ({ row }) => formatDate(row.original.updatedAt, "dd/MM/yyyy", true),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleEdit(category)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleToggleVisibility(category)}>
              {category.status ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Unlist
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  List
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
