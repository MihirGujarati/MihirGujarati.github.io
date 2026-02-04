'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/useTheme';

function BulldozerIcon({ mode }: { mode: 'up' | 'down' }) {
  // Blade positions
  const bladeY = mode === 'up' ? 30 : 36;      // blade body
  const bladeTop = bladeY;                    // top edge
  const bladeBottom = bladeY + 10;            // bottom edge

  // Arms from chassis to blade
  const armEndY = mode === 'up' ? 34 : 40;

  return (
    <svg width="36" height="36" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      {/* Tracks */}
      <rect x="10" y="44" width="38" height="10" rx="5" stroke="white" strokeWidth="4" />
      <circle cx="18" cy="49" r="2.2" fill="white" opacity="0.9" />
      <circle cx="26" cy="49" r="2.2" fill="white" opacity="0.9" />
      <circle cx="34" cy="49" r="2.2" fill="white" opacity="0.9" />
      <circle cx="42" cy="49" r="2.2" fill="white" opacity="0.9" />

      {/* Body */}
      <rect x="16" y="30" width="26" height="14" rx="4" stroke="white" strokeWidth="4" />
      {/* Cab */}
      <rect x="22" y="22" width="14" height="10" rx="3" stroke="white" strokeWidth="4" />
      <path d="M26 24h6" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />

      {/* Arm / frame to blade */}
      <path
        d={`M42 36 L52 ${armEndY}`}
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d={`M42 40 L52 ${armEndY + 4}`}
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Blade */}
      <path
        d={`M52 ${bladeTop} H60 V${bladeBottom} H52`}
        stroke="white"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Blade teeth */}
      <path d={`M52 ${bladeBottom} L54 ${bladeBottom + 4}`} stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d={`M55 ${bladeBottom} L57 ${bladeBottom + 4}`} stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d={`M58 ${bladeBottom} L60 ${bladeBottom + 4}`} stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const isTouchDevice = () =>
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      navigator.msMaxTouchPoints > 0;

    setIsVisible(!isTouchDevice());

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Better pointer detection (checks parent chain)
      const pointerEl = target.closest?.('a,button,[role="button"],[data-cursor="pointer"]');
      const computedPointer = window.getComputedStyle(target).cursor === 'pointer';

      setIsPointer(Boolean(pointerEl) || computedPointer);
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    if (!isTouchDevice()) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!isVisible) return null;

  // Mode rules:
  // click => blade UP
  // hover pointer => blade DOWN
  // default => blade DOWN (change last 'down' to 'up' if you want idle-up)
  const mode: 'up' | 'down' = isPressed ? 'up' : isPointer ? 'down' : 'down';

  return (
    <>
      {/* Optional spotlight (dark mode) */}
      {isDark && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-40 hidden sm:block"
          animate={{
            x: position.x - 120,
            y: position.y - 120,
            scale: isPointer ? 1.15 : isPressed ? 0.9 : 1,
          }}
          transition={{ type: 'spring', stiffness: 150, damping: 18, mass: 0.12 }}
        >
          <div
            className="w-[240px] h-[240px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 40%, transparent 72%)',
              filter: 'blur(6px)',
            }}
          />
        </motion.div>
      )}

      {/* Bulldozer cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 hidden sm:block mix-blend-difference"
        animate={{
          x: position.x - 18,
          y: position.y - 18,
          scale: isPressed ? 1.06 : isPointer ? 1.0 : 0.96,
          rotate: isPressed ? -6 : isPointer ? 2 : 0,
        }}
        transition={{ type: 'spring', stiffness: 170, damping: 18, mass: 0.12 }}
      >
        <div className={`${isDark ? 'shadow-[0_0_18px_rgba(255,255,255,0.35)]' : ''} rounded-xl p-1`}>
          <BulldozerIcon mode={mode} />
        </div>
      </motion.div>

      {/* Click pulse */}
      {isDark && isPressed && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-50"
          style={{ x: position.x - 18, y: position.y - 18 }}
          initial={{ scale: 0.6, opacity: 1 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="w-9 h-9 rounded-full bg-white/25 blur-lg" />
        </motion.div>
      )}
    </>
  );
}
