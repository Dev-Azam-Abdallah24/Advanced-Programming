import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Components
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import ProgressBar from './components/ProgressBar';
import BackToTop from './components/BackToTop';
import HomePage from './components/HomePage';
import LectureDetail from './components/LectureDetail';
import SearchResults from './components/SearchResults';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <ProgressBar progress={scrollProgress} />
      
      <Router>
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lecture/:id" element={<LectureDetail />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </AnimatePresence>
        
        <BackToTop />
      </Router>
    </div>
  );
}

export default App;
