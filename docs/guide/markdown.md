# Markdown syntax

You can use a markdown file to create walkthroughs without AI. This guide walks through how to format the markdown files for different kinds of walkthroughs.

See the [`examples/`](https://github.com/caseyrfsmith/walkthrough-kit/tree/main/examples) directory in the walkthrough-kit repo for several markdown examples.

## YAML frontmatter

Add metadata at the top of your markdown file:

```yaml
---
title: Quick Start Guide
estimatedTime: 5 minutes
difficulty: beginner          # Options: beginner, intermediate, advanced.
mode: unified                 # Options: separate, unified (default: separate). Unified mode shows one unchanging code block and each step can highlight different parts of the code. 
description: Optional description text
---
```

Only `title` is required. If you're code-inclined, you can also extend the `WalkthroughMetadata` interface to accomodate any information you need to include.

## Steps

Any `## Heading` (level 2) becomes a step:

````markdown
## Install the SDK

Description of this step goes here.

```bash
npm install @mycompany/sdk
```
````

### Step title prefixes

These are automatically stripped from titles:

- `Step 1:`, `Step 2:`, etc.
- `1.`, `2.`, `3.`, etc.
- `1)`, `2)`, `3)`, etc.

If you don't want this, modify `markdown-parser.ts` to remove it.

## Code blocks

Code blocks are optional. If included, specify the language:

````markdown
```javascript
const client = new Client();
```
````

### Line highlighting

Highlight specific lines using the colon syntax:

````markdown
```javascript:1-4
import { Client } from '@sdk';

const client = new Client({
  apiKey: process.env.API_KEY
});
```
````

Highlight syntax options:
- `language:1` - single line
- `language:1-4` - range
- `language:1-3,5` - multiple ranges
- `language:1,3,5-7` - mixed

### Supported languages

- `javascript`
- `typescript`
- `python`
- `bash`
- `html`
- `css`
- `json`

## Unified code mode

Show one code block across all steps, highlighting different lines:

````markdown
---
title: Python Class Tutorial
mode: unified
---

```python
class User:
    def __init__(self, name):
        self.name = name
    def greet(self):
        print(f"Hello {self.name}")
```

## Define the class
highlight: 1

## Add constructor
highlight: 2-3

## Add method
highlight: 4-5
````

## Notes

Add additional context after code blocks:

````markdown
```javascript
const client = new Client();
```

This creates a client instance that you'll use for all API calls.
````

## Inline code

Use backticks for inline code references:

```markdown
Call the `initialize()` method to set up the client.
```
