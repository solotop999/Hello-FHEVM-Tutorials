import { useState, useEffect } from "react";

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem("courseProgress");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("courseProgress", JSON.stringify(progress));
  }, [progress]);

const markSectionComplete = (courseId, sectionIndex) => {
  setProgress((prev) => {
    const copy = { ...prev };
    if (!copy[courseId]) copy[courseId] = {};
    copy[courseId][sectionIndex] = true;
    return copy;
  });
};

  return { progress, markSectionComplete };
}
