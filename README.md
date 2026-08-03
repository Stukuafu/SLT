# SLT Consulting Website

A complete single-page React and Vite website for SLT Consulting. All project examples and testimonials are fictional placeholders and can be replaced later.

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

Do not flatten the React project into a single folder. Keep `src`, `public`, `package.json`, `vite.config.js` and the other files in their existing locations.

## Deploy with Cloudflare Pages

1. In Cloudflare, open **Workers & Pages**.
2. Choose **Create application**, then **Pages**, then **Connect to Git**.
3. Select the GitHub repository.
4. Use these build settings:

   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: leave blank

5. Save and deploy.

## Main content locations

- Site text, services, projects and testimonials: `src/data/siteData.js`
- Colours, typography, spacing and responsive styles: `src/styles.css`
- Images: `public/images`
- Header and sections: `src/components`

## Contact details

The phone number and email address are placeholders. Replace them in:

- `src/components/Contact.jsx`
- `src/components/Footer.jsx`
- `src/data/siteData.js` if you later add contact data there

## Notes

- All navigation links currently point to sections on the same page.
- Images are original generated assets prepared for this prototype.
- The design includes responsive layouts, a sticky header, a mobile menu, subtle scroll reveals, a project carousel, an automatic testimonial carousel and reduced-motion support.
