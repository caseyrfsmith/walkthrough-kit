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

- `--ai` - use AI to extract structure from freeform text (requires Anthropic API key)
- `--api-key <key>` - provide Anthropic API key (alternative to ANTHROPIC_API_KEY env var)

### Examples

#### Basic usage

```bash
# Parse markdown file
walkthrough create guide.md

# Creates guide.json in the same directory
walkthrough create examples/api-guide.md
# Output: examples/api-guide.json
```

#### AI mode

Use the Claude API to extract walkthrough structure from freeform text or unstructured documentation:

```bash
# Using environment variable
export ANTHROPIC_API_KEY=your-key-here
walkthrough create notes.txt --ai

# Using command line option
walkthrough create notes.txt --ai --api-key your-key-here

# Works with markdown files too
walkthrough create unstructured-doc.md --ai
```

The AI mode will:
- Analyze the content and identify logical steps
- Extract code blocks with correct language detection
- Generate titles and descriptions for each step
- Determine if the walkthrough should use separate or unified mode
- Create properly structured JSON output

AI mode is perfect for converting existing documentation, README files, or freeform notes into interactive walkthroughs without manually formatting them.

::: warning Review AI output
AI-generated content should be reviewed for accuracy. The CLI will display a warning after generation.
:::


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
