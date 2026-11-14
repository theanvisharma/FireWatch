import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ToastContainer } from '../components/common/Toast';
import { ErrorBoundary } from '../components/common/ErrorBoundary';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-bg-main text-text-primary flex flex-col antialiased transition-colors duration-200">
      {/* Sleek Horizontal Top Navigation Bar */}
      <Navbar />

      {/* Main Page Canvas */}
      <main className="flex-1 w-full max-w-[1480px] mx-auto p-4 sm:p-6 md:p-8">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>

      {/* Professional Footer */}
      <Footer />

      {/* Global Toast Container */}
      <ToastContainer />
    </div>
  );
}
