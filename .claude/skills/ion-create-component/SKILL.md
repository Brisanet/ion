---
name: ion-create-component
description: Guides creating new components for the Ion Design System. Use this skill whenever the user asks to create, add, or build a new Ion component, new DS component, or new design system component. This skill MUST be used even if the user just says "create a component" or "add a new component" without being explicit — if the context is the Ion repo, always invoke this skill. It enforces that existing Ion components are reused inside new ones instead of native HTML elements.
version: 1.0.0
---

# Ion Design System — Creating New Components

This skill guides the full process of creating a new component for the Ion Design System. The most important rule is: **always use existing Ion components in your templates instead of native HTML elements when an Ion alternative exists.**

---

## Step 0 — Understand the requirement

Before writing any code, clarify:
- What does this component do?
- What are its inputs (configuration)? What events does it emit?
- Does a similar or overlapping component already exist in the DS? If so, consider extending or composing it instead.

Check `projects/ion/src/lib/` for existing components and `public-api.ts` for the full public API.

---

## Step 1 — Map UI elements to existing Ion components

This is the most critical step. For every piece of UI the new component needs to render, ask: **does an Ion component already exist for this?**

### Native HTML → Ion Component mapping

| Instead of this... | Use this Ion component |
|---|---|
| `<input type="text">`, `<input type="number">`, `<input type="password">`, `<input type="url">`, `<input type="email">` | `<ion-input>` |
| `<textarea>` | `<ion-input-area>` |
| `<input type="number">` with stepper | `<ion-input-counter>` |
| `<button>`, `<a>` (as action) | `<ion-button>` |
| `<a>` (navigational link) | `<ion-link>` |
| `<select>` / `<option>` | `<ion-select>` |
| `<input type="checkbox">` | `<ion-checkbox>` |
| `<input type="radio">` | `<ion-radio>` / `<ion-radio-group>` |
| Icon (svg, img, font icon) | `<ion-icon>` |
| Loading indicator / spinner | `<ion-spinner>` |
| Tooltip on hover | `[ionTooltip]` directive |
| Popover | `[ionPopover]` directive |
| Confirm-before-action popup | `[ionPopConfirm]` directive |
| Status badge / counter bubble | `<ion-badge>` |
| Colored label / pill | `<ion-tag>` |
| Horizontal rule / visual separator | `<ion-divider>` |
| Skeleton / loading placeholder | `<ion-skeleton>` |
| Alert / inline message | `<ion-alert>` |
| Informational message block | `<ion-message>` |
| User avatar / initials circle | `<ion-avatar>` |
| Info icon with description | `<ion-info-badge>` |
| Breadcrumb trail | `<ion-breadcrumb>` |
| Step progress indicator | `<ion-step>` |
| Toggle / on-off switch | `<ion-switch>` |
| Chip / filter tag | `<ion-chip>` / `<ion-chip-group>` |
| Dropdown menu | `<ion-dropdown>` |
| Notification indicator | `<ion-indicator>` |

> **Rule:** If you find yourself writing a native `<input>`, `<button>`, `<select>`, or `<textarea>` in a template, stop and check this table first. The only exception is when the Ion component genuinely cannot cover the specific requirement — and in that case, leave a comment explaining why.

### Directives available (no extra markup needed)

- `IonTooltipDirective` — `[ionTooltip]="'text'"` on any element
- `IonPopoverDirective` — `[ionPopover]` for overlay panels
- `IonPopConfirmDirective` — `[ionPopConfirm]` for delete confirmations
- `IonMaskDirective` — `[ionMask]` for input masking

---

## Step 2 — Create the component files

Naming convention: `<name>.component.ts`, `<name>.component.html`, `<name>.component.scss`

Place the new component in `projects/ion/src/lib/<component-name>/`.

### TypeScript file template

```typescript
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
// Import the Ion components your template uses
import { IonButtonComponent } from '../button/button.component';
import { IonInputComponent } from '../input/input.component';
// ...

@Component({
  selector: 'ion-<name>',
  templateUrl: './<name>.component.html',
  styleUrls: ['./<name>.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonButtonComponent,
    IonInputComponent,
    // Every Ion component used in the template must be listed here
  ],
})
export class Ion<Name>Component {
  // Inputs using signal function (NOT @Input decorator)
  label = input<string>('');
  disabled = input<boolean>(false);

  // Outputs using output function (NOT @Output decorator)
  ionOnClick = output<void>();

  // Internal state via signal()
  private _value = signal<string>('');
  value = computed(() => this._value());
}
```

Key rules:
- No `standalone: true` — Angular v21 makes it the default
- Always `ChangeDetectionStrategy.OnPush`
- Always `input()` / `output()` — never `@Input()` / `@Output()`
- Always `inject()` for services — never constructor injection
- Every Ion component used in the template must appear in `imports: []`

