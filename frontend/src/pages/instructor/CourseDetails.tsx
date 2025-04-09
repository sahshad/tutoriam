import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Replaced useRouter with useNavigate

import { Sidebar } from "@/components/instructor/common/Sidebar";
import PageHeader from "@/components/instructor/common/Header";
import { Course } from "@/types/course";
import { getCourseById } from "@/services/courseService";
import CourseHeader from "@/components/instructor/courses/CourseHeader";
import { CourseStats } from "@/components/instructor/courses/CourseStats";
import { CourseRating } from "@/components/instructor/courses/CourseReview";
import { CourseCharts } from "@/components/instructor/courses/CourseCharts";

const SingleCoursePage: React.FC = () => {
    const { courseId } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    if(!courseId){
        navigate("/instructor/my-courses")
        return
    }
    const fetchCourse = async () => {
      try {
        const res = await getCourseById(courseId); 
        setCourse(res.data as Course);
      } catch (error) {
        console.error("Failed to fetch course:", error);
        navigate("/instructor/my-courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, navigate]); // Replaced router.push with navigate

  if (loading) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <PageHeader />
          <main className="flex-1 overflow-y-auto p-6 pb-16">
            <div className="flex items-center justify-center h-full">
              <div className="animate-pulse">Loading course details...</div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!course) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <PageHeader />

        <main className="flex-1 overflow-y-auto p-6 pb-16">
          
          <CourseHeader course={course} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <CourseStats course={{ ...course, instructor: {} }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <CourseRating course={course} />
            <CourseCharts course={course} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SingleCoursePage;
