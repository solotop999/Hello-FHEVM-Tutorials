import { useParams, Link } from "react-router-dom";
import CourseHeader from "../components/CourseHeader";
import SectionItem from "../components/SectionItem";
import sections from "../data/sections";

export default function CoursePage() {
  const { id } = useParams();

  if (id !== "beginner") {
    return (
      <div className="min-h-screen text-black px-6 py-10 bg-[#ffd200]">
        <h1 className="text-2xl font-bold mb-4">Coming Soon...</h1>
        <Link
          to="/"
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white px-6 py-10 bg-dark">
      <div className="max-w-6xl mx-auto">
        <CourseHeader />
        <h2 className="text-2xl font-bold mt-10 mb-2">Course Content</h2>
        <p className="text-gray-400 mb-6">{sections.length} lessons</p>

        <div className="space-y-4">
          {sections.map((s, i) => (
            <SectionItem key={i} {...s} />
          ))}
        </div>
      </div>
    </div>
  );
}
