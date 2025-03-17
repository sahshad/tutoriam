"use client"

import type React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Upload, CheckCircle2, AlertCircle } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Define Zod schemas for each step
const personalInfoSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }).optional(),
  location: z.string().min(1, { message: "Please select your country" }),
})

const expertiseSchema = z.object({
  subjects: z.string().min(5, { message: "Please describe the subjects you want to teach" }),
  levels: z.array(z.string()).min(1, { message: "Please select at least one teaching level" }),
  hasCertification: z.enum(["yes", "no"]),
})

const experienceSchema = z.object({
  education: z.string().min(10, { message: "Please provide details about your educational background" }),
  experience: z.string().min(10, { message: "Please describe your teaching experience" }),
  // In a real app, you'd handle file uploads differently
  hasUploadedCV: z.boolean().optional(),
})

const reviewSchema = z.object({
  motivation: z.string().min(20, { message: "Please tell us why you want to become a tutor" }),
  referralSource: z.string().min(1, { message: "Please tell us how you heard about us" }),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
})

// Combine all schemas for the complete form
const formSchema = z.object({
  personalInfo: personalInfoSchema,
  expertise: expertiseSchema,
  experience: experienceSchema,
  review: reviewSchema,
})

// Define the form data type
type FormData = z.infer<typeof formSchema>

