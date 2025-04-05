import { useState } from "react"
import { Play } from "lucide-react"

interface CoursePreviewProps {
  thumbnailUrl: string
}

export default function CoursePreview({ thumbnailUrl }: CoursePreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayClick = () => {
    setIsPlaying(true)
    // In a real implementation, this would trigger video playback
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
      {!isPlaying ? (
        <>
          <img src={thumbnailUrl || "/placeholder.svg"} alt="Course preview" className="object-cover"  />
          <button
            onClick={handlePlayClick}
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black transition-transform hover:scale-110"
            aria-label="Play video"
          >
            <Play className="h-8 w-8 fill-current" />
          </button>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-black">
          <p className="text-white">Video would play here</p>
          {/* In a real implementation, this would be replaced with an actual video player */}
        </div>
      )}
    </div>
  )
}

