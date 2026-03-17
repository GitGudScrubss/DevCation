# Visual Redesign Spec: "Cyber-Glass" Epic Aesthetic

## Overview
The goal of this redesign is to shift the look and feel of the DevCation hackathon website from "calm" to **"epic" and "exciting"**. We will achieve this exclusively by modifying the typography, color palette, and background visual treatments, **without** altering the core HTML structure, layout, or previously added React components (e.g., ShinyButton, Orbital Timeline).

## 1. Typography 
The current typography (`Space Grotesk` + `DM Sans`) feels a bit too friendly and calm. 

**Proposed Changes:**
- **Headings (The "Epic" Factor):** `Outfit` or `Syncopate`. These are sharp, highly modern, geometric sans-serif fonts that immediately signal "premium tech event". We will apply this to the `.font-heading` class.
- **Body Text:** `Inter` or `Manrope`. Extremely clean, highly legible monospace-leaning fonts that pair perfectly with intense headings.
- **Implementation:** Update the Google Fonts import in `index.css` and the theme config mappings. 

## 2. Color Palette
The current palette uses standard slate grays (`#0F172A`, `#1E293B`).

**Proposed Changes:**
- **Background:** Deep Pitch Black / Obsidian (`#050505` to `#0A0A0A`). This creates infinite contrast, making any colors placed on top "pop" like neon.
- **Surfaces (Glassmorphism):** Ultra-dark semi-transparent bases (`rgba(20,20,20, 0.6)`) with heavy background blur (`backdrop-blur-2xl`).
- **Accents:** The primary accent (`#22C55E` - Green) and secondary (`#3B82F6` - Blue) will remain, but we will increase the intensity of their glowing classes (e.g., `glow-accent`) to be piercing and highly saturated against the black.

## 3. Backgrounds and Ambiance
We want the user to feel immersed in high energy.

**Proposed Changes:**
- **Glowing Orbs:** The existing soft, low-opacity blurred background orbs (`bg-accent/5 blur-[120px]`) will be intensified to (`bg-accent/15 blur-[150px]`) to create a much more dramatic wash of color behind the pure dark surfaces.
- **Dot Grid:** Intensify the `dot-grid` utility slightly so it feels like a sharp technical blueprint in the background.
- **Card Borders:** Instead of flat `#334155` borders, we'll shift glass cards to have incredibly subtle, crisp 1px borders (`rgba(255,255,255,0.08)` or `rgba(34,197,94,0.3)`) that simulate edge-lit glass.

## 4. Execution Plan
1. Overhaul the `index.css` `:root` theme variables (Colors, Fonts).
2. Tweak the global `.glass` and `.glass-card` CSS utilities to adopt the heavier blur and darker backgrounds.
3. Scan `App.tsx` *only* to update the Google Font `className` injections if needed (though modifying `font-heading` and `font-sans` in CSS should cover 90% automatically).

---

Please review this design direction. If this "Cyber-Glass" aesthetic sounds like the precise "epic" feel you want, we can transition immediately into implementing the plan!
