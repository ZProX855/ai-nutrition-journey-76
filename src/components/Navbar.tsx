
import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth',
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-xl font-medium text-primary flex items-center gap-2">
            <span className="text-2xl">🍃</span>
            <span>Wellness AI</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink onClick={() => scrollToSection('food-comparison')}>Food Comparison</NavLink>
          <NavLink onClick={() => scrollToSection('bmi-calculator')}>BMI Calculator</NavLink>
          <NavLink onClick={() => scrollToSection('ai-assistant')}>AI Assistant</NavLink>
          <NavLink onClick={() => scrollToSection('meal-recognition')}>Meal Analysis</NavLink>
          <NavLink onClick={() => scrollToSection('body-type')}>Body Types</NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground p-2 rounded-full"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md animate-slide-down">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <MobileNavLink onClick={() => scrollToSection('food-comparison')}>Food Comparison</MobileNavLink>
            <MobileNavLink onClick={() => scrollToSection('bmi-calculator')}>BMI Calculator</MobileNavLink>
            <MobileNavLink onClick={() => scrollToSection('ai-assistant')}>AI Assistant</MobileNavLink>
            <MobileNavLink onClick={() => scrollToSection('meal-recognition')}>Meal Analysis</MobileNavLink>
            <MobileNavLink onClick={() => scrollToSection('body-type')}>Body Types</MobileNavLink>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
  >
    {children}
  </button>
);

const MobileNavLink = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full text-left py-3 border-b border-border text-foreground hover:text-primary transition-colors duration-200"
  >
    {children}
  </button>
);

export default Navbar;
