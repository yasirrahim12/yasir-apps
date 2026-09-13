# Yasir Apps — Pro GitHub Pages Store

## Root structure

Keep these files at the repository root:

- `index.html`
- `style.css`
- `script.js`
- `site.webmanifest`
- `robots.txt`
- `sitemap.xml`
- `404.html` (optional fallback page)
- `assets/favicon.png`
- `assets/og-image.png`
- `assets/icons/yasir-capcut.svg`
- `assets/icons/yasir-game-hub.png`

## Add future apps

Open `script.js` and add a new object inside `APPS`.

Example:

{
  name: "Your App",
  category: "tools",
  categoryLabel: "Tool",
  platform: "Android",
  version: "v1.0",
  badge: "New",
  description: "A real description of the app.",
  features: ["Feature 1", "Feature 2"],
  icon: "assets/icons/your-app.png",
  download: "https://example.com/real.apk"
}

The interface automatically handles cards, search, filtering, sorting, details, stats, and download buttons.

## SEO

The project includes:
- canonical URL
- title and meta description
- robots directives
- Google Search Console verification tag
- Open Graph and Twitter metadata
- stable PNG favicon at `assets/favicon.png`
- `robots.txt`
- `sitemap.xml`
- WebSite / Organization / Person / ItemList JSON-LD
- semantic headings and crawlable fallback text
- social sharing preview image

## GitHub Pages

Upload the contents of this folder to the root of the repository, then use GitHub Pages with the `main` branch as the source if that is how your repository is configured.

Site:
https://yasirrahim12.github.io/yasir-apps/

Important: do not add fake ratings, fake download numbers, fake reviews, or unsupported claims. Add only real app information and real release links.
