import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { use, useEffect, useState } from "react"

interface CourseFiltersProps {
  sortBy: string
  setSortBy: (value: string) => void
  category: string
  setCategory: (value: string) => void
  rating: string
  setRating: (value: string) => void
  searchQuery: string
  setSearchQuery: (value: string) => void
  subCategory: string
  setSubCategory: (value: string) => void
}

export function CourseFilters({
  sortBy,
  setSortBy,
  category,
  setCategory,
  // rating,
  // setRating,
  subCategory,
  setSubCategory,
  searchQuery,
  setSearchQuery,
}: CourseFiltersProps) {
  const [search, setSearch] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(search)
    }, 500) 

    return () => clearTimeout(timer)
  },[search])
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div>
        <p className="text-sm mb-2">Search</p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search in your courses..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div>
        <p className="text-sm mb-2">Sort by</p>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Latest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <p className="text-sm mb-2">Category</p>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="All Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Category</SelectItem>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <p className="text-sm mb-2">Sub Category</p>
        <Select value={subCategory} onValueChange={setSubCategory}>
          <SelectTrigger>
            <SelectValue placeholder="All Sub Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sub Category</SelectItem>
            <SelectItem value="web">web</SelectItem>
            <SelectItem value="mobile">mobile</SelectItem>
            <SelectItem value="gaming">gaming</SelectItem>
            <SelectItem value="database design">database design</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* <div>
        <p className="text-sm mb-2">Rating</p>
        <Select value={rating} onValueChange={setRating}>
          <SelectTrigger>
            <SelectValue placeholder="4 Star & Up" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4">4 Star & Up</SelectItem>
            <SelectItem value="3">3 Star & Up</SelectItem>
            <SelectItem value="2">2 Star & Up</SelectItem>
            <SelectItem value="1">1 Star & Up</SelectItem>
          </SelectContent>
        </Select>
      </div> */}
    </div>
  )
}

