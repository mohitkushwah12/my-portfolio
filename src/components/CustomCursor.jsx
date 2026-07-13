// src/components/CustomCursor.jsx
import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
    const ringRef = useRef(null);
    const dotRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect mobile/touch
        const checkMobile = () => {
            const mobile = window.innerWidth < 768 ||
                ('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0);
            setIsMobile(mobile);
            return mobile;
        };

        if (checkMobile()) return;

        const ring = ringRef.current;
        const dot = dotRef.current;
        if (!ring || !dot) return;

        // Position variables
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;
        let rafId;

        // Instant dot movement (no lag)
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Dot updates immediately
            dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        };

        // Smooth ring animation with requestAnimationFrame
        const animateRing = () => {
            // Smooth easing (higher = faster, lower = smoother)
            const easing = 0.2;
            ringX += (mouseX - ringX) * easing;
            ringY += (mouseY - ringY) * easing;

            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
            rafId = requestAnimationFrame(animateRing);
        };

        // Hover detection
        const handleMouseOver = (e) => {
            const target = e.target;
            if (target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer, label')) {
                ring.classList.add('cursor-hover');
                dot.classList.add('cursor-hover');
            }
        };

        const handleMouseOut = (e) => {
            const target = e.target;
            if (target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer, label')) {
                ring.classList.remove('cursor-hover');
                dot.classList.remove('cursor-hover');
            }
        };

        // Click effects
        const handleMouseDown = () => ring.classList.add('cursor-click');
        const handleMouseUp = () => ring.classList.remove('cursor-click');

        // Window enter/leave
        const handleMouseLeave = () => {
            ring.style.opacity = '0';
            dot.style.opacity = '0';
        };

        const handleMouseEnter = () => {
            ring.style.opacity = '1';
            dot.style.opacity = '1';
        };

        // Resize handler
        const handleResize = () => {
            if (checkMobile()) {
                cancelAnimationFrame(rafId);
            }
        };

        // Attach events
        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseover', handleMouseOver, { passive: true });
        document.addEventListener('mouseout', handleMouseOut, { passive: true });
        document.addEventListener('mousedown', handleMouseDown, { passive: true });
        document.addEventListener('mouseup', handleMouseUp, { passive: true });
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);
        document.documentElement.addEventListener('mouseenter', handleMouseEnter);
        window.addEventListener('resize', handleResize);

        // Start smooth animation
        rafId = requestAnimationFrame(animateRing);

        // Cleanup
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(rafId);
        };
    }, []);

    if (isMobile) return null;

    return (
        <>
            <div ref={ringRef} className="custom-cursor-ring" />
            <div ref={dotRef} className="custom-cursor-dot" />
        </>
    );
};

export default CustomCursor;