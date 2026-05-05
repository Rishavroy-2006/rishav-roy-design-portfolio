import { motion } from 'motion/react';
import { Mail, Instagram, Linkedin, Heart, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, type: "spring", bounce: 0.4 },
    },
  };

  return (
    <footer className="w-full bg-transparent pt-32 pb-12 px-6 md:px-12 relative z-10" id="contact">
      {/* Animated Background Glows */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden -z-10"
        style={{
          maskImage: 'linear-gradient(to top, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 70%, transparent 100%)'
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-[#FF3CAC]/20 via-[#7D2AE8]/20 to-transparent blur-[120px] opacity-70" />
        
        <motion.div 
          animate={{ 
            x: [-100, 100, -100], 
            y: [-50, 50, -50],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-96 h-96 bg-[#00D5FF]/20 rounded-full blur-[100px] mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            x: [100, -100, 100], 
            y: [50, -50, 50],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#FF3CAC]/20 rounded-full blur-[120px] mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            x: [0, -50, 0], 
            y: [100, -100, 100],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#7D2AE8]/20 rounded-full blur-[100px] mix-blend-screen"
        />

        {/* Fun Magical Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                y: [0, -40],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center relative z-10 mt-20">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center w-full"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-panel border border-white/10 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF3CAC] animate-pulse" />
            <span className="text-white/80 font-bold tracking-[0.25em] uppercase text-xs">
              Let's Connect
            </span>
          </motion.div>

          <h2 className="text-5xl sm:text-7xl md:text-[100px] font-serif font-bold italic mb-6 leading-[1.1] tracking-tight text-white drop-shadow-2xl">
            Have a project <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3CAC] via-[#7D2AE8] to-[#00D5FF] animate-gradient-x px-2 sm:px-4 pb-4">
              in mind?
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl md:text-3xl text-white/50 max-w-3xl font-light mb-16 md:mb-20 leading-relaxed drop-shadow-lg px-4">
            I’d love to bring your ideas to life with stunning designs. <strong className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF3CAC] via-[#7D2AE8] to-[#00D5FF] animate-gradient-x bg-[length:200%_auto]">Let’s talk!</strong>
          </p>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-10 mb-24 md:mb-32 w-full px-4"
          >
            {/* Instagram */}
            <motion.a 
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.instagram.com/rishav.royy/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-[1.5rem] md:rounded-[2rem] glass-panel border border-white/10 hover:border-[#FF3CAC]/50 hover:shadow-[0_0_50px_rgba(255,60,172,0.3)] transition-colors duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF3CAC]/0 to-[#FF3CAC]/0 group-hover:from-[#FF3CAC]/20 group-hover:to-transparent transition-all duration-500" />
              <Instagram className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-white/60 group-hover:text-white transition-all duration-500 relative z-10 sm:mb-2 group-hover:-translate-y-1" />
              <ArrowUpRight className="absolute top-2 right-2 sm:top-4 sm:right-4 w-4 h-4 sm:w-5 sm:h-5 text-white/0 group-hover:text-white/60 transition-all duration-300 transform -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
            </motion.a>

            {/* LinkedIn */}
            <motion.a 
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.linkedin.com/in/rishav-roy2006/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-[1.5rem] md:rounded-[2rem] glass-panel border border-white/10 hover:border-[#00D5FF]/50 hover:shadow-[0_0_50px_rgba(0,213,255,0.3)] transition-colors duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D5FF]/0 to-[#00D5FF]/0 group-hover:from-[#00D5FF]/20 group-hover:to-transparent transition-all duration-500" />
              <Linkedin className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-white/60 group-hover:text-white transition-all duration-500 relative z-10 sm:mb-2 group-hover:-translate-y-1" />
              <ArrowUpRight className="absolute top-2 right-2 sm:top-4 sm:right-4 w-4 h-4 sm:w-5 sm:h-5 text-white/0 group-hover:text-white/60 transition-all duration-300 transform -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
            </motion.a>

            {/* Email */}
            <motion.a 
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:rishavroy.2006@gmail.com"
              className="group relative flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-[1.5rem] md:rounded-[2rem] glass-panel border border-white/10 hover:border-[#7D2AE8]/50 hover:shadow-[0_0_50px_rgba(125,42,232,0.3)] transition-colors duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#7D2AE8]/0 to-[#7D2AE8]/0 group-hover:from-[#7D2AE8]/20 group-hover:to-transparent transition-all duration-500" />
              <Mail className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-white/60 group-hover:text-white transition-all duration-500 relative z-10 sm:mb-2 group-hover:-translate-y-1" />
               <ArrowUpRight className="absolute top-2 right-2 sm:top-4 sm:right-4 w-4 h-4 sm:w-5 sm:h-5 text-white/0 group-hover:text-white/60 transition-all duration-300 transform -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Bottom Banner */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-sm text-white/40">
          <p>© {new Date().getFullYear()} Rishav Roy. All rights reserved.</p>
          <p className="mt-4 md:mt-0 flex items-center gap-1.5 font-medium tracking-wide">
            Designed with <Heart className="w-3.5 h-3.5 text-[#FF3CAC] fill-[#FF3CAC] animate-pulse" /> using Canva & React.
          </p>
        </div>
      </div>
    </footer>
  );
}
