// src/components/sections/Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { personalInfo, socialLinks } from '../../data/portfolioData';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const EMAILJS_CONFIG = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const Contact = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const loadingToast = toast.loading('Sending your message...', {
            style: {
                background: '#1E1E2E',
                color: '#fff',
                border: '1px solid rgba(108, 99, 255, 0.3)',
            },
        });

        try {
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_email: 'dev.mohitkushwah@gmail.com',
                reply_to: formData.email,
            };

            await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams,
                EMAILJS_CONFIG.publicKey
            );

            toast.dismiss(loadingToast);
            toast.success("Message sent successfully! I'll get back to you soon. 🚀", {
                duration: 5000,
                style: {
                    background: '#1E1E2E',
                    color: '#fff',
                    border: '1px solid rgba(108, 99, 255, 0.3)',
                },
            });

            setFormData({ name: '', email: '', subject: '', message: '' });

        } catch (error) {
            console.error('EmailJS Error:', error);
            toast.dismiss(loadingToast);
            toast.error('Failed to send message. Please try again!', {
                duration: 5000,
                style: {
                    background: '#1E1E2E',
                    color: '#fff',
                    border: '1px solid rgba(255, 99, 99, 0.3)',
                },
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: FaEnvelope,
            label: "Email",
            value: personalInfo.email,
            href: `mailto:${personalInfo.email}`
        },
        {
            icon: FaPhone,
            label: "Phone",
            value: personalInfo.phone,
            href: `tel:${personalInfo.phone}`
        },
        {
            icon: FaMapMarkerAlt,
            label: "Location",
            value: personalInfo.location,
            href: "#"
        },
    ];

    return (
        <section id="contact" className="section-padding relative overflow-hidden">
            <Toaster position="top-right" />

            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl" />

            <div className="container-custom relative z-10" ref={ref}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full glass-card text-primary text-sm font-semibold mb-4">
                        Contact Me
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading dark:text-white text-dark-200 mb-4">
                        Let's Work <span className="gradient-text">Together</span>
                    </h2>
                    <p className="dark:text-gray-400 text-gray-500 max-w-2xl mx-auto">
                        Have a project in mind or want to discuss an opportunity?
                        I'd love to hear from you!
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Left - Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold dark:text-white text-dark-200 font-heading mb-4">
                                Get in <span className="gradient-text">Touch</span>
                            </h3>
                            <p className="dark:text-gray-400 text-gray-500 leading-relaxed">
                                Feel free to reach out through any of the channels below.
                                I typically respond within 24 hours.
                            </p>
                        </div>

                        {/* Contact Cards */}
                        <div className="space-y-4">
                            {contactInfo.map((info, index) => (
                                <motion.a
                                    key={info.label}
                                    href={info.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    whileHover={{ x: 5 }}
                                    className="flex items-center gap-4 p-4 glass-card rounded-2xl hover:neon-border transition-all duration-300 group"
                                >
                                    <div className="p-3 rounded-xl gradient-bg group-hover:shadow-lg group-hover:shadow-primary/30 transition-all">
                                        <info.icon className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs dark:text-gray-400 text-gray-500 font-medium uppercase tracking-wider">
                                            {info.label}
                                        </p>
                                        <p className="dark:text-white text-dark-200 font-semibold">
                                            {info.value}
                                        </p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div>
                            <p className="dark:text-gray-400 text-gray-500 text-sm font-medium mb-4">
                                Follow me on social media:
                            </p>
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
                                        animate={inView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        className="p-3 rounded-xl glass-card hover:neon-border transition-all duration-300 dark:text-gray-300 text-gray-600 hover:text-primary"
                                    >
                                        <social.icon size={20} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-3"
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="glass-card rounded-3xl p-8 space-y-6"
                        >
                            <div className="grid sm:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label className="block dark:text-gray-300 text-gray-600 text-sm font-medium mb-2">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        className="input-field"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block dark:text-gray-300 text-gray-600 text-sm font-medium mb-2">
                                        Your Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                        className="input-field"
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="block dark:text-gray-300 text-gray-600 text-sm font-medium mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="Project Inquiry"
                                    className="input-field"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block dark:text-gray-300 text-gray-600 text-sm font-medium mb-2">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    placeholder="Tell me about your project..."
                                    className="input-field resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                className={`w-full btn-primary flex items-center justify-center gap-2 text-lg
                                    ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                ease: 'linear'
                                            }}
                                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                        />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <FaPaperPlane />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;