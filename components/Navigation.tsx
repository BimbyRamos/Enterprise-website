'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: 'About Us',
    href: '/#about',
  },
  {
    label: 'Products and Services',
    href: '/#services',
  },
  {
    label: 'Projects',
    href: '/#projects',
  },
  {
    label: 'Industries',
    href: '/#industries',
  },
];

const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const pathname = usePathname();

  // Smooth scroll handler
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Check if it's a hash link (either #section or /#section)
    const hashIndex = href.indexOf('#');
    if (hashIndex !== -1) {
      const targetId = href.substring(hashIndex + 1);
      const isHomePage = pathname === '/';
      
      // If we're on homepage and it's a hash link, scroll smoothly
      if (isHomePage && targetId) {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerOffset = 80; // Height of sticky header
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          setMobileMenuOpen(false);
          setOpenDropdown(null);
        }
      }
      // If we're not on homepage, let Next.js handle the navigation to /#section
      // which will navigate to homepage and then scroll to the section
    }
  };

  const isActive = (href: string) => {
    // Handle hash links (/#section)
    const hashIndex = href.indexOf('#');
    if (hashIndex !== -1) {
      const targetId = href.substring(hashIndex + 1);
      return pathname === '/' && activeSection === targetId;
    }
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setOpenDropdown(null);
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  // Track active section on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'services', 'projects', 'industries'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="container mx-auto px-6 lg:px-8" aria-label="Main navigation">
      <div className="h-20 flex items-center justify-between gap-8">
        {/* Logo - Premium Quality */}
        <Link 
          href="/" 
          className="flex items-center flex-shrink-0 hover:opacity-90 transition-all duration-500 ease-in-out focus-visible-ring rounded-lg group"
          onClick={() => {
            // Reset active section when logo is clicked
            setActiveSection('');
            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img 
            src="/Logo Footer Dec 10.jpg" 
            alt="Networld Capital Ventures, Inc." 
            className="h-14 w-auto transition-transform duration-500 ease-in-out group-hover:scale-[1.03]"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
            }}
            onError={(e) => {
              // Fallback to text if image fails to load
              e.currentTarget.style.display = 'none';
              const fallback = document.createElement('span');
              fallback.textContent = 'Networld Capital Ventures';
              fallback.className = 'text-xl font-bold';
              fallback.style.color = '#8B1538';
              e.currentTarget.parentElement?.appendChild(fallback);
            }}
          />
        </Link>

        {/* Desktop Navigation - Premium Centered Design */}
        <ul className="hidden lg:flex items-center justify-center flex-1 gap-2">
          {menuItems.map((item) => (
            <li key={item.label} className="relative group">
              {item.children ? (
                <>
                  <button
                    className={`px-6 py-3 text-base font-semibold rounded-xl transition-all duration-500 ease-in-out focus-visible-ring whitespace-nowrap relative overflow-hidden ${
                      isActive(item.href)
                        ? 'text-primary-700'
                        : 'text-neutral-700 hover:text-primary-700'
                    }`}
                    style={isActive(item.href) ? {
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(139, 21, 56, 0.15)',
                      boxShadow: '0 4px 16px rgba(139, 21, 56, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.8)'
                    } : {
                      background: 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(139, 21, 56, 0.1)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                    }}
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    onClick={() => toggleDropdown(item.label)}
                    aria-expanded={openDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {/* Active indicator line */}
                    {isActive(item.href) && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full"
                        style={{ 
                          background: 'linear-gradient(90deg, #8B1538 0%, #DC2626 100%)',
                          boxShadow: '0 2px 8px rgba(139, 21, 56, 0.4)',
                          animation: 'expandWidth 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                        }} />
                    )}
                    {item.label}
                    <svg
                      className={`inline-block ml-2 w-4 h-4 transition-transform duration-500 ease-in-out ${
                        openDropdown === item.label ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {/* Premium Dropdown Menu */}
                  <ul
                    className={`absolute left-0 top-full mt-2 w-64 bg-white border border-neutral-200 rounded-xl shadow-premium overflow-hidden transition-all duration-500 ease-in-out z-50 ${
                      openDropdown === item.label
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-2'
                    }`}
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {item.children.map((child, index) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={(e) => handleSmoothScroll(e, child.href)}
                          className={`block px-5 py-3.5 text-base transition-all duration-400 ease-in-out focus-visible-ring ${
                            isActive(child.href)
                              ? 'text-primary-700 bg-primary-50 border-l-4 border-primary-700'
                              : 'text-neutral-700 hover:text-primary-700 hover:bg-neutral-50 hover:border-l-4 hover:border-primary-300'
                          } ${index !== 0 ? 'border-t border-neutral-100' : ''}`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={`block px-6 py-3 text-base font-semibold rounded-xl transition-all duration-500 ease-in-out focus-visible-ring whitespace-nowrap relative overflow-hidden ${
                    isActive(item.href)
                      ? 'text-primary-700'
                      : 'text-neutral-700 hover:text-primary-700 hover:scale-[1.02]'
                  }`}
                  style={isActive(item.href) ? {
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(139, 21, 56, 0.15)',
                    boxShadow: '0 4px 16px rgba(139, 21, 56, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.8)'
                  } : {
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(139, 21, 56, 0.1)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  {/* Active indicator line */}
                  {isActive(item.href) && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full"
                      style={{ 
                        background: 'linear-gradient(90deg, #8B1538 0%, #DC2626 100%)',
                        boxShadow: '0 2px 8px rgba(139, 21, 56, 0.4)',
                        animation: 'expandWidth 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                      }} />
                  )}
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* CTA Button - Premium Design */}
        <div className="hidden lg:block flex-shrink-0">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold rounded-xl text-white transition-all duration-500 ease-in-out focus-visible-ring whitespace-nowrap hover:scale-[1.03] hover:shadow-xl group relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #8B1538 0%, #2563EB 100%)',
              boxShadow: '0 4px 16px rgba(139, 21, 56, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2)'
            }}
          >
            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 ease-in-out"
              style={{ 
                background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)',
                animation: 'shine 3s ease-in-out infinite'
              }} />
            <span className="relative z-10">Explore Solutions</span>
            <svg className="w-5 h-5 relative z-10 transition-transform duration-500 ease-in-out group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2.5 text-neutral-700 hover:text-primary-700 hover:bg-neutral-50 rounded-lg transition-all duration-400 ease-in-out focus-visible-ring"
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Premium Mobile Menu Drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop with blur */}
        <div
          className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-premium transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <img 
              src="/Logo Footer Dec 10.jpg" 
              alt="Networld Capital Ventures, Inc." 
              className="h-14 w-auto"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
              }}
            />
            <button
              className="p-2 text-neutral-700 hover:text-primary-700 hover:bg-neutral-50 rounded-lg transition-all duration-300 focus-visible-ring"
              onClick={toggleMobileMenu}
              aria-label="Close mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <ul className="overflow-y-auto h-[calc(100%-180px)] p-4">
            {menuItems.map((item) => (
              <li key={item.label} className="mb-2">
                {item.children ? (
                  <>
                    <button
                      className={`w-full flex items-center justify-between px-4 py-3.5 text-base font-medium rounded-lg transition-all duration-300 focus-visible-ring ${
                        isActive(item.href)
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-neutral-700 hover:text-primary-700 hover:bg-neutral-50'
                      }`}
                      onClick={() => toggleDropdown(item.label)}
                      aria-expanded={openDropdown === item.label}
                    >
                      {item.label}
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 ${
                          openDropdown === item.label ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {openDropdown === item.label && (
                      <ul className="mt-2 ml-4 space-y-1 border-l-2 border-primary-200 pl-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={(e) => {
                                handleSmoothScroll(e, child.href);
                                toggleMobileMenu();
                              }}
                              className={`block px-4 py-2.5 text-base rounded-lg transition-all duration-300 focus-visible-ring ${
                                isActive(child.href)
                                  ? 'text-primary-700 bg-primary-50 font-medium'
                                  : 'text-neutral-600 hover:text-primary-700 hover:bg-neutral-50'
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      handleSmoothScroll(e, item.href);
                      toggleMobileMenu();
                    }}
                    className={`block px-4 py-3.5 text-base font-medium rounded-lg transition-all duration-300 focus-visible-ring ${
                      isActive(item.href)
                        ? 'text-primary-700 bg-primary-50'
                        : 'text-neutral-700 hover:text-primary-700 hover:bg-neutral-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile CTA */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-neutral-200 bg-white">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 hover:shadow-glow-primary transition-all duration-300 focus-visible-ring"
              onClick={toggleMobileMenu}
            >
              Explore Solutions
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
