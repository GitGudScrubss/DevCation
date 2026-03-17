# DEVCATION 2026

![DevCation Logo / Banner Placeholder](public/gdg-logo.png)

**Devcation Delhi 2026** is the flagship hackathon designed and organized by Google Developer Groups IGDTUW in collaboration with GDG IIT Delhi. It empowers the next generation of innovators through talks, workshops, mentorship, and intense weekend hacking.

## 🌟 The Event
*   **Grand Finale:** Hosted at IIT Delhi on April 12, 2026.
*   **Prize Pool:** ₹3,00,000+ in cash prizes and exclusive rewards.
*   **Format:** A hybrid hackathon starting with the online "Hack 'N' Solve" round (36 hours), followed by mentorship, culminating in the live, on-stage Grand Finale pitches.

## 🚀 Hackathon Tracks
The competition is divided across 4 distinct tracks:
1.  **TigerGraph Track:** Build solutions using TigerGraph as the core graph database (Fraud detection, recommendation systems, cybersecurity).
2.  **Hack 'N' Solve (Open Innovation):** Solve real-world challenges across FinTech, HealthTech, AI, and Web3.
3.  **Sustainability Track:** Powered by Rotaract Club — build tech for environmental and social impact.
4.  **Duality Track:** Combine two distinct fields of tech or science to build something entirely new.

## 💻 Tech Stack
This repository contains the landing page and registration portal.
*   **Framework:** React 19 + Vite
*   **Styling:** Tailwind CSS v4
*   **Animations:** Framer Motion
*   **Icons:** Lucide React
*   **Components:** Custom UI based on shadcn/ui principles (Glassmorphism, intense neon glows, modern grid layouts).

## 🛠️ Local Development Setup

**Prerequisites:** Node.js (v18+)

1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/GitGudScrubss/DevCation.git
   cd DevCation
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`.

## 🌐 Production Deployment
The site is configured as a Single Page Application (SPA) and is pre-configured for **Vercel** edge deployments. 
The included `vercel.json` ensures all routes perfectly resolve back to `index.html`.

You can trigger a production build locally to test for errors:
```bash
npm run build
```

## 🤝 Partners
*   GDG IGDTUW
*   GDG IIT Delhi
*   Rotaract Club IGDTUW
*   TigerGraph
