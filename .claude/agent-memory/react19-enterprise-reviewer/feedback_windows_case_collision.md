---
name: feedback-windows-case-collision
description: On Windows, never create a module whose path differs only by case from an existing file
metadata:
  type: feedback
---

When splitting a component file (e.g. `AuthContext.jsx`) to extract the context object, do NOT name the new file with a case-only difference (e.g. `authContext.js`).

**Why:** This repo is on a case-insensitive Windows filesystem. Creating `authContext.js` next to `AuthContext.jsx` made Rolldown/Vite resolve `import { AuthProvider } from './context/AuthContext'` to the wrong file, producing a "Missing export" build failure. ESLint did not catch it; only `vite build` did.
**How to apply:** Use a distinct name like `authContextInstance.js`. Always run `npm run build` (not just lint) after renaming/splitting modules in [[project-frontend-stack]].
