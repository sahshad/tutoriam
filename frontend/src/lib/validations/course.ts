import * as z from "zod"

// Basic Information validation schema
export const basicInformationSchema = z.object({
  title: z
    .string()
    .min(5, "Title should be at least 5 characters long")
    .max(80, "Title must be less than 80 characters"),
  subtitle: z
    .string()
    .min(10, "Subtitle should be at least 10 characters long")
    .max(120, "Subtitle must be less than 120 characters"),
  category: z.string().min(1, "Please select a category"),
  subCategory: z.string().min(1, "Please select a sub-category"),
  topic: z.string().min(5, "Topic should be at least 5 characters long"),
  language: z.string().min(1, "Please select a language"),
  subtitleLanguage: z.string().optional(),
  level: z.string().min(1, "Please select a course level"),
  duration: z.string().min(1, "Please enter course duration"),
  durationUnit: z.enum(["day", "week", "month"], {
    errorMap: () => ({ message: "Please select a duration unit" }),
  }),
})

export type BasicInformationType = z.infer<typeof basicInformationSchema>

// Advance Information validation schema
export const advanceInformationSchema = z.object({
  thumbnail: z.string().min(1, "Please upload a course thumbnail"),
  trailer: z.string().optional(),
  description: z.string().min(50, "Description should be at least 50 characters long"),
  teachItems: z
    .array(
      z.object({
        id: z.number(),
        content: z
          .string()
          .min(5, "Item should be at least 5 characters long")
          .max(120, "Item must be less than 120 characters"),
      }),
    )
    .min(1, "At least one teaching item is required"),
})

export type AdvanceInformationType = z.infer<typeof advanceInformationSchema>

// Curriculum validation schema
export const curriculumSchema = z.object({
  sections: z
    .array(
      z.object({
        id: z.string(),
        name: z.string().min(5, "Section name should be at least 5 characters long"),
        lectures: z
          .array(
            z.object({
              id: z.string(),
              name: z.string().min(5, "Lecture name should be at least 5 characters long"),
              type: z.enum(["video", "file", "text"]),
              content: z.string().optional(),
              duration: z.string().optional(),
              isExpanded: z.boolean().default(false),
            }),
          )
          .min(1, "At least one lecture is required"),
      }),
    )
    .min(1, "At least one section is required"),
})

export type CurriculumType = z.infer<typeof curriculumSchema>

// Publish validation schema
export const publishSchema = z.object({
  welcomeMessage: z.string().min(20, "Welcome message should be at least 20 characters long"),
  congratulationsMessage: z.string().min(20, "Congratulations message should be at least 20 characters long"),
  price: z.string().min(1, "Please enter a price for your course"),
  isPublic: z.boolean().optional(),
})

export type PublishType = z.infer<typeof publishSchema>

// Combined course schema
export const courseSchema = z.object({
  basicInformation: basicInformationSchema,
  advanceInformation: advanceInformationSchema,
  curriculum: curriculumSchema,
  publish: publishSchema,
})

export type CourseType = z.infer<typeof courseSchema>

