import { Routes, Route, useLocation } from "react-router-dom";

import ContactSection from "./components/contact/ContactSection";
import Scene from "./components/hero/Scene";
import AboutSection from "./components/about/AboutSection";
import LogoMotion from "./components/ui/LogoMotion";
import ImageScrollGrid from "./components/photos/ImageScrollGrid";
import TargetCursor from "./components/ui/TargetCursor";
import ScrollBackground from "./components/ui/ScrollBackground";


// 🆕 Desktop About page
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CertificationsPage from "./pages/CertificationsPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  const location = useLocation();

  return (
    <div className="w-screen bg-black text-white relative">
      <ScrollBackground />
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
        targetSelector=".cursor-target"
      />
      <div className="fixed top-6 right-8 z-50 pointer-events-auto">
        <LogoMotion />
      </div>
      <div className="relative z-10">
        <Routes>
          <Route
            path="/"
            element={
              <div key={`home-${location.pathname}`}>
                <div className="h-screen relative">
                  {/* ✅ /about -> / болгоход key өөрчлөгдөнө */}
                  <Scene key={`scene-${location.pathname}`} />
                </div>

                <AboutSection />
                <ImageScrollGrid />
                <ContactSection />
              </div>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </div>
  );
}