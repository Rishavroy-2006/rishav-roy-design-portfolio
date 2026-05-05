import { motion } from 'motion/react';
import type { Project } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  index: number;
  key?: string | number;
}

export function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 + 0.1, duration: 0.5, ease: "easeOut" }}
      onClick={() => onClick(project)}
      className="group relative cursor-pointer block rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-xl aspect-[4/5] hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_0_40px_rgba(125,42,232,0.3)] transition-all duration-500"
    >
      {/* Hover Glass Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF3CAC]/0 via-[#7D2AE8]/0 to-[#00D5FF]/0 group-hover:from-[#FF3CAC]/30 group-hover:via-[#7D2AE8]/20 group-hover:to-[#00D5FF]/30 transition-all duration-700 z-10 pointer-events-none mix-blend-color-dodge opacity-0 group-hover:opacity-100" />

      <img 
        src={project.thumbnailUrl} 
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end z-20">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold bg-white/20 text-white backdrop-blur-md uppercase tracking-wider mb-3">
            {project.category}
          </span>
          <div className="flex items-end justify-between gap-4">
            <h3 className="text-xl sm:text-2xl font-display font-medium text-white leading-tight">
              {project.title}
            </h3>
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shrink-0">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
