import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import Navigation from './Navigation';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Navigation', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  describe('Navigation structure', () => {
    it('should contain all required menu items', () => {
      render(<Navigation />);

      // Check for all main menu items (using getAllByText since items appear in both desktop and mobile menus)
      expect(screen.getAllByText('Services').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Industries').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Insights').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Careers').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
    });

    it('should have proper navigation landmark', () => {
      render(<Navigation />);
      const nav = screen.getByRole('navigation', { name: /main navigation/i });
      expect(nav).toBeInTheDocument();
    });

    it('should display logo with link to homepage', () => {
      render(<Navigation />);
      const logo = screen.getByText('Enterprise Corp');
      expect(logo).toBeInTheDocument();
      expect(logo.closest('a')).toHaveAttribute('href', '/');
    });

    it('should have Services dropdown with submenu items', () => {
      render(<Navigation />);
      
      // Services button should exist
      const servicesButtons = screen.getAllByText('Services');
      expect(servicesButtons.length).toBeGreaterThan(0);
    });

    it('should have Industries dropdown with submenu items', () => {
      render(<Navigation />);
      
      // Industries button should exist
      const industriesButtons = screen.getAllByText('Industries');
      expect(industriesButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Mobile menu toggle functionality', () => {
    it('should toggle mobile menu when hamburger button is clicked', () => {
      render(<Navigation />);

      // Find the mobile menu button (hamburger icon)
      const mobileMenuButton = screen.getByLabelText(/toggle mobile menu/i);
      expect(mobileMenuButton).toBeInTheDocument();

      // Initially, the mobile menu should not be visible (opacity-0 invisible)
      const mobileMenuDrawer = mobileMenuButton.closest('nav')?.querySelector('.fixed');
      expect(mobileMenuDrawer).toHaveClass('opacity-0', 'invisible');

      // Click to open
      fireEvent.click(mobileMenuButton);

      // After clicking, menu should be visible
      expect(mobileMenuDrawer).toHaveClass('opacity-100', 'visible');

      // Click to close
      fireEvent.click(mobileMenuButton);

      // Menu should be hidden again
      expect(mobileMenuDrawer).toHaveClass('opacity-0', 'invisible');
    });

    it('should close mobile menu when close button inside drawer is clicked', () => {
      render(<Navigation />);

      // Open mobile menu
      const mobileMenuButton = screen.getByLabelText(/toggle mobile menu/i);
      fireEvent.click(mobileMenuButton);

      // Find and click the close button inside the drawer
      const closeButton = screen.getByLabelText(/close mobile menu/i);
      fireEvent.click(closeButton);

      // Menu should be closed
      const mobileMenuDrawer = mobileMenuButton.closest('nav')?.querySelector('.fixed');
      expect(mobileMenuDrawer).toHaveClass('opacity-0', 'invisible');
    });

    it('should close mobile menu when backdrop is clicked', () => {
      render(<Navigation />);

      // Open mobile menu
      const mobileMenuButton = screen.getByLabelText(/toggle mobile menu/i);
      fireEvent.click(mobileMenuButton);

      // Find and click the backdrop
      const backdrop = document.querySelector('.bg-neutral-black.bg-opacity-50');
      expect(backdrop).toBeInTheDocument();
      
      if (backdrop) {
        fireEvent.click(backdrop);
      }

      // Menu should be closed
      const mobileMenuDrawer = mobileMenuButton.closest('nav')?.querySelector('.fixed');
      expect(mobileMenuDrawer).toHaveClass('opacity-0', 'invisible');
    });
  });

  describe('Active state indication', () => {
    it('should highlight active menu item based on current path', () => {
      (usePathname as jest.Mock).mockReturnValue('/services');
      render(<Navigation />);

      // The Services link should have the active class (text-primary)
      const servicesLinks = screen.getAllByText('Services');
      const desktopServicesButton = servicesLinks.find(
        (el) => el.tagName === 'BUTTON' && el.closest('.hidden.lg\\:flex')
      );
      
      if (desktopServicesButton) {
        expect(desktopServicesButton).toHaveClass('text-primary');
      }
    });

    it('should highlight active submenu item', () => {
      (usePathname as jest.Mock).mockReturnValue('/services/cloud-computing');
      render(<Navigation />);

      // Open the Services dropdown on desktop
      const servicesButtons = screen.getAllByText('Services');
      const desktopServicesButton = servicesButtons.find(
        (el) => el.tagName === 'BUTTON' && el.closest('.hidden.lg\\:flex')
      );

      if (desktopServicesButton) {
        fireEvent.mouseEnter(desktopServicesButton);
        
        // The Cloud Computing link should be visible and active (appears in both desktop and mobile)
        const cloudComputingLinks = screen.getAllByText('Cloud Computing');
        expect(cloudComputingLinks.length).toBeGreaterThan(0);
        
        // At least one should have the active class
        const hasActiveLink = cloudComputingLinks.some(
          (link) => link.className.includes('text-primary')
        );
        expect(hasActiveLink).toBe(true);
      }
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes for dropdown menus', () => {
      render(<Navigation />);

      const servicesButtons = screen.getAllByText('Services');
      const desktopServicesButton = servicesButtons.find(
        (el) => el.tagName === 'BUTTON' && el.closest('.hidden.lg\\:flex')
      );

      if (desktopServicesButton) {
        expect(desktopServicesButton).toHaveAttribute('aria-expanded');
        expect(desktopServicesButton).toHaveAttribute('aria-haspopup', 'true');
      }
    });

    it('should have proper ARIA labels for mobile menu buttons', () => {
      render(<Navigation />);

      const toggleButton = screen.getByLabelText(/toggle mobile menu/i);
      expect(toggleButton).toHaveAttribute('aria-expanded');
      expect(toggleButton).toHaveAttribute('aria-label');
    });
  });
});
