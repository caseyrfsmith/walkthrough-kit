# React component

The Walkthrough component is a zero-dependency React component for creating interactive step-by-step code tutorials. It features automatic syntax highlighting for 7 languages, keyboard navigation with arrow keys, and automatic dark/light mode detection based on system preferences.

The component is fully responsive and accessible, with built-in support for line highlighting, copy-to-clipboard functionality, and deep linking via URL hashes. Navigate between steps using previous/next buttons, clickable dot indicators, or keyboard shortcuts. The component works equally well on desktop and mobile devices with touch-friendly controls and flexible layouts.

## Basic usage

```tsx
import { Walkthrough } from '@walkthrough-kit/component-templates';
import steps from './walkthrough.json';

export function MyWalkthrough() {
  return <Walkthrough steps={steps} />;
}
```

## Props

The Walkthrough component accepts the following props to customize its behavior and appearance.

### Required props

| Prop | Type | Description |
|------|------|-------------|
| `steps` | `Step[]` | Array of step objects containing the walkthrough content |

### Optional props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialStep` | `number` | `0` | Starting step index (zero-based) |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Color theme. `'auto'` detects system preference |
| `onStepChange` | `(index: number) => void` | - | Callback fired when user navigates to a different step |
| `className` | `string` | - | Additional CSS class names for custom styling |
| `unifiedCode` | `UnifiedCodeBlock` | - | Shared code block for unified mode. Omit for separate mode |
| `minHeight` | `string` | - | Minimum container height (Examples: `'600px'`, `'50vh'`) |
| `descriptionHeight` | `string` | - | Fixed height for description area (Examples: `'200px'`, `'2rem'`) |

**Examples:**

```tsx
// Minimal - only required prop
<Walkthrough steps={steps} />

// With theme
<Walkthrough steps={steps} theme="dark" />

// With custom dimensions
<Walkthrough
  steps={steps}
  minHeight="800px"
  descriptionHeight="150px"
/>

// Full configuration
<Walkthrough
  steps={steps}
  initialStep={2}
  theme="auto"
  onStepChange={(index) => console.log(`Step ${index + 1}`)}
  className="custom-walkthrough"
  minHeight="600px"
/>
```

## Advanced usage

### Custom styling and layout

Use `className` to apply custom styles, and control dimensions with `minHeight` and `descriptionHeight`:

```tsx
<Walkthrough
  steps={steps}
  className="my-walkthrough"
  minHeight="600px"
  descriptionHeight="150px"
/>
```

### Tracking step changes

The `onStepChange` callback fires every time a user navigates to a different step (via next/previous buttons, keyboard arrows, or clicking step indicators). Use it to track user behavior, update URLs, or trigger other actions.

Common use cases for this are: 

- Track which steps users view and how long they spend on each
- Identify where users drop off in your tutorial
- A/B test different walkthrough approaches
- Sync step state with your application's URL or routing

```tsx
import { Walkthrough } from '@walkthrough-kit/component-templates';
import walkthroughData from './walkthrough.json';

export function TrackedWalkthrough() {
  const handleStepChange = (stepIndex: number) => {
    // Track with analytics tools like Segment, Mixpanel, PostHog, etc.
    // The stepIndex is zero-based, so add 1 for human-readable numbers
    analytics.track('walkthrough_step_viewed', {
      step: stepIndex + 1,
      title: walkthroughData.steps[stepIndex].title,
      walkthrough_name: 'Quick Start Guide'
    });

    // Update URL so users can bookmark or share specific steps
    window.location.hash = `step-${stepIndex + 1}`;
  };

  return (
    <Walkthrough
      steps={walkthroughData.steps}
      onStepChange={handleStepChange}
    />
  );
}
```

**Analytics integration examples:**

```tsx
// Segment
analytics.track('walkthrough_step_viewed', { step: stepIndex + 1 });

// Google Analytics (gtag)
gtag('event', 'walkthrough_step_viewed', { step: stepIndex + 1 });

// Mixpanel
mixpanel.track('Walkthrough Step Viewed', { step: stepIndex + 1 });

// PostHog
posthog.capture('walkthrough_step_viewed', { step: stepIndex + 1 });
```

### Starting at a specific step

Use `initialStep` to deep link or resume from a saved position:

```tsx
export function ResumableWalkthrough() {
  // Read from URL hash or localStorage
  const savedStep = parseInt(window.location.hash.replace('#step-', '')) - 1;
  const startStep = !isNaN(savedStep) ? savedStep : 0;

  return (
    <Walkthrough
      steps={steps}
      initialStep={startStep}
    />
  );
}
```

### Theme control

Override automatic theme detection to force a specific mode:

```tsx
<Walkthrough
  steps={steps}
  theme="dark"  // 'light' | 'dark' | 'auto'
/>
```

### Unified code mode

Display a single code block that updates across steps instead of separate code blocks:

```tsx
<Walkthrough
  steps={walkthroughData.steps}
  unifiedCode={walkthroughData.unifiedCode}
/>
```

This is useful for showing incremental changes to the same file.


## JSON data structure

```json
{
  "version": "1.0",
  "metadata": {
    "title": "Quick Start Guide",
    "estimatedTime": "5 minutes",
    "difficulty": "beginner",
    "mode": "separate"
  },
  "steps": [
    {
      "id": "step-1",
      "number": 1,
      "title": "Install the SDK",
      "description": "Install from your package manager.",
      "code": {
        "language": "bash",
        "content": "npm install @mycompany/sdk",
        "highlightLines": []
      }
    }
  ]
}
```

## TypeScript types

The component uses these TypeScript interfaces for type safety. These types match the JSON structure generated by the CLI.

### Step

Each step in the walkthrough:

```ts
interface Step {
  id: string                    // Unique identifier
  number: number                // Step number (1-indexed)
  title: string                 // Step heading
  description: string           // Step explanation
  code?: CodeBlock              // Optional code block
  notes?: string                // Optional additional notes
  highlightLines?: number[]     // Lines to highlight (unified mode only)
}
```

**Note:** In unified mode, use `highlightLines` on the step. In separate mode, use `highlightLines` in the `CodeBlock`.

### CodeBlock

Code displayed for a step (separate mode):

```ts
interface CodeBlock {
  language: string              // Language for syntax highlighting
  content: string               // Raw code content
  highlightLines: number[]      // Array of line numbers to highlight
}
```

### UnifiedCodeBlock

Shared code block across all steps (unified mode):

```ts
interface UnifiedCodeBlock {
  language: string              // Language for syntax highlighting
  content: string               // Complete file content
}
```

In unified mode, pass this to the `unifiedCode` prop and use `highlightLines` on each step to show which lines are relevant.
