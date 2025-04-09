import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Category } from "@/types/category"


interface DeleteCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDelete: () => void
  category: Category
}

export function DeleteCategoryDialog({ open, onOpenChange, onDelete, category }: DeleteCategoryDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the category "{category.name}" and cannot be undone.
            {category.courses > 0 && (
              <span className="mt-2 block font-semibold text-destructive">
                Warning: This category contains {category.courses} courses. Deleting it may affect these courses.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

