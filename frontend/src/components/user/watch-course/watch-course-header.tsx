import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, SendHorizontal, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CourseHeaderProps {
  title: string;
  sections: number;
  lectures: number;
  duration: string;
  isCompleted: boolean;
}

export function CourseHeader({
  title,
  sections,
  lectures,
  duration,
  isCompleted,
}: CourseHeaderProps) {
  const navigate = useNavigate();
  const handleBackClick = () => navigate(-1);

  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  const handleSubmit = () => {
    console.log("Submit Review", { rating, review });
    // TODO: Send to API
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <Link to="#" className="mt-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleBackClick}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-lg font-medium leading-tight">{title}</h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
            <span>{sections} Sections</span>
            <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground"></span>
            <span>{lectures} lectures</span>
            <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground"></span>
            <span>{duration}</span>
          </div>
        </div>
      </div>

      {isCompleted && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Write A Review</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-2">
              <div>
                <Label className="mb-4">Rating</Label>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 cursor-pointer ${
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
                <Label className="mb-4">Review</Label>
                <Textarea
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
                Submit
                <SendHorizontal size={12} strokeWidth={1}/>
                </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
