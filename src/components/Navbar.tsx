import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-4 backdrop-blur-xl bg-black/40 border-b border-white/5' : 'py-6 px-6'
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between px-4 sm:px-6">
          <a href="#" className="font-display font-bold text-2xl tracking-tighter text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center">
              <span className="text-sm">R</span>
            </div>
            Rishav <span className="opacity-50">Roy</span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#featured" className="text-white/60 hover:text-white transition-colors">Work</a>
            <a href="#work" className="text-white/60 hover:text-white transition-colors">Categories</a>
            <a href="#about" className="text-white/60 hover:text-white transition-colors">About</a>
            <a 
              href="mailto:rishavroy.2006@gmail.com" 
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#FF3CAC] to-[#7D2AE8] text-white font-bold shadow-lg shadow-purple-500/25 hover:scale-105 transition-transform"
            >
              Get in Touch
            </a>
          </div>

          <button 
            className="md:hidden p-2 text-white/80 hover:text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-4 text-white/80 hover:text-white"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="flex flex-col items-center gap-8 text-2xl font-display font-medium">
              <a href="#featured" onClick={() => setMobileMenuOpen(false)} className="text-white/60 hover:text-white transition-colors">Work</a>
              <a href="#work" onClick={() => setMobileMenuOpen(false)} className="text-white/60 hover:text-white transition-colors">Categories</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-white/60 hover:text-white transition-colors">About</a>
              <a 
                href="mailto:rishavroy.2006@gmail.com" 
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF3CAC] to-[#7D2AE8] text-white hover:scale-105 transition-transform shadow-lg shadow-purple-500/25"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
