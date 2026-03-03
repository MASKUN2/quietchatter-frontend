# Design & UI Style Guide

This document explains the colors, text styles, spacing rules, and UI component standards used in the `quiet-chatter-front-end` project. We follow this guide strictly to keep the application looking professional, consistent, and beautiful.

*(For information about the Global App Layout wrappers or React components structure, please read the **Architecture Guide**).*

## 1. Design Philosophy

- **Anonymity and Relaxing Tone**: Keep colors and styles calm so users feel comfortable participating without burden.
- **Easy to Read**: Since this is a text-centric BookTalk service, highly readable fonts and ample whitespace are top priorities.
- **Mobile First Optimization**: Because many users are on phones, all individual pieces of the UI must look perfect on mobile first! 
  - *Text Truncation Rule*: Do not manually truncate display text (e.g., `substring(0, 5) + '...'`) just because it is a mobile viewport. If text might be long (like nicknames or titles), either allow it to wrap naturally or use CSS `textOverflow: 'ellipsis'` so the browser handles truncation responsively based on available space.

## 2. Color Palette System

The application relies strictly on this color palette. Do not invent new colors.

| Color Concept | Hex / RGBA Code | Usage Example & Rules |
| :--- | :--- | :--- |
| **Deep Violet** | `#5c2d91` | Primary buttons, text highlights, overline labels |
| **Deep Indigo** | `#4b0082` | Hover states, emphasis |
| **Light Violet** | `rgba(92, 45, 145, 0.04)` | Button backgrounds and subtle interactive effects |
| **Highlight Tint** | `rgba(92, 45, 145, 0.07~0.12)`| Inline text highlight backgrounds |
| **Default Background** | `#f8f9fa` | Overall app backdrop |
| **Paper Background** | `#ffffff` | Foreground Cards, modals, and section backgrounds |
| **Text Primary** | `rgba(0, 0, 0, 0.87)` | Main body text |
| **Text Secondary** | `rgba(0, 0, 0, 0.6)` | Sub-descriptions, author info, or dates |
| **Border Color** | `#eee` or `grey.200` | Dividers and light card outline borders |

## 3. Typography (Text Styles)

The default font is **Pretendard**, loaded via a CDN in `index.html`.

### Scale Guide
- **Heading (h2)**: Very large, used only for brand pages (like About). Use an exciting gradient text and `fontWeight: 900`.
- **Heading (h4/h5)**: Standard page and section titles. Very bold (`fontWeight: 700/600`).
- **Sub-heading (h6)**: Smaller section titles inside cards. 
- **Body 1 (16px)**: Normal paragraph text or Talk content. Needs a tall line height for reading (`1.6`).
- **Body 2 (14px)**: Secondary info or list items.
- **Caption (12px)**: Tiny dates and metadata.

### The Section Header Pattern (Very Important!)
Whenever you create a new distinct visual section of the app that needs a title, you **must** use this two-line pattern (a colored Overline and a main Title):

```tsx
// 1. A tiny upper-case label
<Typography variant="overline" sx={{
  color: 'primary.main',
  fontWeight: 800,
  letterSpacing: '0.2em',
  fontSize: '0.75rem',
  display: 'block',
  lineHeight: 1.4
}}>
  SECTION LABEL   {/* Always uppercase English like "FOR YOU" or "BOOK TALK" */}
</Typography>

// 2. The main title text
<Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mt: 0.5 }}>
  섹션 제목 {/* E.g., "관심 있는 북톡" */}
</Typography>
```

> **Note on Gradients**: You can use a cool purple gradient text on special marketing pages (`AboutService`), but NEVER on data pages (lists or search results).

## 4. Common UI Element Patterns

- **Buttons**: Do not let buttons capitalize automatically! Set `textTransform: 'none'`.
- **Skeleton UI**: When showing loading states, the Skeleton UI's layout, margins, paddings, and sizes must exactly match the actual loaded content to prevent layout shifts (vertical/horizontal jumping) when the real data renders.
- **Cards & Surfaces**: Use a tiny shadow (`elevation={1}`) by default. For mobile, it sometimes looks better entirely flat (`elevation={0}`). The standard corner roundness (border-radius) is `2` (8px).
- **Hover Effects**: When users hover over links or buttons, there should be a subtle effect (like a faint background appearing or slightly lifting the card).
- **Icons**: Always stick to the official Material UI icon set (`@mui/icons-material`), such as `<SearchIcon />`.

## 5. UI Styling Code Rules

When actually translating designs into React code:
- **Use the MUI System**: Try to use the `sx` prop for everything layout-related instead of raw CSS classes.
- **Reference the Theme Palette**: Use the connected theme colors (`color="primary.main"`) instead of writing raw hex codes (`#5c2d91`). This ensures dark-mode compatibility in the future.
- **Responsive Easy Way**: Need different sizes based on phone vs computer? Use MUI Breakpoint objects: `sx={{ width: { xs: '100%', md: '50%' } }}`.
