import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Category, Project } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { Search } from 'lucide-react';

const CATEGORIES: Category[] = ['All', 'Newsletter', 'Flex Design', 'Certificate', 'Poster', 'Banner', 'Card', 'ID Card'];

interface ProjectGridProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export function ProjectGrid({ projects, onSelectProject }: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen" id="work">
      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 relative z-10">
        
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm transition-all duration-300 font-medium ${
                selectedCategory === cat 
                  ? 'bg-white text-black shadow-lg shadow-white/10'
                  : 'glass-panel text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-auto min-w-[280px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pr-4 pl-11 text-white placeholder:text-white/40 outline-none focus:border-white/30 transition-colors backdrop-blur-md"
          />
        </div>
      </div>

      {/* Grid */}
      {filteredProjects.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, i) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={i} 
                onClick={onSelectProject} 
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-32 text-white/50">
          No projects found matching your criteria.
        </div>
      )}
    </section>
  );
}
