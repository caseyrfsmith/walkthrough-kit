# What is Walkthrough Kit?

Walkthrough Kit is CLI tool that transforms your documentation into interactive code walkthroughs, with optional AI features. It's designed for technical writers who need to create dependency-free components for their documenation site. 

You write markdown (or freeform text), and the CLI generates:

1. A complete React component library (that you own and customize)
2. JSON data files for each walkthrough

All you have to do is add the component to your site

::: note
This is a starter kit, not a maintained product. Once generated, the code is yours to modify, extend, and maintain however you want.
:::

## Features

### Markdown parser

The markdown parser turns your tutorial steps into JSON file that's ready to drop into the Walkthrough Kit component. It's got some rad features:

- Flexible heading support (any `##` heading becomes a step)
- YAML frontmatter for metadata
- Line highlighting syntax (`javascript:1-3,5`)
- Separate and unified code modes
- Optional code blocks

### React component

The React component is ready to add to your site. You add the component code once, and then use it over and over again with your walkthrough kit JSON files. The component has some special features of its own:

- Zero external dependencies (so you can use it with tools like Mintlify and Fern!)
- Custom syntax highlighting for 7 languages
- Dark/light themes with auto-detection
- Deep linking support (`#step-2`)
- Keyboard navigation
- Copy code button
- Responsive design

### Customization

Although the default styles are nice, you can (and should!) customize the component to meet your own needs. You can update [CSS](styling.md), [add custom languages](custom-languages.md) to the built-in lexer

- CSS variables for theming
- Override any styles
- Add custom languages
- Extend token types
- You own the code

## Architecture

Walkthrough-kit is a monorepo that contains lots of resources.

```
walkthrough-kit/
├── packages/
│   ├── parser/               # Markdown → JSON parser
│   ├── component-templates/  # React component library
│   └── cli/                  # CLI tool
├── examples/                 # Example markdown files
├── demo/                     # Vite demo app
└── docs/                     # Documentation site
```

## How it works

1. Write your documentation in markdown with special syntax (coming soon: or use AI to transform free-form text into walkthroughs)
2. Run the CLI to generate JSON data files
3. Use the React component to render interactive walkthroughs
4. Add the React component to your site
5. Customize the component and styles to match your needs

## Next steps

- [Getting started](/guide/getting-started) - Install and try it out
- [CLI commands](/guide/cli) - Learn the CLI commands
- [Markdown syntax](/guide/markdown) - Write your first walkthrough
