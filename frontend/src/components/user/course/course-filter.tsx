import type React from "react";
import type { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import { fetchListedCategories } from "@/services/categoryService";

interface CourseFiltersProps {
  userCatagories: string[];
  setUserCatagories: (catagories: string[]) => void;
  userSubCatagories: string[];
  setUserSubCatagories: (subCatagories: string[]) => void;
  rating: string;
  setRating: (rating: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  level: string[];
  setLevel: (level: string[]) => void;
  duration: string[];
  setDuration: (duration: string[]) => void;
}

export function CourseFilters(
  {
    userCatagories,
    setUserCatagories,
    userSubCatagories,
    setUserSubCatagories,
    rating,
    setRating,
    priceRange,
    setPriceRange,
    level: selectedLevels,
    setLevel: setSelectedLevels,
    duration: selectedDurations,
    setDuration: setSelectedDurations,
  }: CourseFiltersProps
) {


  const handleSubCategoryChange = (id: string) => {
    const updatedSubCategories = userSubCatagories.includes(id)
        ? userSubCatagories.filter((sub) => sub !== id)
        : [...userSubCatagories, id];
    
      setUserSubCatagories(updatedSubCategories);
      console.log(updatedSubCategories);
  };

  const handlePriceTypeChange = (value: string) => {
    // setPriceTypes((prev) =>
    //   prev.includes(value) ? prev.filter((type) => type !== value) : [...prev, value]
    // );
    // const updatedPriceTypes = priceRange.includes(+value)
    //   ? priceRange.filter((type) => +type !== +value) 
    //   : [...priceRange, +value];

    // setPriceRange(updatedPriceTypes);
  };

  const handleLevelChange = (level: string) => {
    // setSelectedLevels((prev) =>
    //   prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    // );
  };

  const handleDurationChange = (duration: string) => {
    // setSelectedDurations((prev) =>
    //   prev.includes(duration) ? prev.filter((d) => d !== duration) : [...prev, duration]
    // );
  };

   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [subCategories, setSubCategories] = useState<any[]>([]); 
    const [categories, setCategories]= useState<Category[] >([])
  
    useEffect(()=> {
      const fetchCategories = async () => {
        try {
          const {categories} = await fetchListedCategories()
          setCategories(categories)
          console.log(categories)
        } catch (error) {
          console.log(error)
        }
      }
      fetchCategories()
    },[])
  
    useEffect(() => {
      if (selectedCategory) {
        const category = categories.find(cat => cat._id === selectedCategory);
        if (category) {
          setSubCategories(category.subcategories); 
        }
      }
    }, [selectedCategory, categories]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-lg font-semibold uppercase">Category</h2>
        <Accordion type="multiple" defaultValue={[""]}>
          {
            categories.map(category => (
              <CategoryAccordionItem
              key={category._id}
              value={category._id}
              title={category.name}
              items={
                category.subcategories.map(subCat => (
                  { id: subCat._id, label: subCat.name, count: 574 }
                ))
              }
              selectedSubCategories={userSubCatagories}
              onSubCategoryChange={handleSubCategoryChange}
            />
            ))
          }
        </Accordion>
      </div>

      {/* <div>
        <h2 className="mb-4 text-lg font-semibold uppercase">Course Level</h2>
        <Accordion type="multiple" defaultValue={["level"]}>
          <AccordionItem value="level">
            <AccordionTrigger className="py-2">Level</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {["All Levels", "Beginner", "Intermediate", "Advanced"].map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox
                      id={`level-${level}`}
                      checked={selectedLevels.includes(level)}
                      onCheckedChange={() => handleLevelChange(level)}
                    />
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
      </div> */}

      {/* <div>
        <h2 className="mb-4 text-lg font-semibold uppercase">Price</h2>
        <Accordion type="multiple" defaultValue={["price"]}>
          <AccordionItem value="price">
            <AccordionTrigger className="py-2">Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-6 px-1 pt-2">
                <Slider
                  defaultValue={[0, 200]}
                  max={200}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm">${priceRange[0]}</span>
                  <span className="text-sm">${priceRange[1]}</span>
                </div>
                <div className="space-y-2">
                  {["Free", "Paid"].map((price) => (
                    <div key={price} className="flex items-center space-x-2">
                      <Checkbox
                        id={`price-${price}`}
                        checked={price.includes(price)}
                        onCheckedChange={() => handlePriceTypeChange(price)}
                      />
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
                    <Checkbox
                      id={`duration-${duration}`}
                      checked={selectedDurations.includes(duration)}
                      onCheckedChange={() => handleDurationChange(duration)}
                    />
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
      </div> */}
    </div>
  );
}

interface CategoryAccordionItemProps {
  value: string;
  title: string;
  items: {
    id: string;
    label: string;
    count: number;
    checked?: boolean;
  }[];
  selectedSubCategories: string[];
  onSubCategoryChange: (id: string) => void;
}

function CategoryAccordionItem({
  value,
  title,
  items,
  selectedSubCategories,
  onSubCategoryChange,
}: CategoryAccordionItemProps) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="py-2">{title}</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={item.id}
                  checked={selectedSubCategories.includes(item.id)}
                  onCheckedChange={() => onSubCategoryChange(item.id)}
                />
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
  );
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
  );
}