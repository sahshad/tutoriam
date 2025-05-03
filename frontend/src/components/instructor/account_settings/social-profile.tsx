import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Globe, Facebook, Instagram, Linkedin, Twitter, Phone, Youtube } from "lucide-react"

export function SocialProfile() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Social Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="website">Personal Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="website" placeholder="Personal website or portfolio url..." className="pl-10" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <div className="relative">
                <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="facebook" placeholder="Username" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="instagram" placeholder="Username" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="linkedin" placeholder="Username" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <div className="relative">
                <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="twitter" placeholder="Username" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="whatsapp" placeholder="Phone number" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtube">YouTube</Label>
              <div className="relative">
                <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="youtube" placeholder="Username" className="pl-10" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="bg-black hover:bg-black/90">Save Changes</Button>
      </CardFooter>
    </Card>
  )
}
