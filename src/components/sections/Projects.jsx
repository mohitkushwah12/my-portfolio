import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '../../data/portfolioData';

import {
    FaGithub,
    FaExternalLinkAlt,
    FaStar,
    FaGooglePlay,
    FaApple,
    FaTimes,
    FaLayerGroup,
} from 'react-icons/fa';

const LINK_CONFIG = {
    github: {
        icon: FaGithub,
        label: 'GitHub',
    },
    live: {
        icon: FaExternalLinkAlt,
        label: 'Live Demo',
    },
    playStore: {
        icon: FaGooglePlay,
        label: 'Play Store',
    },
    appStore: {
        icon: FaApple,
        label: 'App Store',
    },
};

// --------------------------------------------------
// PROJECT CARD
// --------------------------------------------------

const ProjectCard = ({ project, index, reduceMotion }) => {
    const availableLinks = Object.entries(project.links || {}).filter(
        ([type, url]) =>
            LINK_CONFIG[type] &&
            typeof url === 'string' &&
            url.trim().length > 0
    );

    const technologies = Array.isArray(project.technologies)
        ? project.technologies
        : [];

    return (
        <motion.article
            layout={!reduceMotion}
            initial={
                reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 16,
                    }
            }
            animate={{
                opacity: 1,
                y: 0,
            }}
            exit={
                reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: 8,
                    }
            }
            transition={{
                duration: reduceMotion ? 0 : 0.25,
                delay: reduceMotion ? 0 : Math.min(index * 0.04, 0.16),
                layout: {
                    duration: 0.25,
                },
            }}
            className="group flex h-full min-w-0 flex-col"
        >
            <div className="glass-card flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 transition-colors duration-300 hover:border-primary/40">

                {/* Project Image */}
                <div className="relative h-52 shrink-0 overflow-hidden bg-gray-900">
                    {project.image ? (
                        <img
                            src={project.image}
                            alt={project.title || 'Project preview'}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 via-gray-900 to-secondary/20">
                            <FaLayerGroup
                                className="text-primary/70"
                                size={44}
                            />
                        </div>
                    )}

                    {/* Image Overlay */}
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-dark-300/95 via-dark-300/30 to-transparent p-4 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
                        {availableLinks.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {availableLinks.map(([type, url]) => {
                                    const config = LINK_CONFIG[type];
                                    const Icon = config.icon;

                                    return (
                                        <a
                                            key={type}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${config.label} - ${project.title}`}
                                            title={config.label}
                                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-primary"
                                        >
                                            <Icon size={16} />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                        <div className="absolute right-3 top-3">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-400/30 bg-yellow-500/90 px-3 py-1.5 text-xs font-bold text-yellow-950 shadow-lg">
                                <FaStar size={11} />
                                Featured
                            </span>
                        </div>
                    )}

                    {/* Category Badge */}
                    {project.category && (
                        <div className="absolute left-3 top-3 max-w-[75%]">
                            <span className="inline-block truncate rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                                {project.category}
                            </span>
                        </div>
                    )}
                </div>

                {/* Project Content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">

                    <h3 className="mb-3 break-words font-heading text-xl font-bold text-dark-200 transition-colors group-hover:text-primary dark:text-white">
                        {project.title}
                    </h3>

                    <p className="mb-5 line-clamp-3 flex-1 text-sm leading-7 text-gray-500 dark:text-gray-400">
                        {project.description}
                    </p>

                    {/* Technologies */}
                    {technologies.length > 0 && (
                        <div className="mb-5 flex flex-wrap gap-2">
                            {technologies.slice(0, 4).map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-lg border border-primary/10 bg-primary/5 px-2.5 py-1.5 text-xs font-medium text-primary"
                                >
                                    {tech}
                                </span>
                            ))}

                            {technologies.length > 4 && (
                                <span className="rounded-lg bg-gray-500/10 px-2.5 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                                    +{technologies.length - 4} more
                                </span>
                            )}
                        </div>
                    )}

                    {/* Project Links */}
                    <div className="mt-auto flex min-h-[42px] flex-wrap items-center gap-2 border-t border-gray-200/10 pt-4">
                        {availableLinks.length > 0 ? (
                            availableLinks.map(([type, url]) => {
                                const config = LINK_CONFIG[type];
                                const Icon = config.icon;

                                return (
                                    <a
                                        key={type}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-primary/5 px-3 py-2 text-xs font-medium text-gray-500 transition-colors hover:bg-primary/15 hover:text-primary dark:text-gray-400"
                                    >
                                        <Icon size={13} />
                                        <span>{config.label}</span>
                                    </a>
                                );
                            })
                        ) : (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                Project showcase
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

// --------------------------------------------------
// PROJECTS SECTION
// --------------------------------------------------

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const reduceMotion = useReducedMotion();

    const [sectionRef, inView] = useInView({
        triggerOnce: true,
        threshold: 0.05,
    });

    // Normalize categories and remove duplicates.
    // This prevents duplicate or inconsistent category buttons.
    const categories = useMemo(() => {
        const uniqueCategories = [
            ...new Set(
                projects
                    .map((project) =>
                        typeof project.category === 'string'
                            ? project.category.trim()
                            : ''
                    )
                    .filter(Boolean)
            ),
        ];

        return ['All', ...uniqueCategories];
    }, []);

    // Always derive the visible projects from the selected filter.
    const filteredProjects = useMemo(() => {
        if (activeFilter === 'All') {
            return projects;
        }

        return projects.filter(
            (project) =>
                typeof project.category === 'string' &&
                project.category.trim() === activeFilter
        );
    }, [activeFilter]);

    // Reset the selected category.
    const resetFilters = () => {
        setActiveFilter('All');
    };

    return (
        <section
            id="projects"
            className="section-padding relative overflow-hidden"
        >
            {/* Background Decoration */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-secondary/5 blur-3xl"
            />

            <div
                ref={sectionRef}
                className="container-custom relative z-10"
            >
                {/* Section Header */}
                <motion.div
                    initial={
                        reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                y: 20,
                            }
                    }
                    animate={
                        inView
                            ? {
                                opacity: 1,
                                y: 0,
                            }
                            : {}
                    }
                    transition={{
                        duration: reduceMotion ? 0 : 0.5,
                    }}
                    className="mb-10 text-center sm:mb-14"
                >
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
                        <FaLayerGroup size={13} />
                        My Work
                    </span>

                    <h2 className="mb-4 font-heading text-3xl font-bold text-dark-200 dark:text-white sm:text-4xl lg:text-5xl">
                        Featured{' '}
                        <span className="gradient-text">Projects</span>
                    </h2>

                    <p className="mx-auto max-w-2xl text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base">
                        Explore my projects, technologies, and applications
                        built to solve real-world problems.
                    </p>
                </motion.div>

                {/* Filter Area */}
                <div className="mb-10 sm:mb-12">

                    {/* Stable Filter Buttons */}
                    <div className="flex w-full flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                        {categories.map((category) => {
                            const isActive = activeFilter === category;

                            return (
                                <button
                                    key={category}
                                    type="button"
                                    aria-pressed={isActive}
                                    onClick={() =>
                                        setActiveFilter(category)
                                    }
                                    className={`
                                        inline-flex min-h-[42px] max-w-full
                                        items-center justify-center
                                        whitespace-normal break-words
                                        rounded-xl border px-4 py-2.5
                                        text-center text-sm font-medium
                                        transition-colors duration-200
                                        focus-visible:outline-none
                                        focus-visible:ring-2
                                        focus-visible:ring-primary
                                        focus-visible:ring-offset-2
                                        ${isActive
                                            ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
                                            : 'border-gray-200/20 bg-white/5 text-gray-600 hover:border-primary/40 hover:bg-primary/5 hover:text-primary dark:text-gray-300'
                                        }
                                    `}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>

                    {/* Result Count + Clear Filter */}
                    <div className="mt-5 flex min-h-[36px] flex-wrap items-center justify-between gap-3">
                        <p
                            aria-live="polite"
                            className="text-sm text-gray-500 dark:text-gray-400"
                        >
                            Showing{' '}
                            <span className="font-semibold text-primary">
                                {filteredProjects.length}
                            </span>{' '}
                            {filteredProjects.length === 1
                                ? 'project'
                                : 'projects'}
                        </p>

                        {activeFilter !== 'All' && (
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="inline-flex min-h-[36px] items-center justify-center gap-2 rounded-lg border border-primary/20 px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                                <FaTimes size={12} />
                                Clear Filters
                            </button>
                        )}
                    </div>
                </div>

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                    <motion.div
                        layout={!reduceMotion}
                        className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 md:gap-7 lg:grid-cols-3 lg:gap-8"
                    >
                        <AnimatePresence mode="popLayout" initial={false}>
                            {filteredProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id ?? `${project.title}-${index}`}
                                    project={project}
                                    index={index}
                                    reduceMotion={reduceMotion}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    /* Empty State */
                    <div className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300/30 px-5 py-12 text-center dark:border-white/10">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <FaLayerGroup size={24} />
                        </div>

                        <h3 className="mb-2 text-lg font-semibold text-dark-200 dark:text-white">
                            No projects found
                        </h3>

                        <p className="mb-5 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
                            There are no projects in this category yet.
                            Select another category to explore more projects.
                        </p>

                        <button
                            type="button"
                            onClick={resetFilters}
                            className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            <FaLayerGroup size={14} />
                            Show All Projects
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;









// // src/components/sections/Projects.jsx
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { projects } from '../../data/portfolioData';
// import {
//     FaGithub,
//     FaExternalLinkAlt,
//     FaStar,
//     FaGooglePlay,
//     FaApple
// } from 'react-icons/fa';

// const LINK_CONFIG = {
//     github: {
//         icon: FaGithub,
//         label: 'GitHub',
//         hoverColor: 'hover:bg-gray-700',
//     },
//     live: {
//         icon: FaExternalLinkAlt,
//         label: 'Live Demo',
//         hoverColor: 'hover:bg-primary',
//     },
//     playStore: {
//         icon: FaGooglePlay,
//         label: 'Play Store',
//         hoverColor: 'hover:bg-green-600',
//     },
//     appStore: {
//         icon: FaApple,
//         label: 'App Store',
//         hoverColor: 'hover:bg-blue-600',
//     },
// };

// const ProjectCard = ({ project, index }) => {
//     const [isHovered, setIsHovered] = useState(false);

//     // ✅ Sirf available links filter karo
//     const availableLinks = Object.entries(project.links || {}).filter(
//         ([, url]) => url && url.trim() !== ''
//     );

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -30 }}
//             transition={{ duration: 0.4, delay: index * 0.1 }}
//             layout
//             onHoverStart={() => setIsHovered(true)}
//             onHoverEnd={() => setIsHovered(false)}
//             className="group"
//         >
//             <div className="glass-card rounded-2xl overflow-hidden hover:neon-border transition-all duration-500 h-full flex flex-col">
//                 {/* Image */}
//                 <div className="relative overflow-hidden h-52">
//                     <motion.img
//                         src={project.image}
//                         alt={project.title}
//                         className="w-full h-full object-cover"
//                         animate={{ scale: isHovered ? 1.1 : 1 }}
//                         transition={{ duration: 0.6 }}
//                     />

//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: isHovered ? 1 : 0 }}
//                         className="absolute inset-0 bg-gradient-to-t from-dark-300/95 via-dark-300/60 to-transparent flex items-end p-4"
//                     >
//                         <div className="flex gap-2 flex-wrap">
//                             {availableLinks.map(([type, url]) => {
//                                 const config = LINK_CONFIG[type];
//                                 if (!config) return null;

//                                 const IconComponent = config.icon;

//                                 return (
//                                     <motion.a
//                                         key={type}
//                                         href={url}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         whileHover={{ scale: 1.15, y: -2 }}
//                                         whileTap={{ scale: 0.9 }}
//                                         initial={{ opacity: 0, y: 10 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         transition={{ delay: 0.05 }}
//                                         className={`p-2.5 rounded-xl bg-white/10 backdrop-blur-sm text-white ${config.hoverColor} transition-all duration-300 group/link relative`}
//                                         title={config.label}
//                                     >
//                                         <IconComponent size={18} />

//                                         <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-dark-200 text-white text-[10px] rounded-md opacity-0 group-hover/link:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
//                                             {config.label}
//                                         </span>
//                                     </motion.a>
//                                 );
//                             })}
//                         </div>
//                     </motion.div>

//                     {project.featured && (
//                         <div className="absolute top-3 right-3">
//                             <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/90 text-yellow-900 text-xs font-bold">
//                                 <FaStar size={10} />
//                                 Featured
//                             </span>
//                         </div>
//                     )}

//                     <div className="absolute top-3 left-3">
//                         <span className="px-3 py-1 rounded-full glass-card text-xs font-semibold text-white">
//                             {project.category}
//                         </span>
//                     </div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-6 flex-1 flex flex-col">
//                     <h3 className="text-xl font-bold dark:text-white text-dark-200 font-heading mb-2 group-hover:text-primary transition-colors">
//                         {project.title}
//                     </h3>
//                     <p className="dark:text-gray-400 text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2 flex-1">
//                         {project.description}
//                     </p>

//                     {/* Technologies */}
//                     <div className="flex flex-wrap gap-2 mb-4">
//                         {project.technologies.slice(0, 4).map((tech) => (
//                             <span
//                                 key={tech}
//                                 className="px-2.5 py-1 text-xs font-medium rounded-lg bg-primary/10 text-primary"
//                             >
//                                 {tech}
//                             </span>
//                         ))}
//                         {project.technologies.length > 4 && (
//                             <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-gray-500/10 dark:text-gray-400 text-gray-500">
//                                 +{project.technologies.length - 4}
//                             </span>
//                         )}
//                     </div>

//                     <div className="flex items-center gap-2 pt-4 border-t border-gray-200/10">
//                         {availableLinks.map(([type, url]) => {
//                             const config = LINK_CONFIG[type];
//                             if (!config) return null;

//                             const IconComponent = config.icon;

//                             return (
//                                 <motion.a
//                                     key={type}
//                                     href={url}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     whileHover={{ scale: 1.05, y: -2 }}
//                                     whileTap={{ scale: 0.95 }}
//                                     className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium dark:text-gray-400 text-gray-500 hover:text-primary dark:hover:text-primary bg-primary/5 hover:bg-primary/10 transition-all duration-300"
//                                 >
//                                     <IconComponent size={14} />
//                                     <span className="hidden sm:inline">
//                                         {config.label}
//                                     </span>
//                                 </motion.a>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// const Projects = () => {
//     const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
//     const [activeFilter, setActiveFilter] = useState('All');

//     const categories = [
//         'All',
//         ...new Set(projects.map((p) => p.category))
//     ];

//     const filteredProjects =
//         activeFilter === 'All'
//             ? projects
//             : projects.filter((p) => p.category === activeFilter);

//     return (
//         <section
//             id="projects"
//             className="section-padding relative overflow-hidden"
//         >
//             <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl" />

//             <div className="container-custom relative z-10" ref={ref}>
//                 {/* Section Header */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={inView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ duration: 0.6 }}
//                     className="text-center mb-16"
//                 >
//                     <span className="inline-block px-4 py-1.5 rounded-full glass-card text-primary text-sm font-semibold mb-4">
//                         My Work
//                     </span>
//                     <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading dark:text-white text-dark-200 mb-4">
//                         Featured{' '}
//                         <span className="gradient-text">Projects</span>
//                     </h2>
//                     <p className="dark:text-gray-400 text-gray-500 max-w-2xl mx-auto">
//                         Here are some of my recent projects that showcase my
//                         skills and experience
//                     </p>
//                 </motion.div>

//                 {/* Filter Tabs */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={inView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ delay: 0.2 }}
//                     className="flex flex-wrap justify-center gap-3 mb-12"
//                 >
//                     {categories.map((cat) => (
//                         <motion.button
//                             key={cat}
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => setActiveFilter(cat)}
//                             className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
//                                 ${activeFilter === cat
//                                     ? 'gradient-bg text-white shadow-lg shadow-primary/30'
//                                     : 'glass-card dark:text-gray-300 text-gray-600 hover:text-primary'
//                                 }`}
//                         >
//                             {cat}
//                         </motion.button>
//                     ))}
//                 </motion.div>

//                 {/* Projects Grid */}
//                 <motion.div
//                     layout
//                     className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
//                 >
//                     <AnimatePresence>
//                         {filteredProjects.map((project, index) => (
//                             <ProjectCard
//                                 key={project.id}
//                                 project={project}
//                                 index={index}
//                             />
//                         ))}
//                     </AnimatePresence>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// export default Projects;