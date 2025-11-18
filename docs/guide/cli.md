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

- `-o, --output <path>` - specify custom output file path (default: input filename with .json extension)
- `--ai` - use AI to extract structure from freeform text (requires Anthropic API key)
- `--api-key <key>` - provide Anthropic API key (alternative to ANTHROPIC_API_KEY env var)

### Examples

#### Basic usage

```bash
# Parse markdown file
walkthrough create guide.md
# Creates guide.json in the same directory

# Parse with relative path
walkthrough create examples/api-guide.md
# Output: examples/api-guide.json

# Specify custom output path
walkthrough create guide.md -o dist/my-walkthrough.json
# Output: dist/my-walkthrough.json

# Custom output with absolute path
walkthrough create guide.md --output /path/to/output.json
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

# Combine AI mode with custom output
walkthrough create notes.txt --ai -o output/structured-guide.json
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

Copy the Walkthrough component library into your project.

```bash
walkthrough init
```

### What it does

The init command sets up walkthrough-kit in your project by:

1. **Prompting for directories**
   - Where to put the component files (default: `src/components/walkthrough`)
   - Where to store walkthrough data (default: `src/data`)
   - Whether to create an example walkthrough

2. **Copying component files**
   - `Walkthrough.tsx` - Main React component
   - `Walkthrough.css` - Styles
   - `types.ts` - TypeScript types
   - `hooks/` - Custom hooks (step navigation)
   - `lexer/` - Syntax highlighting engine

3. **Creating an example** (optional)
   - Generates `example-walkthrough.md` in your data directory
   - Shows you the command to convert it to JSON

### Example usage

```bash
# Run the init command
walkthrough init

# Follow the prompts:
# ✔ Where should we put the component? … src/components/walkthrough
# ✔ Where should walkthrough data go? … src/data
# ✔ Create an example walkthrough? … yes

# ✓ Component files copied
# ✓ Example created at src/data/example-walkthrough.md
```

After running init, you'll have:

```
your-project/
├── src/
│   ├── components/
│   │   └── walkthrough/
│   │       ├── Walkthrough.tsx
│   │       ├── Walkthrough.css
│   │       ├── types.ts
│   │       ├── index.ts
│   │       ├── hooks/
│   │       └── lexer/
│   └── data/
│       └── example-walkthrough.md
```

### Next steps after init

1. Generate JSON from your markdown:
   ```bash
   walkthrough create src/data/example-walkthrough.md
   ```

2. Import and use the component:
   ```tsx
   import { Walkthrough } from './components/walkthrough';
   import steps from './data/example-walkthrough.json';

   export function MyPage() {
     return <Walkthrough steps={steps} />;
   }
   ```

::: tip You own the code!
The component files are copied into your project, not installed as a dependency. You can customize them however you want - modify styles, add features, or adjust the lexer.
:::

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
