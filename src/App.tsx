import { siteConfig, projects, navLinks } from './config';
import { motion } from 'framer-motion';
import SakuraBackground from './Sakura';
import ThemeToggle from './ThemeToggle';

export default function App() {
  const svgWidth = 800;
  // Dynamic height based on number of projects (approx 360px per project + padding)
  const svgHeight = projects.length * 360 + 300;

  // Generate a beautiful alternating curved path connecting each project
    const pathData = (() => {
    let d = `M 400,0 \n`;
    let currentX = 400;
    let currentY = 0;

    projects.forEach((p, i) => {
      // Curve towards the image side based on alignment
      const isLeft = p.align === 'left';
      const targetX = isLeft ? 220 : 580;
      const targetY = i * 360 + 260; // Approximate vertical center of the project

      // Control points for a smooth S-curve
      d += `C ${currentX},${currentY + 150} ${targetX},${targetY - 150} ${targetX},${targetY} \n`;
      currentX = targetX;
      currentY = targetY;
    });

    // Final exit curve to the bottom
    const finalX = 400;
    const finalY = svgHeight;
    d += `C ${currentX},${currentY + 150} ${finalX},${finalY - 150} ${finalX},${finalY} \n`;
    return d;
  })();

  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-slate-800 dark:text-[#c9d1d9] tracking-wide transition-colors duration-300 bg-cover bg-center bg-fixed bg-[url('https://oss.ericzhao3366.work/blog/background.png')]">
      <SakuraBackground />
      <div className="absolute inset-0 bg-black/40 hidden dark:block z-0 pointer-events-none transition-colors duration-300"></div>
      {/* Background Flight Path */}
      <div className='absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none z-0'>
        <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            id="flight-path"
            d={pathData}
            stroke="#f472b6"
            strokeWidth="3"
            strokeDasharray="10 10"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <g filter="drop-shadow(0px 4px 6px rgba(236,72,153,0.5))">
            {/* Elegant paper airplane SVG path */}
            <path d="M-12,-12 L18,0 L-12,12 L-4,0 Z" fill="#ec4899" />
            <animateMotion dur={`${projects.length * 2.5}s`} repeatCount="indefinite" rotate="auto">
              <mpath href="#flight-path" />
            </animateMotion>
          </g>
        </svg>
      </div>

      {/* Top Navigation Bar */}
      <header className='fixed top-0 left-0 right-0 h-16 bg-white/70 dark:bg-[#161b22]/70 backdrop-blur-md border-b border-pink-100 dark:border-[#30363d] shadow-sm z-50 flex items-center justify-between px-6 md:px-12 transition-colors duration-300'>
        <div className='hidden md:block text-xl md:text-2xl font-extrabold text-pink-500 drop-shadow-sm tracking-wider'>
          <a href="/">{siteConfig.title}</a>
        </div>
        <div className='flex items-center gap-6 md:gap-8 w-full md:w-auto justify-end md:justify-end'>
          <nav className='flex items-center gap-6 md:gap-8'>
            {navLinks.map((link, idx) => (
              <a key={idx} href={link.url} className='text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 font-bold transition-colors active:scale-95'>
                {link.name}
              </a>
            ))}
          </nav>
          <div className='w-[1px] h-5 bg-pink-200 dark:bg-[#30363d]'></div>
          <ThemeToggle />
        </div>
      </header>

      <main className='max-w-4xl mx-auto px-6 py-6 pt-24 relative z-10'>
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className={`flex mb-24 w-full justify-center ${project.align === 'right' ? 'md:justify-end' : 'md:justify-start'}`}
          >
            {/* GitHub Card style based on hello_github_card */}
            <div className='w-full md:w-[85%] bg-[#f6f8fa] dark:bg-[#0d1117] rounded-xl border border-[#d0d7de] dark:border-[#30363d] shadow-md relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/10 hover:-translate-y-1 hover:scale-[1.02]'>
              {/* Decorative bottom strip */}
              <div className='absolute bottom-0 left-0 w-full h-[6px] bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500'></div>

              <div className='p-6 md:p-8 flex items-start justify-between'>
                <div className='flex-1 pr-6'>
                  <div className='flex items-center gap-2 mb-3'>
                    <svg aria-hidden="true" height="20" viewBox="0 0 16 16" version="1.1" width="20" className="fill-[#57606a] dark:fill-[#8b949e]"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className='text-2xl font-bold text-[#24292f] dark:text-[#c9d1d9] hover:text-[#0969da] dark:hover:text-[#58a6ff] hover:underline cursor-pointer tracking-tight'>
                      {project.name}
                    </a>
                  </div>
                  
                  <p className='text-[#57606a] dark:text-[#8b949e] text-base leading-relaxed mb-6 line-clamp-3'>
                    {project.description}
                  </p>

                  <div className='flex flex-wrap items-center gap-5 text-sm text-[#57606a] dark:text-[#8b949e] font-medium'>
                    {project.language && (
                      <span className='flex items-center gap-1.5'>
                        <svg width="12" height="12" className='rounded-full border border-white dark:border-[#0d1117]'><circle cx="6" cy="6" r="6" fill={project.languageColor || '#3178c6'} /></svg>
                        {project.language}
                      </span>
                    )}
                  </div>
                </div>

                <div className='shrink-0 rounded-full bg-white dark:bg-[#0d1117] p-1 border-2 border-[#d0d7de] dark:border-[#30363d] box-content shadow-sm'>
                  <img src={project.image} alt="Avatar" className='w-14 h-14 md:w-20 md:h-20 rounded-full object-cover' />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </main>

      <footer className='py-8 mt-12 text-center text-xs text-[#57606a] dark:text-[#8b949e] border-t border-[#d0d7de] dark:border-[#30363d] bg-[#f6f8fa] dark:bg-[#161b22] relative z-10 transition-colors duration-300'>
        <div className='max-w-4xl mx-auto px-6 flex flex-col items-center gap-2'>
          <p>{siteConfig.copyright}</p>
          <div className='flex flex-wrap justify-center gap-4 mt-2'>
            <a href='https://beian.miit.gov.cn/' target='_blank' rel='noopener noreferrer' className='hover:text-[#0969da] dark:hover:text-[#58a6ff] transition'>{siteConfig.icp}</a>
            <span className='opacity-50'>|</span>
            <a href={`https://beian.mps.gov.cn/#/query/webSearch?code=${siteConfig.psb.replace(/[^0-9]/g, '')}`} target='_blank' rel='noopener noreferrer' className='hover:text-[#0969da] dark:hover:text-[#58a6ff] transition flex items-center gap-1'>
              <img src='https://www.beian.gov.cn/img/ghs.png' alt='' className='w-3 h-3 object-contain opacity-70' onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              {siteConfig.psb}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
