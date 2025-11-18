# Getting started

Getting started with Walkthrough Kit is easy. Try out the walkthrough component here, or use the written instructions in [Installation](#installation).

<script setup>
import WalkthroughWrapper from '../.vitepress/theme/components/WalkthroughWrapper.vue'
import steps from './getting-started.json'
</script>

<WalkthroughWrapper 
  :steps="steps.steps" 
  description-height="2rem"
  min-height="600px"
/>


## Installation

### 1. Clone the repository

Currently, walkthrough-kit is a starter kit. Clone the repository:

```bash
git clone https://github.com/caseyrfsmith/walkthrough-kit.git
cd walkthrough-kit
```

### 2. Install dependencies

This is a monorepo managed with pnpm:

```bash
pnpm install
```

### 3. Build all packages

```bash
pnpm build
```

This compiles the CLI, parser, and component packages.

### 4. Initialize in your project (optional)

You can copy the component library to your own project:

```bash
node packages/cli/dist/index.js init
```

This will prompt you for directories and copy the component files.

### 5. Test the CLI

```bash
node packages/cli/dist/index.js create examples/basic-guide.md
```

This generates `examples/basic-guide.json`

### 6. Run the demo

```bash
cd demo
npm install
npm run dev
```

Open your browser to see the interactive walkthrough component.

## Requirements

- **Node.js:** 18.0.0 or higher
- **Package manager:** pnpm 8.10.0 or higher
- **React:** 18 or higher (peer dependency for component)

## Quick example

Create a simple walkthrough:

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

Generate the JSON:

```bash
# Default: creates guide.json in the same directory
walkthrough create guide.md

# Or specify custom output path
walkthrough create guide.md -o dist/guide.json
```

Use in React:

```tsx
import { Walkthrough } from '@walkthrough-kit/component-templates';
import steps from './guide.json';

export function MyWalkthrough() {
  return <Walkthrough steps={steps} />;
}
```

## AI mode (optional)

Want to convert existing documentation without formatting it as structured markdown? Use AI mode, which uses the Claude API:

```bash
# Set your Anthropic API key (or add it to your .env file)
export ANTHROPIC_API_KEY=your-key-here

# Convert any text file to a walkthrough
walkthrough create your-notes.txt --ai
```

The AI will analyze your content and automatically:
- Identify logical steps in your documentation
- Extract code blocks and detect languages
- Generate step titles and descriptions
- Create a properly structured walkthrough JSON

Example input (freeform text):

```text
To get started with our API, first install the SDK using npm.
Run: npm install @mycompany/sdk

Then you need to initialize the client. Import the Client class
and create an instance with your API key from the dashboard.

import { Client } from '@mycompany/sdk';
const client = new Client({ apiKey: process.env.API_KEY });

Now you can make API calls using the client...
```

The AI converts this into a structured walkthrough with clear steps, extracted code blocks, and proper formatting.

AI mode is great for quickly converting existing READMEs or documentation, processing unstructured notes into walkthroughs, and quick prototyping.

## Next steps

- [CLI commands](/guide/cli) - Learn all available commands
- [Markdown syntax](/guide/markdown) - Master the markdown format
- [React component](/guide/component) - Use the component in your app
