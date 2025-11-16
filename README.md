# walkthrough-kit

Generate interactive code walkthroughs from markdown.

📚 **[View Documentation Site](https://caseyrfsmith.github.io/walkthrough-kit/)** (TODO: Update URL after deploying)

## What is this?

A CLI tool that transforms documentation into interactive code walkthroughs. You write markdown (or freeform text), and the CLI generates:
1. A complete React component library (that you own and customize)
2. JSON data files for each walkthrough

**This is a starter kit, not a maintained product.** After you generate it, the code is yours to modify, extend, and maintain however you want.

## Status

**Core features working**

- Parser: Converts markdown to structured JSON with flexible heading support
- CLI: `walkthrough create` command generates walkthrough data
- React component: Full-featured walkthrough UI with custom syntax highlighting
- Demo: Working Vite demo showing the component in action
- Init command: Coming soon (generates component library for users)
- AI mode: Coming soon (extract structure from freeform text)

## Quick start

### 1. Install dependencies
```bash
pnpm install
```

### 2. Build all packages
```bash
pnpm build
```

### 3. Create a walkthrough from markdown
```bash
node packages/cli/dist/index.js create examples/basic-guide.md
```

This generates `examples/basic-guide.json`!

### 4. See it in action
```bash
cd demo
npm install
npm run dev
```

Open your browser to see the interactive walkthrough component.

## Architecture

```
walkthrough-kit/
├── packages/
│   ├── parser/               # Parse markdown to JSON
│   ├── component-templates/  # React component library
│   └── cli/                  # CLI tool
├── examples/                 # Example markdown files
├── demo/                     # Vite demo app
└── docs/                     # Documentation
```

## Features

### Parser
- Flexible heading support (any `##` heading becomes a step)
- Strips common prefixes ("Step 1:", "1.", "1)")
- Optional code blocks (steps can exist without code)
- Inline code in descriptions (backticks)
- Highlight line syntax (`javascript:1-3,5`)
- YAML frontmatter (title, time, difficulty)

### React component
- Syntax highlighting for 7 languages (JS, TS, Python, Bash, HTML, CSS, JSON)
- Custom lexer (zero external dependencies)
- Line highlighting
- Copy code button
- Step navigation (prev/next buttons, dot indicators)
- Deep linking (URL hash support: `#step-2`)
- Responsive design
- Dark/light themes
- Customizable via CSS variables

## Commands

```bash
# Create walkthrough from markdown (working!)
walkthrough create guide.md

# Generate component library (coming soon)
walkthrough init

# Create walkthrough from freeform text with AI (coming soon)
walkthrough create notes.txt --ai

# Validate JSON structure (coming soon)
walkthrough validate guide.json
```

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Test the parser
cd packages/parser
node test/manual-test.js

# Test the CLI
node packages/cli/dist/index.js create examples/basic-guide.md

# Run the demo
cd demo
npm run dev
```

## Example markdown

````markdown
---
title: Quick Start Guide
estimatedTime: 5 minutes
difficulty: beginner
---

## Install the SDK

Install the package from your preferred package manager.

```bash
npm install @mycompany/sdk
```

## Initialize the client

Import and configure the client with your API key.

```javascript:1-4
import { Client } from '@mycompany/sdk';

const client = new Client({
  apiKey: process.env.API_KEY
});
```

This creates a client instance for all API calls.
````

## Project goals

- Zero-dependency syntax highlighting
- Works in restricted environments (Mintlify, Fern)
- Users own the generated code
- Extensible (custom languages, themes)
- Beautiful CLI experience
- AI-powered extraction from freeform text

## License

MIT