import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProfileUpload } from "./profile-upload"

export function AccountSettings() {
  const [title, setTitle] = useState("")

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Account Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input id="firstName" placeholder="First name" />
                <Input id="lastName" placeholder="Last name" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter your username" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex gap-2">
                <Select defaultValue="+880">
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Code" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+880">+880</SelectItem>
                    <SelectItem value="+1">+1</SelectItem>
                    <SelectItem value="+44">+44</SelectItem>
                    <SelectItem value="+91">+91</SelectItem>
                  </SelectContent>
                </Select>
                <Input id="phone" placeholder="Your Phone number..." className="flex-1" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="title">Title</Label>
                <span className="text-xs text-muted-foreground">{title.length}/50</span>
              </div>
              <Input
                id="title"
                placeholder="Your title, profession or small biography"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={50}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="biography">Biography</Label>
              <Textarea
                id="biography"
                placeholder="Your title, profession or small biography"
                className="min-h-[120px]"
              />
            </div>
          </div>

          <div>
            <ProfileUpload />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="bg-black hover:bg-black/90">Save Changes</Button>
      </CardFooter>
    </Card>
  )
}
