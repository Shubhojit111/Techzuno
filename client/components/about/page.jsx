import Navbar from '@/components/about/Navbar'
import HeroSection from '@/components/about/HeroSection'
import CompanySection from '@/components/about/CompanySection'
import VisionSection from '@/components/about/VisionSection'
import MissionSection from '@/components/about/MissionSection'
import ValuesSection from '@/components/about/ValuesSection'
import ToolsSection from '@/components/about/ToolsSection'
import MilestonesSection from '@/components/about/MilestonesSection'
import CTASection from '@/components/about/CTASection'
import Footer from '@/components/about/Footer'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#080a0f]">
      {/* <Navbar />
      <HeroSection />
      <CompanySection /> */}
      <VisionSection />
      <MissionSection />
      <ValuesSection />
      <ToolsSection />
      <MilestonesSection />
      <CTASection />
      <Footer />
    </main>
  )
}
