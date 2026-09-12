# Yasir Apps

A GitHub Pages-ready app store website for apps published by Yasir.

## Files

- `index.html` — page structure, SEO metadata, Tailwind CDN setup, and content sections.
- `style.css` — custom visual design, responsive layout, and lightweight animations.
- `script.js` — app catalog, search, filters, and download interactions.
- `assets/icons/yasir-capcut.svg` — local app icon, so the first card does not depend on an external image.
- `assets/favicon.svg` — site favicon.
- `site.webmanifest` — basic install metadata for supported browsers.
- `robots.txt` — crawler rules and sitemap location.
- `sitemap.xml` — sitemap-ready root URL.

## GitHub Pages

Upload the contents of this folder to the root of the `yasir-apps` repository, then enable GitHub Pages from the repository's Pages settings using the repository branch as the source.

Expected site URL:

https://yasirrahim12.github.io/yasir-apps/

## Add another app later

Open `script.js` and add another object inside `APPS`. Keep the same fields:

- `name`
- `category`
- `categoryLabel`
- `version`
- `badge`
- `description`
- `features`
- `icon`
- `download`

Example:

{
  name: "Your Next App",
  category: "tools",
  categoryLabel: "Tool",
  version: "v1.0",
  badge: "New",
  description: "Your real app description.",
  features: ["Feature 1", "Feature 2"],
  icon: "assets/icons/your-app.svg",
  download: "YOUR-REAL-DOWNLOAD-LINK"
}

Only use real app information and real download links.
