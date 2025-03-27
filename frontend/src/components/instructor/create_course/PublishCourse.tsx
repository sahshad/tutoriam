"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, X } from "lucide-react"

// Publish validation schema
export const publishSchema = z.object({
  welcomeMessage: z.string().min(20, "Welcome message should be at least 20 characters long"),
  congratulationsMessage: z.string().min(20, "Congratulations message should be at least 20 characters long"),
  price: z.string().min(1, "Please enter a price for your course"),
  isPublic: z.boolean().optional(),
})

export type PublishType = z.infer<typeof publishSchema>

interface PublishCourseFormProps {
  defaultValues?: Partial<PublishType>
  onSubmit: (data: PublishType) => void
  onBack: () => void
}

const PublishCourse = ({ defaultValues, onSubmit, onBack }: PublishCourseFormProps) => {
  const [instructors, setInstructors] = useState([
    { id: 1, username: "Username", role: "UI/UX Designer", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, username: "Username", role: "UI/UX Designer", avatar: "/placeholder.svg?height=40&width=40" },
  ])

  const form = useForm<PublishType>({
    resolver: zodResolver(publishSchema),
    defaultValues: defaultValues || {
      welcomeMessage: "",
      congratulationsMessage: "",
      price: "",
      isPublic: false,
    },
  })

  const removeInstructor = (id: number) => {
    setInstructors(instructors.filter((instructor) => instructor.id !== id))
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <h3 className="text-lg font-medium mb-4">Message</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <FormField
                control={form.control}
                name="welcomeMessage"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Welcome Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter course starting message here..."
                        className="min-h-[150px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="congratulationsMessage"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Congratulations Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your course completed message here..."
                        className="min-h-[150px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Add Instructor ({instructors.length})</h3>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by username" className="pl-9" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {instructors.map((instructor) => (
                  <div key={instructor.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-md relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={instructor.avatar} alt={instructor.username} />
                      <AvatarFallback>{instructor.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{instructor.username}</p>
                      <p className="text-xs text-muted-foreground">{instructor.role}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 absolute top-1 right-1 text-muted-foreground hover:text-foreground"
                      onClick={() => removeInstructor(instructor.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 mt-8">
              <h3 className="text-lg font-medium">Course Price</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter course price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isPublic"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Course Status</FormLabel>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isPublic"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                        <label htmlFor="isPublic" className="text-sm text-gray-700">
                          Make this course public
                        </label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button type="button" variant="outline" onClick={onBack}>
                Prev Step
              </Button>
              <Button type="submit">Submit For Review</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default PublishCourse