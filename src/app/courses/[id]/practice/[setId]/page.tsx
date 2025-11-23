// src/app/courses/[id]/practice/[setId]/page.tsx
import { practiceData } from "@/lib/practiceData";
import QuizPage from "./QuizPage";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string; setId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id, setId } = await params;
  
  const coursePractice = practiceData[id];

  if (!coursePractice) {
    return notFound();
  }

  // Find the specific practice set within the modules
  let practiceSet = null;
  for (const module of coursePractice.modules) {
    const found = module.sets.find(s => s.id === setId);
    if (found) {
      practiceSet = found;
      break;
    }
  }

  if (!practiceSet) {
    return notFound();
  }

  return <QuizPage practiceSet={practiceSet} courseId={id} />;
}