---
name: Cyber-Metric Admin
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#121212'
  surface-container: '#201f1f'
  surface-container-high: '#1C1C1C'
  surface-container-highest: '#282828'
  on-surface: '#e5e2e1'
  on-surface-variant: '#bbc9ca'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#859394'
  outline-variant: '#3c494a'
  surface-tint: '#3edae3'
  primary: '#45dee7'
  on-primary: '#003739'
  primary-container: '#00c2cb'
  on-primary-container: '#004a4e'
  inverse-primary: '#00696e'
  secondary: '#9acbff'
  on-secondary: '#003355'
  secondary-container: '#0099f3'
  on-secondary-container: '#002e4e'
  tertiary: '#ffbc93'
  on-tertiary: '#512300'
  tertiary-container: '#fb9651'
  on-tertiary-container: '#6d3200'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6bf6ff'
  primary-fixed-dim: '#3edae3'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f53'
  secondary-fixed: '#cfe5ff'
  secondary-fixed-dim: '#9acbff'
  on-secondary-fixed: '#001d34'
  on-secondary-fixed-variant: '#004a79'
  tertiary-fixed: '#ffdbc8'
  tertiary-fixed-dim: '#ffb689'
  on-tertiary-fixed: '#311300'
  on-tertiary-fixed-variant: '#743500'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
  surface-base: '#0A0A0A'
  glass-fill: rgba(255, 255, 255, 0.05)
  glass-stroke: rgba(255, 255, 255, 0.1)
typography:
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  stats-lg:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base-unit: 8px
  container-padding-desktop: 32px
  container-padding-mobile: 16px
  gutter: 24px
  margin-sm: 12px
  margin-md: 24px
  margin-lg: 48px
---

## Brand & Style

The design system is engineered for high-performance administration, blending a **Corporate Modern** structure with **Glassmorphism** and **High-Tech** aesthetic cues. It targets technical operators and data analysts who require a sophisticated, low-strain environment for long-duration monitoring.

The visual language communicates precision and forward-thinking innovation. By utilizing deep charcoal foundations punctuated by electric cyan, the interface achieves a "command center" feel. The atmosphere is professional yet energetic, maintaining a strict grid-based discipline while softening the edges with generous border radii to ensure the product feels accessible and contemporary.

## Colors

This design system is natively **dark-mode**. The palette is rooted in a layered grayscale to provide depth without introducing hue-clutter.

- **Primary Cyan (#00C2CB):** Reserved for high-priority actions, active navigation states, and data highlights.
- **Secondary Blue (#18A0FB):** Used for informational accents, secondary data points, and links to distinguish them from primary actions.
- **Surface Hierarchy:** The background uses a near-black `#0A0A0A`. Cards and interactive containers step up in lightness (`#1C1C1C` to `#282828`) to create a clear visual stack. 
- **Glass Elements:** Use semi-transparent white overlays with backdrop blurs (20px+) for temporary surfaces like tooltips, dropdowns, or floating action panels.

## Typography

The typography strategy prioritizes legibility and technical clarity. 

- **Display & Headlines:** Use **Hanken Grotesk** for a sharp, contemporary feel that communicates authority.
- **Body & Interface:** **Inter** is utilized for its exceptional readability in dense data environments.
- **Technical Labels:** **JetBrains Mono** is introduced for small labels, IDs, and metadata to reinforce the high-tech, developer-centric aesthetic.
- **Information Density:** For mobile views, headline sizes are aggressively scaled down to preserve screen real estate for data visualizations.

## Layout & Spacing

This design system employs a **fixed-fluid hybrid grid**. The sidebar remains fixed (280px) while the main content area fluidly expands, utilizing a 12-column layout on desktop.

- **Rhythm:** All spacing is derived from an 8px base unit.
- **Gutters:** Standard 24px gutters provide significant breathing room between data-heavy cards.
- **Breakpoints:**
  - **Desktop (1280px+):** Full sidebar, 12 columns, 32px margins.
  - **Tablet (768px - 1279px):** Icon-only sidebar, 8 columns, 24px margins.
  - **Mobile (< 767px):** Hidden sidebar (hamburger), 4 columns, 16px margins. 
- **Density:** Use "Comfortable" spacing for dashboards to prevent cognitive overload, and "Compact" spacing within data tables.

## Elevation & Depth

Hierarchy is established primarily through **Tonal Layering** and **Subtle Inner Glows** rather than heavy drop shadows.

- **Level 0 (Base):** `#0A0A0A` - The void background.
- **Level 1 (Cards):** `#1C1C1C` - Uses a 1px subtle border (`rgba(255, 255, 255, 0.05)`) to define edges.
- **Level 2 (Modals/Popovers):** Glassmorphism effect. Use `backdrop-filter: blur(24px)` with a slightly lighter fill.
- **Active States:** Elements in focus or active states should emit a subtle cyan outer glow (`box-shadow: 0 0 15px rgba(0, 194, 203, 0.3)`) to simulate a "powered-on" hardware effect.

## Shapes

The design system uses a distinctive **Large-Radius** language. While the content is technical, the rounded corners make the experience feel premium and modern.

- **Standard Containers:** 16px to 24px radius (`rounded-lg` or `rounded-xl`).
- **Buttons & Inputs:** 8px radius for a more precise, clickable feel.
- **Tags/Chips:** Fully pill-shaped for maximum distinction from square data cells.
- **Icons:** Use a 2px stroke weight with slightly rounded joins to match the typography.

## Components

- **Buttons:** 
  - *Primary:* Solid Cyan (#00C2CB) with Black text. 
  - *Secondary:* Ghost style with 1px Cyan border and Cyan text.
- **Input Fields:** Deep charcoal background (`#121212`) with a subtle top-down gradient. Active state changes the border color to Cyan.
- **Cards:** Use `surface-container-high`. Headers within cards should have a subtle bottom divider (`1px solid rgba(255,255,255,0.05)`).
- **Navigation Items:** Rounded-pill background for the active state using the Primary Cyan. Unselected items remain text-only or use a low-opacity hover state.
- **Data Visualization:** Charts should use the Primary Cyan and Secondary Blue as the main data series. Use gradients under line charts to create a "glow" effect on the x-axis.
- **Status Indicators:** Use standard semantic colors (Red for error, Amber for warning) but desaturate them slightly to fit the dark aesthetic, using "Glow" effects for visibility.