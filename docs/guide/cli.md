# CLI commands

#TODO: Intro text, add features once fully implemented

## walkthrough create

Generate a walkthrough JSON file from markdown.

```bash
walkthrough create <input> [options]
```

### Arguments

- `<input>` - path to markdown file (relative or absolute)

### Options

- `--ai` - use AI to extract structure from freeform text (coming soon)

### Examples

```bash
# Basic usage
walkthrough create guide.md

# Creates guide.json in the same directory
walkthrough create examples/api-guide.md
# Output: examples/api-guide.json
```

## walkthrough init

::: warning Coming soon
This command is not yet implemented.
:::

Generate the React component library in your project.

```bash
walkthrough init [directory]
```

### What it will do

- Copy component files to your project
- Install necessary dependencies
- Generate example usage code

## walkthrough validate

::: warning Coming soon
This command is not yet implemented.
:::

Validate JSON structure against the schema.

```bash
walkthrough validate <file>
```

## Direct usage (development)

While developing, use the CLI directly from the built package:

```bash
node packages/cli/dist/index.js create your-guide.md
```
