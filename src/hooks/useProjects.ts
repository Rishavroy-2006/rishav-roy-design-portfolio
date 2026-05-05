import { useState, useEffect } from 'react';
import { Project } from '../data/projects';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/projects.json?t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    if (res.ok) {
      const { url } = await res.json();
      return url;
    }
    return null;
  };

  const uploadImageFile = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData
    });
    if (res.ok) {
      const data = await res.json();
      return data; // { thumbnailUrl, fullImageUrl }
    }
    return null;
  };

  const addProject = async (projectData: Partial<Project>, pdfFile?: File, imageFile?: File) => {
    let pdfUrl = projectData.pdfUrl;
    
    if (pdfFile) {
      const uploadedUrl = await uploadFile(pdfFile);
      if (uploadedUrl) pdfUrl = uploadedUrl;
    }

    if (imageFile) {
      const uploadedImage = await uploadImageFile(imageFile);
      if (uploadedImage) {
        projectData.thumbnailUrl = uploadedImage.thumbnailUrl;
        projectData.fullImageUrl = uploadedImage.fullImageUrl;
      }
    }

    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...projectData, pdfUrl })
    });
    if (res.ok) await fetchProjects();
  };

  const updateProject = async (id: string, projectData: Partial<Project>, pdfFile?: File, imageFile?: File) => {
    let pdfUrl = projectData.pdfUrl;
    
    if (pdfFile) {
      const uploadedUrl = await uploadFile(pdfFile);
      if (uploadedUrl) pdfUrl = uploadedUrl;
    }

    if (imageFile) {
      const uploadedImage = await uploadImageFile(imageFile);
      if (uploadedImage) {
        projectData.thumbnailUrl = uploadedImage.thumbnailUrl;
        projectData.fullImageUrl = uploadedImage.fullImageUrl;
      }
    }

    const res = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...projectData, pdfUrl })
    });
    if (res.ok) await fetchProjects();
  };

  const deleteProject = async (id: string) => {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) await fetchProjects();
  };

  return { projects, isLoading, addProject, updateProject, deleteProject, refresh: fetchProjects };
}
