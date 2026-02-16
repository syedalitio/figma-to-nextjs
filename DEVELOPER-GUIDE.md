# Figma to Next.js — Developer Guide

> A step-by-step tutorial for HTML/CSS developers on converting Figma designs into production-ready Next.js applications using Tailwind CSS.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Understanding the Stack](#2-understanding-the-stack)
3. [Project Setup](#3-project-setup)
4. [Reading a Figma Design](#4-reading-a-figma-design)
5. [Extracting Design Tokens](#5-extracting-design-tokens)
6. [Configuring Tailwind CSS](#6-configuring-tailwind-css)
7. [Setting Up Fonts](#7-setting-up-fonts)
8. [Project Structure](#8-project-structure)
9. [Building Your First Component](#9-building-your-first-component)
10. [Using Next.js Image Component](#10-using-nextjs-image-component)
11. [Separating Content from Components](#11-separating-content-from-components)
12. [Wiring Components into Pages](#12-wiring-components-into-pages)
13. [Making It Responsive](#13-making-it-responsive)
14. [Exporting Assets from Figma](#14-exporting-assets-from-figma)
15. [Global Styles & CSS Reset](#15-global-styles--css-reset)
16. [Running & Building the Project](#16-running--building-the-project)
17. [Common Tailwind Patterns](#17-common-tailwind-patterns)
18. [Figma-to-CSS Translation Cheat Sheet](#18-figma-to-css-translation-cheat-sheet)
19. [Troubleshooting](#19-troubleshooting)
20. [Checklist Before Handoff](#20-checklist-before-handoff)

---

## 1. Prerequisites

Before you begin, make sure you have the following installed on your machine:

| Tool | Minimum Version | Check Command | Install |
|---|---|---|---|
| **Node.js** | 18.x or later | `node -v` | [nodejs.org](https://nodejs.org) |
| **npm** | 9.x or later | `npm -v` | Comes with Node.js |
| **Git** | Any recent version | `git --version` | [git-scm.com](https://git-scm.com) |
| **VS Code** | Latest | — | [code.visualstudio.com](https://code.visualstudio.com) |

### Recommended VS Code Extensions

Install these for the best developer experience:

- **Tailwind CSS IntelliSense** — autocomplete for Tailwind classes
- **ESLint** — catches code issues in real time
- **Prettier** — auto-formats your code on save
- **ES7+ React/Redux/React-Native snippets** — shortcuts for React boilerplate

---

## 2. Understanding the Stack

If you're coming from plain HTML/CSS, here's what each piece does:

### Next.js
Next.js is a **React framework**. Think of it as a more powerful way to build websites. Instead of writing raw HTML files, you write **React components** (files ending in `.tsx`) that return HTML-like syntax called **JSX**.

**Key difference from plain HTML:**
```html
<!-- Plain HTML -->
<div class="hero">
  <h1>Hello</h1>
</div>
```

```tsx
// Next.js / React (JSX)
<div className="hero">
  <h1>Hello</h1>
</div>
```

Notice: `class` becomes `className`. That's the biggest syntax change you'll encounter.

### TypeScript (.tsx files)
TypeScript is JavaScript with **type checking**. The `.tsx` extension means "TypeScript + JSX." You don't need to be a TypeScript expert — for most component work, you just need to define what **props** (inputs) a component accepts:

```tsx
// This defines what data the component expects
interface HeroProps {
  title: string;       // must be text
  count: number;       // must be a number
  isVisible: boolean;  // must be true/false
}
```

### Tailwind CSS
Instead of writing CSS in separate files, you apply utility classes directly in your HTML/JSX:

```html
<!-- Traditional CSS approach -->
<div class="hero-title">Hello</div>

<style>
.hero-title {
  font-size: 64px;
  font-weight: 300;
  color: #777;
  line-height: 1.2;
}
</style>
```

```tsx
// Tailwind approach — no separate CSS file needed
<div className="text-[64px] font-light text-[#777] leading-[1.2]">Hello</div>
```

### App Router
Next.js uses a **file-based routing** system. The folder structure inside `src/app/` determines your website's URLs:

```
src/app/
├── page.tsx           →  yoursite.com/
├── about/page.tsx     →  yoursite.com/about
├── services/page.tsx  →  yoursite.com/services
└── contact/page.tsx   →  yoursite.com/contact
```

Every `page.tsx` file automatically becomes a route. No manual routing configuration needed.

---

## 3. Project Setup

### Step 1: Create the project

Open your terminal, navigate to the folder where you want the project, and run:

```bash
npx create-next-app@latest my-project --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
```

**What each flag does:**

| Flag | Purpose |
|---|---|
| `--typescript` | Enables TypeScript (.tsx files) |
| `--tailwind` | Pre-installs and configures Tailwind CSS |
| `--eslint` | Adds code linting |
| `--app` | Uses the App Router (modern Next.js) |
| `--src-dir` | Puts source code inside a `src/` folder |
| `--import-alias "@/*"` | Lets you write `@/components/Hero` instead of `../../components/Hero` |
| `--use-npm` | Uses npm (not yarn or pnpm) |
| `--yes` | Skips confirmation prompts |

### Step 2: Enter the project

```bash
cd my-project
```

### Step 3: Start the dev server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser. You should see the Next.js starter page.

### Step 4: Create the folder structure

```bash
mkdir -p src/components/layout
mkdir -p src/components/sections
mkdir -p src/components/ui
mkdir -p src/components/forms
mkdir -p src/data
mkdir -p public/images
mkdir -p public/fonts
```

**What each folder is for:**

| Folder | Contents |
|---|---|
| `src/components/layout/` | Header, Footer, Container — things that appear on every page |
| `src/components/sections/` | Hero, Features, Testimonials — page sections |
| `src/components/ui/` | Button, Card, Badge, Input — small reusable elements |
| `src/components/forms/` | ContactForm, NewsletterForm — form components |
| `src/data/` | Content data files (text, lists) — keeps content separate from layout |
| `public/images/` | All images exported from Figma |
| `public/fonts/` | Custom font files (.woff2) if not using Google Fonts |

---

## 4. Reading a Figma Design

Before writing any code, you need to **analyze the Figma file** and extract every value you'll need. Here's exactly what to look for.

### 4.1 Open the Figma file in Dev Mode

1. Open the Figma link in your browser
2. Click the **"Dev Mode"** toggle (top-right of the Figma editor — looks like `</>`)
3. Dev Mode shows you CSS values when you click on any element

### 4.2 What to extract from each element

Click on any element in Figma and look at the right panel. Record these values:

#### Colors
- Click the colored square next to "Fill" in the right panel
- Copy the hex code (e.g., `#1D2E54`)
- Do this for every unique color in the design
- Make a list:

```
Background:     #1D2E54 (dark navy)
Heading text:   #777777 (gray)
Body text:      #FFFFFF (white)
Accent:         #E8491D (orange — if present)
```

#### Typography
Click on any text element and note:

```
Heading:
  Font family:    Canela
  Font weight:    250 (Thin/Light)
  Font size:      64px
  Line height:    1.2 (or 76.8px)
  Letter spacing: -2%
  Color:          #777777

Body:
  Font family:    Montserrat
  Font weight:    300 (Light)
  Font size:      16px
  Line height:    1.5 (or 24px)
  Color:          #FFFFFF
```

#### Spacing & Layout
- **Padding**: Click on a frame/container, look for padding values (top, right, bottom, left)
- **Gap**: If elements are inside an Auto Layout frame, Figma shows "Gap between items"
- **Margins**: Measure distance between elements using Figma's measurement tool (hold Alt/Option and hover)
- **Position**: Note X and Y coordinates for absolutely positioned elements

```
Text container:
  Position:     x=308, y=208 from parent
  Width:        408px
  Gap:          21px (between heading and paragraph)
```

#### Dimensions
- **Section height**: Click the outer frame, note width × height
- **Image dimensions**: Click on image elements, note their size
- **Container width**: Often 1440px or 1920px for desktop designs

```
Hero section:   1920 × 729px
Image area:     940 × 729px (right half)
Text area:      ~980px (left half)
```

#### Borders & Effects
- **Border radius**: Look for "Corner radius" in the right panel (e.g., `8px`, `12px`, `50%` for circles)
- **Shadows**: Look under "Effects" for drop shadows. Note: X offset, Y offset, blur, spread, color
- **Borders**: Look under "Stroke" for border color, width, style

### 4.3 Create a design tokens document

Before coding, compile everything into a reference document:

```
# Design Tokens — [Project Name]

## Colors
- Navy:       #1D2E54
- Gray:       #777777
- White:      #FFFFFF

## Fonts
- Heading: Canela, weight 250
- Body: Montserrat, weight 300

## Spacing
- Section padding: 80px vertical
- Container max-width: 1920px
- Text container width: 408px
- Gap heading-to-body: 21px

## Shadows
- Card shadow: 0 4px 24px rgba(0,0,0,0.08)

## Border Radius
- Cards: 12px
- Buttons: 8px
```

This becomes your source of truth while building.

---

## 5. Extracting Design Tokens

"Design tokens" are the reusable values from the Figma design — colors, font sizes, spacing, shadows, etc. You configure these in Tailwind so you can use them as utility classes throughout the project.

### What are design tokens?

Think of them as CSS variables that Tailwind turns into classes:

```
Token:    color navy = #1D2E54
CSS var:  --color-navy: #1D2E54
Class:    bg-navy, text-navy, border-navy
```

Instead of writing `bg-[#1D2E54]` everywhere (hard to maintain), you define it once and use `bg-navy` everywhere.

---

## 6. Configuring Tailwind CSS

Next.js (latest) uses **Tailwind v4**, which is configured directly in CSS — there is no `tailwind.config.ts` file.

### Open `src/app/globals.css`

Replace its contents with your design tokens:

```css
@import "tailwindcss";

@theme inline {
  /* ========================
     COLORS from Figma
     ======================== */
  --color-navy: #1D2E54;
  --color-gray-heading: #777777;
  --color-white: #FFFFFF;

  /* Add more colors as needed:
  --color-accent: #E8491D;
  --color-light-gray: #F5F5F5;
  */

  /* ========================
     FONTS
     ======================== */
  --font-heading: "Canela", "Georgia", "Times New Roman", serif;
  --font-body: var(--font-montserrat), "Helvetica Neue", Arial, sans-serif;

  /* ========================
     CUSTOM SPACING (optional)
     ======================== */
  /* --spacing-section: 80px; */

  /* ========================
     SHADOWS (optional)
     ======================== */
  /* --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.08); */
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### How the `@theme` block works

Everything you define inside `@theme inline { }` becomes available as a Tailwind utility class:

| Token definition | Generated classes |
|---|---|
| `--color-navy: #1D2E54` | `bg-navy`, `text-navy`, `border-navy` |
| `--color-gray-heading: #777777` | `bg-gray-heading`, `text-gray-heading` |
| `--font-heading: "Canela", serif` | `font-heading` |
| `--font-body: "Montserrat", sans-serif` | `font-body` |

### When to use custom tokens vs. inline values

| Scenario | Approach | Example |
|---|---|---|
| Color used on 3+ elements | Define as token | `bg-navy` |
| Color used only once | Use inline | `bg-[#1D2E54]` |
| Font size from Figma matches Tailwind default | Use Tailwind default | `text-base` (16px) |
| Font size is custom (e.g., 64px) | Use inline | `text-[64px]` |

---

## 7. Setting Up Fonts

### Google Fonts (e.g., Montserrat)

Next.js has a built-in font optimization system. Open `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

// Load Montserrat with the weights you need
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",     // This creates a CSS variable
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Your Site Title",
  description: "Your site description for SEO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* The variable class makes --font-montserrat available to all children */}
      <body className={`${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

**How this works:**
1. `Montserrat({ variable: "--font-montserrat" })` loads the font and creates a CSS variable
2. `className={montserrat.variable}` injects that variable into the page
3. In `globals.css`, `var(--font-montserrat)` references it

### Custom / Local Fonts (e.g., Canela)

If the Figma design uses a premium font that isn't on Google Fonts:

1. Get the font files from the designer (`.woff2` format is best)
2. Place them in `public/fonts/`
3. Load them with `next/font/local`:

```tsx
import localFont from "next/font/local";

const canela = localFont({
  src: [
    {
      path: "../../public/fonts/Canela-Thin.woff2",
      weight: "250",
      style: "normal",
    },
    {
      path: "../../public/fonts/Canela-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-canela",
});
```

Then add `${canela.variable}` to the `<body>` className and update your `globals.css`:

```css
--font-heading: var(--font-canela), "Georgia", serif;
```

### Finding the right Google Font

If you're not sure what a Figma font maps to:
1. Google the font name + "Google Fonts"
2. If it's not on Google Fonts, ask the designer for the files
3. As a last resort, find a visually similar free alternative at [fonts.google.com](https://fonts.google.com)

### Common font weight names to numbers

| Name | Number |
|---|---|
| Thin | 100 |
| Extra Light | 200 |
| Light | 300 |
| Regular | 400 |
| Medium | 500 |
| Semi Bold | 600 |
| Bold | 700 |
| Extra Bold | 800 |
| Black | 900 |

---

## 8. Project Structure

Here's the complete file structure you should end up with:

```
my-project/
├── public/
│   ├── images/                 # All exported images from Figma
│   │   ├── hero-image.png
│   │   ├── about-image.png
│   │   └── ...
│   └── fonts/                  # Local font files (if any)
│       ├── Canela-Thin.woff2
│       └── ...
├── src/
│   ├── app/
│   │   ├── globals.css         # Tailwind config + global styles
│   │   ├── layout.tsx          # Root layout (fonts, <html>, <body>)
│   │   ├── page.tsx            # Home page (yoursite.com/)
│   │   ├── about/
│   │   │   └── page.tsx        # About page (yoursite.com/about)
│   │   └── contact/
│   │       └── page.tsx        # Contact page (yoursite.com/contact)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx      # Site header/nav
│   │   │   └── Footer.tsx      # Site footer
│   │   ├── sections/
│   │   │   ├── Hero.tsx        # Hero banner sections
│   │   │   ├── Features.tsx    # Features grid
│   │   │   └── CTA.tsx         # Call-to-action blocks
│   │   ├── ui/
│   │   │   ├── Button.tsx      # Reusable button
│   │   │   └── Card.tsx        # Reusable card
│   │   └── forms/
│   │       └── ContactForm.tsx
│   └── data/
│       ├── home.ts             # Content for home page
│       └── navigation.ts       # Nav links
├── package.json
└── tsconfig.json
```

### Key rules:
- **One component per file.** `Hero.tsx` contains only the `Hero` component.
- **Name files in PascalCase.** `Hero.tsx`, not `hero.tsx` or `hero-section.tsx`.
- **Name page files `page.tsx`.** This is a Next.js requirement — the file must be called `page.tsx` to be recognized as a route.
- **Keep `layout.tsx` lean.** It should only contain the HTML skeleton, fonts, and components that appear on every page (header/footer).

---

## 9. Building Your First Component

Let's walk through building a component from a Figma frame, step by step.

### Step 1: Analyze the Figma frame

From our example Figma, the hero section has:

```
Container:    1920 × 729px, background #1D2E54
Left side:    Text content at x=308, y=208, width=408px
  - Heading:  "Orthodontic treatments", Canela 250 64px #777777
  - Body:     Description text, Montserrat 300 16px #FFFFFF
  - Gap:      21px between heading and body
Right side:   Image, 940 × 729px, object-fit: cover
```

### Step 2: Plan the HTML structure

Before writing JSX, think about what HTML elements you need:

```html
<section>                         <!-- outer wrapper, full width -->
  <div>                           <!-- flex container for the two halves -->
    <div>                         <!-- left: text content -->
      <div>                       <!-- inner container for text alignment -->
        <h1>Title</h1>
        <p>Description</p>
      </div>
    </div>
    <div>                         <!-- right: image -->
      <img />
    </div>
  </div>
</section>
```

### Step 3: Create the component file

Create `src/components/sections/Hero.tsx`:

```tsx
import Image from "next/image";

// Define what data this component needs
interface HeroProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

// The component itself
export function Hero({ title, description, imageSrc, imageAlt }: HeroProps) {
  return (
    <section className="relative w-full bg-navy">
      <div className="flex flex-col lg:flex-row lg:min-h-[729px]">

        {/* Left side — text content */}
        <div className="flex flex-1 items-center px-6 py-16 sm:px-12 md:py-20 lg:py-0 lg:px-0">
          <div className="mx-auto w-full max-w-md lg:mx-0 lg:ml-[308px] lg:max-w-[408px]">
            <h1
              className="font-heading text-gray-heading text-4xl leading-[1.2] tracking-tight sm:text-5xl lg:text-[64px] lg:tracking-[-0.02em]"
              style={{ fontWeight: 250 }}
            >
              {title}
            </h1>
            <p className="mt-5 text-white font-light text-base leading-[1.5]">
              {description}
            </p>
          </div>
        </div>

        {/* Right side — image */}
        <div className="relative aspect-[940/729] w-full lg:aspect-auto lg:w-[49%] lg:min-h-[729px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1023px) 100vw, 49vw"
          />
        </div>

      </div>
    </section>
  );
}
```

### Step 4: Understand every class used

Let's break down every Tailwind class so nothing is magic:

**On the `<section>`:**
| Class | CSS Equivalent | Why |
|---|---|---|
| `relative` | `position: relative` | Needed for child absolute positioning |
| `w-full` | `width: 100%` | Full width of viewport |
| `bg-navy` | `background-color: #1D2E54` | Our custom token from `globals.css` |

**On the flex container `<div>`:**
| Class | CSS Equivalent | Why |
|---|---|---|
| `flex` | `display: flex` | Flexbox layout |
| `flex-col` | `flex-direction: column` | Stack vertically (mobile default) |
| `lg:flex-row` | `flex-direction: row` at ≥1024px | Side by side on desktop |
| `lg:min-h-[729px]` | `min-height: 729px` at ≥1024px | Match Figma height on desktop |

**On the text container:**
| Class | CSS Equivalent | Why |
|---|---|---|
| `flex-1` | `flex: 1` | Take up remaining space |
| `items-center` | `align-items: center` | Vertically center text |
| `px-6` | `padding-left/right: 24px` | Mobile horizontal padding |
| `py-16` | `padding-top/bottom: 64px` | Mobile vertical padding |
| `sm:px-12` | `padding-left/right: 48px` at ≥640px | More padding on tablet |
| `lg:py-0` | Remove vertical padding at ≥1024px | Desktop uses vertical centering instead |
| `lg:ml-[308px]` | `margin-left: 308px` at ≥1024px | Match Figma X position |
| `lg:max-w-[408px]` | `max-width: 408px` at ≥1024px | Match Figma text container width |

**On the heading `<h1>`:**
| Class | CSS Equivalent | Why |
|---|---|---|
| `font-heading` | `font-family: Canela, serif` | Our heading font token |
| `text-gray-heading` | `color: #777777` | Our heading color token |
| `text-4xl` | `font-size: 36px` | Mobile font size |
| `sm:text-5xl` | `font-size: 48px` at ≥640px | Tablet font size |
| `lg:text-[64px]` | `font-size: 64px` at ≥1024px | Desktop — exact Figma value |
| `leading-[1.2]` | `line-height: 1.2` | Exact Figma line-height |
| `tracking-tight` | `letter-spacing: -0.025em` | Close to Figma's -2% |
| `lg:tracking-[-0.02em]` | `letter-spacing: -0.02em` | Exact Figma value on desktop |

**Why `style={{ fontWeight: 250 }}`?**
Tailwind doesn't have a utility for font-weight 250. The available weights are `font-thin` (100), `font-extralight` (200), `font-light` (300), etc. Since 250 is between 200 and 300, we use an inline style.

**On the paragraph `<p>`:**
| Class | CSS Equivalent | Why |
|---|---|---|
| `mt-5` | `margin-top: 20px` | Approximates the 21px gap from Figma |
| `text-white` | `color: #FFFFFF` | Body text color from Figma |
| `font-light` | `font-weight: 300` | Figma's font weight |
| `text-base` | `font-size: 16px` | Figma's font size |
| `leading-[1.5]` | `line-height: 1.5` | Figma's line-height |

**On the image container:**
| Class | CSS Equivalent | Why |
|---|---|---|
| `relative` | `position: relative` | Required for Next.js `fill` image |
| `aspect-[940/729]` | `aspect-ratio: 940/729` | Maintains Figma proportions on mobile |
| `w-full` | `width: 100%` | Full width on mobile |
| `lg:aspect-auto` | `aspect-ratio: auto` at ≥1024px | Let height be determined by parent |
| `lg:w-[49%]` | `width: 49%` at ≥1024px | ~940/1920 = right half |
| `lg:min-h-[729px]` | `min-height: 729px` at ≥1024px | Match Figma height |

---

## 10. Using Next.js Image Component

**Never use a raw `<img>` tag in Next.js.** Always use the `<Image>` component from `next/image`. It automatically optimizes images (compression, lazy loading, responsive sizing).

### Import it

```tsx
import Image from "next/image";
```

### Two modes: `fill` vs. `width/height`

#### Mode 1: `fill` — image fills its parent container

Use this when the image should cover an area (like a hero background):

```tsx
{/* Parent MUST be position: relative */}
<div className="relative h-[500px] w-full">
  <Image
    src="/images/hero-image.png"
    alt="Description of the image"
    fill
    className="object-cover"
  />
</div>
```

#### Mode 2: `width` + `height` — explicit dimensions

Use this for logos, icons, thumbnails:

```tsx
<Image
  src="/images/logo.png"
  alt="Company logo"
  width={200}
  height={48}
/>
```

### Important `<Image>` props

| Prop | Purpose |
|---|---|
| `src` | Path to the image (relative to `public/` folder) |
| `alt` | Accessibility text (describe the image) |
| `fill` | Image fills the parent container |
| `width` / `height` | Explicit pixel dimensions |
| `className="object-cover"` | Equivalent to CSS `object-fit: cover` (crop to fill) |
| `className="object-contain"` | Fit inside without cropping |
| `priority` | Load immediately (use for above-the-fold images only) |
| `sizes` | Tells the browser expected display size for responsive loading |

### The `sizes` prop explained

```tsx
sizes="(max-width: 1023px) 100vw, 49vw"
```

This means:
- On screens up to 1023px → the image takes up 100% of viewport width
- On screens 1024px and up → the image takes up 49% of viewport width

This helps the browser download the right-sized image. Get these values from your responsive layout widths.

---

## 11. Separating Content from Components

**Golden rule: never hardcode text inside components.**

Instead, put all text content in data files and pass it to components as props. This makes content easy to find and update without touching component code.

### Create a data file

`src/data/home.ts`:

```ts
export const heroData = {
  title: "Orthodontic treatments",
  description:
    "Every smile is unique, which is why all of our treatments at Dr Devesh Shelat are 100% custom-tailored to the individual patient. With the latest technology and our professionally trained team, we strive to provide an exceptional treatment experience to all our patients.",
  imageSrc: "/images/hero-image.png",
  imageAlt: "Orthodontic treatment consultation",
};
```

### Why this matters

- **Content editors** can update text without understanding React
- **Designers** can review all copy in one place
- **Developers** can change layout without touching content
- **Future CMS integration** becomes easy — just replace the data file with an API call

---

## 12. Wiring Components into Pages

### Home page example

`src/app/page.tsx`:

```tsx
import { Hero } from "@/components/sections/Hero";
import { heroData } from "@/data/home";

export default function Home() {
  return (
    <main>
      <Hero {...heroData} />
    </main>
  );
}
```

### Understanding the syntax

**`import { Hero } from "@/components/sections/Hero"`**
- Imports the Hero component
- `@/` is an alias for `src/` (configured during project setup)

**`<Hero {...heroData} />`**
- The `{...heroData}` spreads the object into individual props
- It's equivalent to writing:
  ```tsx
  <Hero
    title={heroData.title}
    description={heroData.description}
    imageSrc={heroData.imageSrc}
    imageAlt={heroData.imageAlt}
  />
  ```

### Multiple sections on one page

```tsx
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { CTA } from "@/components/sections/CTA";
import { heroData, featuresData, ctaData } from "@/data/home";

export default function Home() {
  return (
    <main>
      <Hero {...heroData} />
      <Features items={featuresData} />
      <CTA {...ctaData} />
    </main>
  );
}
```

---

## 13. Making It Responsive

Figma designs are almost always desktop-only (1440px or 1920px). You need to make them work on all screen sizes.

### Tailwind's mobile-first approach

Tailwind uses a **mobile-first** system. Base classes apply to mobile, then you add breakpoint prefixes for larger screens:

```tsx
// This reads as:
// "By default (mobile): column layout
//  At lg (1024px+): switch to row layout"
<div className="flex flex-col lg:flex-row">
```

### Breakpoints

| Prefix | Min width | Typical device |
|---|---|---|
| *(none)* | 0px | Mobile phones |
| `sm:` | 640px | Large phones / small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Small laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large desktops |

### Responsive strategy for the hero

Our hero should behave like this:

| Screen | Layout | Heading Size |
|---|---|---|
| Mobile (<640px) | Stacked (text above image) | 36px |
| Tablet (640-1023px) | Stacked with more padding | 48px |
| Desktop (1024px+) | Side by side (as designed in Figma) | 64px |

This translates to:

```tsx
// Layout: stack on mobile, row on desktop
className="flex flex-col lg:flex-row"

// Heading: scale up at each breakpoint
className="text-4xl sm:text-5xl lg:text-[64px]"

// Padding: tighter on mobile, more on tablet, none on desktop (use centering)
className="px-6 py-16 sm:px-12 md:py-20 lg:py-0"
```

### Common responsive patterns

#### 1. Grid columns

```tsx
{/* 1 column on mobile, 2 on tablet, 3 on desktop */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card />
  <Card />
  <Card />
</div>
```

#### 2. Hide/show elements

```tsx
{/* Show on desktop only */}
<div className="hidden lg:block">Desktop sidebar</div>

{/* Show on mobile only */}
<div className="block lg:hidden">Mobile menu button</div>
```

#### 3. Text sizing

```tsx
{/* Scale heading across breakpoints */}
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
  Big Title
</h1>
```

#### 4. Spacing

```tsx
{/* Tighter on mobile, more spacious on desktop */}
<section className="px-4 py-12 md:px-8 md:py-16 lg:px-16 lg:py-24">
```

#### 5. Stacked → side by side

```tsx
{/* Stack on mobile, side by side on desktop */}
<div className="flex flex-col lg:flex-row gap-8">
  <div className="lg:w-1/2">Text content</div>
  <div className="lg:w-1/2">Image</div>
</div>
```

### Testing responsive layouts

1. Open Chrome DevTools (F12 or Cmd+Opt+I)
2. Click the **device toggle** icon (top-left of DevTools panel)
3. Select different devices or drag the viewport width
4. Test at these widths: **375px** (iPhone), **768px** (iPad), **1024px** (laptop), **1440px** (desktop)

---

## 14. Exporting Assets from Figma

### Images / Photos

1. Click on the image layer in Figma
2. In the right panel, scroll to **"Export"** section (bottom)
3. Click **"+"** to add an export setting
4. Choose format:
   - **PNG** at **2x** for photos and complex images
   - **SVG** for icons, logos, and simple graphics
5. Click **"Export [layer name]"**
6. Save to your project's `public/images/` folder

### Icons

For icons, always prefer SVG:
1. Select the icon in Figma
2. Export as SVG
3. Place in `public/images/icons/` or install an icon library:

```bash
npm install lucide-react
```

Then use in components:
```tsx
import { Phone, Mail, MapPin } from "lucide-react";

<Phone className="h-5 w-5 text-white" />
```

### Image naming convention

Use lowercase, kebab-case names:
```
hero-image.png       (not Hero_Image.PNG)
about-team.png       (not aboutTeam.png)
icon-phone.svg       (not IconPhone.SVG)
```

---

## 15. Global Styles & CSS Reset

Your `globals.css` file should be kept minimal. Tailwind handles most things, but you may need:

```css
@import "tailwindcss";

@theme inline {
  /* Your design tokens here (see Section 6) */
}

/* Reset / base styles */
body {
  margin: 0;
  padding: 0;
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Remove default list styles if needed */
ul, ol {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Ensure images don't overflow */
img {
  max-width: 100%;
  height: auto;
}
```

**Do NOT add component-specific styles here.** All component styling should be done with Tailwind classes directly in the component file.

---

## 16. Running & Building the Project

### Development (while coding)

```bash
npm run dev
```

- Opens at `http://localhost:3000`
- **Hot reloads** — saves appear instantly in the browser
- Keep this running while you work

### Production build (before deployment)

```bash
npm run build
```

- Compiles and optimizes everything
- Outputs to `.next/` folder
- **Run this to check for errors** before deploying

### Preview the production build locally

```bash
npm run build && npm start
```

- Runs the optimized build locally so you can test it

### Static export (for static hosting)

If you need pure HTML/CSS/JS output (no Node.js server):

Add to `next.config.ts`:
```ts
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
};
export default nextConfig;
```

Then:
```bash
npm run build
```

The `out/` folder will contain plain HTML files you can deploy anywhere.

---

## 17. Common Tailwind Patterns

Quick reference for patterns you'll use constantly:

### Centering

```tsx
{/* Center horizontally */}
<div className="mx-auto max-w-7xl">Content</div>

{/* Center horizontally and vertically */}
<div className="flex items-center justify-center min-h-screen">Content</div>

{/* Center text */}
<p className="text-center">Centered text</p>
```

### Flexbox layouts

```tsx
{/* Row with space between */}
<div className="flex items-center justify-between">
  <Logo />
  <Nav />
</div>

{/* Column with gap */}
<div className="flex flex-col gap-4">
  <Item />
  <Item />
</div>

{/* Row with gap and wrapping */}
<div className="flex flex-wrap gap-4">
  <Tag />
  <Tag />
  <Tag />
</div>
```

### Overlay on image

```tsx
<div className="relative">
  <Image src="..." alt="..." fill className="object-cover" />
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/50" />
  {/* Content on top */}
  <div className="relative z-10 text-white">
    <h1>Title over image</h1>
  </div>
</div>
```

### Hover and transition

```tsx
<button className="bg-navy text-white px-6 py-3 rounded-lg transition-colors hover:bg-navy/80">
  Click me
</button>
```

### Container pattern

```tsx
{/* Centered container with max width and responsive padding */}
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  {/* Page content */}
</div>
```

---

## 18. Figma-to-CSS Translation Cheat Sheet

Use this table when converting Figma properties to Tailwind classes:

### Layout

| Figma Property | Tailwind Class |
|---|---|
| Auto layout: Horizontal | `flex flex-row` |
| Auto layout: Vertical | `flex flex-col` |
| Gap: 16 | `gap-4` (4 × 4px = 16px) |
| Gap: 21 | `gap-[21px]` |
| Padding: 24 | `p-6` (6 × 4px = 24px) |
| Padding: 16 32 | `py-4 px-8` |
| Align items: Center | `items-center` |
| Justify: Space between | `justify-between` |
| Justify: Center | `justify-center` |

### Sizing

| Figma Property | Tailwind Class |
|---|---|
| Width: Fixed 408px | `w-[408px]` |
| Width: Fill container | `w-full` |
| Width: Hug contents | `w-fit` |
| Height: 729px | `h-[729px]` |
| Min height: 729px | `min-h-[729px]` |
| Max width: 1200px | `max-w-[1200px]` |

### Typography

| Figma Property | Tailwind Class |
|---|---|
| Font size: 16px | `text-base` |
| Font size: 64px | `text-[64px]` |
| Font weight: 300 | `font-light` |
| Font weight: 400 | `font-normal` |
| Font weight: 500 | `font-medium` |
| Font weight: 600 | `font-semibold` |
| Font weight: 700 | `font-bold` |
| Line height: 1.2 | `leading-[1.2]` |
| Line height: 1.5 | `leading-normal` or `leading-[1.5]` |
| Letter spacing: -2% | `tracking-[-0.02em]` |
| Text align: Left | `text-left` |
| Text align: Center | `text-center` |

### Colors

| Figma Property | Tailwind Class |
|---|---|
| Fill: #1D2E54 | `bg-[#1D2E54]` or `bg-navy` (if tokenized) |
| Text color: #777 | `text-[#777]` or `text-gray-heading` (if tokenized) |
| Border color: #E5E7EB | `border-[#E5E7EB]` |
| Opacity: 50% | `opacity-50` |
| Fill color with opacity | `bg-black/50` (black at 50% opacity) |

### Spacing scale (Tailwind units)

| Tailwind Unit | Pixels |
|---|---|
| `1` | 4px |
| `2` | 8px |
| `3` | 12px |
| `4` | 16px |
| `5` | 20px |
| `6` | 24px |
| `8` | 32px |
| `10` | 40px |
| `12` | 48px |
| `16` | 64px |
| `20` | 80px |
| `24` | 96px |

**Rule of thumb:** Divide the pixel value by 4 to get the Tailwind unit. If it doesn't divide evenly, use a bracket value: `gap-[21px]`.

### Effects

| Figma Property | Tailwind Class |
|---|---|
| Border radius: 8px | `rounded-lg` |
| Border radius: 12px | `rounded-xl` |
| Border radius: 9999px (pill) | `rounded-full` |
| Border radius: 4px | `rounded` |
| Shadow: small | `shadow-sm` |
| Shadow: medium | `shadow-md` |
| Shadow: large | `shadow-lg` |
| Custom shadow | `shadow-[0_4px_24px_rgba(0,0,0,0.08)]` |
| Border: 1px solid | `border` |
| Border: 2px solid #000 | `border-2 border-black` |

### Position

| Figma Property | Tailwind Class |
|---|---|
| Position: Absolute | `absolute` |
| Position: Relative | `relative` |
| Constraints: Left & Right | `inset-x-0` or `left-0 right-0` |
| Constraints: Top | `top-0` |
| Layer order (on top) | `z-10`, `z-20`, etc. |
| Fill entire parent | `absolute inset-0` |

---

## 19. Troubleshooting

### "Module not found" error

**Symptom:** `Cannot find module '@/components/sections/Hero'`

**Fix:** Check that:
1. The file exists at the exact path
2. The filename matches (case-sensitive)
3. You exported the component: `export function Hero` (not just `function Hero`)

### Image not showing

**Symptom:** Broken image or empty space

**Fix:**
1. Check the image is in the `public/` folder
2. The `src` path should be relative to `public/`: `/images/hero-image.png` (not `public/images/hero-image.png`)
3. If using `fill`, the parent must have `position: relative` and a defined height

### Tailwind classes not working

**Symptom:** Classes are applied but styles don't appear

**Fix:**
1. Ensure the class name is correct (no typos)
2. Custom values need brackets: `text-[64px]` not `text-64px`
3. Custom colors defined in `@theme` need the `--color-` prefix: `--color-navy` becomes `bg-navy`
4. Restart the dev server after changing `globals.css`

### Font not loading

**Symptom:** Text shows in a fallback font (Arial, Times New Roman)

**Fix:**
1. Check the `variable` name in `layout.tsx` matches what you use in `globals.css`
2. Make sure the `variable` className is on the `<body>` tag
3. For local fonts, verify the file path is correct relative to the layout file
4. Check the browser's Network tab (DevTools) to see if the font file loaded

### Hydration error

**Symptom:** `Text content does not match server-rendered HTML`

**Fix:** This happens when the HTML generated on the server doesn't match what React creates in the browser. Common causes:
1. Using `Date.now()` or `Math.random()` in components
2. Browser extensions modifying the HTML
3. Nesting `<p>` inside `<p>` or `<div>` inside `<p>` (invalid HTML)

### Port already in use

**Symptom:** `Port 3000 is in use`

**Fix:** Either:
1. Let Next.js auto-pick another port (it will tell you which one)
2. Kill the process on port 3000: `npx kill-port 3000`

---

## 20. Checklist Before Handoff

Use this checklist before submitting your work:

### Visual accuracy
- [ ] Colors match Figma exactly (use a color picker to verify)
- [ ] Font families are correct
- [ ] Font sizes, weights, and line heights match
- [ ] Spacing (padding, margin, gap) matches Figma
- [ ] Border radius matches
- [ ] Shadows match (if any)
- [ ] Images are sharp (exported at 2x)

### Responsive
- [ ] Tested at 375px (mobile phone)
- [ ] Tested at 768px (tablet)
- [ ] Tested at 1024px (laptop)
- [ ] Tested at 1440px+ (desktop)
- [ ] No horizontal scroll at any width
- [ ] Text is readable at all sizes
- [ ] Images don't stretch or distort

### Code quality
- [ ] `npm run build` completes with no errors
- [ ] No TypeScript errors
- [ ] No console errors in the browser
- [ ] All images use `<Image>` from `next/image`
- [ ] All images have meaningful `alt` text
- [ ] Content is in `src/data/` files, not hardcoded in components
- [ ] Components are in the correct folders

### Accessibility
- [ ] Semantic HTML (`<section>`, `<nav>`, `<main>`, `<h1>`–`<h6>`, `<p>`)
- [ ] Heading hierarchy makes sense (no skipping from h1 to h4)
- [ ] All images have `alt` text
- [ ] Color contrast meets WCAG AA (test with Chrome Lighthouse)
- [ ] Focusable elements are keyboard accessible

---

## Quick Reference Card

```
Start project:     npx create-next-app@latest my-project --typescript --tailwind --eslint --app --src-dir
Start dev server:  npm run dev
Build for prod:    npm run build
Check errors:      npm run build (errors appear in terminal)

Files:
  Pages:           src/app/page.tsx, src/app/about/page.tsx
  Components:      src/components/sections/Hero.tsx
  Content data:    src/data/home.ts
  Styles/tokens:   src/app/globals.css
  Layout/fonts:    src/app/layout.tsx
  Images:          public/images/

Imports:
  Component:       import { Hero } from "@/components/sections/Hero"
  Data:            import { heroData } from "@/data/home"
  Image:           import Image from "next/image"
  Font:            import { Montserrat } from "next/font/google"
```

---

*Guide version 1.0 — Last updated February 2025*
