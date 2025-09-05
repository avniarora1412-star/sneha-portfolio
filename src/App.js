import { useEffect, useState } from "react";
import { Linkedin, Mail, Phone, Download, Menu, X } from "lucide-react";

export default function App() {
  const roles = [
    "MSc Project Management Student",
    "Business Analyst",
    "Future Project Leader"
  ];

  const [currentText, setCurrentText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Typing animation
  useEffect(() => {
    const fullText = roles[roleIndex];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullText.slice(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setCurrentText(fullText.slice(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, roleIndex, roles]);

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "home";
      sections.forEach((section) => {
        const top = section.offsetTop - 80;
        if (window.scrollY >= top) {
          current = section.getAttribute("id");
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "statement", label: "Personal Statement" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "certifications", label: "Certifications" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <div className="font-sans text-gray-800 bg-gradient-to-b from-gray-50 via-white to-gray-100 scroll-smooth">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
          <h1
            className="text-xl font-bold text-blue-700 cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            Sneha Bangargi
          </h1>
          {/* Desktop */}
          <div className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`hover:text-blue-700 ${
                  activeSection === item.id ? "text-blue-700 font-semibold" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          {/* Mobile */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t flex flex-col px-4 py-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`py-2 text-left ${
                  activeSection === item.id ? "text-blue-700 font-semibold" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex flex-col justify-center items-center text-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100"
      >
        <img
          src="/sneha-photo.png"
          alt="Sneha Bangargi"
          className="w-40 h-40 rounded-full object-cover shadow-md border-4 border-white mb-6"
        />
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">
          Sneha Bangargi
        </h1>
        <p className="text-lg md:text-xl mb-6 text-gray-700 h-8">
          {currentText}
          <span className="border-r-2 border-gray-700 animate-pulse ml-1"></span>
        </p>
        <div className="flex gap-4">
          <a
            href="/Sneha_Bangargi_UK_CV.pdf"
            download
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg shadow"
          >
            <Download className="w-4 h-4" /> CV
          </a>
          <a
            href="https://linkedin.com/in/sneha-bangargi-321003194"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 border border-blue-700 text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg shadow"
          >
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
        </div>
      </section>

      {/* Personal Statement */}
      <section
        id="statement"
        className="max-w-4xl mx-auto py-16 px-6 border-b border-gray-200 bg-white/70 backdrop-blur-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">
          Personal Statement
        </h2>
        <p className="text-lg leading-relaxed text-gray-700">
          MSc Project Management student at Aston University with hands-on
          experience delivering IT and business transformation projects. Skilled
          in stakeholder engagement, requirements gathering, and project
          delivery using Agile and SDLC methodologies. Recognised for improving
          efficiency, driving system adoption, and aligning IT solutions with
          business goals. Seeking graduate opportunities to contribute to
          large-scale project delivery within the UK.
        </p>
      </section>

      {/* Professional Experience */}
      <section
        id="experience"
        className="max-w-5xl mx-auto py-16 px-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50"
      >
        <h2 className="text-2xl font-semibold mb-10 text-blue-700 text-center">
          Professional Experience
        </h2>
        {/* Example job card */}
        <div className="bg-white shadow-sm border p-6 mb-8 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">
            Business Analyst | Mplussoft Technologies, Pune
          </h3>
          <p className="mb-4 text-sm text-gray-500">Feb 2024 – Mar 2025</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Delivered multiple client projects end-to-end, achieving 100%
              on-time delivery and high client satisfaction.
            </li>
            <li>
              Coordinated UAT with 50+ users, reducing post-launch issues by
              30%.
            </li>
            <li>
              Conducted client training workshops, boosting system adoption rates
              by 20%.
            </li>
          </ul>
        </div>
      </section>

      {/* Education */}
      <section
        id="education"
        className="max-w-4xl mx-auto py-16 px-6 border-b border-gray-200 bg-white/70 backdrop-blur-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Education</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-blue-700 pl-4">
            <p className="font-semibold text-gray-900">
              MSc Project Management (Ongoing)
            </p>
            <p className="text-gray-600">
              Aston University, Birmingham | 2025 – 2026 (Expected)
            </p>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section
        id="certifications"
        className="max-w-4xl mx-auto py-16 px-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50"
      >
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">
          Certifications & Simulations
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Siemens Project Manager Job Simulation – Forage (2025)</li>
          <li>TCS iON Career Edge – Young Professional (2022)</li>
        </ul>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="max-w-5xl mx-auto py-16 px-6 border-b border-gray-200 bg-white/70 backdrop-blur-sm"
      >
        <h2 className="text-2xl font-semibold mb-10 text-blue-700 text-center">
          Core Skills
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white shadow-sm border p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Project Management
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Agile & SDLC Delivery</li>
              <li>Stakeholder Management</li>
              <li>Risk Identification</li>
            </ul>
          </div>
          <div className="bg-white shadow-sm border p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Technical Skills
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Data Analysis (Excel, Power BI)</li>
              <li>Tools: Trello, JIRA, MS Project</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-16 px-6 text-center bg-gradient-to-r from-blue-100 to-blue-50"
      >
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">
          Get In Touch
        </h2>
        <div className="space-y-4 text-gray-700">
          <p className="flex justify-center items-center gap-2">
            <Mail className="w-4 h-4" /> snehabangargi1412@gmail.com
          </p>
          <p className="flex justify-center items-center gap-2">
            <Phone className="w-4 h-4" /> +44 7553 992811
          </p>
        </div>
      </section>
    </div>
  );
}
