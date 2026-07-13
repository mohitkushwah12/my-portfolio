// src/components/sections/Experience.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { experiences, education } from '../../data/portfolioData';
import {
    FaExternalLinkAlt,
    FaBriefcase,
    FaGraduationCap,
    FaChevronDown,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaBuilding,
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const FloatingParticle = ({ delay, size, left, top }) => (
    <motion.div
        className="absolute rounded-full bg-primary/10"
        style={{ width: size, height: size, left, top }}
        animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
        }}
        transition={{
            duration: 4,
            delay,
            repeat: Infinity,
            ease: 'easeInOut',
        }}
    />
);

const GlowingDot = ({ inView, index, icon: Icon, type }) => (
    <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={inView ? { scale: 1, rotate: 0 } : {}}
        transition={{
            delay: index * 0.15 + 0.3,
            type: 'spring',
            stiffness: 200,
            damping: 15,
        }}
        className="relative"
    >
        <motion.div
            animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
            }}
            className={`absolute inset-0 rounded-full ${type === 'experience'
                ? 'bg-primary/30'
                : 'bg-accent/30'
                }`}
        />

        <motion.div
            animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0, 0.3],
            }}
            transition={{
                duration: 2,
                delay: 0.5,
                repeat: Infinity,
                ease: 'easeOut',
            }}
            className={`absolute inset-0 rounded-full ${type === 'experience'
                ? 'bg-primary/20'
                : 'bg-accent/20'
                }`}
        />

        <div
            className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl ${type === 'experience'
                ? 'gradient-bg shadow-primary/40'
                : 'bg-gradient-to-br from-accent to-secondary shadow-accent/40'
                }`}
        >
            <Icon className="text-white" size={20} />
        </div>
    </motion.div>
);

const TimelineCard = ({ item, index, isLeft, type }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [isExpanded, setIsExpanded] = useState(false);

    const isExperience = type === 'experience';
    const hasExpandableContent =
        (Array.isArray(item.description) && item.description.length > 2) ||
        item.technologies?.length > 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex items-start mb-8 md:mb-16
                ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
        >
            <div
                className={`w-full md:w-5/12 ${isLeft ? 'md:pr-10' : 'md:pl-10'
                    } pl-16 md:pl-0`}
            >
                <motion.div
                    initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 20 }}
                    animate={
                        inView ? { opacity: 1, x: 0, y: 0 } : {}
                    }
                    transition={{
                        duration: 0.7,
                        delay: index * 0.15,
                        type: 'spring',
                        stiffness: 100,
                    }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="group relative"
                >
                    <div
                        className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm ${isExperience
                            ? 'bg-gradient-to-r from-primary/20 to-accent/20'
                            : 'bg-gradient-to-r from-accent/20 to-secondary/20'
                            }`}
                    />

                    <div className="relative glass-card rounded-2xl p-6 md:p-7 hover:neon-border transition-all duration-500 overflow-hidden">

                        <div
                            className={`absolute top-0 left-0 right-0 h-1 ${isExperience
                                ? 'bg-gradient-to-r from-primary to-accent'
                                : 'bg-gradient-to-r from-accent to-secondary'
                                }`}
                        />

                        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                            <div
                                className={`w-full h-full rounded-full ${isExperience
                                    ? 'bg-primary'
                                    : 'bg-accent'
                                    } blur-3xl`}
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={inView ? { scale: 1 } : {}}
                                transition={{
                                    delay: index * 0.15 + 0.2,
                                    type: 'spring',
                                }}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${isExperience
                                    ? 'bg-primary/15 text-primary'
                                    : 'bg-accent/15 text-accent'
                                    }`}
                            >
                                {isExperience ? (
                                    <FaBriefcase size={10} />
                                ) : (
                                    <FaGraduationCap size={11} />
                                )}
                                {isExperience
                                    ? 'Experience'
                                    : 'Education'}
                            </motion.span>

                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-500/10 dark:text-gray-400 text-gray-500 text-xs font-semibold">
                                <FaCalendarAlt size={10} />
                                {item.duration}
                            </span>
                        </div>

                        <h3 className="text-lg md:text-xl font-bold dark:text-white text-dark-200 font-heading mb-2 group-hover:text-primary transition-colors duration-300">
                            {item.role || item.degree}
                        </h3>

                        <div className="flex items-center gap-2 mb-2">
                            <FaBuilding
                                size={12}
                                className={
                                    isExperience
                                        ? 'text-primary'
                                        : 'text-accent'
                                }
                            />
                            <span
                                className={`font-semibold text-sm ${isExperience
                                    ? 'text-primary'
                                    : 'text-accent'
                                    }`}
                            >
                                {item.company || item.institution}
                            </span>
                            {item.companyUrl && (
                                <motion.a
                                    href={item.companyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-1 rounded-md hover:bg-primary/10 text-primary/50 hover:text-primary transition-all"
                                >
                                    <FaExternalLinkAlt size={10} />
                                </motion.a>
                            )}
                        </div>

                        {item.location && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={inView ? { opacity: 1 } : {}}
                                transition={{
                                    delay: index * 0.15 + 0.4,
                                }}
                                className="flex items-center gap-1.5 text-xs dark:text-gray-500 text-gray-400 mb-4"
                            >
                                <FaMapMarkerAlt size={10} />
                                {item.location}
                            </motion.p>
                        )}
                        {Array.isArray(item.description) ? (
                            <ul className="space-y-2.5 mb-4">
                                {item.description
                                    .slice(
                                        0,
                                        isExpanded
                                            ? item.description.length
                                            : 2
                                    )
                                    .map((desc, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{
                                                opacity: 0,
                                                x: -10,
                                            }}
                                            animate={
                                                inView
                                                    ? {
                                                        opacity: 1,
                                                        x: 0,
                                                    }
                                                    : {}
                                            }
                                            transition={{
                                                delay:
                                                    index * 0.15 +
                                                    0.3 +
                                                    i * 0.1,
                                            }}
                                            className="flex items-start gap-2.5 text-sm dark:text-gray-400 text-gray-500 leading-relaxed"
                                        >
                                            <motion.span
                                                animate={{
                                                    scale: [1, 1.3, 1],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    delay: i * 0.3,
                                                    repeat: Infinity,
                                                }}
                                                className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${isExperience
                                                    ? 'bg-primary'
                                                    : 'bg-accent'
                                                    }`}
                                            />
                                            {desc}
                                        </motion.li>
                                    ))}
                            </ul>
                        ) : (
                            <p className="text-sm dark:text-gray-400 text-gray-500 mb-4 leading-relaxed">
                                {item.description}
                            </p>
                        )}

                        {item.grade && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={
                                    inView
                                        ? { opacity: 1, scale: 1 }
                                        : {}
                                }
                                transition={{
                                    delay: index * 0.15 + 0.5,
                                }}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 mb-4"
                            >
                                <HiSparkles
                                    className="text-accent"
                                    size={14}
                                />
                                <span className="text-sm font-semibold text-accent">
                                    {item.grade}
                                </span>
                            </motion.div>
                        )}
                        <AnimatePresence>
                            {item.technologies &&
                                (isExpanded ||
                                    !hasExpandableContent) && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            height: 0,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            height: 'auto',
                                        }}
                                        exit={{
                                            opacity: 0,
                                            height: 0,
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="flex flex-wrap gap-2 mb-2 overflow-hidden"
                                    >
                                        {item.technologies.map(
                                            (tech, i) => (
                                                <motion.span
                                                    key={tech}
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.8,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                    }}
                                                    transition={{
                                                        delay: i * 0.05,
                                                    }}
                                                    whileHover={{
                                                        scale: 1.1,
                                                    }}
                                                    className={`px-2.5 py-1 text-xs font-medium rounded-lg cursor-default transition-all ${isExperience
                                                        ? 'bg-primary/10 text-primary hover:bg-primary/20'
                                                        : 'bg-accent/10 text-accent hover:bg-accent/20'
                                                        }`}
                                                >
                                                    {tech}
                                                </motion.span>
                                            )
                                        )}
                                    </motion.div>
                                )}
                        </AnimatePresence>

                        {hasExpandableContent && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() =>
                                    setIsExpanded(!isExpanded)
                                }
                                className={`flex items-center gap-1.5 text-xs font-semibold mt-3 transition-colors ${isExperience
                                    ? 'text-primary hover:text-primary/80'
                                    : 'text-accent hover:text-accent/80'
                                    }`}
                            >
                                {isExpanded
                                    ? 'Show Less'
                                    : 'Show More'}
                                <motion.div
                                    animate={{
                                        rotate: isExpanded ? 180 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <FaChevronDown size={10} />
                                </motion.div>
                            </motion.button>
                        )}
                    </div>
                </motion.div>
            </div>

            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center z-10">
                <GlowingDot
                    inView={inView}
                    index={index}
                    icon={item.icon}
                    type={type}
                />
            </div>

            <div className="hidden md:block w-5/12" />
        </motion.div>
    );
};

