# Walkthrough Kit Documentation

VitePress-based documentation site with separate markdown files.

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Structure

```
docs/
├── .vitepress/
│   ├── config.ts          # VitePress configuration
│   └── dist/             # Build output
├── guide/
│   ├── index.md          # What is Walkthrough Kit?
│   ├── getting-started.md
│   ├── cli.md
│   ├── markdown.md
│   ├── component.md
│   ├── styling.md
│   ├── custom-languages.md
│   └── examples.md
└── index.md              # Home page
```

## Editing documentation

All documentation is written in markdown. Simply edit the `.md` files in the `guide/` directory.

VitePress supports:
- GitHub-flavored markdown
- Frontmatter
- Code syntax highlighting
- Custom containers (`::: warning`, `::: tip`, etc.)
- Tables
- Emojis

See the [VitePress markdown reference](https://vitepress.dev/guide/markdown) for more features.

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch via GitHub Actions.

## Configuration

Edit `.vitepress/config.ts` to customize:
- Site title and description
- Navigation menu
- Sidebar structure
- Theme options
- Social links
