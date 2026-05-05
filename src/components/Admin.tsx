import React, { useState } from 'react';
import { Project, Category } from '../data/projects';
import { useProjects } from '../hooks/useProjects';
import { Plus, Edit2, Trash2, X, Upload } from 'lucide-react';

const CATEGORIES: Category[] = ['Newsletter', 'Flex Design', 'Certificate', 'Poster', 'Banner', 'Card', 'ID Card'];

export function Admin() {
  const { projects, isLoading, addProject, updateProject, deleteProject } = useProjects();
  const [editingProject, setEditingProject] = useState<Project | Partial<Project> | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if ('id' in editingProject && editingProject.id) {
      await updateProject(editingProject.id, editingProject, pdfFile || undefined, imageFile || undefined);
    } else {
      await addProject(editingProject, pdfFile || undefined, imageFile || undefined);
    }
    setEditingProject(null);
    setPdfFile(null);
    setImageFile(null);
  };

  const handleCreateNew = () => {
    setEditingProject({
      title: '',
      description: '',
      category: 'Poster',
      thumbnailUrl: '',
      fullImageUrl: '',
      canvaUrl: '',
      featured: false
    });
    setPdfFile(null);
    setImageFile(null);
  };

  if (isLoading) return <div className="min-h-screen text-white flex items-center justify-center">Loading Admin...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">Portfolio Admin</h1>
            <p className="text-white/50 text-sm">
              Note: because this site is currently running on a preview server, files uploaded here may reset when the server restarts.
            </p>
          </div>
          <button 
            onClick={handleCreateNew}
            className="flex items-center gap-2 bg-[#FF2D87] hover:bg-[#FF2D87]/80 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col">
              <img src={proj.thumbnailUrl} alt={proj.title} className="w-full h-40 object-cover rounded-lg mb-4" />
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg leading-tight">{proj.title}</h3>
                {proj.featured && <span className="bg-[#06B6D4]/20 text-[#06B6D4] text-xs px-2 py-1 rounded">Featured</span>}
              </div>
              <p className="text-sm text-white/50 mb-4 flex-grow line-clamp-2">{proj.description}</p>
              
              <div className="flex gap-2 mt-auto">
                <button 
                  onClick={() => setEditingProject(proj)}
                  className="flex-1 flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 py-2 rounded-lg text-sm transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button 
                  onClick={() => { if(confirm('Are you sure?')) deleteProject(proj.id) }}
                  className="flex-1 flex justify-center items-center gap-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 py-2 rounded-lg text-sm transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111] border border-white/10 p-6 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {'id' in editingProject ? 'Edit Project' : 'New Project'}
              </h2>
              <button onClick={() => setEditingProject(null)} className="text-white/50 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-white/70 mb-1">Title</label>
                <input 
                  required
                  type="text" 
                  value={editingProject.title || ''} 
                  onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-[#7C3AED] outline-none" 
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-1">Description</label>
                <textarea 
                  required
                  rows={3}
                  value={editingProject.description || ''} 
                  onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-[#7C3AED] outline-none resize-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/70 mb-1">Category</label>
                  <select 
                    value={editingProject.category || 'Poster'} 
                    onChange={(e) => setEditingProject({...editingProject, category: e.target.value as Category})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-[#7C3AED] outline-none appearance-none"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                
                <div className="flex items-center gap-2 mt-6">
                  <input 
                    type="checkbox" 
                    id="featured"
                    checked={editingProject.featured || false} 
                    onChange={(e) => setEditingProject({...editingProject, featured: e.target.checked})}
                    className="w-4 h-4 rounded bg-white/5 border-white/10 text-[#FF2D87] focus:ring-[#FF2D87]"
                  />
                  <label htmlFor="featured" className="text-sm">Featured Project</label>
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-1">Cover Image (Upload)</label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 cursor-pointer bg-white/5 border border-white/10 border-dashed rounded-lg px-4 py-4 hover:bg-white/10 transition-colors flex flex-col items-center justify-center">
                    <Upload className="w-6 h-6 mb-2 text-white/50" />
                    <span className="text-sm text-white/70">
                      {imageFile ? imageFile.name : (editingProject.thumbnailUrl ? 'Upload new image to replace' : 'Click to upload image')}
                    </span>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
                      className="hidden" 
                    />
                  </label>
                </div>
                {editingProject.thumbnailUrl && !imageFile && (
                  <p className="text-xs text-white/40 mt-1 line-clamp-1">Current Image: {editingProject.thumbnailUrl}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-1">Thumbnail URL (optional if uploading)</label>
                <input 
                  type="url" 
                  value={editingProject.thumbnailUrl || ''} 
                  onChange={(e) => setEditingProject({...editingProject, thumbnailUrl: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-[#7C3AED] outline-none" 
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-1">Full Image URL (optional if uploading)</label>
                <input 
                  type="url" 
                  value={editingProject.fullImageUrl || ''} 
                  onChange={(e) => setEditingProject({...editingProject, fullImageUrl: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-[#7C3AED] outline-none" 
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-1">Canva Link</label>
                <input 
                  required
                  type="url" 
                  value={editingProject.canvaUrl || ''} 
                  onChange={(e) => setEditingProject({...editingProject, canvaUrl: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-[#7C3AED] outline-none" 
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-1">PDF File (optional)</label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 cursor-pointer bg-white/5 border border-white/10 border-dashed rounded-lg px-4 py-4 hover:bg-white/10 transition-colors flex flex-col items-center justify-center">
                    <Upload className="w-6 h-6 mb-2 text-white/50" />
                    <span className="text-sm text-white/70">
                      {pdfFile ? pdfFile.name : (editingProject.pdfUrl ? 'Upload new PDF to replace' : 'Click to upload PDF')}
                    </span>
                    <input 
                      type="file" 
                      accept=".pdf"
                      onChange={(e) => e.target.files && setPdfFile(e.target.files[0])}
                      className="hidden" 
                    />
                  </label>
                </div>
                {editingProject.pdfUrl && !pdfFile && (
                  <p className="text-xs text-white/40 mt-1">Current PDF: {editingProject.pdfUrl}</p>
                )}
              </div>

              <div className="mt-4 flex justify-end gap-3 border-t border-white/10 pt-4">
                <button 
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-colors text-white/70"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-[#FF2D87] to-[#7C3AED] hover:opacity-90 transition-opacity"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