### Template conventions

```html
<!-- Use @if / @for / @switch — NOT *ngIf / *ngFor -->
@if (disabled()) {
  <ion-icon type="lock"></ion-icon>
}

@for (item of items(); track item.id) {
  <ion-chip [label]="item.label"></ion-chip>
}

<!-- Use [class.name] — NOT ngClass -->
<div [class.active]="isActive()">

<!-- Always add data-testid for test targeting -->
<ion-button [attr.data-testid]="'btn-' + id()"></ion-button>
```

### SCSS conventions

```scss
// Reference the global design tokens — never hardcode colors, sizes, or shadows
@import '../../styles/index.scss'; // gives access to all tokens

.ion-<name> {
  // Use CSS variables from the theme
  background: var(--ion-color-neutral-1);
  color: var(--ion-color-dark-4);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
}
```

Never hardcode:
- Colors → use `variables/colors/` or `var(--ion-color-*)` CSS variables
- Typography → use `styles/fonts/` tokens
- Shadows → use `var(--shadow-*)` tokens
- Z-indexes → use `var(--z-index-*)` tokens

---

## Step 3 — Export the component

Every new public component **must** be added to `projects/ion/src/public-api.ts`:

```typescript
export * from './lib/<name>/<name>.component';
// Also export any associated types if created
export * from './lib/core/types/<name>.types';
```

---

## Step 4 — Write tests

Test file: `projects/ion/src/lib/<name>/<name>.component.spec.ts`

```typescript
import { TestBed } from '@angular/core/testing';
import { Ion<Name>Component } from './<name>.component';

describe('Ion<Name>Component', () => {
  let fixture: ComponentFixture<Ion<Name>Component>;
  let component: Ion<Name>Component;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ion<Name>Component], // standalone goes in imports
    }).compileComponents();

    fixture = TestBed.createComponent(Ion<Name>Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render child Ion components correctly', () => {
    fixture.componentRef.setInput('label', 'Test');
    fixture.detectChanges();
    // Query via data-testid
    const btn = fixture.nativeElement.querySelector('[data-testid="btn-test"]');
    expect(btn).toBeTruthy();
  });
});
```

For overlay/portal components (modals, tooltips, dropdowns):
```typescript
// Query from document.body instead of fixture.nativeElement
const overlay = document.body.querySelector('[data-testid="my-overlay"]');
```

---

## Step 5 — Write a Storybook story

Story file: `projects/ion/src/stories/<Name>.stories.ts`

```typescript
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { Ion<Name>Component } from '../lib/<name>/<name>.component';

const meta: Meta<Ion<Name>Component> = {
  title: 'Ion/<Name>',
  component: Ion<Name>Component,
  tags: ['autodocs'],
  argTypes: {
    ionOnClick: { action: 'ionOnClick' },
  },
};

export default meta;
type Story = StoryObj<Ion<Name>Component>;

export const Default: Story = {
  args: {
    label: 'Example',
  },
};
```

---

## Practical example: Upload component with URL input

A user asks: *"Create an upload component with a text field for entering a URL and a submit button."*

**Wrong approach (native HTML):**
```html
<div>
  <input type="url" placeholder="Enter URL" />
  <button>Upload</button>
</div>
```

**Correct approach (using Ion components):**
```typescript
// Component class
imports: [IonInputComponent, IonButtonComponent]
```

```html
<div class="ion-upload">
  <ion-input
    [placeholder]="'Enter URL'"
    [inputType]="'url'"
    (ionOnInput)="onUrlChange($event)"
    [attr.data-testid]="'upload-url-input'"
  ></ion-input>
  <ion-button
    label="Upload"
    type="primary"
    (ionOnClick)="onSubmit()"
    [attr.data-testid]="'upload-submit-btn'"
  ></ion-button>
</div>
```

The principle: **every form field, button, icon, or UI primitive should use its Ion counterpart.** This ensures visual consistency, accessibility, and theme support across the design system.

---

## Checklist before finishing

- [ ] All inputs/buttons/selects/checkboxes in the template use Ion components
- [ ] No hardcoded colors, sizes, or shadows in SCSS
- [ ] Component uses `input()` / `output()` signals, not decorators
- [ ] `ChangeDetectionStrategy.OnPush` is set
- [ ] No `standalone: true` in the `@Component` decorator
- [ ] All Ion components imported in `imports: []`
- [ ] Component exported from `public-api.ts`
- [ ] `data-testid` attributes present for testable elements
- [ ] Tests written and passing (`npx jest --testPathPattern=<name>`)
- [ ] Storybook story created
