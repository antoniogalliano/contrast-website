<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Figma Design System Rules

## Project Overview

**Contrast Website** — Next.js 16.2 (App Router) marketing site for a UX/design agency.
- **Framework:** Next.js 16.2.1 + React 19.2.4 (App Router)
- **Language:** TypeScript 5, strict mode
- **Styling:** Inline styles (primary) + Tailwind v4 utilities (layout/positioning) + `<style jsx global>` for media queries and keyframes
- **Animations:** Framer Motion v12
- **Fonts:** Urbanist (headings, UI) + Geist (body copy) — loaded via `next/font/google`

---

## Design Tokens

Defined as CSS variables in `src/app/globals.css`:

```css
:root {
  --background: #0a0a0a;
  --foreground: #ffffff;
  --border: #383838;
  --cod-gray-300: #b0b0b0;
  --cod-gray-400: #888888;
  --accent: #d90cb7;
}
```

**IMPORTANT: Never hardcode these values inline — always use the token name in comments and the value consistently:**

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0a0a0a` | Section/page backgrounds |
| Foreground | `#ffffff` | Primary text |
| Accent | `#d90cb7` | Borders on hover, highlights, active states |
| Border | `#383838` | Default card/divider borders |
| Gray 300 | `#b0b0b0` | Secondary text, descriptions |
| Gray 400 | `#888888` | Tertiary text, labels |
| Purple accent | `rgba(118,12,217,*)` | Gradient blobs, glows (paired with accent) |

**Typography tokens:**
- `var(--font-urbanist)` — headings, labels, buttons, navigation (weights 300–800)
- `var(--font-geist)` — body copy, descriptions

---

## Component Organization

```
src/
  app/
    page.tsx          ← Root page, composes all sections
    layout.tsx        ← Font loading, metadata
    globals.css       ← CSS variables, Tailwind base, keyframes
  components/
    Header.tsx
    Hero.tsx
    HeroBackground.tsx
    LogoMarquee.tsx
    WhoWeServe.tsx
    ServicesSection.tsx
    MethodSection.tsx
    SuccessStoriesSection.tsx
    SelectedWorkSection.tsx
    TestimonialSection.tsx
    ContactSection.tsx
    CtaBanner.tsx
    Footer.tsx
    Logotype.tsx
public/
  logos/              ← Client logos (SVG)
  services/           ← Service icons (SVG)
  method/             ← Method section illustrations (SVG)
  testimonials/       ← Portrait photos (JPG)
  social/             ← Social icons (SVG)
  logo/               ← Logotype letter SVGs
  contact/            ← Contact section icons (SVG)
```

- **IMPORTANT:** All components live in `src/components/`. One component per file, named identically to the file (PascalCase).
- Every interactive component starts with `"use client";`
- All section components are `export default function XxxSection()`

---

## Styling Conventions

### Primary: Inline Styles
All visual styling uses `style={{...}}` props with plain CSS properties:

```tsx
<div style={{
  padding: "120px 40px",
  background: "#0a0a0a",
  maxWidth: 1360,
  margin: "0 auto",
}} />
```

### Secondary: Tailwind for Layout
Use Tailwind **only** for structural/layout concerns that benefit from utility classes:
```tsx
<div className="fixed top-0 left-0 z-50 w-full" />
```

### Responsive: `<style jsx global>` blocks
Media queries go in a `<style jsx global>` block at the bottom of the component:
```tsx
<style jsx global>{`
  @media (max-width: 900px) {
    .my-grid {
      grid-template-columns: 1fr !important;
    }
  }
`}</style>
```

### Typography Scale
```tsx
// Headings (clamp for responsive)
fontSize: "clamp(40px, 5.5vw, 80px)"  // H1
fontSize: "clamp(32px, 4.5vw, 64px)"  // H2
fontSize: "clamp(24px, 3vw, 48px)"    // H3
fontSize: "clamp(18px, 2vw, 24px)"    // H4

// Labels / eyebrows
fontSize: 13, letterSpacing: "0.84px", textTransform: "uppercase"

// Body
fontSize: 16, lineHeight: 1.6, fontFamily: "var(--font-geist), sans-serif"
fontSize: 14, lineHeight: 1.7, fontFamily: "var(--font-geist), sans-serif"
```

