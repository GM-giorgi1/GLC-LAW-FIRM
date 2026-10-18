import Header from "@/components/templates/lawyer-portfolio-landing-page-alex/Header";
import Aboutme from "@/components/templates/lawyer-portfolio-landing-page-alex/AboutMe";
import Services from "@/components/templates/lawyer-portfolio-landing-page-alex/Services";
import Casestudy from "@/components/templates/lawyer-portfolio-landing-page-alex/CaseStudy";
import Metrics from "@/components/templates/lawyer-portfolio-landing-page-alex/Metrics";
import Testimonials from "@/components/templates/lawyer-portfolio-landing-page-alex/Testimonials";
import Price from "@/components/templates/lawyer-portfolio-landing-page-alex/Price";
import Blogs from "@/components/templates/lawyer-portfolio-landing-page-alex/Blogs";
import Contacts from "@/components/templates/lawyer-portfolio-landing-page-alex/Contacts";
import Footer from "@/components/templates/lawyer-portfolio-landing-page-alex/Footer";

export default function App() {
  return (
    <main className="min-h-screen bg-[#0C0D0D]">
      <Header />
      <Aboutme />
      <Services />
      <Casestudy />
      <Metrics />
      <Testimonials />
      <Price />
      <Blogs />
      <Contacts />
      <Footer />
    </main>
  );
}
