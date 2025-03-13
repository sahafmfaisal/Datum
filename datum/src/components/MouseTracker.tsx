import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function MouseTracker() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState('default');

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener('mousemove', mouseMove);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            opacity: 0.5
        },
        text: {
            height: 150,
            width: 150,
            x: mousePosition.x - 75,
            y: mousePosition.y - 75,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            mixBlendMode: "difference",
            opacity: 0.8
        }
    };

    useEffect(() => {
        const textElements = document.querySelectorAll('h1, h2, h3, button, a');

        const mouseEnter = () => setCursorVariant('text');
        const mouseLeave = () => setCursorVariant('default');

        textElements.forEach(element => {
            element.addEventListener('mouseenter', mouseEnter);
            element.addEventListener('mouseleave', mouseLeave);
        });

        return () => {
            textElements.forEach(element => {
                element.removeEventListener('mouseenter', mouseEnter);
                element.removeEventListener('mouseleave', mouseLeave);
            });
        };
    }, []);

    return (
        <motion.div
            className="cursor-dot fixed top-0 left-0 w-8 h-8 bg-blue-500 dark:bg-blue-400 rounded-full pointer-events-none z-50 mix-blend-difference"
            variants={variants}
            animate={cursorVariant}
            transition={{
                type: "spring",
                damping: 25,
                stiffness: 300
            }}
        />
    );
}