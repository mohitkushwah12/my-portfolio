import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const COLORS = ['108, 99, 255', '139, 92, 246', '34, 211, 238'];

const PARTICLE_COUNT_DESKTOP = 75;
const PARTICLE_COUNT_MOBILE = 35;

const CONNECTION_DISTANCE = 125;
const MOUSE_RADIUS = 150;

const ParticleBackground = () => {
    const canvasRef = useRef(null);
    const { darkMode } = useTheme();

    const themeRef = useRef(darkMode);

    useEffect(() => {
        themeRef.current = darkMode;
    }, [darkMode]);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext('2d', {
            alpha: true,
        });

        if (!ctx) return;

        let animationId;
        let width = 0;
        let height = 0;
        let dpr = 1;
        let particles = [];
        let isVisible = true;

        const reducedMotionQuery = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        );

        const coarsePointerQuery = window.matchMedia(
            '(pointer: coarse)'
        );

        const mouse = {
            x: -1000,
            y: -1000,
            active: false,
        };

        const random = (min, max) =>
            Math.random() * (max - min) + min;

        const createParticle = () => ({
            x: random(0, width),
            y: random(0, height),

            originX: random(0, width),
            originY: random(0, height),

            size: random(0.7, 2.1),

            speedX: random(-0.22, 0.22),
            speedY: random(-0.22, 0.22),

            opacity: random(0.25, 0.7),

            color: COLORS[
                Math.floor(Math.random() * COLORS.length)
            ],

            phase: random(0, Math.PI * 2),
        });

        const resizeCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;

            // Limit DPR to reduce GPU and memory usage.
            dpr = Math.min(window.devicePixelRatio || 1, 1.75);

            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const isMobile = width < 768;

            const count = isMobile
                ? PARTICLE_COUNT_MOBILE
                : PARTICLE_COUNT_DESKTOP;

            particles = Array.from(
                { length: count },
                createParticle
            );

            drawFrame();
        };

        const drawParticle = (particle) => {
            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`;

            ctx.fill();
        };

        const drawConnections = () => {
            const isDark = themeRef.current;

            const connectionColor = isDark
                ? '108, 99, 255'
                : '99, 102, 241';

            // Draw each pair only once.
            for (let i = 0; i < particles.length; i++) {
                const particle = particles[i];

                for (let j = i + 1; j < particles.length; j++) {
                    const other = particles[j];

                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;

                    // Avoid expensive square roots for distant particles.
                    const distanceSquared = dx * dx + dy * dy;
                    const maxDistanceSquared =
                        CONNECTION_DISTANCE * CONNECTION_DISTANCE;

                    if (distanceSquared >= maxDistanceSquared) {
                        continue;
                    }

                    const distance = Math.sqrt(distanceSquared);

                    const opacity =
                        (1 - distance / CONNECTION_DISTANCE) *
                        (isDark ? 0.16 : 0.09);

                    ctx.beginPath();

                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(other.x, other.y);

                    ctx.strokeStyle = `rgba(${connectionColor}, ${opacity})`;

                    ctx.lineWidth = 0.6;

                    ctx.stroke();
                }
            }
        };

        const updateParticles = (time) => {
            const isDark = themeRef.current;

            particles.forEach((particle) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Gentle ambient movement.
                if (!reducedMotionQuery.matches) {
                    particle.x += Math.sin(
                        time * 0.00025 + particle.phase
                    ) * 0.12;

                    particle.y += Math.cos(
                        time * 0.0002 + particle.phase
                    ) * 0.12;
                }

                // Subtle cursor interaction.
                if (
                    mouse.active &&
                    !coarsePointerQuery.matches
                ) {
                    const dx = particle.x - mouse.x;
                    const dy = particle.y - mouse.y;

                    const distanceSquared = dx * dx + dy * dy;

                    if (
                        distanceSquared < MOUSE_RADIUS * MOUSE_RADIUS &&
                        distanceSquared > 0
                    ) {
                        const distance = Math.sqrt(distanceSquared);

                        const force =
                            (MOUSE_RADIUS - distance) /
                            MOUSE_RADIUS;

                        particle.x += (dx / distance) * force * 1.4;
                        particle.y += (dy / distance) * force * 1.4;
                    }
                }

                // Wrap particles around screen edges.
                if (particle.x < -5) particle.x = width + 5;
                if (particle.x > width + 5) particle.x = -5;

                if (particle.y < -5) particle.y = height + 5;
                if (particle.y > height + 5) particle.y = -5;

                particle.opacity =
                    isDark
                        ? Math.min(0.75, particle.opacity)
                        : Math.min(0.48, particle.opacity);
            });
        };

        const drawFrame = () => {
            ctx.clearRect(0, 0, width, height);

            drawConnections();

            particles.forEach(drawParticle);
        };

        const animate = (time) => {
            if (!isVisible) return;

            ctx.clearRect(0, 0, width, height);

            updateParticles(time);

            drawConnections();

            particles.forEach(drawParticle);

            animationId = window.requestAnimationFrame(animate);
        };

        const startAnimation = () => {
            if (animationId || !isVisible) return;

            if (reducedMotionQuery.matches) {
                drawFrame();
                return;
            }

            animationId = window.requestAnimationFrame(animate);
        };

        const stopAnimation = () => {
            if (animationId) {
                window.cancelAnimationFrame(animationId);
                animationId = null;
            }
        };

        const handleMouseMove = (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
            mouse.active = true;
        };

        const handleMouseLeave = () => {
            mouse.active = false;
            mouse.x = -1000;
            mouse.y = -1000;
        };

        const handleVisibilityChange = () => {
            isVisible = !document.hidden;

            if (isVisible) {
                startAnimation();
            } else {
                stopAnimation();
            }
        };

        const handleMotionPreferenceChange = () => {
            stopAnimation();

            if (reducedMotionQuery.matches) {
                drawFrame();
            } else {
                startAnimation();
            }
        };

        const handleResize = () => {
            resizeCanvas();

            if (!reducedMotionQuery.matches) {
                startAnimation();
            }
        };

        resizeCanvas();

        window.addEventListener('resize', handleResize, {
            passive: true,
        });

        window.addEventListener('mousemove', handleMouseMove, {
            passive: true,
        });

        window.addEventListener('mouseleave', handleMouseLeave);

        document.addEventListener(
            'visibilitychange',
            handleVisibilityChange
        );

        reducedMotionQuery.addEventListener(
            'change',
            handleMotionPreferenceChange
        );

        startAnimation();

        return () => {
            stopAnimation();

            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);

            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            );

            reducedMotionQuery.removeEventListener(
                'change',
                handleMotionPreferenceChange
            );
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0"
            style={{
                opacity: darkMode ? 0.8 : 0.55,
                transition: 'opacity 400ms ease',
            }}
        />
    );
};

export default ParticleBackground;









// // src/components/ParticleBackground.jsx
// import React, { useEffect, useRef, useCallback } from 'react';
// import { useTheme } from '../context/ThemeContext';

// const ParticleBackground = () => {
//     const canvasRef = useRef(null);
//     const { darkMode } = useTheme();
//     const mouseRef = useRef({ x: 0, y: 0 });
//     const particlesRef = useRef([]);
//     const animationRef = useRef(null);

//     const initParticles = useCallback((canvas) => {
//         const particles = [];
//         const count = window.innerWidth < 768 ? 50 : 100;

//         for (let i = 0; i < count; i++) {
//             particles.push({
//                 x: Math.random() * canvas.width,
//                 y: Math.random() * canvas.height,
//                 size: Math.random() * 2 + 0.5,
//                 speedX: (Math.random() - 0.5) * 0.5,
//                 speedY: (Math.random() - 0.5) * 0.5,
//                 opacity: Math.random() * 0.5 + 0.2,
//                 color: ['#6C63FF', '#FF6584', '#00D9FF'][Math.floor(Math.random() * 3)],
//             });
//         }
//         return particles;
//     }, []);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');

//         const handleResize = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//             particlesRef.current = initParticles(canvas);
//         };

//         const handleMouseMove = (e) => {
//             mouseRef.current = { x: e.clientX, y: e.clientY };
//         };

//         handleResize();
//         window.addEventListener('resize', handleResize);
//         window.addEventListener('mousemove', handleMouseMove);

//         const animate = () => {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);

//             particlesRef.current.forEach((particle, i) => {
//                 // Update position
//                 particle.x += particle.speedX;
//                 particle.y += particle.speedY;

//                 // Mouse interaction
//                 const dx = mouseRef.current.x - particle.x;
//                 const dy = mouseRef.current.y - particle.y;
//                 const distance = Math.sqrt(dx * dx + dy * dy);

//                 if (distance < 150) {
//                     const force = (150 - distance) / 150;
//                     particle.x -= dx * force * 0.01;
//                     particle.y -= dy * force * 0.01;
//                 }

//                 // Wrap around
//                 if (particle.x < 0) particle.x = canvas.width;
//                 if (particle.x > canvas.width) particle.x = 0;
//                 if (particle.y < 0) particle.y = canvas.height;
//                 if (particle.y > canvas.height) particle.y = 0;

//                 // Draw particle
//                 ctx.beginPath();
//                 ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
//                 ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
//                 ctx.fill();

//                 // Draw connections
//                 particlesRef.current.slice(i + 1).forEach((other) => {
//                     const dist = Math.sqrt(
//                         (particle.x - other.x) ** 2 + (particle.y - other.y) ** 2
//                     );

//                     if (dist < 120) {
//                         ctx.beginPath();
//                         ctx.moveTo(particle.x, particle.y);
//                         ctx.lineTo(other.x, other.y);
//                         const opacity = (1 - dist / 120) * 0.15;
//                         ctx.strokeStyle = darkMode
//                             ? `rgba(108, 99, 255, ${opacity})`
//                             : `rgba(108, 99, 255, ${opacity * 0.5})`;
//                         ctx.lineWidth = 0.5;
//                         ctx.stroke();
//                     }
//                 });
//             });

//             animationRef.current = requestAnimationFrame(animate);
//         };

//         animate();

//         return () => {
//             window.removeEventListener('resize', handleResize);
//             window.removeEventListener('mousemove', handleMouseMove);
//             cancelAnimationFrame(animationRef.current);
//         };
//     }, [darkMode, initParticles]);

//     return (
//         <canvas
//             ref={canvasRef}
//             className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
//             style={{ opacity: darkMode ? 0.6 : 0.3 }}
//         />
//     );
// };

// export default ParticleBackground;