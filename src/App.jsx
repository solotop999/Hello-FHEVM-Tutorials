import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import DemoPage from "./pages/DemoPage";
import SectionPage from "./pages/SectionPage";
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-black">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses/:id" element={<CoursePage />} />
          <Route path="/courses/:id/section/:sectionIndex" element={<SectionPage />} />
          <Route path="/demo" element={<DemoPage />} />
        </Routes>
      </main>

      <Analytics />
    </div>
  );
}

export default App;
