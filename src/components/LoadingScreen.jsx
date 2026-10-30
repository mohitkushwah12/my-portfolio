import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    const shouldReduceMotion = useReducedMotion();
    const onCompleteRef = useRef(onComplete);

    // Keep the latest callback without restarting the loading animation.
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    // Stable particle positions prevent them from changing on every render.
    const particles = useMemo(
        () =>
            Array.from({ length: 24 }, (_, index) => ({
                id: index,
                left: `${(index * 37 + 13) % 100}%`,
                top: `${(index * 53 + 7) % 100}%`,
                size: index % 5 === 0 ? 4 : 2,
                duration: 3 + (index % 5) * 0.8,
                delay: (index % 7) * 0.25,
                distance: 25 + (index % 4) * 18,
            })),
        []
    );

    useEffect(() => {
        let interval;
        let completionTimeout;
        let exitTimeout;

        interval = setInterval(() => {
            setProgress((previous) => {
                if (previous >= 100) {
                    clearInterval(interval);

                    completionTimeout = setTimeout(() => {
                        setIsComplete(true);

                        exitTimeout = setTimeout(() => {
                            onCompleteRef.current?.();
                        }, 550);
                    }, 350);

                    return 100;
                }

                return Math.min(previous + 2, 100);
            });
        }, 35);

        return () => {
            clearInterval(interval);
            clearTimeout(completionTimeout);
            clearTimeout(exitTimeout);
        };
    }, []);

    const firstName = personalInfo?.firstName || 'Developer';
    const initial = firstName.charAt(0).toUpperCase();

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    key="portfolio-loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={
                        shouldReduceMotion
                            ? { opacity: 0 }
                            : {
                                opacity: 0,
                                scale: 1.035,
                                filter: 'blur(12px)',
                            }
                    }
                    transition={{ duration: 0.55, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-hidden bg-[#070910] text-white"
                    role="status"
                    aria-label={`Loading ${firstName}'s portfolio`}
                    aria-live="polite"
                >
                    {/* Background atmosphere */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div
                            className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[100px]"
                            style={{
                                background:
                                    'radial-gradient(circle, #6366f1 0%, #8b5cf6 35%, transparent 70%)',
                            }}
                        />

                        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-indigo-500/[0.08] blur-[100px]" />

                        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-cyan-500/[0.07] blur-[100px]" />

                        {/* Subtle grid */}
                        <div
                            className="absolute inset-0 opacity-[0.055]"
                            style={{
                                backgroundImage:
                                    'linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)',
                                backgroundSize: '54px 54px',
                                maskImage:
                                    'radial-gradient(ellipse at center, black 10%, transparent 75%)',
                                WebkitMaskImage:
                                    'radial-gradient(ellipse at center, black 10%, transparent 75%)',
                            }}
                        />

                        {/* Floating particles */}
                        {particles.map((particle) => (
                            <motion.span
                                key={particle.id}
                                className="absolute rounded-full bg-indigo-300"
                                style={{
                                    left: particle.left,
                                    top: particle.top,
                                    width: particle.size,
                                    height: particle.size,
                                }}
                                animate={
                                    shouldReduceMotion
                                        ? { opacity: 0.35 }
                                        : {
                                            y: [0, -particle.distance, 0],
                                            x: [0, 12, -8, 0],
                                            opacity: [0.08, 0.65, 0.12],
                                        }
                                }
                                transition={{
                                    duration: particle.duration,
                                    delay: particle.delay,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}
                    </div>

                    {/* Main content */}
                    <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center px-6 py-10 text-center">
                        {/* Status badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-white/[0.09] bg-white/[0.035] px-4 py-2 backdrop-blur-xl"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                            </span>

                            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-gray-300 sm:text-[11px]">
                                Preparing your experience
                            </span>
                        </motion.div>

                        {/* Animated logo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.65, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                                type: 'spring',
                                stiffness: 160,
                                damping: 18,
                                delay: 0.1,
                            }}
                            className="relative mb-9"
                        >
                            {/* Outer glow */}
                            <motion.div
                                animate={
                                    shouldReduceMotion
                                        ? {}
                                        : {
                                            scale: [1, 1.12, 1],
                                            opacity: [0.3, 0.65, 0.3],
                                        }
                                }
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/30 via-violet-500/20 to-cyan-400/20 blur-2xl"
                            />

                            {/* Rotating gradient border */}
                            <motion.div
                                animate={
                                    shouldReduceMotion
                                        ? {}
                                        : { rotate: 360 }
                                }
                                transition={{
                                    duration: 9,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                                className="absolute -inset-[2px] rounded-[26px] bg-[conic-gradient(from_0deg,#6366f1,#a78bfa,#22d3ee,#6366f1)] opacity-90"
                            />

                            {/* Logo container */}
                            <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-[#0c1020] shadow-[0_0_55px_rgba(99,102,241,0.2)] sm:h-28 sm:w-28">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-cyan-400/10" />

                                <span className="relative bg-gradient-to-br from-white via-indigo-100 to-violet-300 bg-clip-text font-heading text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl">
                                    {initial}
                                </span>

                                <span className="absolute bottom-3 right-3 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
                            </div>
                        </motion.div>

                        {/* Name and role */}
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.25 }}
                        >
                            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
                                {firstName}
                                <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                                    .dev
                                </span>
                            </h1>

                            <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.28em] text-gray-400 sm:text-xs sm:tracking-[0.35em]">
                                FlutterFlow Developer
                                <span className="mx-2 text-indigo-400">/</span>
                                AI Solutions
                            </p>
                        </motion.div>

                        {/* Decorative separator */}
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 68, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.45 }}
                            className="mt-8 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
                        />

                        {/* Loading message */}
                        <motion.p
                            key={progress >= 70 ? 'almost' : 'loading'}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-7 text-sm text-gray-400"
                        >
                            {progress >= 100
                                ? 'Welcome to my world.'
                                : progress >= 70
                                    ? 'Almost there...'
                                    : 'Crafting something exceptional'}
                        </motion.p>

                        {/* Progress bar */}
                        <div className="mt-7 w-full max-w-[290px]">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
                                    Loading portfolio
                                </span>

                                <motion.span
                                    key={progress}
                                    initial={{ opacity: 0.5 }}
                                    animate={{ opacity: 1 }}
                                    className="font-mono text-xs font-medium tabular-nums text-indigo-300"
                                >
                                    {String(progress).padStart(3, '0')}%
                                </motion.span>
                            </div>

                            <div className="relative h-[3px] overflow-hidden rounded-full bg-white/[0.08]">
                                <motion.div
                                    className="relative h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-400 to-cyan-300"
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{
                                        duration: 0.12,
                                        ease: 'linear',
                                    }}
                                    style={{
                                        boxShadow:
                                            '0 0 14px rgba(129,140,248,0.7)',
                                    }}
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="mt-12 flex items-center gap-2 text-[10px] tracking-[0.12em] text-gray-600"
                        >
                            <span>DESIGNED WITH</span>
                            <span className="text-rose-400">♥</span>
                            <span>BUILT WITH PASSION</span>
                        </motion.div>
                    </div>

                    {/* Corner decorations */}
                    <div className="pointer-events-none absolute left-5 top-5 h-8 w-8 border-l border-t border-white/10 sm:left-8 sm:top-8" />

                    <div className="pointer-events-none absolute bottom-5 right-5 h-8 w-8 border-b border-r border-white/10 sm:bottom-8 sm:right-8" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;










// // src/components/LoadingScreen.jsx
// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { personalInfo } from '../data/portfolioData';

// const LoadingScreen = ({ onComplete }) => {
//     const [progress, setProgress] = useState(0);
//     const [isComplete, setIsComplete] = useState(false);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setProgress((prev) => {
//                 if (prev >= 100) {
//                     clearInterval(interval);
//                     setTimeout(() => {
//                         setIsComplete(true);
//                         setTimeout(onComplete, 500);
//                     }, 300);
//                     return 100;
//                 }
//                 return prev + 2;
//             });
//         }, 30);

//         return () => clearInterval(interval);
//     }, [onComplete]);

//     return (
//         <AnimatePresence>
//             {!isComplete && (
//                 <motion.div
//                     exit={{ opacity: 0, scale: 1.1 }}
//                     transition={{ duration: 0.5 }}
//                     className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-300"
//                 >
//                     <div className="text-center">
//                         {/* Animated Logo */}
//                         <motion.div
//                             animate={{
//                                 rotate: [0, 360],
//                                 scale: [1, 1.2, 1],
//                             }}
//                             transition={{
//                                 duration: 2,
//                                 repeat: Infinity,
//                                 ease: 'easeInOut',
//                             }}
//                             className="w-20 h-20 mx-auto mb-8 rounded-2xl gradient-bg flex items-center justify-center"
//                         >
//                             <span className="text-white font-bold text-3xl font-heading">
//                                 {personalInfo.firstName[0]}
//                             </span>
//                         </motion.div>

//                         {/* Name */}
//                         <motion.h1
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="text-2xl md:text-3xl font-bold font-heading text-white mb-2"
//                         >
//                             {personalInfo.firstName}
//                             <span className="gradient-text">.dev</span>
//                         </motion.h1>

//                         <motion.p
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ delay: 0.3 }}
//                             className="text-gray-400 text-sm mb-8"
//                         >
//                             Loading amazing things...
//                         </motion.p>

//                         {/* Progress Bar */}
//                         <div className="w-48 mx-auto">
//                             <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
//                                 <motion.div
//                                     className="h-full gradient-bg rounded-full"
//                                     initial={{ width: 0 }}
//                                     animate={{ width: `${progress}%` }}
//                                 />
//                             </div>
//                             <p className="text-primary text-xs mt-2 font-mono">{progress}%</p>
//                         </div>
//                     </div>

//                     {/* Floating Particles */}
//                     {[...Array(20)].map((_, i) => (
//                         <motion.div
//                             key={i}
//                             className="absolute w-1 h-1 bg-primary/30 rounded-full"
//                             initial={{
//                                 x: Math.random() * window.innerWidth,
//                                 y: Math.random() * window.innerHeight,
//                             }}
//                             animate={{
//                                 y: [null, Math.random() * -200],
//                                 opacity: [0, 1, 0],
//                             }}
//                             transition={{
//                                 duration: Math.random() * 3 + 2,
//                                 repeat: Infinity,
//                                 delay: Math.random() * 2,
//                             }}
//                         />
//                     ))}
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

// export default LoadingScreen;