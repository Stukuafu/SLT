# SLT Consulting Website

A complete single-page React and Vite website for SLT Consulting. This revised edition uses the denser, more balanced layout from the preferred visual concept: a shorter cinematic hero, compact service row, three-card project showcase, five-card testimonial strip, slim call-to-action and light footer.

All project examples and testimonials are fictional placeholders and can be replaced later.

## Run locally

```bash
npm install
npm run dev
```

Open the local address shown in the terminal, usually `http://localhost:5173`.

## Build for production

```bash
npm run build
```

Vite creates the production site in the `dist` folder.

## Upload to GitHub

1. Create a new empty GitHub repository.
2. Upload every file and folder in this project, keeping the folder structure unchanged.
3. Commit the files to the `main` branch.

Do not flatten the project. Keep `src`, `public`, `package.json`, `vite.config.js` and the other files in their existing locations.

## Deploy with Cloudflare Pages

Use these settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: leave blank

## Main content locations

- Text, services, projects and testimonials: `src/data/siteData.js`
- Layout, colours, spacing and responsive styles: `src/styles.css`
- Images: `public/images`
- Page sections: `src/components`

## Notes

- All navigation links currently point to sections on this single page.
- Images are original generated assets prepared for this prototype.
- The phone number, email and business examples are placeholders.
- The layout is responsive and includes a sticky header, mobile menu, subtle animation, project carousel, testimonial carousel and reduced-motion support.
