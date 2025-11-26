// Frontend/src/lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

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

export async function fetchCourses(): Promise<Course[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/courses`);
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
}

export async function fetchCourseById(id: string): Promise<Course | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/courses/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch course');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching course:', error);
        return null;
    }
}
