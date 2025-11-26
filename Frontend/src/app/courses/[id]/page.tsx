import { fetchCourseById } from '@/lib/api'
import { notFound } from 'next/navigation'
import CourseDetailPage from './CourseDetailPage'

export default async function Page({ params }: { params: { id: string } }) {
  const course = await fetchCourseById(params.id)

  if (!course) {
    notFound()
  }

  return <CourseDetailPage course={course} />
}