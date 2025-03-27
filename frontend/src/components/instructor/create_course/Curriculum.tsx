"use client"

import type React from "react"

import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
// import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, Plus, Edit, Trash2, ChevronDown, ChevronUp, Video, FileText, Type, X } from "lucide-react"

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
  
  interface CurriculumFormProps {
    defaultValues?: Partial<CurriculumType>
    onSubmit: (data: CurriculumType) => void
    onBack: () => void
  }
  
  const Curriculum = ({ defaultValues, onSubmit, onBack }: CurriculumFormProps) => {
    const [filePreviews, setFilePreviews] = useState<Record<string, string>>({})
    const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})
  
    const form = useForm<CurriculumType>({
      resolver: zodResolver(curriculumSchema),
      defaultValues: defaultValues || {
        sections: [
          {
            id: `section-${Math.random()}`,
            name: "Section name",
            lectures: [
              {
                id: `lecture-${Math.random()}`,
                name: "Lecture name",
                type: "video",
                content: "",
                isExpanded: false,
              },
              {
                id: `lecture-${Math.random()}`,
                name: "Lecture name",
                type: "video",
                content: "",
                isExpanded: false,
              },
            ],
          },
        ],
      },
    })
  
    const { sections } = form.watch()
  
    // Section handlers
    const addSection = () => {
      const newSection = {
        id: `section-${Math.random()}`,
        name: "Section name",
        lectures: [],
      }
  
      const updatedSections = [...(sections || []), newSection]
      form.setValue("sections", updatedSections, { shouldValidate: true })
    }
  
    const updateSectionName = (sectionId: string, name: string) => {
      const updatedSections = (sections || []).map((section) => {
        if (section.id === sectionId) {
          return { ...section, name }
        }
        return section
      })
  
      form.setValue("sections", updatedSections, { shouldValidate: true })
    }
  
    const deleteSection = (sectionId: string) => {
      const updatedSections = (sections || []).filter((section) => section.id !== sectionId)
      form.setValue("sections", updatedSections, { shouldValidate: true })
    }
  
    // Lecture handlers
    const addLecture = (sectionId: string) => {
      const updatedSections = (sections || []).map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            lectures: [
              ...(section.lectures || []),
              {
                id: `lecture-${Math.random()}`,
                name: "Lecture name",
                type: "video" as "video" | "file" | "text",
                content: "",
                isExpanded: false,
              },
            ],
          }
        }
        return section
      })
  
      form.setValue("sections", updatedSections, { shouldValidate: true })
    }
  
    const updateLectureName = (sectionId: string, lectureId: string, name: string) => {
      const updatedSections = (sections || []).map((section) => {
        if (section.id === sectionId) {
          const updatedLectures = section.lectures?.map((lecture) => {
            if (lecture.id === lectureId) {
              return { ...lecture, name }
            }
            return lecture
          })
  
          return { ...section, lectures: updatedLectures }
        }
        return section
      })
  
      form.setValue("sections", updatedSections, { shouldValidate: true })
    }
  
    const toggleLectureExpanded = (sectionId: string, lectureId: string) => {
      const updatedSections = (sections || []).map((section) => {
        if (section.id === sectionId) {
          const updatedLectures = section.lectures?.map((lecture) => {
            if (lecture.id === lectureId) {
              return { ...lecture, isExpanded: !lecture.isExpanded }
            }
            return lecture
          })
  
          return { ...section, lectures: updatedLectures }
        }
        return section
      })
  
      form.setValue("sections", updatedSections)
    }
  
    const updateLectureType = (sectionId: string, lectureId: string, type: "video" | "file" | "text") => {
      const updatedSections = (sections || []).map((section) => {
        if (section.id === sectionId) {
          const updatedLectures = section.lectures?.map((lecture) => {
            if (lecture.id === lectureId) {
              return { ...lecture, type }
            }
            return lecture
          })
  
          return { ...section, lectures: updatedLectures }
        }
        return section
      })
  
      form.setValue("sections", updatedSections, { shouldValidate: true })
    }
  
    const updateLectureContent = (sectionId: string, lectureId: string, content: string) => {
      const updatedSections = (sections || []).map((section) => {
        if (section.id === sectionId) {
          const updatedLectures = section.lectures?.map((lecture) => {
            if (lecture.id === lectureId) {
              return { ...lecture, content }
            }
            return lecture
          })
  
          return { ...section, lectures: updatedLectures }
        }
        return section
      })
  
      form.setValue("sections", updatedSections, { shouldValidate: true })
    }
  
    const handleFileUpload = (sectionId: string, lectureId: string, e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        // Update lecture content with file name
        updateLectureContent(sectionId, lectureId, file.name)
  
        // Create preview URL for video files
        if (file.type.startsWith("video/")) {
          const url = URL.createObjectURL(file)
          setFilePreviews((prev) => ({
            ...prev,
            [`${sectionId}-${lectureId}`]: url,
          }))
        }
      }
    }
  
    const removeFile = (sectionId: string, lectureId: string) => {
      // Clear content
      updateLectureContent(sectionId, lectureId, "")
  
      // Clear preview
      setFilePreviews((prev) => {
        const newPreviews = { ...prev }
        delete newPreviews[`${sectionId}-${lectureId}`]
        return newPreviews
      })
  
      // Clear file input
      const inputRef = fileInputRefs.current[`${sectionId}-${lectureId}`]
      if (inputRef) {
        inputRef.value = ""
      }
    }
  
    const deleteLecture = (sectionId: string, lectureId: string) => {
      const updatedSections = (sections || []).map((section) => {
        if (section.id === sectionId) {
          const updatedLectures = section.lectures?.filter((lecture) => lecture.id !== lectureId)
          return { ...section, lectures: updatedLectures }
        }
        return section
      })
  
      form.setValue("sections", updatedSections, { shouldValidate: true })
  
      // Clean up any file previews
      setFilePreviews((prev) => {
        const newPreviews = { ...prev }
        delete newPreviews[`${sectionId}-${lectureId}`]
        return newPreviews
      })
    }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {form.formState.errors.sections?.root && (
              <p className="text-sm text-red-500 mb-4">{form.formState.errors.sections.root.message}</p>
            )}

            {sections?.map((section, index) => (
              <div key={section.id} className="mb-4 last:mb-0">
                <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-md mb-2">
                  <Menu className="h-5 w-5 text-gray-500" />
                  <div className="font-medium text-sm">Sections {String(index + 1).padStart(2, "0")}:</div>
                  <Input
                    value={section.name}
                    onChange={(e) => updateSectionName(section.id, e.target.value)}
                    className={`h-8 flex-1 bg-white ${
                      form.formState.errors.sections?.[index]?.name ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => addLecture(section.id)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteSection(section.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {form.formState.errors.sections?.[index]?.name && (
                  <p className="text-sm text-red-500 ml-4 mb-2">
                    {form.formState.errors.sections[index]?.name?.message}
                  </p>
                )}

                {form.formState.errors.sections?.[index]?.lectures?.root && (
                  <p className="text-sm text-red-500 ml-4 mb-2">
                    {form.formState.errors.sections[index]?.lectures?.root?.message}
                  </p>
                )}

                <div className="pl-4 space-y-2">
                  {section.lectures?.map((lecture, lectureIndex) => (
                    <div key={lecture.id} className="border rounded-md">
                      <div className="flex items-center gap-2 p-3">
                        <Menu className="h-5 w-5 text-gray-500" />
                        <Input
                          value={lecture.name}
                          onChange={(e) => updateLectureName(section.id, lecture.id, e.target.value)}
                          className={`h-8 flex-1 ${
                            form.formState.errors.sections?.[index]?.lectures?.[lectureIndex]?.name
                              ? "border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                        />
                        <div className="flex gap-1">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8">
                                Contents{" "}
                                {lecture.isExpanded ? (
                                  <ChevronUp className="ml-1 h-4 w-4" />
                                ) : (
                                  <ChevronDown className="ml-1 h-4 w-4" />
                                )}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => updateLectureType(section.id, lecture.id, "video")}>
                                <Video className="mr-2 h-4 w-4" />
                                <span>Video</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateLectureType(section.id, lecture.id, "file")}>
                                <FileText className="mr-2 h-4 w-4" />
                                <span>Attach File</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateLectureType(section.id, lecture.id, "text")}>
                                <Type className="mr-2 h-4 w-4" />
                                <span>Description</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleLectureExpanded(section.id, lecture.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => deleteLecture(section.id, lecture.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {form.formState.errors.sections?.[index]?.lectures?.[lectureIndex]?.name && (
                        <p className="text-sm text-red-500 px-3 pb-2">
                          {form.formState.errors.sections[index]?.lectures?.[lectureIndex]?.name?.message}
                        </p>
                      )}

                      {lecture.isExpanded && (
                        <div className="p-4 border-t bg-gray-50">
                          {lecture.type === "video" && (
                            <div className="flex flex-col items-center justify-center p-6 border border-dashed border-gray-300 rounded-md bg-white">
                              {filePreviews[`${section.id}-${lecture.id}`] ? (
                                <div className="relative w-full mb-4">
                                  <div className="absolute top-2 right-2 z-10">
                                    <Button
                                      variant="destructive"
                                      size="icon"
                                      className="h-8 w-8 rounded-full"
                                      onClick={() => removeFile(section.id, lecture.id)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <video
                                    src={filePreviews[`${section.id}-${lecture.id}`]}
                                    controls
                                    className="w-full aspect-video object-cover rounded-md"
                                  />
                                </div>
                              ) : (
                                <>
                                  <Video className="h-12 w-12 text-gray-400 mb-4" />
                                  <p className="text-sm text-center mb-4">Upload your lecture video here</p>
                                </>
                              )}
                              <input
                                type="file"
                                accept="video/mp4,video/webm,video/ogg"
                                className="hidden"
                                ref={(el:any) => (fileInputRefs.current[`${section.id}-${lecture.id}`] = el)}
                                onChange={(e) => handleFileUpload(section.id, lecture.id, e)}
                              />
                              <Button onClick={() => fileInputRefs.current[`${section.id}-${lecture.id}`]?.click()}>
                                {lecture.content ? "Change Video" : "Upload Video"}
                              </Button>
                            </div>
                          )}

                          {lecture.type === "file" && (
                            <div className="flex flex-col items-center justify-center p-6 border border-dashed border-gray-300 rounded-md bg-white">
                              {lecture.content ? (
                                <div className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-md mb-4">
                                  <div className="flex items-center">
                                    <FileText className="h-6 w-6 text-gray-500 mr-2" />
                                    <span className="text-sm font-medium">{lecture.content}</span>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-500"
                                    onClick={() => removeFile(section.id, lecture.id)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ) : (
                                <>
                                  <FileText className="h-12 w-12 text-gray-400 mb-4" />
                                  <p className="text-sm text-center mb-4">Upload your lecture materials here</p>
                                </>
                              )}
                              <input
                                type="file"
                                className="hidden"
                                ref={(el:any) => (fileInputRefs.current[`${section.id}-${lecture.id}`] = el)}
                                onChange={(e) => handleFileUpload(section.id, lecture.id, e)}
                              />
                              <Button onClick={() => fileInputRefs.current[`${section.id}-${lecture.id}`]?.click()}>
                                {lecture.content ? "Change File" : "Attach File"}
                              </Button>
                            </div>
                          )}

                          {lecture.type === "text" && (
                            <div className="p-4 border border-gray-300 rounded-md bg-white">
                              <textarea
                                className="w-full min-h-[150px] p-2 border rounded-md"
                                placeholder="Enter lecture description or notes here..."
                                value={lecture.content || ""}
                                onChange={(e) => updateLectureContent(section.id, lecture.id, e.target.value)}
                              ></textarea>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-6">
              <Button type="button" variant="outline" className="w-full py-6 border-dashed" onClick={addSection}>
                <Plus className="mr-2 h-4 w-4" />
                Add Sections
              </Button>
            </div>

            <div className="flex justify-between mt-6">
              <Button type="button" variant="outline" onClick={onBack}>
                Previous
              </Button>
              <Button type="submit">Save & Next</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default Curriculum