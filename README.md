# walkthrough-kit

Generate interactive code walkthroughs from markdown.

## What is this?

A CLI tool that transforms documentation into interactive code walkthroughs. You write markdown (or freeform text), and the CLI generates:
1. A complete React component library (that you own and customize)
2. JSON data files for each walkthrough

**This is a starter kit, not a maintained product.** Once generated, the code is yours to modify, extend, and maintain however you want.

## Status

🚧 **Work in Progress** - Currently setting up the foundation.

## Architecture

```
walkthrough-kit/
├── packages/
│   ├── parser/          # Parse markdown → JSON
│   ├── component-templates/  # React component library
│   └── cli/             # CLI tool
```

## Planned Commands

```bash
# Generate component library
walkthrough init

# Create walkthrough from markdown
walkthrough create guide.md

# Create walkthrough from freeform text (AI mode)
walkthrough create notes.txt --ai

# Validate JSON structure
walkthrough validate guide.json
```

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```

## License

MIT
