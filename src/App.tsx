import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedProjects } from './components/FeaturedProjects';
import { ProjectGrid } from './components/ProjectGrid';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { About } from './components/About';
import { Project } from './data/projects';
import { Admin } from './components/Admin';
import { useProjects } from './hooks/useProjects';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { projects } = useProjects();

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdmin(window.location.hash === '#admin');
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isAdmin) {
    if (import.meta.env.DEV) {
      return <Admin />;
    } else {
      // If someone tries to access #admin in production, redirect them to home
      window.location.hash = '';
    }
  }

  return (
    <main className="relative min-h-screen">
      <div className="atmosphere-bg" />
      <Navbar />
      <Hero />
      <FeaturedProjects projects={projects} onSelectProject={setSelectedProject} />
      <ProjectGrid projects={projects} onSelectProject={setSelectedProject} />
      <About />
      <Footer />

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </main>
  );
}

