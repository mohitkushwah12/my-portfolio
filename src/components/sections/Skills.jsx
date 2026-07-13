// src/components/sections/Skills.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills } from '../../data/portfolioData';

const Skills = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [activeTab, setActiveTab] = useState('mobile');

    const tabs = [
        { key: 'mobile', label: 'Mobile Dev', icon: '📱' },
        { key: 'backend', label: 'Backend', icon: '⚙️' },
        { key: 'frontend', label: 'Frontend', icon: '🎨' },
        { key: 'database', label: 'Database', icon: '🗄️' },
        { key: 'ai_tools', label: 'AI & Tools', icon: '🤖' },
    ];

    return (
        <section id="skills" className="section-padding relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full filter blur-3xl" />

            <div className="container-custom relative z-10" ref={ref}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full glass-card text-primary text-sm font-semibold mb-4">
                        My Skills
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading dark:text-white text-dark-200 mb-4">
                        Technologies I <span className="gradient-text">Work With</span>
                    </h2>
                    <p className="dark:text-gray-400 text-gray-500 max-w-2xl mx-auto">
                        I specialize in mobile app development with Flutter and backend development with Java Spring Boot
                    </p>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.key}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-5 py-2.5 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 text-sm md:text-base
                ${activeTab === tab.key
                                    ? 'gradient-bg text-white shadow-lg shadow-primary/30'
                                    : 'glass-card dark:text-gray-300 text-gray-600 hover:text-primary'
                                }`}
                        >
                            <span>{tab.icon}</span>
                            {tab.label}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Skills Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
                    >
                        {skills[activeTab]?.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="glass-card rounded-2xl p-6 hover:neon-border transition-all duration-500 group cursor-pointer"
                            >
                                {/* Icon */}
                                <div className="flex justify-center mb-4">
                                    <motion.div
                                        whileHover={{ rotate: 360, scale: 1.2 }}
                                        transition={{ duration: 0.6 }}
                                        className="p-3 rounded-2xl"
                                        style={{ backgroundColor: `${skill.color}15` }}
                                    >
                                        <skill.icon
                                            size={32}
                                            style={{ color: skill.color }}
                                        />
                                    </motion.div>
                                </div>

                                {/* Skill Name */}
                                <h3 className="text-center font-semibold dark:text-white text-dark-200 text-sm mb-2 font-heading">
                                    {skill.name}
                                </h3>

                                {/* Description */}
                                {skill.description && (
                                    <p className="text-center text-xs dark:text-gray-500 text-gray-400 mb-3 line-clamp-2">
                                        {skill.description}
                                    </p>
                                )}

                                {/* Progress Bar */}
                                <div className="relative">
                                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                                            transition={{ duration: 1.5, delay: index * 0.1, ease: 'easeOut' }}
                                            className="h-full rounded-full relative"
                                            style={{
                                                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                                            }}
                                        />
                                    </div>
                                    {/* Percentage */}
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={inView ? { opacity: 1 } : {}}
                                        transition={{ delay: 1 + index * 0.1 }}
                                        className="absolute -top-6 right-0 text-xs font-bold"
                                        style={{ color: skill.color }}
                                    >
                                        {skill.level}%
                                    </motion.span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Bottom Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex flex-wrap items-center justify-center gap-6 glass-card rounded-2xl px-8 py-4">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">📱</span>
                            <span className="dark:text-gray-300 text-gray-600 font-medium">Mobile Expert</span>
                        </div>
                        <div className="w-px h-8 bg-gray-300 dark:bg-gray-700" />
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">⚡</span>
                            <span className="dark:text-gray-300 text-gray-600 font-medium">Backend Pro</span>
                        </div>
                        <div className="w-px h-8 bg-gray-300 dark:bg-gray-700" />
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🤖</span>
                            <span className="dark:text-gray-300 text-gray-600 font-medium">AI Enthusiast</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;