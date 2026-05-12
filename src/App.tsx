/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import Donate from './pages/Donate';
import Impact from './pages/Impact';
import type { Page } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setPage={setCurrentPage} />;
      case 'programs':
        return <Programs setPage={setCurrentPage} />;
      case 'detail':
        return <ProgramDetail setPage={setCurrentPage} />;
      case 'donate':
        return <Donate setPage={setCurrentPage} />;
      case 'impact':
        return <Impact setPage={setCurrentPage} />;
      default:
        return <Home setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary-100 selection:text-primary-900">
      <Header currentPage={currentPage} setPage={setCurrentPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setPage={setCurrentPage} />
    </div>
  );
}
