# Project Directory Structure Guide

This specific document maps out exactly how the `quiet-chatter-front-end` codebase folders are organized. It helps you quickly figure out exactly where to put new files.

*(For instructions on how to start the local Vite development server or run Tests, please read the **Workflow Guide**).*

## 1. Top-Level Structure

Here is a look at the main folders inside the project repository:

```text
quiet-chatter-front-end/
├── .gemini/             # AI agent configuration data and chat history (Do Not Edit)
├── docs/                # Project documentation and markdown blueprints
│   └── guide/           # Specific development rules and guidelines (like this file)
├── public/              # Static public resources (e.g., images, icons)
├── src/                 # Main source code (Where 99% of your logic goes)
└── package.json         # Project dependencies, scripts, and metadata
```

---

## 2. The `src/` Directory in Detail

The `src/` folder is carefully organized by concern.

```text
src/
├── api/             # API request definitions using Axios. No UI logic here.
├── assets/          # Imported local assets (SVGs, static layout images, etc.)
├── components/      # Reusable React UI components
│   ├── book/        # UI components specifically for Book listing and detailing
│   ├── common/      # System-wide components (Header, Footer, Spinners, generic Modals)
│   │   └── OnboardingTooltip.tsx # Reusable floating tooltip (MUI Popper) for onboarding
│   └── home/        # Specific sections rendered on the Home page
│       └── HomeOnboarding.tsx    # Sequentially shows first-visit tooltips (config: TOOLTIP_STEPS)
├── constants/       # Static strings, system configuration values, and URL routes
├── context/         # Centralized React Context files
│   ├── AuthContext.tsx           # Global login state and auth helpers
│   └── OnboardingContext.tsx     # Shares first-visit tooltip refs across the component tree
├── hooks/           # Custom React Hooks for encapsulating domain business logic
│   └── useFirstVisit.ts          # Detects first-time visitors per named key via localStorage.
│                                 #   - Pass VISIT_KEYS.HOME, VISIT_KEYS.BOOK_DETAIL, etc.
│                                 #   - Add new keys to the VISIT_KEYS constant in the same file.
├── mocks/           # Mock Service Worker (MSW) setup. Used for local testing without the backend.
├── pages/           # High-level Screen components. The React Router loads these directly.
├── types/           # TypeScript Definitions. `api-schema.d.ts` is generated automatically.
├── utils/           # Shared utility functions (e.g., validation rules, formatting).
├── App.css          # Global CSS layout logic used exclusively by `App.tsx`
├── App.tsx          # The Main Application Layout, Theme Injection, and Master Router
├── index.css        # Fundamental HTML/Body CSS variables and resets
└── main.tsx         # The strict React `createRoot` entry point
```

### Organizing Rules
- **Do not place files randomly in the root of `src/`**: Everything new must fit logically into an existing folder like `components/`, `hooks/`, or `pages/`. 
- **Component Sub-folders**: If a new feature is massive, create a new sub-folder inside `components/` (e.g., `components/profile/`) to keep its pieces grouped together cleanly.