const TutorApplicationForm: React.FC = () => {
  const [formStep, setFormStep] = useState(0)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState(false)

  // Initialize forms for each step
  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
    },
  })

  const expertiseForm = useForm<z.infer<typeof expertiseSchema>>({
    resolver: zodResolver(expertiseSchema),
    defaultValues: {
      subjects: "",
      levels: [],
      hasCertification: "no",
    },
  })

  const experienceForm = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      education: "",
      experience: "",
      hasUploadedCV: false,
    },
  })

  const reviewForm = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      motivation: "",
      referralSource: "",
    //   termsAccepted: false,
    },
  })

  // Get the current form based on the step
  const getCurrentForm = () => {
    switch (formStep) {
      case 0:
        return personalInfoForm
      case 1:
        return expertiseForm
      case 2:
        return experienceForm
      case 3:
        return reviewForm
      default:
        return personalInfoForm
    }
  }

  const nextStep = async () => {
    const currentForm = getCurrentForm()
    const isValid = await currentForm.trigger()

    if (isValid) {
      setFormStep((prev) => Math.min(prev + 1, 3))
    }
  }

  const prevStep = () => {
    setFormStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate the current form
    const isValid = await reviewForm.trigger()

    if (!isValid) {
      return
    }

    // Combine all form data
    const formData: FormData = {
      personalInfo: personalInfoForm.getValues(),
      expertise: expertiseForm.getValues(),
      experience: experienceForm.getValues(),
      review: reviewForm.getValues(),
    }

    // Simulate form submission
    try {
      // In a real app, you would send this data to your API
      console.log("Form data submitted:", formData)

      // Simulate success/failure for demo purposes
      const success = Math.random() > 0.2 // 80% success rate

      if (success) {
        setFormSubmitted(true)
        setFormError(false)
      } else {
        throw new Error("Simulated form submission error")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setFormError(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Become a Tutor</h2>
            <p className="mt-4 text-lg text-gray-600">
              Join our community of educators and share your knowledge with students around the world.
            </p>
          </div>

          {formSubmitted ? (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                </div>
                <CardTitle className="text-center text-2xl text-green-800">Application Submitted!</CardTitle>
                <CardDescription className="text-center text-green-700">
                  Thank you for applying to become a tutor. We've received your application and will review it shortly.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center text-green-700">
                <p>You'll receive an email confirmation with next steps within 48 hours.</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  className="bg-[#FF6636] hover:bg-[#e55a2f] text-white"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Return to Home
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Tutor Application Form</CardTitle>
                <CardDescription>Please fill out the form below to apply as a tutor on Eduguard.</CardDescription>
              </CardHeader>
              <CardContent>
                {formError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-800">There was a problem with your submission</h4>
                      <p className="text-red-700 text-sm">Please check your information and try again.</p>
                    </div>
                  </div>
                )}

                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    {[0, 1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`flex-1 h-2 mx-1 rounded-full ${formStep >= step ? "bg-[#FF6636]" : "bg-gray-200"}`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Personal Info</span>
                    <span>Expertise</span>
                    <span>Experience</span>
                    <span>Review</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {formStep === 0 && (
                    <Form {...personalInfoForm}>
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Personal Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={personalInfoForm.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={personalInfoForm.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={personalInfoForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john.doe@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={personalInfoForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                              </FormControl>
                              <FormDescription>Optional, but recommended for account verification</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={personalInfoForm.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your country" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="us">United States</SelectItem>
                                  <SelectItem value="ca">Canada</SelectItem>
                                  <SelectItem value="uk">United Kingdom</SelectItem>
                                  <SelectItem value="au">Australia</SelectItem>
                                  <SelectItem value="in">India</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </Form>
                  )}

                  {formStep === 1 && (
                    <Form {...expertiseForm}>
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Your Expertise</h3>

                        <FormField
                          control={expertiseForm.control}
                          name="subjects"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>What subjects do you want to teach?</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="E.g., Mathematics, Computer Science, English Literature"
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={expertiseForm.control}
                          name="levels"
                          render={() => (
                            <FormItem>
                              <div className="mb-2">
                                <FormLabel>What level(s) do you want to teach?</FormLabel>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                {[
                                  { id: "elementary", label: "Elementary" },
                                  { id: "middle", label: "Middle School" },
                                  { id: "high", label: "High School" },
                                  { id: "college", label: "College" },
                                  { id: "adult", label: "Adult Education" },
                                  { id: "professional", label: "Professional" },
                                ].map((level) => (
                                  <FormField
                                    key={level.id}
                                    control={expertiseForm.control}
                                    name="levels"
                                    render={({ field }) => {
                                      return (
                                        <FormItem key={level.id} className="flex flex-row items-start space-x-2">
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(level.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, level.id])
                                                  : field.onChange(field.value?.filter((value) => value !== level.id))
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal">{level.label}</FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={expertiseForm.control}
                          name="hasCertification"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Do you have any teaching certifications?</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                      <RadioGroupItem value="yes" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Yes</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                      <RadioGroupItem value="no" />
                                    </FormControl>
                                    <FormLabel className="font-normal">No</FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </Form>
                  )}

                  {formStep === 2 && (
                    <Form {...experienceForm}>
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Experience & Qualifications</h3>

                        <FormField
                          control={experienceForm.control}
                          name="education"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Educational Background</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Describe your educational background, degrees, institutions, etc."
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={experienceForm.control}
                          name="experience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Teaching Experience</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Describe your teaching experience, including years, institutions, and roles."
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={experienceForm.control}
                          name="hasUploadedCV"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Upload your CV/Resume</FormLabel>
                              <FormControl>
                                <div
                                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                                    field.value
                                      ? "border-green-300 bg-green-50"
                                      : "border-gray-300 hover:border-gray-400"
                                  }`}
                                  onClick={() => field.onChange(true)}
                                >
                                  {field.value ? (
                                    <>
                                      <CheckCircle2 className="h-8 w-8 mx-auto text-green-500 mb-2" />
                                      <p className="text-sm text-green-600">CV uploaded successfully</p>
                                    </>
                                  ) : (
                                    <>
                                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                                      <p className="text-sm text-gray-500">
                                        Drag and drop your CV here, or <span className="text-[#FF6636]">browse</span>
                                      </p>
                                      <p className="text-xs text-gray-400 mt-1">
                                        Supported formats: PDF, DOCX, DOC (Max 5MB)
                                      </p>
                                    </>
                                  )}
                                </div>
                              </FormControl>
                              <FormDescription>Your CV helps us understand your qualifications better</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </Form>
                  )}

                  {formStep === 3 && (
                    <Form {...reviewForm}>
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Review & Submit</h3>

                        <FormField
                          control={reviewForm.control}
                          name="motivation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Why do you want to become a tutor?</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us why you're passionate about teaching and what you hope to achieve as a tutor."
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={reviewForm.control}
                          name="referralSource"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>How did you hear about us?</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select an option" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="search">Search Engine</SelectItem>
                                  <SelectItem value="social">Social Media</SelectItem>
                                  <SelectItem value="friend">Friend/Colleague</SelectItem>
                                  <SelectItem value="ad">Advertisement</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={reviewForm.control}
                          name="termsAccepted"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-2 pt-2">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="font-normal text-sm">
                                  I agree to the <span className="text-[#FF6636] cursor-pointer">Terms of Service</span>{" "}
                                  and <span className="text-[#FF6636] cursor-pointer">Privacy Policy</span>
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </Form>
                  )}
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                {formStep > 0 && (
                  <Button variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                {formStep === 0 && <div />}

                {formStep < 3 ? (
                  <Button className="bg-[#FF6636] hover:bg-[#e55a2f] text-white" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button className="bg-[#FF6636] hover:bg-[#e55a2f] text-white" onClick={handleSubmit}>
                    Submit Application
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default TutorApplicationForm