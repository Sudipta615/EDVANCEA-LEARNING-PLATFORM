// Frontend/src/lib/courseData.ts
// This file now only exports types - data is fetched from Backend API

export interface Lesson {
  id: string;
  title: string;
}

export interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription?: string;
  level: string;
  lessons: number;
  image: string;
  lastUpdated?: string;
  language?: string;
  modules: Module[];
  features?: string[];
}