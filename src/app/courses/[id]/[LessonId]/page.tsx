// src/app/courses/[id]/[LessonId]/page.tsx
import { lessonData } from "@/lib/lessonData";
import LessonPage from "./LessonPage";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; LessonId: string }>;
}) {
  const { id: courseId, LessonId } = await params;
  
  const lesson = lessonData[LessonId];

  if (!lesson) {
    return notFound();
  }

  // Check if next lesson exists on the server side
  const nextLessonId = (parseInt(LessonId) + 1).toString();
  const hasNextLesson = lessonData[nextLessonId] !== undefined;

  return (
    <LessonPage 
      lesson={lesson} 
      courseId={courseId} 
      nextLessonId={hasNextLesson ? nextLessonId : null} 
    />
  );
}