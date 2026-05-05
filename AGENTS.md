# AI Assistant Context & Memory

This file serves to provide long-term memory and context for AI coding assistants. 

## Project Context
- **Owner**: Rishav Roy (Visual Designer)
- **Role**: Portfolio application to showcase design work, flyers, and creative concepts.
- **Tech Stack**: React, Vite, Express (for local backend and image processing), Tailwind CSS, Framer Motion.

## System Architecture
- **Admin Portal**: Lives at `/#admin`. Only accessible when `import.meta.env.DEV` is true. The user runs this locally to manage content (`projects.json` and uploaded assets), commits the changes, and pushes to GitHub.
- **Data Storage**: `public/projects.json` is used as a JSON datastore so the frontend can load it easily in both local and production environments.
- **File Uploads**: `server.ts` uses `multer` to save PDFs and `sharp` to compress images automatically into a "thumb" and "full" version inside `public/uploads/`.
- **Deployment Strategy**: The application runs via `server.ts`. 

## AI Rules & Guidelines
1. **Tone & Identity**: Ensure all UI copy is professional. Do not use phrases like "vibe-coded", "made by AI", or anything that breaks the professional agency illusion. The feel should always be human-authored and premium.
2. **Commit Management**: `public/projects.json` and `public/uploads/` are intentionally NOT in `.gitignore`. They serve as the true source of data that is tracked by git and deployed directly to production.
3. **Admin Portal Isolation**: Do not alter `src/App.tsx` where the admin portal is protected by `import.meta.env.DEV`. It is intentionally restricted to local development environments.
