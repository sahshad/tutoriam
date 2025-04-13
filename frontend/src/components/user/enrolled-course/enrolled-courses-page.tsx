import { useEnrolledCourses } from "@/hooks/useEnrolledCourse";
import CoursesFilters from "./enrolled-course-filter";
import CoursesGrid from "./enrolled-course-grid";
import { useSelector } from "react-redux";
import { GenericPagination } from "@/components/common/pagination";

export default function CoursesPage() {
  const userId = useSelector((state: any) => state.auth.user._id);
  const { enrolledCourses, setSearchQuery, filter, setFilter, currentPage, totalPages,setCurrentPage } = useEnrolledCourses({ userId });
  return (
    <div className="p-6">
      <CoursesFilters filter={filter} setFilter={setFilter} setSearchQuery={setSearchQuery}/>
      <CoursesGrid enrolledCourses={enrolledCourses} />
      <GenericPagination currentPage={currentPage} onPageChange={setCurrentPage} totalPages={totalPages} />
    </div>
  );
}
