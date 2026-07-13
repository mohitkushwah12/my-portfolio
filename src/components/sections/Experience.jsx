// src/components/sections/Experience.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { experiences, education } from '../../data/portfolioData';
import { FaExternalLinkAlt } from 'react-icons/fa';

const TimelineItem = ({ item, index, isLeft }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className={`relative flex items-center mb-8 md:mb-12
        ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
        >
            {/* Content Card */}
            <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-8' : 'md:pl-8'} pl-12 md:pl-0`}>
                <motion.div
                    whileHover={{ y: -5 }}
                    className="glass-card rounded-2xl p-6 hover:neon-border transition-all duration-500 group"
                >
                    {/* Duration Badge */}
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                        {item.duration}
                    </span>

                    {/* Role */}
                    <h3 className="text-lg md:text-xl font-bold dark:text-white text-dark-200 font-heading mb-1">
                        {item.role || item.degree}
                    </h3>

                    {/* Company/Institution */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-primary font-semibold text-sm">
                            {item.company || item.institution}
                        </span>
                        {item.companyUrl && (
                            <a
                                href={item.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary/50 hover:text-primary transition-colors"
                            >
                                <FaExternalLinkAlt size={10} />
                            </a>
                        )}
                    </div>

                    {/* Location */}
                    {item.location && (
                        <p className="text-xs dark:text-gray-500 text-gray-400 mb-3">
                            📍 {item.location}
                        </p>
                    )}

                    {/* Description */}
                    {Array.isArray(item.description) ? (
                        <ul className="space-y-2 mb-4">
                            {item.description.map((desc, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm dark:text-gray-400 text-gray-500">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                                    {desc}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm dark:text-gray-400 text-gray-500 mb-4">
                            {item.description}
                        </p>
                    )}

                    {/* Grade */}
                    {item.grade && (
                        <p className="text-sm font-semibold text-primary mb-4">
                            🎓 {item.grade}
                        </p>
                    )}

                    {/* Technologies */}
                    {item.technologies && (
                        <div className="flex flex-wrap gap-2">
                            {item.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-primary/10 text-primary dark:bg-primary/5"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Timeline Center */}
            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center z-10">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: index * 0.15 + 0.3, type: 'spring' }}
                    className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center shadow-lg shadow-primary/30"
                >
                    <item.icon className="text-white" size={18} />
                </motion.div>
            </div>

            {/* Empty Space for opposite side */}
            <div className="hidden md:block w-5/12" />
        </motion.div>
    );
};

const Experience = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const allItems = [
        ...experiences.map((e) => ({ ...e, type: 'experience' })),
        ...education.map((e) => ({ ...e, type: 'education' })),
    ];

    return (
        <section id="experience" className="section-padding relative overflow-hidden">
            <div className="absolute top-0 left-0 w-72 h-72 bg-accent/5 rounded-full filter blur-3xl" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl" />

            <div className="container-custom relative z-10" ref={ref}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full glass-card text-primary text-sm font-semibold mb-4">
                        My Journey
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading dark:text-white text-dark-200 mb-4">
                        Experience & <span className="gradient-text">Education</span>
                    </h2>
                    <p className="dark:text-gray-400 text-gray-500 max-w-2xl mx-auto">
                        A timeline of my professional journey and academic background
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-[18px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary" />

                    {allItems.map((item, index) => (
                        <TimelineItem
                            key={item.id + item.type}
                            item={item}
                            index={index}
                            isLeft={index % 2 === 0}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;