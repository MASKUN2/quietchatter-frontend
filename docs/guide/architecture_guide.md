# Architecture Guide

This document defines the structural rules and data flow logic for the `quiet-chatter-front-end` project. It ensures that components are built consistently and dependencies are managed clearly.

## 1. Global App Layout Structure

To make sure every page looks the same, the main application wrapper is centralized in `src/App.tsx`. 

### How it looks in `App.tsx`
1. **Flex Wrapper**: A `Box` that covers the whole screen height (`minHeight: 100vh`).
2. **Main Container**: `<Container maxWidth="md" disableGutters={isMobile}>`. This ensures the content has the correct maximum width.
3. **Spacing Stack**: A layout stack containing the persistent Header, the Main Content Area (Routes), and the Footer.

### Layout Rules for New Pages
- **Keep Pages Simple**: Your new page components (in `src/pages/*`) should **never** include a `<Container>` or `<Header>`. `App.tsx` already does that for you! Just export your specific content blocks.
- **Page Content Wrapper (PagePaper)**: Always wrap the main content of your new page in the `<PagePaper>` component (`src/components/common/PagePaper.tsx`) for consistent card-like styling on desktop and mobile. Do not manually use `<Paper>` or `useMediaQuery` for page layout containers.
- **Spacing**: Use `spacing={{ xs: 2, md: 4 }}` to space out different feature blocks inside your page.
- **Responsive Padding**: The sides of the app touch the edges of the screen on mobile (`xs`), but have nice padding on desktop (`md` and up), handled automatically by the parent container.
- **Scroll Behavior**: When navigating between major pages (like from home to terms or about), ensure the user starts at the top of the page. The app uses a global `ScrollToTop` utility component near the router to automatically reset scroll position entirely on path changes.

## 2. Component Structure

### Basic Component Design
- **Separation of Concerns**: Don't put too much code in one file. If a UI piece is used on multiple pages, make it a separate component in `src/components/common/`. 
- **Complex Logic**: If the logic inside a component gets too large or complex (e.g., managing pagination, forms, complex business logic), move it to a custom hook in `src/hooks/`.

### Anatomy of a Component File
This is exactly how a component file should be structured logically:

```tsx
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import type { SomeType } from '../../types'; // Always use auto-generated types

interface ComponentProps {
  title: string;
  items: SomeType[];
}

const ComponentName: React.FC<ComponentProps> = ({ title, items }) => {
  // 1. Hooks (State, Ref, Custom Hooks)
  const [active, setActive] = useState(false);

  // 2. Event Handlers
  const handleClick = () => {
    setActive(!active);
  };

  // 3. Render the UI
  return (
    <Box>
      <Typography variant="h1">{title}</Typography>
      {/* ... Add other presentation components here ... */}
    </Box>
  );
};

export default ComponentName;
```

## 3. State Management Strategy

We keep state management as simple and standard as possible:

- **Local State (`useState`)**: Top priority for UI state that is only used within a single component (like toggling a modal, tracking an input field).
- **Global Data State (`Context API`)**: Use extremely limitedly, only for information that needs to be accessed anywhere across the entire app (e.g., the `AuthContext` for user login data, or `OnboardingContext` to share DOM refs needed by the first-visit tooltip system).
- **URL State (`useSearchParams`)**: If users need to be able to share a link that loads a specific state (like a search keyword page, or a specific page number in a list), put that state in the URL. The URL should be considered the primary source of truth for navigation variables.

## 4. API Calls and Data Logic

- **No Inline Fetching**: API call logic (using Axios or Fetch) should **never** be written directly inside components. 
- **Use the API Layer**: Import and use the helper functions explicitly defined in `src/api/api.ts`.
- **Use Custom Hooks**: Complex data fetching logic (e.g., infinite scroll, debouncing searches) should be wrapped in individual custom hooks within the `src/hooks/` folder.
- **Error Handling**: When a background network request fails, always provide appropriate feedback to the user using the global Toast system. **Never use native browser `alert()` popups**. Instead, import `useToast` from `@/hooks/useToast` and call `showToast('message', 'error')`. For business logic errors, usually show the message sent from the backend as it is.
- **Error Boundaries**: To prevent the entire application from crashing due to unexpected JavaScript runtime errors or malformed data during rendering, the application is wrapped in an `<ErrorBoundary>`. Do not allow components to unmount the entire tree to a white screen.
