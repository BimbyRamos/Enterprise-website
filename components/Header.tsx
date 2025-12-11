import React from 'react';
import Navigation from './Navigation';

const Header: React.FC = () => {
  return (
    <header 
      className="sticky top-0 z-50 transition-all duration-500 ease-in-out"
      style={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(139, 21, 56, 0.1)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.5) inset'
      }}
    >
      <Navigation />
    </header>
  );
};

export default Header;
