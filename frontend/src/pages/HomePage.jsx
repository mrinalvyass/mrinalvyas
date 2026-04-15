import { AlertCircle } from "lucide-react";

import { SkeletonCard } from "../components/common/SkeletonCard";
import { LoadingScreen } from "../components/common/LoadingScreen";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { AboutSection } from "../components/sections/AboutSection";
import { AchievementsSection } from "../components/sections/AchievementsSection";
import { BlogSection } from "../components/sections/BlogSection";
import { ContactSection } from "../components/sections/ContactSection";
import { ExperienceSection } from "../components/sections/ExperienceSection";
import { HeroSection } from "../components/sections/HeroSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { ServicesSection } from "../components/sections/ServicesSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { TechStackVisualSection } from "../components/sections/TechStackVisualSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { usePortfolioData } from "../hooks/usePortfolioData";

export function HomePage() {
  const { portfolio, loading, error } = usePortfolioData();

  if (loading) {
    return (
      <main className="page-shell">
        <Navbar />
        <LoadingScreen />
        <section className="skeleton-grid">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </section>
      </main>
    );
  }

  if (error || !portfolio) {
    return (
      <main className="page-shell">
        <Navbar />
        <div className="error-state glass-card">
          <AlertCircle size={18} />
          <p>{error || "Unable to load portfolio data."}</p>
        </div>
      </main>
    );
  }

  const visibleSections = new Map(
    portfolio.sections.map((item) => [item.sectionKey, item.isVisible])
  );

  return (
    <main className="page-shell">
      <Navbar />
      {visibleSections.get("hero") !== false && <HeroSection about={portfolio.about} />}
      {visibleSections.get("about") !== false && <AboutSection about={portfolio.about} />}
      {visibleSections.get("skills") !== false && (
        <SkillsSection skills={portfolio.skills} />
      )}
      {visibleSections.get("services") !== false && (
        <ServicesSection services={portfolio.services} />
      )}
      {visibleSections.get("projects") !== false && (
        <ProjectsSection
          projectData={portfolio.projects}
          filters={portfolio.meta.projectFilters}
        />
      )}
      {visibleSections.get("experience") !== false && (
        <ExperienceSection
          items={portfolio.experience}
          sectionId="experience"
          eyebrow="Experience"
          title="Professional work grounded in full-stack delivery"
        />
      )}
      {visibleSections.get("education") !== false && (
        <ExperienceSection
          items={portfolio.education}
          sectionId="education"
          eyebrow="Education"
          title="Education that supports practical engineering thinking"
        />
      )}
      {visibleSections.get("achievements") !== false && (
        <AchievementsSection achievements={portfolio.achievements} />
      )}
      {visibleSections.get("techStack") !== false && (
        <TechStackVisualSection skills={portfolio.skills} />
      )}
      {visibleSections.get("testimonials") !== false && (
        <TestimonialsSection testimonials={portfolio.testimonials} />
      )}
      {visibleSections.get("blog") !== false && (
        <BlogSection blogPosts={portfolio.blogPosts} />
      )}
      {visibleSections.get("contact") !== false && (
        <ContactSection about={portfolio.about} />
      )}
      <Footer />
    </main>
  );
}
