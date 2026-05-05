import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, ExternalLink, X, FileText, Image as ImageIcon } from 'lucide-react';
import type { Project } from '../data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [viewMode, setViewMode] = useState<'image' | 'pdf'>('pdf');

  if (!project) return null;

  const hasPdf = !!project.pdfUrl;

  // Set default view mode to pdf if available, otherwise image
  useState(() => {
    if (hasPdf) setViewMode('pdf');
    else setViewMode('image');
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-6xl h-[90vh] glass-panel rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-blue-500/10"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-md border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Preview Area */}
        <div className="flex-1 bg-black/80 relative overflow-hidden flex flex-col h-full min-h-[40vh] md:min-h-0 border-r border-white/10">
          
          {hasPdf && (
            <div className="absolute top-4 left-4 z-10 flex bg-black/50 backdrop-blur-md rounded-lg p-1 border border-white/10">
              <button 
                onClick={() => setViewMode('pdf')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'pdf' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'}`}
              >
                <FileText className="w-4 h-4" /> PDF View
              </button>
              <button 
                onClick={() => setViewMode('image')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'image' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'}`}
              >
                <ImageIcon className="w-4 h-4" /> Image View
              </button>
            </div>
          )}

          <div className="flex-1 w-full h-full p-4 pt-16 md:p-8 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {viewMode === 'pdf' && hasPdf ? (
                <motion.div
                  key="pdf"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full rounded-xl overflow-hidden glass-panel"
                >
                  <iframe 
                    src={`${project.pdfUrl}#toolbar=0`} 
                    className="w-full h-full border-0"
                    title={`${project.title} PDF Preview`}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <img 
                    src={project.fullImageUrl} 
                    alt={project.title}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Project Details Sidebar */}
        <div className="w-full md:w-[400px] bg-[#0A0A0A] p-6 md:p-8 flex flex-col overflow-y-auto">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-white/5 text-white/80 uppercase tracking-widest mb-6 border border-white/10">
              {project.category}
            </span>
            <h2 className="text-3xl font-display font-extrabold mb-4 leading-tight">{project.title}</h2>
            <p className="text-white/60 leading-relaxed text-sm font-light">
              {project.description}
            </p>
          </div>

          <div className="mt-auto pt-8 flex flex-col gap-3">
            <a 
              href={project.canvaUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20"
            >
              <ExternalLink className="w-4 h-4" />
              View on Canva
            </a>
            {hasPdf && (
              <a 
                href={project.pdfUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl glass-panel text-white font-medium hover:bg-white/10 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
