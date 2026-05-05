import { motion } from 'motion/react';
import { Project } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';

interface FeaturedProjectsProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export function FeaturedProjects({ projects, onSelectProject }: FeaturedProjectsProps) {
  const featuredProjects = projects.filter(p => p.featured);

  return (
    <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto relative z-10" id="featured">
      <div className="mb-16 flex items-end justify-between">
        <div>
          <span className="text-[#00D5FF] tracking-[0.2em] uppercase text-xs font-bold mb-4 block">Selected Works</span>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">Best of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3CAC] via-[#7D2AE8] to-[#00D5FF]">My Designs</span></h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:auto-rows-[350px]">
        {featuredProjects.map((project, i) => {
          // Create an asymmetrical layout based on index
          let colSpan = "lg:col-span-12";
          let rowSpan = "lg:row-span-1";
          
          if (i === 0) {
            colSpan = "lg:col-span-7";
            rowSpan = "lg:row-span-2";
          } else if (i === 1) {
            colSpan = "lg:col-span-5";
            rowSpan = "lg:row-span-2";
          } else if (i === 2) {
            colSpan = "lg:col-span-12";
            rowSpan = "lg:row-span-1";
          }

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
              onClick={() => onSelectProject(project)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer border border-white/5 bg-white/[0.02] backdrop-blur-xl ${colSpan} ${rowSpan} min-h-[400px] lg:min-h-0 hover:border-white/20 hover:shadow-[0_0_50px_rgba(125,42,232,0.25)] transition-all duration-500`}
            >
               {/* Hover Glass Glow */}
               <div className="absolute inset-0 bg-gradient-to-br from-[#FF3CAC]/0 via-[#7D2AE8]/0 to-[#00D5FF]/0 group-hover:from-[#FF3CAC]/30 group-hover:via-[#7D2AE8]/20 group-hover:to-[#00D5FF]/30 transition-all duration-700 z-10 pointer-events-none mix-blend-color-dodge opacity-0 group-hover:opacity-100" />

               {/* Background Image */}
               <div className="absolute inset-0 bg-black">
                 <img 
                   src={project.fullImageUrl} 
                   alt={project.title} 
                   className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                 />
               </div>
               
               {/* Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 z-10" />

               {/* Content Area */}
               <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-20">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-bold bg-white/10 text-white backdrop-blur-md uppercase tracking-widest mb-4 border border-white/10 shadow-lg">
                      {project.category}
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-3 leading-tight">{project.title}</h3>
                        <p className="text-white/60 line-clamp-2 max-w-xl font-light text-sm md:text-base">{project.description}</p>
                      </div>
                      <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shrink-0 shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                        <ArrowUpRight className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
               </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
