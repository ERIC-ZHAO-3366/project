import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const getStored = () => {
    try {
      return localStorage.getItem('theme');
    } catch (e) {
      return null;
    }
  };

  const [followSystem, setFollowSystem] = useState<boolean>(() => {
    const t = getStored();
    return t === null || t === 'auto';
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const t = getStored();
    if (t === 'dark') return true;
    if (t === 'light') return false;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    try {
      if (followSystem) {
        localStorage.setItem('theme', 'auto');
      } else {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      }
    } catch (e) {
      // ignore
    }
  }, [isDark, followSystem]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      if (followSystem) {
        setIsDark(Boolean((e as any).matches));
      }
    };

    // initial sync when switching to followSystem
    if (followSystem) {
      setIsDark(mq.matches);
    }

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', handler as any);
    } else if (typeof (mq as any).addListener === 'function') {
      (mq as any).addListener(handler);
    }

    return () => {
      if (typeof mq.removeEventListener === 'function') {
        mq.removeEventListener('change', handler as any);
      } else if (typeof (mq as any).removeListener === 'function') {
        (mq as any).removeListener(handler);
      }
    };
  }, [followSystem]);

  const handleMainToggle = () => {
    if (followSystem) {
      // Turn off follow system and flip to opposite of current effective
      setFollowSystem(false);
      setIsDark((d) => !d);
    } else {
      setIsDark((d) => !d);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleMainToggle}
        className="relative flex items-center w-[60px] h-8 bg-gray-200 dark:bg-gray-700/80 border border-gray-300 dark:border-gray-600 rounded-full cursor-pointer transition-colors duration-300 focus:outline-none"
        aria-label="Toggle theme"
      >
        <span className="absolute left-[6px] flex items-center justify-center pointer-events-none z-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-[14px] h-[14px] text-yellow-500">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
        <span className="absolute right-[6px] flex items-center justify-center pointer-events-none z-0">
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-[14px] h-[14px] text-yellow-300">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </span>

        <motion.div
          className="w-[22px] h-[22px] bg-white rounded-full shadow-md z-10 relative flex items-center justify-center"
          initial={false}
          animate={{
            x: isDark ? 30 : 4,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        />
      </button>

      <label className="select-none text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
        <input
          type="checkbox"
          checked={followSystem}
          onChange={() => setFollowSystem((v) => !v)}
          className="w-4 h-4 rounded"
        />
        <span className="hidden sm:inline">跟随系统</span>
      </label>
    </div>
  );
}
