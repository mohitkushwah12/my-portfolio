// src/App.js
import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen dark:bg-dark-300 bg-white transition-colors duration-500">
        {/* Loading Screen */}
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

        {/* Custom Cursor */}
        <CustomCursor />

        {/* Scroll Progress */}
        <ScrollProgress />

        {/* Particle Background */}
        <ParticleBackground />

        {/* Main Content */}
        {!isLoading && (
          <>
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Testimonials />
              <Contact />
            </main>
            <Footer />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;