### Glow / Gradient Patterns
```tsx
// Card hover glow blob (bottom-center)
background: "radial-gradient(ellipse at 50% 110%, rgba(118,12,217,0.25) 0%, rgba(217,12,183,0.12) 40%, transparent 70%)"

// Gradient border (1px, accent)
border: "1px solid #d90cb7"

// Default card border
border: "1px solid rgba(56,56,56,0.62)"

// Glassmorphism
background: "rgba(10,10,10,0)"
backdropFilter: "blur(26.7px)"
WebkitBackdropFilter: "blur(26.7px)"
```

---

## Animation Conventions (Framer Motion)

### Scroll-triggered entrance (standard)
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
/>
```

### Staggered children
```tsx
transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
```

### Hover state transitions
Use CSS `transition` on inline style properties, not Framer Motion `whileHover`, for simple border/shadow changes:
```tsx
style={{ transition: "border-color 0.3s ease, box-shadow 0.3s ease" }}
```

Use Framer Motion `whileHover` only for transform/scale animations.

### `useInView` pattern (for counters/canvas)
```tsx
const ref = useRef<HTMLDivElement>(null);
const inView = useInView(ref, { once: true, margin: "-100px" });
```

---

## Asset Handling

- **IMPORTANT:** If Figma MCP returns a `localhost` source for an image or SVG, use that URL directly — do NOT create a placeholder.
- Static SVG illustrations go in `public/method/`, `public/services/`, etc.
- SVG icons that need color variation on hover: use two stacked `<img>` tags with CSS `filter` and `opacity` transition (base layer always visible, colored layer fades in).
- CSS filter to convert any SVG to accent pink (`#d90cb7`):
  ```
  filter: "brightness(0) saturate(100%) invert(18%) sepia(89%) saturate(6000%) hue-rotate(283deg) brightness(0.93)"
  ```
- Portrait images: JPG in `public/testimonials/`, rendered with `object-fit: cover`
- Client logos: SVG in `public/logos/`, white fill, rendered at `height: 22px`

---

## Figma MCP Integration — Required Workflow

**Follow these steps for every Figma-driven implementation. Do not skip.**

1. **`get_design_context`** — fetch the exact node(s) by `nodeId` + `fileKey`
2. **`get_screenshot`** — get visual reference for the node
3. If the context response is too large, use **`get_metadata`** to get the node map, then re-fetch specific nodes
4. Download any assets from the localhost Figma asset server
5. Translate output to this project's conventions (inline styles, no Tailwind for visual styling)
6. **Validate visually** against the screenshot before marking complete

**Figma file:** `AJ7Z2TodIPobvEsQJgElwU` (Contrast Web)

### Translation Rules (Figma → Code)
- Tailwind classes in Figma output → inline style equivalents
- Figma `fill` colors → use the matching design token value (see table above)
- Figma `Auto layout` → `display: flex` with matching `gap`, `padding`, `alignItems`
- Figma `frame` with fixed size → `width`/`height` in px (or `clamp()` if responsive)
- Figma `text` styles → match `fontSize`, `fontWeight`, `letterSpacing`, `lineHeight` exactly
- Figma `border-radius` → `borderRadius` px value
- Figma effects (drop shadow, blur) → CSS `boxShadow` or `filter: blur()`
- Figma `clip content` → `overflow: hidden`

---

## Section Layout Pattern

Every section follows this shell:
```tsx
"use client";
import { motion } from "framer-motion";

export default function XxxSection() {
  return (
    <section id="anchor" style={{ padding: "120px 40px", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ marginBottom: 64, textAlign: "center" }}
        >
          <h2 style={{ fontSize: "clamp(32px, 4.5vw, 64px)", fontWeight: 600 }}>
            <span style={{ color: "#888888" }}>Muted part </span>
            <span style={{ color: "#ffffff" }}>White part</span>
          </h2>
        </motion.div>

        {/* Content */}
      </div>
    </section>
  );
}
```

---

## Do / Don't

| Do | Don't |
|----|-------|
| Use inline styles for all visual properties | Use Tailwind for colors, spacing, typography |
| Use `clamp()` for responsive font sizes | Hardcode fixed pixel font sizes for headings |
| Use `<style jsx global>` for media queries | Add CSS files or modules |
| Use Framer Motion `whileInView` for scroll animations | Use `useEffect` + scroll listeners for entrance animations |
| Reference `var(--font-urbanist)` and `var(--font-geist)` | Use `font-family: "Urbanist"` directly |
| Use `#d90cb7` for accent (hover borders, active states) | Use any other pink/magenta value |
| Export SVG illustrations to `public/method/` or relevant subfolder | Inline large SVG paths directly in TSX |
| Validate against Figma screenshot before marking complete | Guess at spacing/sizing without checking Figma |
