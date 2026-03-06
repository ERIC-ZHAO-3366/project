import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SAKURA_COLORS = ['#fbcfe8', '#f9a8d4', '#f472b6', '#ffffff'];

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  rotateStart: number;
  drift: number;
}

export default function SakuraBackground() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate some petals on mount
    const newPetals = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 12 + Math.random() * 8,
      size: 10 + Math.random() * 12,
      color: SAKURA_COLORS[Math.floor(Math.random() * SAKURA_COLORS.length)],
      rotateStart: Math.random() * 360,
      drift: Math.random() * 20 - 10,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPetals(newPetals);
  }, []);

  return (
    <div className='fixed inset-0 pointer-events-none z-[1] overflow-hidden'>
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className='absolute top-[-10%]'
          initial={{
            left: `${p.x}%`,
            y: '-10vh',
            rotate: p.rotateStart,
            opacity: 0,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: ['0vw', `${p.drift}vw`],
            rotate: [p.rotateStart, p.rotateStart + 360],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Simple Sakura SVG or generic CSS petal shape */}
          <svg width={p.size} height={p.size} viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M15,0 C20,0 25,5 25,12 C25,19 15,30 15,30 C15,30 5,19 5,12 C5,5 10,0 15,0 Z'
              fill={p.color}
              className="origin-center rotate-[45deg]"
              opacity='0.7'
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
