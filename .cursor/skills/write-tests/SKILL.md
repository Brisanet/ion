---
name: write-tests
description: Guide for writing comprehensive tests for Ion Design System components using Jest + Angular Testing Library
---

# Write Tests for an Ion Component

Follow this guide to write comprehensive tests for an existing Ion component.

## 1. Identify the component

Determine which component needs tests. Read the component's `.component.ts` to understand:

- All `input()` signals and their types/defaults
- All `output()` signals
- All public methods
- Template logic (via `.component.html`)
- Component dependencies (imported components)

## 2. Test file setup

The test file should be at `projects/ion/src/lib/<component>/<component>.component.spec.ts`.

## 3. Test categories to cover

### a) Rendering Tests

- Default rendering without inputs
- Rendering with various input combinations
- Conditional rendering (`@if` blocks)

### b) Input Variant Tests

Use iteration when testing multiple values of the same input:

```typescript
const sizes: Array<'sm' | 'md' | 'lg' | 'xl'> = ['sm', 'md', 'lg', 'xl'];
sizes.forEach((size) => {
  it(`should render size: ${size}`, () => {
    fixture.componentRef.setInput('size', size);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('button');
    expect(el.classList.contains(`ion-btn-${size}`)).toBe(true);
  });
});
```

### c) Event/Output Tests

```typescript
it('should emit event', () => {
  const spy = jest.fn();
  component.ionOnClick.subscribe(spy);
  fixture.detectChanges();

  const el = fixture.nativeElement.querySelector('button');
  el.click();

  expect(spy).toHaveBeenCalled();
});
```

### d) State Tests

- Disabled state prevents interactions
- Loading state shows spinner and blocks events
- Boolean flags toggle CSS classes

### e) Accessibility Tests

- Elements have correct ARIA attributes
- Disabled elements are properly marked
- Focus management works correctly

## 4. Key patterns

- **Always** use `fixture.componentRef.setInput()` to set signal inputs
- **Always** call `fixture.detectChanges()` after changing inputs
- Use `fixture.nativeElement.querySelector()` for DOM queries
- Use `document.body.querySelector()` for overlay/portal elements (dropdowns, modals, tooltips)
- Use `[data-testid]` attribute selectors for reliable queries
- Use `jest.fn()` for spy/mock functions

## 5. Run the tests

```bash
npx jest --testPathPattern=<component-name>
npx jest --testPathPattern=<component-name> --coverage
```
