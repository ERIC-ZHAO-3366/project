import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import SakuraBackground from './Sakura';
import ThemeToggle from './ThemeToggle';
import './index.css';

function ErrorPage() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center font-sans text-slate-800 dark:text-[#c9d1d9] tracking-wide transition-colors duration-300 bg-cover bg-center bg-fixed bg-[url('https://oss.ericzhao3366.work/blog/background.png')]">
      <SakuraBackground />
      <div className="absolute inset-0 bg-black/40 hidden dark:block z-0 pointer-events-none transition-colors duration-300"></div>

      <div className="z-10 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-12 rounded-3xl shadow-lg border border-white/20 dark:border-slate-700/50 flex flex-col items-center text-center max-w-lg w-full shrink-0">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-8xl flex font-black bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] dark:drop-shadow-none mb-4"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold mb-4 whitespace-nowrap"
        >
          哎呀，页面走丢了...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-slate-600 dark:text-slate-400 mb-8"
        >
          你寻找的世界可能已经被樱花花瓣掩埋，不如回主页看看吧。
        </motion.p>

        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 pointer-events-auto"
        >
          返回首页
        </motion.a>
      </div>

      <div className="absolute top-4 right-4 z-50 pointer-events-auto">
        <ThemeToggle />
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorPage />
  </StrictMode>
);