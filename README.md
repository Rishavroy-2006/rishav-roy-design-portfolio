# Rishav Roy's Portfolio

A dynamic portfolio application built with React, Vite, and Express to showcase design projects. 

## Features
- **Dynamic Projects System**: Projects are served via an Express backend from `public/projects.json`.
- **Local Admin Portal**: A hidden admin dashboard (`/#admin`) available only in development mode to add, update, and delete projects.
- **File & Image Uploads**: Upload PDFs, or upload cover images that are automatically compressed into optimized thumbnails and full-size images using `sharp`.
- **Responsive UI**: Polished, animated interface using Tailwind CSS and `motion/react`.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server (runs Vite middleware via Express):
   ```bash
   npm run dev
   ```
   *Note: Access the admin portal at `http://localhost:3000/#admin` to manage your projects.*

## Production Build

1. Build the Vite frontend:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Repository Structure
- `src/` - React frontend code.
- `server.ts` - Express backend for API endpoints, file uploads, and Vite routing.
- `public/projects.json` - Datastore for dynamic projects.
- `public/uploads/` - Directory for uploaded images and PDFs.