const TabButton = ({ active, onClick, icon: Icon, label, count }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`relative flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${active
            ? 'gradient-bg text-white shadow-lg shadow-primary/30'
            : 'glass-card dark:text-gray-300 text-gray-600 hover:text-primary'
            }`}
    >
        <Icon size={16} />
        <span>{label}</span>
        <span
            className={`px-2 py-0.5 rounded-full text-xs font-bold ${active
                ? 'bg-white/20 text-white'
                : 'bg-primary/10 text-primary'
                }`}
        >
            {count}
        </span>

        {active && (
            <motion.div
                layoutId="activeTab"
                className="absolute inset-0 gradient-bg rounded-xl -z-10"
                transition={{ type: 'spring', duration: 0.5 }}
            />
        )}
    </motion.button>
);

const Experience = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [activeTab, setActiveTab] = useState('all');

    const getFilteredItems = () => {
        const expItems = experiences.map((e) => ({
            ...e,
            type: 'experience',
        }));
        const eduItems = education.map((e) => ({
            ...e,
            type: 'education',
        }));

        switch (activeTab) {
            case 'experience':
                return expItems;
            case 'education':
                return eduItems;
            default:
                return [...expItems, ...eduItems];
        }
    };

    const filteredItems = getFilteredItems();

    return (
        <section
            id="experience"
            className="section-padding relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-72 h-72 bg-accent/5 rounded-full filter blur-3xl" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/3 rounded-full filter blur-3xl" />

            <FloatingParticle delay={0} size={8} left="10%" top="20%" />
            <FloatingParticle delay={1} size={6} left="85%" top="15%" />
            <FloatingParticle delay={2} size={10} left="70%" top="60%" />
            <FloatingParticle delay={1.5} size={7} left="15%" top="75%" />
            <FloatingParticle delay={0.5} size={9} left="90%" top="80%" />

            <div className="container-custom relative z-10" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={
                            inView ? { opacity: 1, scale: 1 } : {}
                        }
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-primary text-sm font-semibold mb-4"
                    >
                        <HiSparkles className="text-primary" />
                        My Journey
                    </motion.span>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading dark:text-white text-dark-200 mb-4">
                        Experience &{' '}
                        <span className="gradient-text">Education</span>
                    </h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.3 }}
                        className="dark:text-gray-400 text-gray-500 max-w-2xl mx-auto"
                    >
                        A timeline of my professional journey and academic
                        background
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16"
                >
                    <TabButton
                        active={activeTab === 'all'}
                        onClick={() => setActiveTab('all')}
                        icon={HiSparkles}
                        label="All"
                        count={
                            experiences.length + education.length
                        }
                    />
                    <TabButton
                        active={activeTab === 'experience'}
                        onClick={() => setActiveTab('experience')}
                        icon={FaBriefcase}
                        label="Experience"
                        count={experiences.length}
                    />
                    <TabButton
                        active={activeTab === 'education'}
                        onClick={() => setActiveTab('education')}
                        icon={FaGraduationCap}
                        label="Education"
                        count={education.length}
                    />
                </motion.div>

                <div className="relative">
                    <motion.div
                        initial={{ height: 0 }}
                        animate={inView ? { height: '100%' } : {}}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                        className="absolute left-[22px] md:left-1/2 md:-translate-x-px top-0 w-0.5 origin-top"
                    >
                        <div className="w-full h-full bg-gradient-to-b from-primary via-accent to-secondary" />

                        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-primary via-accent to-secondary opacity-50 blur-sm" />
                    </motion.div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {filteredItems.map((item, index) => (
                                <TimelineCard
                                    key={`${item.type}-${item.id}`}
                                    item={item}
                                    index={index}
                                    isLeft={index % 2 === 0}
                                    type={item.type}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* ✅ Timeline End Dot */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : {}}
                        transition={{
                            delay: filteredItems.length * 0.15 + 0.5,
                            type: 'spring',
                        }}
                        className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 bottom-0 w-5 h-5 rounded-full gradient-bg shadow-lg shadow-primary/30"
                    />
                </div>

                {/* ✅ Bottom Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                        delay: filteredItems.length * 0.1 + 0.5,
                    }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
                >
                    {[
                        {
                            label: 'Years Experience',
                            value: '2+',
                            icon: '💼',
                        },
                        {
                            label: 'Projects Completed',
                            value: '15+',
                            icon: '🚀',
                        },
                        {
                            label: 'Technologies',
                            value: '20+',
                            icon: '⚡',
                        },
                        {
                            label: 'Happy Clients',
                            value: '10+',
                            icon: '😊',
                        },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={
                                inView
                                    ? { opacity: 1, y: 0 }
                                    : {}
                            }
                            transition={{
                                delay:
                                    filteredItems.length * 0.1 +
                                    0.6 +
                                    i * 0.1,
                            }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="glass-card rounded-2xl p-5 text-center hover:neon-border transition-all duration-300 group"
                        >
                            <motion.span
                                className="text-2xl md:text-3xl block mb-2"
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{
                                    duration: 2,
                                    delay: i * 0.3,
                                    repeat: Infinity,
                                    repeatDelay: 3,
                                }}
                            >
                                {stat.icon}
                            </motion.span>
                            <h4 className="text-2xl md:text-3xl font-bold gradient-text font-heading mb-1">
                                {stat.value}
                            </h4>
                            <p className="text-xs md:text-sm dark:text-gray-400 text-gray-500 font-medium">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;



// src/components/sections/Experience.jsx
// import React from 'react';
// import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { experiences, education } from '../../data/portfolioData';
// import { FaExternalLinkAlt } from 'react-icons/fa';

// const TimelineItem = ({ item, index, isLeft }) => {
//     const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

//     return (
//         <motion.div
//             ref={ref}
//             initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.6, delay: index * 0.15 }}
//             className={`relative flex items-center mb-8 md:mb-12
//         ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
//         >
//             {/* Content Card */}
//             <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-8' : 'md:pl-8'} pl-12 md:pl-0`}>
//                 <motion.div
//                     whileHover={{ y: -5 }}
//                     className="glass-card rounded-2xl p-6 hover:neon-border transition-all duration-500 group"
//                 >
//                     {/* Duration Badge */}
//                     <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
//                         {item.duration}
//                     </span>

//                     {/* Role */}
//                     <h3 className="text-lg md:text-xl font-bold dark:text-white text-dark-200 font-heading mb-1">
//                         {item.role || item.degree}
//                     </h3>

//                     {/* Company/Institution */}
//                     <div className="flex items-center gap-2 mb-3">
//                         <span className="text-primary font-semibold text-sm">
//                             {item.company || item.institution}
//                         </span>
//                         {item.companyUrl && (
//                             <a
//                                 href={item.companyUrl}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-primary/50 hover:text-primary transition-colors"
//                             >
//                                 <FaExternalLinkAlt size={10} />
//                             </a>
//                         )}
//                     </div>

//                     {/* Location */}
//                     {item.location && (
//                         <p className="text-xs dark:text-gray-500 text-gray-400 mb-3">
//                             📍 {item.location}
//                         </p>
//                     )}

//                     {/* Description */}
//                     {Array.isArray(item.description) ? (
//                         <ul className="space-y-2 mb-4">
//                             {item.description.map((desc, i) => (
//                                 <li key={i} className="flex items-start gap-2 text-sm dark:text-gray-400 text-gray-500">
//                                     <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
//                                     {desc}
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p className="text-sm dark:text-gray-400 text-gray-500 mb-4">
//                             {item.description}
//                         </p>
//                     )}

//                     {/* Grade */}
//                     {item.grade && (
//                         <p className="text-sm font-semibold text-primary mb-4">
//                             🎓 {item.grade}
//                         </p>
//                     )}

//                     {/* Technologies */}
//                     {item.technologies && (
//                         <div className="flex flex-wrap gap-2">
//                             {item.technologies.map((tech) => (
//                                 <span
//                                     key={tech}
//                                     className="px-2.5 py-1 text-xs font-medium rounded-lg bg-primary/10 text-primary dark:bg-primary/5"
//                                 >
//                                     {tech}
//                                 </span>
//                             ))}
//                         </div>
//                     )}
//                 </motion.div>
//             </div>

//             {/* Timeline Center */}
//             <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center z-10">
//                 <motion.div
//                     initial={{ scale: 0 }}
//                     animate={inView ? { scale: 1 } : {}}
//                     transition={{ delay: index * 0.15 + 0.3, type: 'spring' }}
//                     className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center shadow-lg shadow-primary/30"
//                 >
//                     <item.icon className="text-white" size={18} />
//                 </motion.div>
//             </div>

//             {/* Empty Space for opposite side */}
//             <div className="hidden md:block w-5/12" />
//         </motion.div>
//     );
// };

// const Experience = () => {
//     const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

//     const allItems = [
//         ...experiences.map((e) => ({ ...e, type: 'experience' })),
//         ...education.map((e) => ({ ...e, type: 'education' })),
//     ];

//     return (
//         <section id="experience" className="section-padding relative overflow-hidden">
//             <div className="absolute top-0 left-0 w-72 h-72 bg-accent/5 rounded-full filter blur-3xl" />
//             <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl" />

//             <div className="container-custom relative z-10" ref={ref}>
//                 {/* Section Header */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={inView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ duration: 0.6 }}
//                     className="text-center mb-16"
//                 >
//                     <span className="inline-block px-4 py-1.5 rounded-full glass-card text-primary text-sm font-semibold mb-4">
//                         My Journey
//                     </span>
//                     <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading dark:text-white text-dark-200 mb-4">
//                         Experience & <span className="gradient-text">Education</span>
//                     </h2>
//                     <p className="dark:text-gray-400 text-gray-500 max-w-2xl mx-auto">
//                         A timeline of my professional journey and academic background
//                     </p>
//                 </motion.div>

//                 {/* Timeline */}
//                 <div className="relative">
//                     {/* Timeline Line */}
//                     <div className="absolute left-[18px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary" />

//                     {allItems.map((item, index) => (
//                         <TimelineItem
//                             key={item.id + item.type}
//                             item={item}
//                             index={index}
//                             isLeft={index % 2 === 0}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Experience;