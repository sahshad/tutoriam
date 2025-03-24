"use client"

import type React from "react"

import { useState } from "react"
import { FileText, Layers, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sidebar } from "@/components/instructor/common/Sidebar"

export default function CreateCoursePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [topic, setTopic] = useState("")
  const [duration, setDuration] = useState("")

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center gap-4">
            <div>
              <h2 className="text-sm font-medium">Good Morning</h2>
              <h1 className="text-xl font-bold">Create a new course</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search"
                className="h-9 w-64 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  3
                </span>
              </button>
            </div>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>VS</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 pb-16">
          <Card className="mb-6">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <StepItem
                  icon={<Layers className="h-5 w-5" />}
                  title="Basic Information"
                  isActive={true}
                  isCompleted={false}
                  progress="7/12"
                />
                <StepItem
                  icon={<FileText className="h-5 w-5" />}
                  title="Advance Information"
                  isActive={false}
                  isCompleted={false}
                />
                <StepItem
                  icon={<Layers className="h-5 w-5" />}
                  title="Curriculum"
                  isActive={false}
                  isCompleted={false}
                />
                <StepItem
                  icon={<CheckCircle className="h-5 w-5" />}
                  title="Publish Course"
                  isActive={false}
                  isCompleted={false}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Basic Information</h2>
            <div className="flex gap-2">
              <Button variant="outline">Save</Button>
              <Button variant="outline">Save & Preview</Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <div className="relative">
                    <Input
                      id="title"
                      placeholder="You course title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      {title.length}/80
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subtitle" className="text-sm font-medium">
                    Subtitle
                  </label>
                  <div className="relative">
                    <Input
                      id="subtitle"
                      placeholder="You course subtitle"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      {subtitle.length}/120
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Course Category
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subcategory" className="text-sm font-medium">
                      Course Sub-category
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web">Web Development</SelectItem>
                        <SelectItem value="mobile">Mobile Development</SelectItem>
                        <SelectItem value="game">Game Development</SelectItem>
                        <SelectItem value="database">Database Design</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="topic" className="text-sm font-medium">
                    Course Topic
                  </label>
                  <Input
                    id="topic"
                    placeholder="What is primarily taught in your course?"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="language" className="text-sm font-medium">
                      Course Language
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subtitle-language" className="text-sm font-medium">
                      Subtitle Language (Optional)
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="level" className="text-sm font-medium">
                      Course Level
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="all">All Levels</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="duration" className="text-sm font-medium">
                      Durations
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="duration"
                        placeholder="Course durations"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="flex-1"
                      />
                      <Select defaultValue="day">
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="day">Day</SelectItem>
                          <SelectItem value="week">Week</SelectItem>
                          <SelectItem value="month">Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save & Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <footer className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© 2023 - Edugard. Designed by Templatecookie. All rights reserved.</p>
              <div className="flex gap-4 mt-2 md:mt-0">
                <a href="#" className="hover:underline">
                  FAQs
                </a>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
                <a href="#" className="hover:underline">
                  Terms & Condition
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}

interface StepItemProps {
  icon: React.ReactNode
  title: string
  isActive: boolean
  isCompleted: boolean
  progress?: string
}

function StepItem({ icon, title, isActive, isCompleted, progress }: StepItemProps) {
  return (
    <div
      className={`flex items-center gap-3 p-4 flex-1 border-b md:border-b-0 md:border-r last:border-0 ${
        isActive ? "bg-gray-50" : ""
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${
          isActive ? "bg-primary text-primary-foreground" : "bg-gray-100 text-gray-500"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h3 className={`text-sm font-medium ${isActive ? "text-primary" : "text-gray-500"}`}>{title}</h3>
        {progress && <p className="text-xs text-muted-foreground">{progress}</p>}
      </div>
    </div>
  )
}

