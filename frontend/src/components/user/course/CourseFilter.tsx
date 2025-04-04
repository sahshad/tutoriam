import type React from "react"
import { useState } from "react"
import type { ChevronDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function CourseFilters() {
  const [priceRange, setPriceRange] = useState([0, 200])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-lg font-semibold uppercase">Category</h2>
        <Accordion type="multiple" defaultValue={[""]}>
          <CategoryAccordionItem
            value="development"
            title="Development"
            items={[
              { id: "web-dev", label: "Web development", count: 574 },
              { id: "data-science", label: "Data Science", count: 365 },
              { id: "mobile-dev", label: "Mobile Development", count: 1345,},
              { id: "software-testing", label: "Software Testing", count: 317 },
              { id: "software-engineering", label: "Software Engineering", count: 31 },
              { id: "dev-tools", label: "Software Development Tools", count: 556 },
              { id: "no-code", label: "No-Code Development", count: 21 },
            ]}
          />
          <CategoryAccordionItem
            value="business"
            title="Business"
            items={[
              { id: "entrepreneurship", label: "Entrepreneurship", count: 425 },
              { id: "management", label: "Management", count: 312 },
              { id: "sales", label: "Sales", count: 287 },
            ]}
          />
          <CategoryAccordionItem
            value="finance"
            title="Finance & Accounting"
            items={[
              { id: "accounting", label: "Accounting", count: 245 },
              { id: "crypto", label: "Cryptocurrency", count: 157 },
              { id: "investing", label: "Investing", count: 321 },
            ]}
          />
          <CategoryAccordionItem
            value="it-software"
            title="IT & Software"
            items={[
              { id: "it-cert", label: "IT Certifications", count: 312 },
              { id: "network-security", label: "Network & Security", count: 198 },
              { id: "operating-systems", label: "Operating Systems", count: 156 },
            ]}
          />
          <CategoryAccordionItem
            value="office"
            title="Office Productivity"
            items={[
              { id: "microsoft", label: "Microsoft", count: 354 },
              { id: "apple", label: "Apple", count: 127 },
              { id: "google", label: "Google", count: 198 },
            ]}
          />
          <CategoryAccordionItem
            value="personal"
            title="Personal Development"
            items={[
              { id: "leadership", label: "Leadership", count: 298 },
              { id: "career-dev", label: "Career Development", count: 312 },
              { id: "creativity", label: "Creativity", count: 156 },
            ]}
          />
          <CategoryAccordionItem
            value="design"
            title="Design"
            items={[
              { id: "web-design", label: "Web Design", count: 312 },
              { id: "graphic-design", label: "Graphic Design", count: 287 },
              { id: "ui-ux", label: "UI/UX Design", count: 198 },
            ]}
          />
          <CategoryAccordionItem
            value="marketing"
            title="Marketing"
            items={[
              { id: "digital-marketing", label: "Digital Marketing", count: 354 },
              { id: "seo", label: "SEO", count: 198 },
              { id: "social-media", label: "Social Media Marketing", count: 287 },
            ]}
          />
          <CategoryAccordionItem
            value="lifestyle"
            title="Lifestyle"
            items={[
              { id: "arts-crafts", label: "Arts & Crafts", count: 156 },
              { id: "food-beverage", label: "Food & Beverage", count: 127 },
              { id: "travel", label: "Travel", count: 98 },
            ]}
          />
          <CategoryAccordionItem
            value="photography"
            title="Photography & Video"
            items={[
              { id: "digital-photo", label: "Digital Photography", count: 198 },
              { id: "video-production", label: "Video Production", count: 156 },
              { id: "photo-tools", label: "Photography Tools", count: 127 },
            ]}
          />
          <CategoryAccordionItem
            value="music"
            title="Music"
            items={[
              { id: "instruments", label: "Instruments", count: 156 },
              { id: "production", label: "Music Production", count: 127 },
              { id: "theory", label: "Music Theory", count: 98 },
            ]}
          />
          <CategoryAccordionItem
            value="health"
            title="Health & Fitness"
            items={[
              { id: "fitness", label: "Fitness", count: 198 },
              { id: "nutrition", label: "Nutrition", count: 156 },
              { id: "yoga", label: "Yoga", count: 127 },
            ]}
          />
        </Accordion>
      </div>

      {/* <div>
        <h2 className="mb-4 text-lg font-semibold uppercase">Rating</h2>
        <Accordion type="multiple" defaultValue={["rating"]}>
          <AccordionItem value="rating">
            <AccordionTrigger className="py-2">Rating</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox id={`rating-${rating}`} />
                    <label
                      htmlFor={`rating-${rating}`}
                      className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <div className="flex items-center">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : i < rating
                                    ? "fill-yellow-400 text-yellow-400 opacity-50"
                                    : "text-gray-300"
                              }`}
                            />
                          ))}
                        <span className="ml-2">{rating} & up</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div> */}

      <div>
        <h2 className="mb-4 text-lg font-semibold uppercase">Course Level</h2>
        <Accordion type="multiple" defaultValue={["level"]}>
          <AccordionItem value="level">
            <AccordionTrigger className="py-2">Level</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {["All Levels", "Beginner", "Intermediate", "Advanced"].map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox id={`level-${level}`} />
                    <label
                      htmlFor={`level-${level}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {level}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold uppercase">Price</h2>
        <Accordion type="multiple" defaultValue={["price"]}>
          <AccordionItem value="price">
            <AccordionTrigger className="py-2">Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-6 px-1 pt-2">
                <Slider defaultValue={[0, 200]} max={200} step={1} value={priceRange} onValueChange={setPriceRange} />
                <div className="flex items-center justify-between">
                  <span className="text-sm">${priceRange[0]}</span>
                  <span className="text-sm">${priceRange[1]}</span>
                </div>
                <div className="space-y-2">
                  {["Free", "Paid", "Subscription"].map((price) => (
                    <div key={price} className="flex items-center space-x-2">
                      <Checkbox id={`price-${price}`} />
                      <label
                        htmlFor={`price-${price}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {price}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold uppercase">Duration</h2>
        <Accordion type="multiple" defaultValue={["duration"]}>
          <AccordionItem value="duration">
            <AccordionTrigger className="py-2">Duration</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {["0-2 Hours", "3-6 Hours", "7-16 Hours", "17+ Hours"].map((duration) => (
                  <div key={duration} className="flex items-center space-x-2">
                    <Checkbox id={`duration-${duration}`} />
                    <label
                      htmlFor={`duration-${duration}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {duration}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

interface CategoryAccordionItemProps {
  value: string
  title: string
  items: {
    id: string
    label: string
    count: number
    checked?: boolean
  }[]
}

function CategoryAccordionItem({ value, title, items }: CategoryAccordionItemProps) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="py-2">{title}</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id={item.id} defaultChecked={item.checked} />
                <label
                  htmlFor={item.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item.label}
                </label>
              </div>
              <span className="text-xs text-muted-foreground">{item.count}</span>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

function Star(props: React.ComponentProps<typeof ChevronDown>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

