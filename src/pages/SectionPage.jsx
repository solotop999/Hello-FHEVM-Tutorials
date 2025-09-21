import { useParams, Link } from "react-router-dom";
import LessonContent from "../components/LessonContent";
import sections from "../data/sections";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProgress } from "../hooks/useProgress";
import { useEffect } from "react";

export default function SectionPage() {
  const { id, sectionIndex } = useParams();
  const index = parseInt(sectionIndex);
  const section = sections[index];
  const { progress, markSectionComplete } = useProgress();

  if (!section) {
    return (
      <div className="min-h-screen bg-dark text-white flex items-center justify-center">
        <p className="text-xl">❌ Section not found</p>
      </div>
    );
  }

  const prevSection = index > 0 ? sections[index - 1] : null;
  const nextSection = index < sections.length - 1 ? sections[index + 1] : null;

  // Reset scroll về đầu khi đổi section
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [index]);

  return (
    <div className="min-h-screen bg-dark text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Back to Course */}
        <Link
          to={`/courses/${id}`}
          className="inline-block mb-6 px-4 py-2 bg-[#ffd200] text-black rounded-lg hover:bg-yellow-400 transition"
        >
          ← Back to Course
        </Link>

        {/* Section Title */}
        <h2 className="text-2xl font-bold mb-6">{section.title}</h2>

        {/* Outline lessons */}
        {section.lessons.length > 0 && (
          <ul className="mb-8 space-y-2">
            {section.lessons.map((l, i) => (
              <li key={i} className="text-gray-400">
                • {l.title}
              </li>
            ))}
          </ul>
        )}

        {/* Section content */}
        <div className="bg-[#12163d] rounded-2xl p-6 border border-white/10 mb-8">
          <LessonContent file={section.file} />
        </div>

        {/* Navigation + Mark Completed */}
        <div className="flex justify-between items-center mt-8">
          {/* BACK */}
          {prevSection ? (
            <Link
              to={`/courses/${id}/section/${index - 1}`}
              className="flex items-center gap-2 whitespace-nowrap px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>BACK</span>
            </Link>
          ) : (
            <div />
          )}

          {/* Mark Completed (center) */}
          <div className="flex-1 flex justify-center">
            <button
              onClick={() => markSectionComplete("beginner", index)}
              disabled={progress["beginner"]?.[index]}
              className={`px-4 py-1 rounded-md font-medium text-sm transition ${
                progress["beginner"]?.[index]
                  ? "bg-transparent border border-green-500 text-green-500 cursor-default"
                  : "bg-transparent border border-white text-white hover:bg-white/10"
              }`}
            >
              {progress["beginner"]?.[index] ? "✅ Completed" : "✅ Mark Completed"}
            </button>
          </div>

          {/* NEXT */}
          {nextSection ? (
            <Link
              to={`/courses/${id}/section/${index + 1}`}
              className="flex items-center gap-2 whitespace-nowrap px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <span>NEXT</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
