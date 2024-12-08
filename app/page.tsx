import HeroBanner from "@/app/components/home/HeroBanner";
import HowItWorks from "@/app/components/home/HowItWorks";
import Testimonials from "@/app/components/home/Testimonials";
import CallToAction from "@/app/components/home/CallToAction";
import Footer from "@/app/components/Footer";
import FeaturedProjects from "@/app/components/home/Featured";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HeroBanner />
        <HowItWorks />
        <FeaturedProjects />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
