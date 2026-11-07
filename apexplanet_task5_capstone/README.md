# ApexPlanet Task 5 — TechNest Capstone

Responsive front-end e-commerce storefront built with HTML, CSS and vanilla JavaScript.

## Run
Open `index.html` in a modern browser. No installation, build step, server or backend is required.

## Features
- Responsive desktop, tablet and mobile storefront
- JavaScript-rendered product catalogue
- Product search, category filtering and sorting by rating, price or name
- Add-to-cart, quantity controls and remove item
- Cart persistence with localStorage
- Subtotal, delivery estimate and total calculation
- Demo checkout modal (no payment or order processing)
- Newsletter form validation and demo confirmation
- Local SVG product illustrations with `loading="lazy"` and `decoding="async"`
- Deferred JavaScript, reduced-motion support, accessible labels and live status regions

## Structure
- `index.html` — storefront structure
- `css/style.min.css` — compact stylesheet
- `js/app.js` — product catalogue, filtering, cart and interactions
- `images/` — local SVG illustrations

## Optimization choices
No JavaScript libraries, local SVG assets, lazy image loading, deferred JavaScript, one CSS and one JS file, responsive styles and reduced-motion support.

## Manual browser/device test checklist
Test in Chrome, Firefox, Safari (if available), and a mobile browser:
1. Check page layout and navigation.
2. Resize to tablet and phone widths; check horizontal overflow.
3. Search products, switch categories and try every sort option.
4. Add products, change quantities, remove items and refresh to verify cart persistence.
5. Verify subtotal, delivery threshold and total.
6. Open demo checkout; verify no payment details are requested.
7. Submit valid and invalid newsletter email values.
8. Press Escape to close overlays.
9. Check browser console for errors.

This checklist is for manual verification; only report browsers/devices as tested after you personally test them. This is a front-end demo and does not process real orders, payments or subscriptions.
