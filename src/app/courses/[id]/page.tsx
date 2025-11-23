import { courseData } from "@/lib/courseData";
import CourseDetailPage from "./CourseDetailPage";
import { notFound } from "next/navigation";

// Type definition for the params
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  // Await params in Next.js 15
  const { id } = await params;
  
  const course = courseData[id];

  if (!course) {
    return notFound();
  }

  // Pass the data to the client component
  return <CourseDetailPage course={course} />;
}