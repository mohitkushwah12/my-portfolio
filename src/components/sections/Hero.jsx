// src/components/sections/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import { personalInfo, socialLinks, stats, roles } from '../../data/portfolioData';
import { FaDownload } from 'react-icons/fa';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const Hero = () => {
    const typedText = useTypingEffect(roles, 100, 50, 2000);
    const [ref, inView] = useInView({ triggerOnce: true });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center section-padding pt-32"
        >
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 -left-40 w-80 h-80 bg-primary/20 rounded-full filter blur-3xl animate-blob" />
                <div className="absolute top-40 -right-40 w-80 h-80 bg-secondary/20 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-accent/20 rounded-full filter blur-3xl animate-blob animation-delay-4000" />
            </div>

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Left Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="order-2 lg:order-1"
                    >
                        {/* Status Badge */}
                        <motion.div variants={itemVariants} className="mb-6">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium dark:text-green-400 text-green-600">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                {personalInfo.available ? 'Available for work' : 'Currently employed'}
                            </span>
                        </motion.div>

                        {/* Greeting */}
                        <motion.p
                            variants={itemVariants}
                            className="text-lg md:text-xl dark:text-gray-300 text-gray-600 font-medium mb-2"
                        >
                            Hello, I'm 👋
                        </motion.p>

                        {/* Name */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-4"
                        >
                            <span className="dark:text-white text-dark-200">
                                {personalInfo.firstName}{' '}
                            </span>
                            <span className="gradient-text">{personalInfo.lastName}</span>
                        </motion.h1>

                        {/* Typing Effect */}
                        <motion.div
                            variants={itemVariants}
                            className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 h-10"
                        >
                            <span className="dark:text-gray-300 text-gray-600">I'm a </span>
                            <span className="text-primary">
                                {typedText}
                                <span className="animate-pulse text-primary">|</span>
                            </span>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            className="text-base md:text-lg dark:text-gray-400 text-gray-500 mb-8 max-w-xl leading-relaxed"
                        >
                            {personalInfo.description}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-4 mb-10"
                        >
                            <Link to="contact" smooth={true} duration={500} offset={-80}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-primary flex items-center gap-2"
                                >
                                    Let's Talk
                                    <span className="animate-bounce-slow">💬</span>
                                </motion.button>
                            </Link>

                            <motion.a
                                href={personalInfo.resumeLink}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-outline flex items-center gap-2"
                                download="Mohit_Kushwah_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaDownload />
                                Download CV
                            </motion.a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div variants={itemVariants} className="flex items-center gap-4">
                            <span className="dark:text-gray-400 text-gray-500 text-sm font-medium">
                                Find me on:
                            </span>
                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.2, y: -5 }}
                                        whileTap={{ scale: 0.9 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 + index * 0.1 }}
                                        className="p-2.5 rounded-xl glass-card hover:neon-border transition-all duration-300 dark:text-gray-300 text-gray-600 hover:text-primary"
                                        title={social.name}
                                    >
                                        <social.icon size={20} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
                        className="order-1 lg:order-2 flex justify-center"
                    >
                        <div className="relative">
                            {/* Rotating Border */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
                                style={{ width: '105%', height: '105%', top: '-2.5%', left: '-2.5%' }}
                            />

                            {/* Glow Effect */}
                            <div className="absolute inset-0 rounded-full gradient-bg opacity-20 blur-2xl animate-pulse-slow" />

                            {/* Profile Image */}
                            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/20 animate-morph">
                                <img
                                    src={personalInfo.profileImage}
                                    alt={personalInfo.name}
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                            </div>

                            {/* Floating Badges */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -top-4 -right-4 glass-card px-4 py-2 rounded-2xl shadow-xl"
                            >
                                <span className="text-2xl">⚡</span>
                                <span className="dark:text-white text-dark-200 font-semibold text-sm ml-1">
                                    Developer
                                </span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -bottom-4 -left-4 glass-card px-4 py-2 rounded-2xl shadow-xl"
                            >
                                <span className="text-2xl">🎨</span>
                                <span className="dark:text-white text-dark-200 font-semibold text-sm ml-1">
                                    Designer
                                </span>
                            </motion.div>

                            <motion.div
                                animate={{ x: [0, -10, 0] }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="absolute top-1/2 -right-8 glass-card px-3 py-2 rounded-2xl shadow-xl hidden sm:block"
                            >
                                <span className="text-2xl">🚀</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Stats Section */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            className="glass-card rounded-2xl p-6 text-center hover-lift group"
                        >
                            <div className="text-3xl md:text-4xl font-bold font-heading gradient-text mb-2">
                                {inView && (
                                    <CountUp end={stat.number} duration={2.5} suffix={stat.suffix} />
                                )}
                            </div>
                            <p className="dark:text-gray-400 text-gray-500 text-sm font-medium group-hover:text-primary transition-colors">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;