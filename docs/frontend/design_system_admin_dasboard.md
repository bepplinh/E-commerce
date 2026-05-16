# Dovetail Admin System — Production Dashboard Edition

> Modern enterprise-grade dark admin dashboard design system  
> Inspired by Linear, Vercel, Raycast, Supabase. Optimized for speed and density.

---

# Philosophy

Dovetail Admin System is engineered for high-performance data environments where speed, clarity, and information density are paramount.

- **Extreme Performance**: No heavy animations or unnecessary layout shifts.
- **Data First**: Typography and grids are optimized for readability of complex datasets.
- **Technical Aesthetic**: A "Command Center" feel using deep blacks, precision borders, and monospace accents.
- **Predictable Flow**: Standardized interaction patterns that require zero learning curve.

---

# Design Principles

## 1. High Density, Low Noise
Information is grouped logically using subtle dividers and surface changes rather than heavy shadows or colors. Every pixel must serve a purpose.

## 2. Surface-Driven Hierarchy
Hierarchy is established through layering:
- `Base` (#0a0a0a) for the background.
- `Surface` (#141414) for main content areas.
- `Elevated` (#1e1e1e) for interactive elements.

## 3. Precision Typography
Using `Geist` for a modern technical feel and `JetBrains Mono` for all data-heavy points (IDs, numbers, logs) to ensure alignment and readability.

## 4. Subtle Tactility
Adding depth via micro-textures (noise), hairline borders (0.5px - 1px), and subtle glassmorphism on floating elements.

---

# Tokens — Colors

## Base Colors (Deep Night Palette)

| Name              | Value     | Token                       | Usage                       |
| ----------------- | --------- | --------------------------- | --------------------------- |
| Deep Night        | `#050505` | `--color-background`        | Main application background |
| Abyssal Plane     | `#0d0d0d` | `--color-surface`           | Standard card/panel surface |
| Graphite          | `#141414` | `--color-surface-elevated`  | Interactive surfaces        |
| Elevated Graphite | `#1e1e1e` | `--color-surface-floating`  | Floating menus/modals       |
| Hairline          | `#262626` | `--color-border-subtle`     | Subtle dividers             |
| Ash               | `#333333` | `--color-border-default`    | Standard component borders  |
| Pure White        | `#ffffff` | `--text-primary`            | Primary text                |
| Silver Pine       | `#a1a1a1` | `--text-secondary`          | Secondary/Muted text        |
| Stone Dust        | `#666666` | `--text-tertiary`           | Placeholder/Disabled text   |
| Electric Violet   | `#7c3aed` | `--color-accent`            | Primary brand/action color  |

## Semantic Colors

| Intent  | Base      | Soft (12% Opacity) | Usage                |
| ------- | --------- | ------------------ | -------------------- |
| Success | `#10b981` | `rgba(16,185,129,0.1)` | Valid states, profit |
| Danger  | `#ef4444` | `rgba(239,68,68,0.1)`  | Destructive, error   |
| Warning | `#f59e0b` | `rgba(245,158,11,0.1)` | Alerts, pending      |
| Info    | `#3b82f6` | `rgba(59,130,246,0.1)` | System messages      |

---

# Typography

## Typefaces

- **Primary**: `Geist Sans` (Fallback: `Inter`) — For all UI labels, headings, and body text.
- **Data/Mono**: `JetBrains Mono` — For metrics, IDs, timestamps, and code.

## Typography Settings

- **Headings**: `text-balance` for balanced line breaks.
- **Body**: `text-pretty` for optimal readability.
- **Numbers**: `tabular-nums` (via `font-variant-numeric`) is **MANDATORY** for all tables and metrics to prevent shifting.

| Role    | Size | Weight | Leading | Feature             |
| ------- | ---- | ------ | ------- | ------------------- |
| KPI     | 48px | 700    | 1.1     | `tabular-nums`      |
| Metric  | 24px | 600    | 1.2     | `tabular-nums`      |
| Heading | 20px | 600    | 1.4     | `text-balance`      |
| Body    | 14px | 400    | 1.5     | `text-pretty`       |
| Label   | 12px | 500    | 1.4     | `uppercase` (opt)   |

---

# Surface & Effects

## Glassmorphism (Floating Elements Only)
For Modals, Popovers, and Tooltips:
- **Background**: `rgba(20, 20, 20, 0.8)`
- **Blur**: `backdrop-filter: blur(12px)`
- **Border**: `1px solid rgba(255, 255, 255, 0.1)`
- **Shadow**: `0 20px 40px rgba(0, 0, 0, 0.4)`

## Noise Texture
A global `overlay` noise texture (2% opacity) is applied to all surfaces to reduce "flatness" and provide a premium, tactile feel.

---

# Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: {
          DEFAULT: '#0d0d0d',
          elevated: '#141414',
          floating: '#1e1e1e',
        },
        border: {
          subtle: '#262626',
          default: '#333333',
        },
        accent: '#7c3aed',
      },
      fontFamily: {
        sans: ['Geist Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Custom plugin for tabular-nums
    function({ addUtilities }) {
      addUtilities({
        '.tabular-nums': { 'font-variant-numeric': 'tabular-nums' },
      })
    }
  ],
}
```

---

# Components — Visual Rules

- **Buttons**:
    - Primary: `accent` background, white text. No gradients.
    - Secondary: `surface-elevated` background, `border-default`.
- **Inputs**:
    - Always `surface` background.
    - Focus state: `border-accent` with a subtle `ring-1 ring-accent/30`.
- **Cards**:
    - No shadows for standard cards. Use `border-subtle`.
    - 8px border-radius (`rounded-lg`).
- **Dividers**:
    - Use `border-subtle`. 1px width.

---

# Interaction States (Non-Motion)

To maintain speed, we use instant state changes:
- **Hover**: Background shifts slightly brighter (+5%).
- **Active**: Background shifts slightly darker (-5%) or scales down to `98%`.
- **Disabled**: `opacity-40` and `cursor-not-allowed`.
- **Loading**: Use structural skeletons (`animate-pulse` from Tailwind) instead of complex spinners.
