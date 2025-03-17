import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent} from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table'
import { MoreHorizontal, Star } from 'lucide-react'

const tutors = [
    {
      id: "t1",
      name: "Dr. Michael Johnson",
      email: "michael.johnson@example.com",
      courses: 5,
      rating: 4.8,
      students: 342,
      status: "active",
      expertise: "Web Development",
      joinedDate: "2022-06-15",
    }
  ]

const TutorsPage = () => {
  return (
    <div className="flex-1 space-y-4 md:pl-64">
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold tracking-tight">Tutors</h2>
      <div className="flex items-center gap-2">
      </div>
    </div>
    <Card>
      <CardContent>
        <table className="w-full">
          <thead>
            <TableRow>
              <TableHead>Tutor</TableHead>
              <TableHead>Expertise</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </thead>
          <TableBody>
            {tutors.map((tutor) => (
              <TableRow key={tutor.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`/avatars/tutor-${tutor.id}.png`} alt={tutor.name} />
                      <AvatarFallback>
                        {tutor.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{tutor.name}</div>
                      <div className="text-sm text-muted-foreground">{tutor.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{tutor.expertise}</TableCell>
                <TableCell>{tutor.courses}</TableCell>
                <TableCell>{tutor.students}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {tutor.rating}
                    <Star className="ml-1 h-4 w-4 fill-primary text-primary" />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={tutor.status === "active" ? "default" : "destructive"}>
                    {tutor.status === "active" ? "Active" : "Blocked"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View profile</DropdownMenuItem>
                      <DropdownMenuItem>View courses</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        {tutor.status === "active" ? "Block tutor" : "Unblock tutor"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </table>
      </CardContent>
    </Card>
  </div>
  )
}

export default TutorsPage
