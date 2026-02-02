import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import personalResume from '../assets/resume.pdf';
import herovideo from '../assets/test.mp4';
import Typed from 'typed.js';


const Hero: React.FC = () => {
  const typedRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const strings = [
      personalInfo.title,
      'Graduate Student at ASU',
      'BIM and Project Coordination',
      "Aspiring Construction Technologist"
    ];

    const typed = new Typed('#typed', {
      strings,
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 1500,
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    // Hero section spans full viewport height with gradient background
    <section id="home" className="relative min-h-screen flex items-center justify-center py-16 overflow-hidden dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 bg-gradient-to-b from-white to-gray-100">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-40 dark:opacity-50 z-10 pointer-events-none">
        <source src={herovideo} type="video/mp4" />
        {`${personalInfo.name} background`}
      </video>
      <div className="container px-4 mx-auto">
        {/* Animated content container with entrance animation */}
        <motion.div
          className="flex flex-col items-center text-center relative z-10"
          initial="hidden"
          animate="visible" // Auto-plays on page load (not scroll-triggered)
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          {/* Main headline with highlighted name */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Hi, I'm <span className="text-blue-400">{personalInfo.name}</span>
          </h1>
          {/* Professional title/role */}
          <h2 className="text-2xl md:text-3xl mb-8 dark:text-gray-300 text-gray-600">
            <span id="typed" ref={typedRef} className="inline-block">{personalInfo.title}</span>
          </h2>
          {/* Brief introduction paragraph */}
          <p className="text-lg md:text-xl max-w-2xl mb-10 dark:text-gray-400 text-gray-700">
            {personalInfo.description}
          </p>
          {/* Call-to-action buttons */}
          <div className="flex gap-4">
            {/* Primary CTA - Contact button */}
            <a
              href="#contact"
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-colors"
            >
              Contact Me
            </a>
            {/* Secondary CTA - Resume download/view */}
            <a
              href={personalResume}
              className="px-8 py-3 bg-transparent border border-blue-500 hover:bg-blue-500/10 text-blue-400 font-semibold rounded-md transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
