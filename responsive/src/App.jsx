import { Routes, Route, useLocation } from "react-router-dom";

import ContactSection from "./components/CONTACT/ContactSection";
import Scene from "./components/HERO/Scene";
import AboutSection from "./components/ABOUTME/AboutSection";
import LogoMotion from "./components/ui/LogoMotion";
import ImageScrollGrid from "./components/PHOTOS/ImageScrollGrid";
import TargetCursor from "./components/ui/TargetCursor";


// 🆕 Desktop About page
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CertificationsPage from "./pages/CertificationsPage";

export default function App() {
  const location = useLocation();

  return (
    <div className="w-screen bg-black text-white">
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
      </Routes>
    </div>
  );
}