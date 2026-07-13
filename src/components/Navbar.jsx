// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { navLinks, personalInfo } from '../data/portfolioData';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
    const { darkMode, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled
                    ? 'py-2 glass-card-solid shadow-2xl shadow-primary/5'
                    : 'py-4 bg-transparent'
                }`}
        >
            <div className="container-custom flex items-center justify-between px-4 md:px-8">
                {/* Logo */}
                <Link to="home" smooth={true} duration={500} className="cursor-pointer">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                            <span className="text-white font-bold text-xl font-heading">
                                {personalInfo.firstName[0]}
                            </span>
                        </div>
                        <span className="text-xl font-bold font-heading dark:text-white text-dark-200">
                            {personalInfo.firstName}
                            <span className="gradient-text">.dev</span>
                        </span>
                    </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            spy={true}
                            smooth={true}
                            offset={-80}
                            duration={500}
                            onSetActive={() => setActiveSection(link.to)}
                            className="cursor-pointer"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                  ${activeSection === link.to
                                        ? 'text-primary'
                                        : 'dark:text-gray-300 text-gray-600 hover:text-primary'
                                    }`}
                            >
                                {link.name}
                                {activeSection === link.to && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute bottom-0 left-2 right-2 h-0.5 gradient-bg rounded-full"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleTheme}
                        className={`p-2.5 rounded-xl transition-all duration-300
              ${darkMode
                                ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20'
                                : 'bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20'
                            }`}
                    >
                        {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
                    </motion.button>

                    {/* Hire Me Button - Desktop */}
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden lg:block btn-primary text-sm"
                    >
                        Hire Me 🚀
                    </motion.a>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2.5 rounded-xl dark:bg-white/5 bg-gray-100 dark:text-white text-dark-200"
                    >
                        {isOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden overflow-hidden"
                    >
                        <div className="glass-card-solid mx-4 mt-2 rounded-2xl p-6 space-y-2">
                            {navLinks.map((link, index) => (
                                <Link
                                    key={link.name}
                                    to={link.to}
                                    spy={true}
                                    smooth={true}
                                    offset={-80}
                                    duration={500}
                                    onClick={() => setIsOpen(false)}
                                    className="cursor-pointer"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`px-4 py-3 rounded-xl text-base font-medium transition-all duration-300
                      ${activeSection === link.to
                                                ? 'bg-primary/10 text-primary'
                                                : 'dark:text-gray-300 text-gray-600 hover:bg-primary/5 hover:text-primary'
                                            }`}
                                    >
                                        {link.name}
                                    </motion.div>
                                </Link>
                            ))}
                            <motion.a
                                href="#contact"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="block btn-primary text-center mt-4"
                                onClick={() => setIsOpen(false)}
                            >
                                Hire Me 🚀
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;