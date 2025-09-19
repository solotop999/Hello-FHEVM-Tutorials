import { useNavigate } from "react-router-dom";

const courses = [
  {
    id: "beginner",
    title: "FHEVM Solidity: Beginner to Intermediate Smart Contracts",
    levels: ["Solidity", "Beginner", "Intermediate"],
    description: "Get up to speed with the basics of Solidity.",
    progress: 3,
    image: "/hero.png",
    available: true,
  },
  {
    id: "advanced",
    title: "FHEVM Solidity: Advanced",
    levels: ["Solidity", "Advanced"],
    description:
      "Deploying Ethereum DApps with Truffle will walk you through the process of deploying your smart contracts with Truffle.",
    progress: 0,
    image: "/hero2.png",
    available: false,
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#ffd200] text-black px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {courses.map((course, i) => (
          <div
            key={i}
            className="bg-white border-2 border-black rounded-lg p-6 flex flex-col md:flex-row gap-6 items-center"
          >
            <div className="flex-shrink-0">
              <img
                src={course.image}
                alt={course.title}
                className="w-40 h-40 object-contain"
              />
            </div>

            <div className="flex-1 ">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{course.title}</h2>
                <p className="text-sm text-gray-400">
                  {course.progress}% completed
                </p>
              </div>

              <div className="w-full bg-gray-700 h-2 rounded-full mb-3">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${course.progress}%` }}
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
                  className="px-4 py-2 bg-black text-white rounded-lg font-semibold cursor-not-allowed"
                >
                  Coming Soon...
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
