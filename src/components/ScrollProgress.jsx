// src/components/ScrollProgress.jsx
import React, { useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const ScrollProgress = () => {
    const scaleX = useSpring(0, { stiffness: 100, damping: 30 });

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = window.scrollY / totalHeight;
            scaleX.set(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scaleX]);

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 z-[60] origin-left gradient-bg"
            style={{ scaleX }}
        />
    );
};

export default ScrollProgress;