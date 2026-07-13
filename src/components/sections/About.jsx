// src/components/sections/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personalInfo, services } from '../../data/portfolioData';
import { FaCheckCircle, FaDownload } from 'react-icons/fa';

const About = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const highlights = [
        "Clean & Maintainable Code",
        "Responsive & Accessible Design",
        "Performance Optimized",
        "Modern UI/UX Practices",
        "Agile Development",
        "Continuous Learning",
    ];

    return (
        <section id="about" className="section-padding relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full filter blur-3xl" />

            <div className="container-custom relative z-10" ref={ref}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full glass-card text-primary text-sm font-semibold mb-4">
                        About Me
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading dark:text-white text-dark-200 mb-4">
                        Know Me <span className="gradient-text">Better</span>
                    </h2>
                    <p className="dark:text-gray-400 text-gray-500 max-w-2xl mx-auto">
                        Here's a brief introduction about myself, my journey, and what I love doing
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                    {/* Left - Image & Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative group">
                            {/* Main Image */}
                            <div className="relative rounded-3xl overflow-hidden">
                                <img
                                    src={personalInfo.heroImage}
                                    alt="About me"
                                    className="w-full h-96 object-cover rounded-3xl group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-300/80 via-transparent to-transparent" />
                            </div>

                            {/* Experience Badge */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -bottom-6 -right-6 glass-card-solid rounded-2xl p-6 shadow-2xl"
                            >
                                <div className="text-center">
                                    <span className="text-4xl font-bold gradient-text">3+</span>
                                    <p className="dark:text-gray-300 text-gray-600 text-sm font-medium mt-1">
                                        Years Experience
                                    </p>
                                </div>
                            </motion.div>

                            {/* Code Badge */}
                            <motion.div
                                animate={{ x: [0, -8, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -top-6 -left-6 glass-card-solid rounded-2xl p-4 shadow-2xl hidden md:block"
                            >
                                <pre className="text-xs font-mono text-primary">
                                    <code>{`const passion = true;\nconst skills = "∞";`}</code>
                                </pre>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3 className="text-2xl md:text-3xl font-bold font-heading dark:text-white text-dark-200 mb-6">
                            A Passionate Developer who loves
                            <span className="gradient-text"> Building Things</span>
                        </h3>

                        <p className="dark:text-gray-400 text-gray-500 leading-relaxed mb-6">
                            {personalInfo.description}
                        </p>

                        <p className="dark:text-gray-400 text-gray-500 leading-relaxed mb-8">
                            I believe in writing clean, maintainable code and creating user experiences
                            that are both beautiful and functional. When I'm not coding, you can find me
                            exploring new technologies, contributing to open-source projects, or sharing
                            knowledge through blog posts and mentoring.
                        </p>

                        {/* Highlights */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    className="flex items-center gap-2"
                                >
                                    <FaCheckCircle className="text-primary flex-shrink-0" />
                                    <span className="dark:text-gray-300 text-gray-600 text-sm font-medium">
                                        {item}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA */}
                        <motion.a
                            href={personalInfo.resumeLink}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-primary inline-flex items-center gap-2"
                            download="Mohit_Kushwah_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer">
                            Download Resume
                            <FaDownload />
                        </motion.a>
                    </motion.div>
                </div>

                {/* Services Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold font-heading dark:text-white text-dark-200 text-center mb-12">
                        What I <span className="gradient-text">Offer</span>
                    </h3>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="glass-card rounded-2xl p-6 hover:neon-border transition-all duration-500 group"
                            >
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </div>
                                <h4 className="text-lg font-bold dark:text-white text-dark-200 mb-2 font-heading">
                                    {service.title}
                                </h4>
                                <p className="dark:text-gray-400 text-gray-500 text-sm mb-4 leading-relaxed">
                                    {service.description}
                                </p>
                                <ul className="space-y-1.5">
                                    {service.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 text-xs dark:text-gray-400 text-gray-500">
                                            <span className="w-1 h-1 bg-primary rounded-full" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;