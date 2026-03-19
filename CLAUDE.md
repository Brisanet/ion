# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Ion** is the official Angular-based Design System for **Brisanet**, published as `@brisanet/ion` on npm. It is an Angular CLI library workspace (`projectType: "library"`).

## Commands

```bash
# Development
npm start                    # Serve ion-test-app
npm run storybook            # Start Storybook on port 6006

# Building
npm run build ion            # Build the ion library to dist/ion
npm run build-storybook      # Build Storybook static site to dist/storybook/ion

# Testing
npm test                     # Run all Jest tests
npx jest --testPathPattern=button  # Run tests matching a pattern
npx jest --coverage          # Run with coverage report
```

## Project Structure

```
projects/
  ion/                       # Core library (published to npm)
    src/
      lib/                   # Component directories (one folder per component)
      lib/core/types/        # Shared TypeScript interfaces/types
      lib/core/bn-*/         # Business components (bn- prefix)
      styles/                # Global design tokens (colors, fonts, shadows, z-indexes, themes)
      stories/               # Storybook stories
      public-api.ts          # Barrel export — all public exports go here
  ion-test-app/              # Showcase / integration test app
```

## Angular Component Conventions

- Angular v21: standalone components are **default** — do NOT set `standalone: true`
- Always use `changeDetection: ChangeDetectionStrategy.OnPush`
- Selector prefix: `ion-` (e.g. `ion-button`); class naming: `Ion<Name>Component`
- Use `input()` / `output()` signal functions — NOT `@Input()` / `@Output()` decorators
- Use `signal()`, `computed()`, `effect()` for state; update with `.set()` / `.update()`
- Use `host: {}` in `@Component` — NOT `@HostBinding` / `@HostListener`
- Templates: `@if`, `@for`, `@switch` (native control flow) — NOT `*ngIf`, `*ngFor`
- Bindings: `[class.name]` — NOT `ngClass`; `[style.prop]` — NOT `ngStyle`
- Test selectors: `[attr.data-testid]` following pattern `'btn-' + (label() || id())`
- Use `inject()` for dependency injection, not constructor injection
- Every new public component/directive/service must be exported from `public-api.ts`

## Testing Conventions

```typescript
// Standard setup for standalone components
await TestBed.configureTestingModule({
  imports: [IonMyComponent], // standalone goes in imports
}).compileComponents();

// Setting signal inputs
fixture.componentRef.setInput('label', 'Click me');
fixture.detectChanges();

// DOM queries
fixture.nativeElement.querySelector('[data-testid="btn-myId"]');
document.body.querySelector(...)  // for overlays/portals (modal, tooltip, dropdown)

// Event testing
const clickSpy = jest.fn();
component.ionOnClick.subscribe(clickSpy);
```

## Styling Conventions

- SCSS only; external files via `styleUrls` (not inline styles)
- Theme files are named `_<name>.theme.scss`
- Always use existing design tokens from `projects/ion/src/styles/` — never hardcode values
  - Colors: `styles/colors/colors.scss`
  - Fonts: `styles/fonts/index.scss`
  - Shadows: `styles/shadows/index.scss`
  - Z-indexes: `styles/z-indexes/index.scss`
  - Themes (light/dark CSS vars): `styles/themes/index.scss`
- CSS class naming: `ion-btn-primary`, `ion-btn-sm`, `ion-btn-md`, etc.

## Storybook Conventions

Use CSF3 format with `Meta<Component>` and `StoryObj<Component>`, `tags: ['autodocs']`, and `argTypes` for outputs. If a component requires services, use `applicationConfig` with `providers`. Stories live in `projects/ion/src/stories/`.

## CI/CD

- PRs to `main`: runs `npm test` + `npm run build ion` via GitHub Actions (Node 22.22.0)
- Release: triggered on GitHub Release publish; builds and publishes to npm with provenance
- Branch strategy: `main` (Angular v21), `support/v19` (LTS), `support/v8` (legacy)
- Changes to older branches are propagated via `git cherry-pick`
