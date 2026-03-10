---
name: create-story
description: Guide for creating Storybook stories for Ion Design System components
---

# Create a Storybook Story

Follow this guide to create a Storybook story for an Ion component.

## 1. Identify the component

Read the component's `.component.ts` to understand all inputs, outputs, and variants.

## 2. Create the story file

Create `projects/ion/src/stories/<component-name>.stories.ts`:

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { Ion<ComponentName>Component } from '../lib/<component-name>/<component-name>.component';

const meta: Meta<Ion<ComponentName>Component> = {
  title: 'Components/<ComponentName>',
  component: Ion<ComponentName>Component,
  tags: ['autodocs'],
  argTypes: {
    // Map outputs to Storybook actions
    ionOnClick: { action: 'clicked' },
    // Configure controls for specific inputs
    type: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'dashed'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
```

## 3. Add story variants

Create a story for each meaningful state of the component:

```typescript
export const Default: StoryObj<Ion<ComponentName>Component> = {
  args: {
    label: 'Default Button',
    type: 'primary',
    size: 'md',
  },
};

export const Disabled: StoryObj<Ion<ComponentName>Component> = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};

export const Loading: StoryObj<Ion<ComponentName>Component> = {
  args: {
    label: 'Loading...',
    loading: true,
  },
};
```

## 4. Components with service dependencies

If the component requires a service, provide it via `applicationConfig`:

```typescript
import { MyService } from '../lib/my/my.service';

const meta: Meta<IonMyComponent> = {
  // ...
  render: (args) => ({
    props: args,
    applicationConfig: {
      providers: [MyService],
    },
  }),
};
```

## 5. Test the story

```bash
npm run storybook
```

Navigate to `http://localhost:6006` and verify the component renders correctly in all story variants.
