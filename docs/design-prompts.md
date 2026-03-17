# DevCation Visual Design Prompts

This document outlines the key prompts and conceptual directions provided by the User to generate the advanced visual design, components, and "Epic" aesthetic of the DevCation website.

## 1. The Component Integrations
The user utilized highly specific integration prompts to pull complex, animated React components into the project. 

**Prompt Example (Radial Orbital Timeline):**
> "You are given a task to integrate an existing React component in the codebase. The codebase should support: shadcn project structure, Tailwind CSS, Typescript. Copy-paste this component to /components/ui folder: `radial-orbital-timeline.tsx` [Component Source Code]"

**Prompt Example (Shiny Button):**
> "finally change the CTA register on unstop button, wherever it is(navbar, on the site) to this button: You are given a task to integrate an existing React component in the codebase... Copy-paste this component to /components/ui folder: `shiny-button.tsx` [Component Source Code]"

## 2. Layout & Interactive Refinements
The user guided the refinement of the initial layout to make interactions smoother and less erratic.

**Prompt Example (Hover States):**
> "One little issue: when you hover over those tiles, they are too sensitive, as a result it becomes very difficult to select one of the middle tiles... also, the tiles are too transparent, make them just a little opaque"

**Prompt Example (Card Snap Mechanics):**
> "opacity is okay now, however the tiles are moving even more erratically, let's do one thing, when a mouse hovers over one tile, it slowly rises up from where it is, not that fast as it is now... keep the tile shape and design as it is, just increase the space between them."
> "do not move the tile to the centre, rather just move them up on hover, when the tile is losing the mouse, it tries to snap back to position that is where the problem is"

## 3. The "Calm to Epic" Transition
The crowning achievement of the visual design was shifting the standard "SaaS" template into an intense, dark-mode hacker aesthetic.

**Prompt Example (Brainstorming Phase):**
> "Brainstorm and implement a visual redesign (typography, colors, background) to make the hackathon website feel more 'epic' and less 'calm', without altering the core elements."

**Agent's Selected Aesthetic Proposal ("Cyber-Glass"):**
*   **Typography:** Swapped Space Grotesk/DM Sans for sharp, modern sans-serifs (`Outfit` and `Inter`).
*   **Palette:** Replaced standard slate backgrounds with pitch Obsidian (`#050505`).
*   **Ambiance:** Intensified neon-green glow accents (`rgba(34, 197, 94, 0.4)`), cranked up glassmorphic `backdrop-blur` utilities, and implemented faint 1px glowing inner borders (`rgba(255, 255, 255, 0.08)`).
*   **Refinement:** "there's a bluish tint in the background picture of the deer in the hero section, just remove that blusih tint, do not change anything else" (Swapped slate vignette gradient to pure black).

## 4. Minor Assets & Copy Iterations
Smaller, detail-oriented prompts to dial in the branding.

**Prompt Examples:**
> "I have uploaded the logo for Rotaract Club for IGDTUW, which is the sponser for one of the tracks and tigergraph, add these to the part just above the about section, just like you added the gdg logo"

> "one final fix, at the top of the page, after the hero section, it says registration open 2 april, it looks a little misleading, either make it registrations close 2 Apr or Registrations open till 2 Apr"
