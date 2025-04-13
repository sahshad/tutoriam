import { useEffect, useState } from "react";
import Header from "../home/header";
import { LectureDescription } from "./lecture-description";
import { LectureInfo } from "./lecture-info";
import { VideoPlayer } from "./video-player";
import { CourseContents } from "./watch-course-content";
import { CourseHeader } from "./watch-course-header";
import { useParams } from "react-router-dom";
import { fetchEnrolledCourseWithModulesAndLessons } from "@/services/enrollmentService";
import { Course } from "@/types/course";
import { formatDate, formatTimeFromSeconds } from "@/utils/formatDate";
import ReactPlayer from "react-player";
import { EnrolledCourse } from "@/types/enrollment";
import { Lesson } from "@/types/lessons";

export default function WatchCoursePage() {
  const [enrolledCourse, setEnrolledCourse] = useState<EnrolledCourse>();
  const [courseDetails, setCourseDetails] = useState<Course>();
  const [currentLesson, setCurrentLesson] = useState<Lesson>();
  const [loading, setLoading] = useState<boolean>(true);
  const { courseId } = useParams();

  const getEnrolledCourse = async () => {
    try {
      const data = await fetchEnrolledCourseWithModulesAndLessons(courseId as string);
      setEnrolledCourse(data.enrolledCourse);
      setCourseDetails(data.courseWithModulesAndLessons);

      const lastVisitedId = data.enrolledCourse?.progress.lastVisited
        ? data.enrolledCourse.progress.lastVisited
        : data.courseWithModulesAndLessons?.modules?.[0].lessons?.[0]._id;

      const allLessons = data.courseWithModulesAndLessons?.modules?.flatMap((module: any) => module.lessons || []);

      const lastVisitedLesson = allLessons?.find((lesson: any) => lesson._id === lastVisitedId);
      setCurrentLesson(lastVisitedLesson);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEnrolledCourse();
  }, []);

  const totalLessons = courseDetails?.modules?.reduce((total, module) => {
    return total + (module.lessons ? module.lessons.length : 0);
  }, 0);

  const totalDuration =
    courseDetails?.modules?.reduce((total, module) => {
      const moduleDuration =
        module.lessons?.reduce((durationSum, lesson) => {
          return durationSum + (lesson.duration ? +lesson.duration : 0);
        }, 0) || 0;
      return total + moduleDuration;
    }, 0) || 0;

  if (!courseDetails || !enrolledCourse) {
    return <div></div>;
  }
  if (loading) {
    return <div></div>;
  }

  return (
    <div className="min-h-screen ">
      <Header />
      <div className="container mx-auto px-[4%] py-6">
        <CourseHeader
          title={courseDetails.title}
          sections={courseDetails.modules?.length as number}
          lectures={totalLessons as number}
          duration={formatTimeFromSeconds(totalDuration)}
          isCompleted={enrolledCourse.completed}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2">
            {/* <VideoPlayer url={courseDetails.modules?.[0]?.lessons?.[0]?.videoUrl ?? ""} /> */}
            <ReactPlayer url={currentLesson?.videoUrl} controls={true} width="100%" />
            <LectureInfo
              title={currentLesson?.title as string}
              students={courseDetails.enrollmentCount as number}
              lastUpdated={formatDate(courseDetails.updatedAt as Date)}
              comments={154}
            />
            <LectureDescription description={currentLesson?.description as string} />
          </div>
          <div className="lg:col-span-1">
            <CourseContents
              modules={courseDetails.modules!}
              enrolledCourse={enrolledCourse}
              setCurrentLesson={setCurrentLesson}
              setEnrolledCourse={setEnrolledCourse}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
