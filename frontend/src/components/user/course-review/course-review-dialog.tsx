import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
  } from "@/components/ui/dialog";
  import { Textarea } from "@/components/ui/textarea";
  import { Button } from "@/components/ui/button";
  import { Label } from "@/components/ui/label";
  import { Star, SendHorizontal } from "lucide-react";
  import { useState, useEffect, useRef } from "react";
  
  type ReviewDialogProps = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    mode?: "create" | "edit";
    initialRating?: number;
    initialReview?: string;
    onSubmit: (rating: number, review: string) => void;
  };
  
  export default function ReviewDialog({
    isOpen,
    onOpenChange,
    mode = "create",
    initialRating = 0,
    initialReview = "",
    onSubmit,
  }: ReviewDialogProps) {
    const [rating, setRating] = useState(initialRating);
    const [review, setReview] = useState(initialReview);
  
    const textareaRef = useRef<HTMLTextAreaElement>(null);
  
    useEffect(() => {
      setRating(initialRating);
      setReview(initialReview);
  
      if (isOpen) {
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
              textareaRef.current.value.length;
          }
        }, 0);
      }
    }, [initialRating, initialReview, isOpen]);
  
    const handleSubmit = () => {
      if (rating === 0 || review.trim() === "") return;
      onSubmit(rating, review);
      onOpenChange(false);
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {mode === "edit" ? "Edit Your Review" : "Write a Review"}
            </DialogTitle>
          </DialogHeader>
  
          <div className="flex flex-col gap-4 py-2 max-w-[400px]">
            <div>
              <Label className="mb-4 block">Rating</Label>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 cursor-pointer transition-colors ${
                      star <= rating
                        ? "fill-yellow-400 stroke-yellow-400"
                        : "stroke-muted"
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
  
            <div>
              <Label className="mb-4 block">Review</Label>
              <Textarea
                ref={textareaRef}
                placeholder="Share your thoughts..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={4}
              />
            </div>
          </div>
  
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit} className="flex items-center gap-2">
              {mode === "edit" ? "Update" : "Submit"}
              <SendHorizontal size={12} strokeWidth={1} />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  