import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs/promises";
import path from "path";
import multer from "multer";
import cors from "cors";
import sharp from "sharp";

// Define the absolute paths inside the applet
const dataFilePath = path.join(process.cwd(), "public", "projects.json");
const uploadsDir = path.join(process.cwd(), "public", "uploads");

// Ensure the uploads directory exists
await fs.mkdir(uploadsDir, { recursive: true });

// Setup multer for File Uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Setup multer for Image Uploads (in memory for sharp processing)
const imageUpload = multer({ storage: multer.memoryStorage() });

async function getProjects() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Return empty array if file does not exist
    return [];
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  
  // Get all projects
  app.get("/api/projects", async (req, res) => {
    const projects = await getProjects();
    res.json(projects);
  });

  // Create new project
  app.post("/api/projects", async (req, res) => {
    const newProject = req.body;
    const projects = await getProjects();
    
    // Generate an ID if not provided
    if (!newProject.id) {
      newProject.id = Date.now().toString();
    }
    
    projects.push(newProject);
    await fs.writeFile(dataFilePath, JSON.stringify(projects, null, 2));
    
    res.status(201).json(newProject);
  });

  // Update existing project
  app.put("/api/projects/:id", async (req, res) => {
    const { id } = req.params;
    const updatedProjectData = req.body;
    const projects = await getProjects();
    
    const index = projects.findIndex((p: any) => p.id === id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...updatedProjectData };
      await fs.writeFile(dataFilePath, JSON.stringify(projects, null, 2));
      res.json(projects[index]);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  });

  // Delete project
  app.delete("/api/projects/:id", async (req, res) => {
    const { id } = req.params;
    const projects = await getProjects();
    
    const filteredProjects = projects.filter((p: any) => p.id !== id);
    if (filteredProjects.length !== projects.length) {
      await fs.writeFile(dataFilePath, JSON.stringify(filteredProjects, null, 2));
      res.json({ message: "Project deleted" });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  });

  // Handle File Uploads (PDFs, etc)
  app.post("/api/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // Return the URL to access the uploaded file
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  });

  // Handle Image Uploads with Sharp Processing
  app.post("/api/upload-image", imageUpload.single("image"), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    try {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const thumbFilename = `thumb-${uniqueSuffix}.webp`;
      const fullFilename = `full-${uniqueSuffix}.webp`;

      const thumbPath = path.join(uploadsDir, thumbFilename);
      const fullPath = path.join(uploadsDir, fullFilename);

      // Create a heavily compressed thumbnail (max-width 800px)
      await sharp(req.file.buffer)
        .resize(800, null, { withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(thumbPath);

      // Create a full-size optimized version (max-width 1600px)
      await sharp(req.file.buffer)
        .resize(1600, null, { withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(fullPath);

      res.json({
        thumbnailUrl: `/uploads/${thumbFilename}`,
        fullImageUrl: `/uploads/${fullFilename}`
      });
    } catch (error) {
      console.error("Image processing error:", error);
      res.status(500).json({ message: "An error occurred while processing the image." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
