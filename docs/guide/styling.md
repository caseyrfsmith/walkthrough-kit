# Styling

The Walkthrough Kit component includes basic styles, but you own the code and we encourage you to edit the styling to match your project. You can edit the CSS directly in In `packages/component-templates/src/Walkthrough.css`.

## CSS variables

Override these variables to customize the component appearance:

```css
:root {
  /* Colors */
  --walkthrough-primary: #0066cc;
  --walkthrough-bg: #ffffff;
  --walkthrough-text: #1a1a1a;
  --walkthrough-border: #e0e0e0;
  --walkthrough-code-bg: #1e1e1e;
  --walkthrough-code-text: #d4d4d4;
  --walkthrough-highlight-bg: rgba(66, 150, 255, 0.15);

  /* Spacing */
  --walkthrough-padding: 1.5rem;
  --walkthrough-gap: 1rem;

  /* Border radius */
  --walkthrough-radius: 8px;

  /* Fonts */
  --walkthrough-font-family: inherit;
  --walkthrough-code-font: 'Monaco', 'Courier New', monospace;
}
```

## Example: custom theme

```css
.my-walkthrough {
  --walkthrough-primary: #ff6b6b;
  --walkthrough-code-bg: #0d1117;
  --walkthrough-code-font: 'Fira Code', monospace;
  --walkthrough-padding: 2rem;
  --walkthrough-radius: 12px;
}
```

## CSS classes

Target specific elements with these classes:

```css
.walkthrough                    /* Main container */
.walkthrough__header            /* Step header */
.walkthrough__step-number       /* Step number badge */
.walkthrough__title             /* Step title */
.walkthrough__description       /* Step description */
.walkthrough__code-block        /* Code container */
.walkthrough__code-header       /* Language & copy button */
.walkthrough__code              /* Code content */
.walkthrough__code-line         /* Individual line */
.walkthrough__code-line--highlighted  /* Highlighted line */
.walkthrough__line-number       /* Line number */
.walkthrough__navigation        /* Navigation area */
.walkthrough__dots              /* Dot indicators */
```

## Override styles

You own the code! Edit the CSS directly:

```css
/* In Walkthrough.css */
.walkthrough__code-line--highlighted {
  background: linear-gradient(90deg,
    rgba(255, 107, 107, 0.2),
    rgba(255, 107, 107, 0.05)
  );
  border-left: 3px solid #ff6b6b;
}
```

## Dark mode support

The component automatically detects system preferences:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --walkthrough-bg: #1a1a1a;
    --walkthrough-text: #ffffff;
    --walkthrough-border: #333333;
  }
}
```

You can also set the theme explicitly via the `theme` prop:

```tsx
<Walkthrough steps={steps} theme="dark" />
```
