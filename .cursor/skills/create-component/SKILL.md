---
name: create-component
description: Step-by-step guide to create a new Ion Design System component with all required files
---

# Create a New Ion Component

Follow these steps to scaffold a new component in the Ion Design System library.

## 1. Determine the component name

Ask the user for the component name if not provided. The name should be lowercase and hyphenated (e.g. `progress-bar`, `date-input`).

## 2. Create the component directory

Create the directory at `projects/ion/src/lib/<component-name>/`.

## 3. Create the component TypeScript file

Create `<component-name>.component.ts`:

```typescript
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'ion-<component-name>',
  imports: [],
  templateUrl: './<component-name>.component.html',
  styleUrls: ['./<component-name>.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ion<ComponentName>Component {
  // Define inputs using signal-based input()
  // label = input<string>();

  // Define outputs using output()
  // ionOnClick = output<void>();
}
```

**Remember:**

- Set `changeDetection: ChangeDetectionStrategy.OnPush`
- Use `host: {}` instead of `@HostBinding`/`@HostListener`

## 4. Create the template file

Create `<component-name>.component.html`:

```html
<!-- Use native control flow: @if, @for, @switch -->
<!-- Use [class.name] instead of ngClass -->
<!-- Use [attr.data-testid] for test selectors -->
```

## 5. Create the SCSS file

Create `<component-name>.component.scss`:

```scss
// Import shared design tokens as needed
// @use '../../styles/colors/colors' as colors;

:host {
  display: block;
}
```

## 6. Create the test file

Create `<component-name>.component.spec.ts`:

## 7. Create the type definitions

If the component uses custom types, create `projects/ion/src/lib/core/types/<component-name>.ts`:

```typescript
export interface <ComponentName>Config {
  // Define component-specific types here
}
```

And export from `projects/ion/src/lib/core/types/index.ts`.

## 8. Export from public API

Add the export to `projects/ion/src/public-api.ts`:

```typescript
export * from './lib/<component-name>/<component-name>.component';
```

## 9. Verify

Run the following commands to validate:

```bash
npm test -- --testPathPattern=<component-name>
npm run build
```

## 10. (Optional) Create a Storybook story

Create `projects/ion/src/stories/<component-name>.stories.ts`:

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { Ion<ComponentName>Component } from '../lib/<component-name>/<component-name>.component';

const meta: Meta<Ion<ComponentName>Component> = {
  title: 'Components/<ComponentName>',
  component: Ion<ComponentName>Component,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<Ion<ComponentName>Component> = {
  args: {
    // Set default args
  },
};
```
