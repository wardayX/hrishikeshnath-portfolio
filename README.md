# HRISHIKESH NATH — PORTFOLIO

React + TypeScript + Vite • GSAP • GitHub Actions • Vercel

## Overview

A highly visual personal portfolio built around a brutalist / grotesk-inspired interface. The site presents my introduction, selected projects, technical work, and contact information through a scroll-driven experience with large typography, geometric elements, interactive hover effects, horizontal project transitions, and responsive layouts for desktop, tablet, and mobile.

## Design Direction

- Brutalist / grotesk visual language with oversized typography and strong spacing.
- Minimal black-and-off-white visual system with geometric rectangles, quadrilaterals, and lines.
- Interactive geometry responds to pointer movement.
- Scroll-driven storytelling rather than a conventional multi-page portfolio.
- Project visuals can be opened in a full-screen lightbox for detailed viewing.
- Responsive mobile layouts with dedicated viewport and typography adjustments.

## Portfolio Flow

1. **Opening** — Animated HELLO sequence followed by the name introduction.
2. **Introduction** — Scroll-driven introduction with interactive words and geometric elements.
3. **Selected Work** — A transition from the introduction into the project showcase.
4. **Projects** — Projects are presented horizontally with project information, visuals, features, and GitHub links.
5. **Contact** — A final contact/footer section containing email, phone, GitHub, LinkedIn, coding profiles, and resume access.

## Featured Projects

### 01 — SmartRecon-GST

AI-powered GST invoice OCR and reconciliation platform. Features include invoice OCR, SBERT-based matching, GST validation, and automated reporting.

Repository: https://github.com/wardayX/SmartRecon-GST

### 02 — Stable Video Infinity

An optimized Stable Video Infinity workflow engineered to run on a 16GB Colab T4, using GGUF Q4_K_M, split inference, autoregressive generation, and VRAM optimization.

Repository: https://github.com/wardayX/svi2_colab

### 03 — Multi-Modal Image Fusion

An AI image-merging experiment combining multimodal models and generation. The project uses CLIP, Stable Diffusion, T5, and image-to-image generation.

Repository: https://github.com/buggytanmoy77/Chaos

## Tech Stack

- React
- TypeScript
- Vite
- GSAP / ScrollTrigger
- HTML5 / CSS3
- Git / GitHub
- GitHub Actions
- Vercel

## Interaction & Animation

- GSAP ScrollTrigger drives the main scroll-based transitions and pinned sections.
- The opening sequence animates the HELLO and name typography.
- Introduction words include interactive hover behavior.
- Geometric elements react to pointer movement.
- The introduction transitions horizontally into the selected projects.
- Project images open in a full-screen lightbox.
- Project GitHub links open the corresponding repositories in a new tab.
- Mobile touch scrolling is tuned separately from desktop/tablet scrolling.

## Responsive Design

The portfolio uses separate mobile positioning and sizing rules to preserve the intended visual composition on smaller screens. Mobile full-screen sections use stable viewport sizing so browser interface changes do not unnecessarily crop content. Project information, images, footer links, and introduction typography are adjusted for smaller displays.

## CI/CD & DevOps

The project includes a basic CI/CD workflow so that development and deployment are automated.

### Continuous Integration

- GitHub Actions checks the repository on pushes to `main`.
- Dependencies are installed with `npm ci`.
- TypeScript is checked with `npx tsc -b`.
- The production Vite build is validated with `npm run build`.

### Continuous Deployment

- Vercel is connected to the GitHub repository.
- Production changes are automatically deployed.
- A normal `git push` can trigger validation through GitHub Actions and update the live portfolio through Vercel.

## Getting Started

### Clone the repository

```bash
git clone <your-repository-url>
cd hrishikesh-portfolio
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Create a production build

```bash
npm run build
```

## Deployment

The production deployment is handled through Vercel. Once the GitHub repository is connected, changes pushed to the production branch can trigger a new deployment automatically.

## Project Structure

```text
src/
├── sections/
│   ├── IntroPrototype.tsx
│   ├── Introduction.tsx
│   └── Footer.tsx
├── App.tsx
├── main.tsx
└── index.css

public/
├── images/
└── hrishikesh-nath-resume.pdf

.github/
└── workflows/
    └── ci.yml
```

## Links

- GitHub: https://github.com/wardayX
- LinkedIn: https://www.linkedin.com/in/hrishikesh-nath-01552a298/
- CodeChef: https://www.codechef.com/users/gaggle_tale_35
- Codeforces: https://codeforces.com/profile/Samskara
- LeetCode: https://leetcode.com/u/hrishikesh19/
- HackerRank: https://www.hackerrank.com/profile/nathh722

## Contact

- Email: nathh722@gmail.com

## License

This portfolio is a personal project. Project-specific code and assets remain subject to the licenses and terms of their respective repositories, models, datasets, and third-party services.

---

_Built with curiosity, iteration, and a lot of scrolling._
