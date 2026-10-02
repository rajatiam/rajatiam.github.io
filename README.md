# Rajat Kumar ? Professional portfolio

Site URL: https://rajatiam.github.io/

## Update content

Edit `data/resume.json`, then run `npm run build` (Node.js 20+). Commit the data and generated output together. GitHub Pages publishes the root of `main`.

To publish at this URL, place the contents of this folder in the `rajatiam/rajatiam.github.io` repository and configure GitHub Pages to deploy from `main`, `/ (root)`.

The data file holds personal details, links, experience, skills, projects, certifications, and education. Empty certifications are omitted from the page and navigation. Only add verified facts and metrics.

`scripts/build.mjs` contains reusable rendering functions and section templates. It generates semantic HTML, structured data, sitemap, robots file, and the social-card source. Pages render without JavaScript; `interactions.js` progressively adds filters, theme persistence, mobile navigation, and clipboard support. Project details use native HTML disclosure controls.

## Visuals and assets

- `styles.css`: base layout and themes.
- `polish.css`: card styling, typography, responsive layouts.
- `portfolio.css`: navigation and case-study refinements.
- `social-card.png`: 1200 x 630 social preview. Re-render `social-card.html` at that size after changing the name or role.
- `Rajat-Kumar-Resume.pdf`: original supplied PDF. Replace separately when your resume changes; the build does not rewrite it.

No dependencies or framework runtime are required. Test with JavaScript enabled and disabled, keyboard navigation, light/dark themes, and narrow screens. Print CSS expands experience and filtered skills. Respect reduced-motion preferences.

A portrait is not included until the original image file is supplied. No unverified certifications, business metrics, or production project results are published.
