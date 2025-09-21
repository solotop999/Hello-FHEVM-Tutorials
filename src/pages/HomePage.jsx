import { useNavigate } from "react-router-dom";
import { useProgress } from "../hooks/useProgress";
import sections from "../data/sections";

const courses = [
  {
    id: "beginner",
    title: "FHEVM Solidity: Beginner to Intermediate Smart Contracts",
    levels: ["Solidity", "Beginner", "Intermediate"],
    description:
      "Beginner to Intermediate Smart Contracts course is designed for developers who are new to FHEVM and want to build a solid foundation...",
    image: "/beginner.png",
    available: true,
  },
  {
    id: "advanced",
    title: "FHEVM Solidity: Advanced",
    levels: ["Solidity", "Advanced"],
    description:
      "This course is designed for developers who have already mastered the fundamentals of FHEVM...",
    image: "/advanced.png",
    available: false,
  },
  
];

export default function HomePage() {
  const navigate = useNavigate();
  const { progress } = useProgress();

  // 🧮 tính % hoàn thành cho từng course
  const calculateProgress = (courseId) => {
    if (!progress[courseId]) return 0;

    const totalSections = sections.length; // hiện tại demo chỉ có sections cho beginner
    if (totalSections === 0) return 0;

    const completed = Object.keys(progress[courseId]).length;
    return Math.round((completed / totalSections) * 100);
  };

  return (
    <div className="min-h-screen bg-dark text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {courses.map((course) => {
          const courseProgress = calculateProgress(course.id);

          return (
            <div
              key={course.id}
              className="bg-[#1a1f3d] rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-md hover:shadow-lg transition"
            >
              {/* Left column with image */}
              <div className="flex justify-center items-center bg-yellow-400 rounded-lg p-4">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-40 object-cover rounded-lg"
                />
              </div>

              {/* Right column with content */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold">{course.title}</h2>
                  <p className="text-sm text-gray-400">
                    {courseProgress}% completed
                  </p>
                </div>

                <div className="w-full bg-gray-700 h-2 rounded-full mb-3">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${courseProgress}%` }}
                  />
                </div>

                <div className="flex flex-wrap gap-2 text-sm text-indigo-300 mb-3">
                  {course.levels.map((lvl, idx) => (
                    <span key={idx}>• {lvl}</span>
                  ))}
                </div>

                <p className="text-gray-300 mb-4">{course.description}</p>

                {course.available ? (
                  <button
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg hover:scale-105 transition text-white font-semibold"
                  >
                    Start Now
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg font-semibold cursor-not-allowed"
                  >
                    Coming Soon...
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
