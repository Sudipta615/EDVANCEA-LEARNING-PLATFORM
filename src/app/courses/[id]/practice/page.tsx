import { practiceData } from "@/lib/practiceData";
import PracticePage from "./PracticePage";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  
  // Fetch practice data for this course
  const coursePractice = practiceData[id];

  if (!coursePractice) {
    return notFound();
  }

  return <PracticePage data={coursePractice} />;
}