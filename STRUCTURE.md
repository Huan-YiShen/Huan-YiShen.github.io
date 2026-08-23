# Project Structure

portfolio has been organized into folders by file type for easy maintenance:

```
Huan-YiShen.github.io/
├── index.html                 # Entry point (redirects to page_intro.html)
├── page_intro.html            # Introduction/About page
├── page_projects.html         # Projects showcase
├── page_cv.html               # Curriculum Vitae
├── README.md                  # Project documentation
├── STRUCTURE.md               # This file
├── _config.yml                # GitHub Pages config
│
├── styles/                    # Stylesheets
│   ├── styles.css             # Stylesheet entrypoint
│   ├── variables.css          # Theme tokens and color variables
│   ├── base.css               # Global reset, typography, and defaults
│   ├── layout.css             # Page shell, header, and major layouts
│   ├── components.css         # Navigation, cards, timelines, and controls
│   ├── construction.css       # Projects construction-state animation
│   └── responsive.css          # Responsive layout adjustments
│
├── js/                        # JavaScript files
│   ├── content-loader.js      # Dynamic content loader
│   ├── construction-animation.js # Projects construction-state behavior
│   └── theme-settings.js      # Theme management (light/dark mode)
│
└── json/                      # Content data files
    ├── site.json              # Site metadata (name, navigation)
    ├── intro.json             # Intro page content
    ├── projects.json          # Projects data
    └── cv.json                # CV/Experience data
```

## How to Edit Content

**Edit content without touching HTML/CSS** by modifying JSON files:

- **Intro page**: Edit `json/intro.json`
- **Projects**: Edit `json/projects.json`
- **CV/Experience**: Edit `json/cv.json`
- **Site settings**: Edit `json/site.json`

The `content-loader.js` script automatically loads content from these JSON files into the HTML templates.

## File Purpose Reference

| Location | Purpose |
|----------|---------|
| Root `.html` files | HTML templates for each page (structure only) |
| `styles/` | Modular CSS files imported by `styles/styles.css` |
| `js/` | JavaScript modules for functionality |
| `json/` | Content data - edit these to update page content |

## Navigation

All pages at root level link to each other:
- `page_intro.html` → uses `href="page_projects.html"` (same level)
- CSS/JS loaded using relative paths: `href="styles/styles.css"` and `src="js/..."`
- Content fetched from: `fetch('json/[pageName].json')`

This structure is meant for GitHub Pages deployment.

## Theme System

- Light/Dark mode toggle in Settings menu
- Theme preference saved to browser localStorage
- Uses system preference as fallback
- CSS custom properties in `styles/variables.css` for colors
