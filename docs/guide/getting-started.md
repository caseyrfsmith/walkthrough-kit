# Getting started

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

### 4. Test the CLI

```bash
node packages/cli/dist/index.js create examples/basic-guide.md
```

This generates `examples/basic-guide.json`

### 5. Run the demo

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
walkthrough create guide.md
```

Use in React:

```tsx
import { Walkthrough } from '@walkthrough-kit/component-templates';
import steps from './guide.json';

export function MyWalkthrough() {
  return <Walkthrough steps={steps} />;
}
```

## Next steps

- [CLI commands](/guide/cli) - Learn all available commands
- [Markdown syntax](/guide/markdown) - Master the markdown format
- [React component](/guide/component) - Use the component in your app
