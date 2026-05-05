import { motion } from 'motion/react';

const skills = [
  "Newsletter Design", 
  "Certificate Design", 
  "Poster Design",
  "Banner Design", 
  "Social Media Graphics", 
  "Brand Identity",
  "Typography", 
  "Layout Design"
];

export function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto min-h-[80vh] flex items-center relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400">Me</span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light mb-10 max-w-2xl">
            I'm Rishav Roy, a passionate visual designer specializing in Canva-based design solutions. I create professional, eye-catching materials for businesses, educators, and creatives. My work spans newsletters, marketing materials, certificates, social graphics, and more.
          </p>

          <div className="flex flex-wrap gap-3 mb-10 max-w-2xl">
            {skills.map(skill => (
              <span 
                key={skill} 
                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/80 hover:bg-white/10 transition-colors"
              >
                {skill}
              </span>
            ))}
            <span className="px-4 py-2 rounded-full border border-pink-500/50 bg-pink-500/10 text-sm text-white/90 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
              Visual Storytelling
            </span>
          </div>

          <a 
            href="mailto:rishavroy.2006@gmail.com" 
            className="inline-flex px-8 py-4 rounded-full bg-gradient-to-r from-[rgb(255,124,196)] to-purple-400 text-white font-bold tracking-wide hover:scale-105 transition-transform shadow-lg shadow-purple-500/20"
          >
            Let's Work Together
          </a>
        </motion.div>

        {/* Image Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative w-[85%] sm:w-full max-w-[320px] sm:max-w-md mx-auto mt-10 lg:mt-0 lg:ml-auto xl:mr-10"
        >
          {/* Decorative elements */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#FF3CAC]/30 to-[#2B86C5]/30 rounded-[2.5rem] blur-2xl opacity-50" />
          
          <div className="relative aspect-square sm:aspect-[4/5] rounded-[2rem] sm:rounded-3xl overflow-hidden border border-white/10 bg-white/5 glass-panel z-10 group">
            <img 
              src="/rishav-roy.jpg" 
              alt="Rishav Roy" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent mix-blend-multiply pointer-events-none" />
          </div>
          
          {/* Floating graphic */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 z-20 px-6 py-4 rounded-2xl glass-panel border border-white/20 backdrop-blur-xl shadow-xl flex items-center gap-3"
          >
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-wider">Open to work</span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
