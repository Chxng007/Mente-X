---
name: project-frontend-stack
description: DanzApp frontend stack, tooling, and verification commands
metadata:
  type: project
---

The `frontend/` app ("DanzApp") is React 19.2 + Vite 8 + Tailwind 4 + React Router 7 + TanStack Query + Axios.

Key facts:
- **No TypeScript compilation** despite `@types/react` being installed — source is plain `.js`/`.jsx`. There is no `tsc`/typecheck script; only `build` (vite), `lint` (eslint .), `dev`, `preview`.
- ESLint flat config enforces `react-refresh/only-export-components` — non-component exports (hooks, context objects, constants) must live in their own `.js` files, not alongside a component.
- Feature-based layout already in use: `src/features/{auth,onboarding}`, `src/components/{ui,layout}`, `src/api`, `src/context`, `src/routes`, `src/pages`.
- Auth context split into three files: `authContextInstance.js` (createContext), `AuthContext.jsx` (AuthProvider), `useAuth.js` (hook).

**Why:** Establishes how to verify changes and where things live.
**How to apply:** Run `npm run lint` and `npm run build` from `frontend/` to verify. Mutations use TanStack Query `useMutation` (not React 19 Actions yet) — a candidate for modernization. See [[feedback-windows-case-collision]].
