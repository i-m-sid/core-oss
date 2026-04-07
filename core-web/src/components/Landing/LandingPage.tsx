import { useState, useCallback, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignInModal from "./components/SignInModal";
import HeroSection from "./sections/HeroSection";
import CustomerLogosSection from "./sections/CustomerLogosSection";
import FeaturesSection from "./sections/FeaturesSection";
import FaqSection from "./sections/FaqSection";
import CtaSection from "./sections/CtaSection";
import { LoadingOverlayPresence } from "./components/LoadingOverlay";

export default function LandingPage() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("landing");
    return () => document.documentElement.classList.remove("landing");
  }, []);

  const handleLogoAnimationComplete = useCallback(() => {
    setLogoAnimationComplete(true);
  }, []);

  const isPageLoading = !logoAnimationComplete;

  return (
    <div className="bg-[#0e0f10] font-geist min-h-screen flex flex-col">
      <LoadingOverlayPresence show={isPageLoading} onComplete={handleLogoAnimationComplete} />

      {/* Header is always mounted — showLogo controls the layoutId div inside */}
      <Navbar onGetStarted={() => setShowSignIn(true)} showLogo={!isPageLoading} />

      <main className="flex flex-col">
        <HeroSection onGetStarted={() => setShowSignIn(true)} />
        <CustomerLogosSection />
        <FeaturesSection />
        <FaqSection />
        <CtaSection onGetStarted={() => setShowSignIn(true)} />
      </main>

      <Footer />
      <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
    </div>
  );
}
