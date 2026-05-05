import { useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export function Hero() {
  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 40, damping: 20 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax mappings for orbs
  const x1 = useTransform(springX, [-1, 1], [-50, 50]);
  const y1 = useTransform(springY, [-1, 1], [-50, 50]);
  const x2 = useTransform(springX, [-1, 1], [60, -60]);
  const y2 = useTransform(springY, [-1, 1], [60, -60]);
  const x3 = useTransform(springX, [-1, 1], [-70, 70]);
  const y3 = useTransform(springY, [-1, 1], [70, -70]);

  // Check for reduced motion preference
  const shouldReduceMotion = useReducedMotion();

  // Generate random particles
  const particles = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  })), []);

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center items-center px-6 pt-24 pb-48 text-center z-10 w-full overflow-hidden">
      
      {/* Immersive Layers (Background) */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 bg-[#050505]"
        style={{
          maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
        }}
      >
        {/* Parallax Orbs */}
        <motion.div style={{ x: shouldReduceMotion ? 0 : x1, y: shouldReduceMotion ? 0 : y1 }} className="absolute inset-0">
          <motion.div
            animate={shouldReduceMotion ? { scale: 1 } : { x: [0, 150, -100, 0], y: [0, -100, 150, 0], scale: [1, 1.4, 0.8, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[20%] w-[50vw] max-w-[600px] aspect-square bg-[#FF2D87]/30 rounded-full blur-[100px] md:blur-[140px] mix-blend-screen"
          />
        </motion.div>
        
        <motion.div style={{ x: shouldReduceMotion ? 0 : x2, y: shouldReduceMotion ? 0 : y2 }} className="absolute inset-0">
          <motion.div
            animate={shouldReduceMotion ? { scale: 1 } : { x: [0, -150, 100, 0], y: [0, 150, -100, 0], scale: [1, 1.2, 0.9, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[30%] right-[10%] w-[40vw] max-w-[500px] aspect-square bg-[#7C3AED]/30 rounded-full blur-[100px] md:blur-[140px] mix-blend-screen"
          />
        </motion.div>

        <motion.div style={{ x: shouldReduceMotion ? 0 : x3, y: shouldReduceMotion ? 0 : y3 }} className="absolute inset-0">
          <motion.div
            animate={shouldReduceMotion ? { scale: 1 } : { x: [0, 100, -150, 0], y: [0, -150, 50, 0], scale: [1, 0.9, 1.3, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[10%] left-[30%] w-[60vw] max-w-[800px] aspect-square bg-[#06B6D4]/20 rounded-full blur-[100px] md:blur-[160px] mix-blend-screen"
          />
        </motion.div>

        {/* Noise Grain Texture */}
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')", backgroundRepeat: "repeat" }}
        />

        {/* Faint Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 mix-blend-overlay" />

        {/* Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)] opacity-80" />

        {/* Floating Particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: `${p.x}vw`, y: `${p.y}vh` }}
            animate={{
              opacity: shouldReduceMotion ? 0.2 : [0, 0.5, 0],
              y: shouldReduceMotion ? `${p.y}vh` : [`${p.y}vh`, `${p.y - 20}vh`],
              x: shouldReduceMotion ? `${p.x}vw` : [`${p.x}vw`, `${p.x + (Math.random() * 10 - 5)}vw`]
            }}
            transition={{ duration: p.duration, repeat: shouldReduceMotion ? 0 : Infinity, delay: p.delay, ease: "linear" }}
            className="absolute rounded-full bg-white blur-[1px]"
            style={{ width: p.size, height: p.size }}
          />
        ))}
      </div>

      <div className="relative z-20 flex flex-col items-center">
        {/* Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", type: "spring", bounce: 0.4 }}
          className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 shadow-2xl bg-gradient-to-r from-[#FF2D87]/10 via-[#7C3AED]/10 to-[#06B6D4]/10 backdrop-blur-xl mb-10"
        >
          <div className={`w-2 h-2 rounded-full bg-[#06B6D4] shadow-[0_0_10px_#06B6D4] ${shouldReduceMotion ? '' : 'animate-pulse'}`} />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">Available for Work</span>
        </motion.div>

        {/* Main Title (3 Lines) */}
        <div className="flex flex-col items-center justify-center pointer-events-none mb-10">
          {/* Line 1 */}
          <motion.div 
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.1 }}
            className="text-[3.5rem] sm:text-6xl md:text-[80px] xl:text-[110px] font-display font-black tracking-tighter text-white leading-[1.1] md:leading-[1]"
          >
            Bringing
          </motion.div>

          {/* Line 2 */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.4 }}
            className="text-[3.5rem] sm:text-6xl md:text-[80px] xl:text-[110px] font-display font-black tracking-tighter leading-[1.1] md:leading-[1] flex flex-wrap justify-center items-center gap-4 sm:gap-6 my-2"
          >
            <span className="relative text-white/50">
              Boring
              <span className="absolute top-[55%] left-[-5%] w-[110%] h-[6px] md:h-[10px] bg-[#FF2D87] -translate-y-1/2 -rotate-3 rounded-full shadow-[0_0_15px_rgba(255,45,135,0.6)]" />
            </span>
            <span className="relative inline-block group">
              <span className="absolute -inset-2 bg-gradient-to-r from-[#FF2D87] via-[#7C3AED] to-[#06B6D4] blur-2xl rounded-full opacity-50 transition-opacity duration-700" />
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D87] via-[#7C3AED] to-[#06B6D4] animate-gradient-x bg-[length:200%_auto] px-2 mix-blend-screen drop-shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                Brilliant
              </span>
            </span>
          </motion.div>

          {/* Line 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring", bounce: 0.4 }}
            className="text-[3.5rem] sm:text-6xl md:text-[80px] xl:text-[110px] font-display font-black tracking-tighter text-white leading-[1.1] md:leading-[1]"
          >
            To Life.
          </motion.div>
        </div>

        <motion.p 
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-lg md:text-2xl text-white/60 max-w-2xl mb-16 font-medium leading-relaxed px-4 text-center pointer-events-none"
        >
          Hi, I'm Rishav Roy. I create visually stunning, highly engaging Canva designs tailored for modern audiences.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex flex-col sm:flex-row items-center w-full max-w-sm sm:max-w-none sm:w-auto gap-4 sm:gap-6 relative z-30 px-4 sm:px-0"
      >
        <MagneticButton 
          onClick={scrollToWork}
          className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-gradient-to-r from-[#FF2D87] via-[#7C3AED] to-[#06B6D4] text-white font-bold text-lg tracking-wide shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.5)] relative overflow-hidden"
        >
          <span className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.3),transparent)] -translate-x-[150%] skew-x-[-20deg] group-hover:animate-[shimmer_1.5s_infinite]" />
          <span className="relative z-10 flex items-center gap-3">
            Explore Gallery
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </MagneticButton>
        
        <MagneticButton 
          href="mailto:rishavroy.2006@gmail.com" 
          className="flex items-center justify-center w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white font-medium text-lg hover:border-white/40 transition-colors relative overflow-hidden group"
        >
           <span className="absolute inset-0 bg-gradient-to-r from-[#FF2D87]/20 via-[#7C3AED]/20 to-[#06B6D4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
           <span className="relative z-10">Let's Talk</span>
        </MagneticButton>
      </motion.div>

      {/* Signal Pulse Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer z-40 group opacity-70 hover:opacity-100 transition-opacity duration-300"
        onClick={scrollToWork}
      >
        <span className="text-white/60 group-hover:text-white/90 text-[10px] font-light uppercase tracking-[0.3em] pl-[0.3em] transition-colors duration-300">Scroll</span>
        <div className="w-[2px] h-16 sm:h-24 bg-white/10 relative overflow-hidden rounded-full">
          <motion.div
             animate={{ y: shouldReduceMotion ? '100%' : ['-100%', '300%'] }}
             transition={{ duration: 1.5, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut" }}
             className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-transparent via-[#06B6D4] to-transparent shadow-[0_0_10px_#06B6D4]"
          />
        </div>
      </motion.div>

      {/* Background Watermark text (toned down further) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0 mix-blend-overlay">
        <h2 className="text-[20vw] font-display font-extrabold text-white/[0.04] whitespace-nowrap leading-none tracking-tighter">
          RISHAV ROY
        </h2>
      </div>
    </section>
  );
}
