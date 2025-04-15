import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  
  export interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    type?: "delete" | "info" | "warning";
  }
  
  export function ConfirmationDialog({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Deletion",
    description = "Are you sure you want to delete this item? This action cannot be undone.",
    type = "delete",
  }: ConfirmationDialogProps) {
    const confirmButtonVariant =
      type === "delete" ? "destructive" : type === "warning" ? "default" : "outline";
  
    const confirmButtonText =
      type === "delete" ? "Delete" : type === "warning" ? "Continue" : "OK";
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant={confirmButtonVariant} onClick={() => {onConfirm(); onClose();}}>
              {confirmButtonText}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  
