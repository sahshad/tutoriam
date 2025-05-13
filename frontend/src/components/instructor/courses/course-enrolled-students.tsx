import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle } from "lucide-react";
import { IUser } from "@/types/user"; // Adjust path based on your project structure
import { getEnrolledStudents } from "@/services/enrollmentService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EnrolledStudent {
  user: Partial<IUser>;
  enrollmentDate: Date;
}

const CourseEnrolledStudents = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [students, setStudents] = useState<EnrolledStudent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        setIsLoading(true);
        const data = await getEnrolledStudents(courseId!);
        setStudents(data.enrolledStudents);
      } catch (error) {
        console.error("Failed to fetch enrolled students:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) {
      fetchEnrolledStudents();
    }
  }, [courseId]);

  return (
    <Card className="border-none">
      <CardContent className="p-6 border-none">
        <h3 className="text-lg font-semibold mb-4">Enrolled Students</h3>
        {isLoading ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className="h-7 w-24" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-7 w-32" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-7 w-28" />
                </TableHead>
                <TableHead className="text-right">
                  <Skeleton className="h-7 w-16" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(3)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-7 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-7 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-7 w-28" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-7 w-8" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : students.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
            <h4 className="text-lg font-semibold text-gray-700">No Students Enrolled</h4>
            <p className="text-sm text-gray-500 text-center mt-2">No students have enrolled in this course yet.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profile</TableHead>
                <TableHead>Name</TableHead>
                {/* <TableHead>Email</TableHead> */}
                <TableHead>Enrollment Date</TableHead>
                {/* <TableHead className="text-right">Actions</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.user._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={student.user.profileImageUrl || ""} alt={student.user.name} />
                      <AvatarFallback>
                        {student.user.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "NA"}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>

                  <TableCell>{student.user.name || "Unknown"}</TableCell>
                  {/* <TableCell>{student.user.email || "N/A"}</TableCell> */}
                  <TableCell>{new Date(student.enrollmentDate).toLocaleDateString()}</TableCell>
                  {/* <TableCell className="text-right">
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
                        <DropdownMenuItem>Contact student</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseEnrolledStudents;
