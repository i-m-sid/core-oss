import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignInModal from "./components/SignInModal";
import HeroSection from "./sections/HeroSection";

export default function LandingPage() {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div className="bg-[#0e0f10] font-geist min-h-screen flex flex-col">
      <Navbar onGetStarted={() => setShowSignIn(true)} />

      <main className="flex flex-col">
        <HeroSection onGetStarted={() => setShowSignIn(true)} />
      </main>

      <Footer />
      <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
    </div>
  );
}
