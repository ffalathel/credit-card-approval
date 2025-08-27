"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";

// Icons as SVG components
const CreditCardIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const LightningIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const BrainIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Mobile Menu Component
const MobileMenu = ({ isOpen, onClose, activeSection, onNavigate }) => {
  const menuItems = [
    { id: "hero", label: "Home" },
    { id: "features", label: "Features" },
    { id: "predictor", label: "Predictor" }
  ];

  const handleItemClick = (itemId) => {
    onNavigate(itemId);
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 md:hidden ${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className={`fixed right-0 top-0 h-full w-64 glass transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <CreditCardIcon />
            </div>
            <span className="text-xl font-bold gradient-text">CreditAI</span>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-white transition-colors">
            <CloseIcon />
          </button>
        </div>
        <nav className="p-6">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

function App() {
  const [formData, setFormData] = useState({
    Car_Owner: "",
    Propert_Owner: "",
    Annual_income: "",
    EDUCATION: "",
  });

  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      setResult(response.data.approval);
    } catch (error) {
      console.error(error);
      setResult("Error processing request");
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "features", "predictor"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.1),transparent_50%)] animate-pulse-slow"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <CreditCardIcon />
              </div>
              <span className="text-xl font-bold gradient-text">CreditAI</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: "hero", label: "Home" },
                { id: "features", label: "Features" },
                { id: "predictor", label: "Predictor" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white transition-colors"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span className="gradient-text">AI-Powered</span>
              <br />
              <span className="text-white">Credit Approval</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience the future of credit assessment with our advanced machine learning algorithm. 
              Get instant, accurate predictions in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection("predictor")}
                className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowIcon />
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="glass text-lg px-8 py-4 flex items-center justify-center space-x-2 hover:bg-white/10 transition-all duration-300"
              >
                <span>Learn More</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-text">CreditAI</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our cutting-edge technology combines advanced machine learning with comprehensive 
              financial analysis to deliver unparalleled accuracy and speed.
            </p>
          </div>

          <div className="grid-auto-fit">
            {[
              {
                icon: <BrainIcon />,
                title: "Advanced AI",
                description: "Powered by state-of-the-art machine learning algorithms trained on extensive financial datasets.",
                color: "from-primary to-primary-dark"
              },
              {
                icon: <LightningIcon />,
                title: "Instant Results",
                description: "Get your credit approval prediction in seconds, not days. No waiting, no delays.",
                color: "from-secondary to-purple-600"
              },
              {
                icon: <ShieldIcon />,
                title: "Secure & Private",
                description: "Your data is encrypted and secure. We never store sensitive information.",
                color: "from-accent to-orange-600"
              },
              {
                icon: <CreditCardIcon />,
                title: "Comprehensive Analysis",
                description: "Evaluates multiple factors including income, education, and property ownership.",
                color: "from-green-400 to-green-600"
              }
            ].map((feature, index) => (
              <div key={index} className="card group animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Predictor Section */}
      <section id="predictor" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Credit <span className="gradient-text">Predictor</span>
            </h2>
            <p className="text-xl text-gray-300">
              Enter your information below to get an instant credit approval prediction
            </p>
          </div>

          <div className="card animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Car Owner
                  </label>
                  <select
                    name="Car_Owner"
                    value={formData.Car_Owner}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select option</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Property Owner
                  </label>
                  <select
                    name="Propert_Owner"
                    value={formData.Propert_Owner}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select option</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Annual Income
                  </label>
                  <input
                    type="number"
                    name="Annual_income"
                    value={formData.Annual_income}
                    onChange={handleChange}
                    required
                    placeholder="Enter annual income"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Education Level
                  </label>
                  <select
                    name="EDUCATION"
                    value={formData.EDUCATION}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select education level</option>
                    <option value="0">None</option>
                    <option value="1">High School</option>
                    <option value="2">College</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Get Prediction</span>
                      <ArrowIcon />
                    </div>
                  )}
                </button>
              </div>
            </form>

            {result && (
              <div className="mt-8 p-6 rounded-xl glass animate-fade-in">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-4 h-4 rounded-full ${result === "Approved" ? "bg-green-500" : "bg-red-500"} animate-pulse-slow`}></div>
                  <h3 className="text-xl font-bold text-white">Prediction Result</h3>
                </div>
                <div className={`text-2xl font-bold ${result === "Approved" ? "text-green-400" : "text-red-400"}`}>
                  {result}
                </div>
                <p className="text-gray-300 mt-2">
                  {result === "Approved" 
                    ? "Congratulations! Your application meets our criteria for credit approval."
                    : "Based on the provided information, your application does not meet our current criteria."
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <CreditCardIcon />
            </div>
            <span className="text-xl font-bold gradient-text">CreditAI</span>
          </div>
          <p className="text-gray-400">
            © 2024 CreditAI. Advanced credit assessment powered by machine learning.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

