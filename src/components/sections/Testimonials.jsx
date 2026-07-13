// src/components/sections/Testimonials.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { testimonials } from '../../data/portfolioData';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1);
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const next = () => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setDirection(-1);
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9,
        }),
    };

    return (
        <section id="testimonials" className="section-padding relative overflow-hidden">
            <div className="absolute top-0 left-1/2 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl -translate-x-1/2" />

            <div className="container-custom relative z-10" ref={ref}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full glass-card text-primary text-sm font-semibold mb-4">
                        Testimonials
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading dark:text-white text-dark-200 mb-4">
                        What People <span className="gradient-text">Say</span>
                    </h2>
                    <p className="dark:text-gray-400 text-gray-500 max-w-2xl mx-auto">
                        Don't just take my word for it - hear what clients and colleagues have to say
                    </p>
                </motion.div>

                {/* Testimonial Slider */}
                <div className="max-w-3xl mx-auto relative">
                    <AnimatePresence custom={direction} mode="wait">
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.5 }}
                            className="glass-card rounded-3xl p-8 md:p-12 text-center"
                        >
                            {/* Quote Icon */}
                            <FaQuoteLeft className="text-primary/20 text-5xl mx-auto mb-6" />

                            {/* Testimonial Text */}
                            <p className="dark:text-gray-300 text-gray-600 text-lg md:text-xl leading-relaxed mb-8 italic">
                                "{testimonials[current].text}"
                            </p>

                            {/* Rating */}
                            <div className="flex justify-center gap-1 mb-6">
                                {[...Array(testimonials[current].rating)].map((_, i) => (
                                    <FaStar key={i} className="text-yellow-400" size={18} />
                                ))}
                            </div>

                            {/* Author */}
                            <div className="flex items-center justify-center gap-4">
                                <img
                                    src={testimonials[current].image}
                                    alt={testimonials[current].name}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                                />
                                <div className="text-left">
                                    <h4 className="font-bold dark:text-white text-dark-200 font-heading">
                                        {testimonials[current].name}
                                    </h4>
                                    <p className="text-primary text-sm font-medium">
                                        {testimonials[current].role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-8">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={prev}
                            className="p-3 rounded-xl glass-card text-primary hover:bg-primary hover:text-white transition-all duration-300"
                        >
                            <FaChevronLeft size={16} />
                        </motion.button>

                        {/* Dots */}
                        <div className="flex items-center gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setDirection(index > current ? 1 : -1);
                                        setCurrent(index);
                                    }}
                                    className={`transition-all duration-300 rounded-full
                    ${current === index
                                            ? 'w-8 h-3 gradient-bg'
                                            : 'w-3 h-3 bg-gray-400/30 hover:bg-primary/50'
                                        }`}
                                />
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={next}
                            className="p-3 rounded-xl glass-card text-primary hover:bg-primary hover:text-white transition-all duration-300"
                        >
                            <FaChevronRight size={16} />
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;