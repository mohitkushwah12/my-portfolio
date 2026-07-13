// src/components/sections/Projects.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '../../data/portfolioData';
import { FaGithub, FaExternalLinkAlt, FaStar } from 'react-icons/fa';

const ProjectCard = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            layout
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group"
        >
            <div className="glass-card rounded-2xl overflow-hidden hover:neon-border transition-all duration-500">
                {/* Image */}
                <div className="relative overflow-hidden h-52">
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                        transition={{ duration: 0.6 }}
                    />

                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-dark-300/90 via-dark-300/50 to-transparent flex items-end justify-between p-4"
                    >
                        <div className="flex gap-3">
                            <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-primary transition-colors"
                            >
                                <FaGithub size={18} />
                            </motion.a>
                            <motion.a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-primary transition-colors"
                            >
                                <FaExternalLinkAlt size={18} />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Featured Badge */}
                    {project.featured && (
                        <div className="absolute top-3 right-3">
                            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/90 text-yellow-900 text-xs font-bold">
                                <FaStar size={10} />
                                Featured
                            </span>
                        </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full glass-card text-xs font-semibold text-white">
                            {project.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-xl font-bold dark:text-white text-dark-200 font-heading mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    <p className="dark:text-gray-400 text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2">
                        {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-primary/10 text-primary"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 4 && (
                            <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-gray-500/10 dark:text-gray-400 text-gray-500">
                                +{project.technologies.length - 4}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [activeFilter, setActiveFilter] = useState('All');

    const categories = ['All', ...new Set(projects.map((p) => p.category))];

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter((p) => p.category === activeFilter);

    return (
        <section id="projects" className="section-padding relative overflow-hidden">
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl" />

            <div className="container-custom relative z-10" ref={ref}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full glass-card text-primary text-sm font-semibold mb-4">
                        My Work
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading dark:text-white text-dark-200 mb-4">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="dark:text-gray-400 text-gray-500 max-w-2xl mx-auto">
                        Here are some of my recent projects that showcase my skills and experience
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((cat) => (
                        <motion.button
                            key={cat}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                ${activeFilter === cat
                                    ? 'gradient-bg text-white shadow-lg shadow-primary/30'
                                    : 'glass-card dark:text-gray-300 text-gray-600 hover:text-primary'
                                }`}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    <AnimatePresence>
                        {filteredProjects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;