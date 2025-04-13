import { Button } from "@/components/ui/button"
import { Pause, SkipBack, SkipForward, Volume2, Settings, Maximize } from "lucide-react"


export function VideoPlayer() {
  return (
    <div className="relative aspect-video rounded-md overflow-hidden mt-6">
      <img src="/placeholder.svg?height=540&width=960" alt="Course video" className="w-full h-full object-cover" />

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t p-4">
        <div className="flex flex-col gap-2">
          <div className="w-full rounded-full h-1 overflow-hidden">
            <div className=" h-full" style={{ width: "15%" }}></div>
          </div>    

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 ">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 ">
                <Pause className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 ">
                <SkipForward className="h-4 w-4" />
              </Button>
              <span className="text-xs ">1:25 / 9:15</span>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 ">
                <Volume2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 ">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 ">
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


