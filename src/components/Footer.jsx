// src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { personalInfo, socialLinks, navLinks } from '../data/portfolioData';
import { FaHeart, FaArrowUp, FaCode } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="relative overflow-hidden">
            {/* Top Gradient Line */}
            <div className="h-px w-full gradient-bg" />

            <div className="section-padding py-12 dark:bg-dark-300/50 bg-gray-50/50">
                <div className="container-custom">
                    <div className="grid md:grid-cols-3 gap-12 mb-12">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl font-heading">
                                        {personalInfo.firstName[0]}
                                    </span>
                                </div>
                                <span className="text-xl font-bold font-heading dark:text-white text-dark-200">
                                    {personalInfo.firstName}
                                    <span className="gradient-text">.dev</span>
                                </span>
                            </div>
                            <p className="dark:text-gray-400 text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">
                                {personalInfo.shortBio}
                            </p>
                            {/* Social Links */}
                            <div className="flex gap-3">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.2, y: -3 }}
                                        className="p-2.5 rounded-xl glass-card dark:text-gray-400 text-gray-500 hover:text-primary transition-all"
                                    >
                                        <social.icon size={16} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-bold dark:text-white text-dark-200 font-heading mb-4">
                                Quick Links
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.to}
                                        smooth={true}
                                        duration={500}
                                        offset={-80}
                                        className="dark:text-gray-400 text-gray-500 hover:text-primary cursor-pointer text-sm py-1 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-lg font-bold dark:text-white text-dark-200 font-heading mb-4">
                                Get In Touch
                            </h3>
                            <div className="space-y-3">
                                <p className="dark:text-gray-400 text-gray-500 text-sm">
                                    📧 {personalInfo.email}
                                </p>
                                <p className="dark:text-gray-400 text-gray-500 text-sm">
                                    📱 {personalInfo.phone}
                                </p>
                                <p className="dark:text-gray-400 text-gray-500 text-sm">
                                    📍 {personalInfo.location}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t dark:border-gray-800 border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="dark:text-gray-400 text-gray-500 text-sm text-center md:text-left">
                            © {new Date().getFullYear()} {personalInfo.name}. Made with{' '}
                            <FaHeart className="inline text-red-500 animate-pulse mx-1" />{' '}
                            and <FaCode className="inline text-primary mx-1" />
                        </p>

                        {/* Back to Top */}
                        <Link to="home" smooth={true} duration={500}>
                            <motion.button
                                whileHover={{ scale: 1.1, y: -3 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-3 rounded-xl gradient-bg text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
                            >
                                <FaArrowUp size={16} />
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;