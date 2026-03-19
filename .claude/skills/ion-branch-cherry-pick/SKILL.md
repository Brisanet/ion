---
name: ion-branch-cherry-pick
description: Guides cherry-picking commits from the main branch (Angular v21) to support/v19 or support/v8 in the Ion Design System. Use this skill whenever the user mentions cherry-pick, backport, porting a fix or feature to v19/v8/support branches, propagating changes between branches, or needs to apply a commit from main to an older branch.
version: 1.0.0
---

# Ion Branch Cherry-Pick

This skill guides the process of propagating commits from `main` (Angular v21) to the `support/v19` or `support/v8` maintenance branches, including the syntax transformations each branch requires.

## Branch Overview

| Branch | Angular | Signals | `@if`/`@for` | Standalone | Tests |
|---|---|---|---|---|---|
| `main` | v21 | `input()` / `output()` | Yes | Default (no flag needed) | TestBed + `setInput()` |
| `support/v19` | v19 | `input()` / `output()` | Yes | `standalone: true` required | TestBed + `setInput()` |
| `support/v8` | v8 | `@Input()` / `@Output()` | `*ngIf` / `*ngFor` | NgModule-based | Angular Testing Library |

## Step 1 — Identify what to cherry-pick

Get the commit hash from `main`:

```bash
git log --oneline main | head -20
```

If it was merged via PR, the merge commit contains all the changes. Use the **merge commit hash** unless the PR was squash-merged (in that case, the squash commit is sufficient).

To cherry-pick a range of commits (e.g., a feature branch):

```bash
git log --oneline main ^support/v19 | head -20  # commits not yet on v19
```

## Step 2 — Apply the cherry-pick

```bash
git checkout support/v19   # or support/v8
git cherry-pick -x <commit-hash>
# -x adds "(cherry picked from commit ...)" to the commit message
```

If there are conflicts:

```bash
git status                  # see conflicting files
# resolve conflicts manually or with the transformations below
git add <resolved-files>
git cherry-pick --continue
```

To abort and start over:

```bash
git cherry-pick --abort
```

## Step 3 — Apply syntax transformations

### v21 → v19 (minor changes)

v19 supports signals and native control flow, but requires `standalone: true` explicitly.

**Component metadata:**
```typescript
// main (v21) — standalone is the default
@Component({ selector: 'ion-foo', imports: [...], ... })

// support/v19 — must declare explicitly
@Component({ selector: 'ion-foo', standalone: true, imports: [...], ... })
```

That's usually the only change needed. Confirm there are no v8-style patterns that crept in.

---

### v21 → v8 (major refactoring)

v8 uses class decorators, NgModules, and structural directives. Every pattern must be translated.

#### TypeScript: Inputs & Outputs

```typescript
// v21 (signals)
import { input, output, signal, computed, effect } from '@angular/core';

label = input<string>();
size = input<Size>('md');
disabled = input(false);
ionOnClick = output<void>();
count = signal(0);
double = computed(() => this.count() * 2);

// v8 (decorators)
import { Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy } from '@angular/core';

@Input() label?: string;
@Input() size: Size = 'md';
@Input() disabled = false;
@Output() ionOnClick = new EventEmitter<void>();
count = 0;
get double() { return this.count * 2; }
```

#### TypeScript: Component decorator

```typescript
// v21
@Component({
  selector: 'ion-foo',
  imports: [CommonModule, IonIconComponent],
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.active]': 'active()' },
})
export class IonFooComponent { ... }

// v8 — declare in NgModule, not standalone
@Component({
  selector: 'ion-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.scss'],
})
export class IonFooComponent implements OnInit, OnChanges { ... }
// → Add IonFooComponent to the shared NgModule declarations
```

#### TypeScript: Lifecycle hooks

| v21 pattern | v8 equivalent |
|---|---|
| `effect(() => { ... })` | `ngOnChanges(changes: SimpleChanges)` or `ngOnInit()` |
| `inject(Service)` | Constructor injection: `constructor(private svc: Service)` |
| `host: { '[attr]': 'val()' }` | `@HostBinding('attr') get val() { ... }` |

#### Template: Control flow

```html
<!-- v21 -->
@if (loading()) { <span class="spinner"></span> }
@for (item of items(); track item.id) { <li>{{ item.name }}</li> }
@switch (type()) {
  @case ('primary') { <span class="primary"></span> }
  @default { <span></span> }
}

<!-- v8 -->
<span *ngIf="loading" class="spinner"></span>
<li *ngFor="let item of items; trackBy: trackById">{{ item.name }}</li>
<ng-container [ngSwitch]="type">
  <span *ngSwitchCase="'primary'" class="primary"></span>
  <span *ngSwitchDefault></span>
</ng-container>
```

#### Template: Bindings and property access

```html
<!-- v21 — signals are called as functions -->
<button [class]="'ion-btn-' + type()" [disabled]="disabled()">
  {{ label() }}
</button>

<!-- v8 — properties accessed directly -->
<button [class]="'ion-btn-' + type" [disabled]="disabled">
  {{ label }}
</button>
```

#### Tests

v8 uses Angular Testing Library (`@testing-library/angular`) instead of raw TestBed:

```typescript
// v21
import { TestBed, ComponentFixture } from '@angular/core/testing';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [IonFooComponent],
  }).compileComponents();
  fixture = TestBed.createComponent(IonFooComponent);
});

it('should render', () => {
  fixture.componentRef.setInput('label', 'Test');
  fixture.detectChanges();
  expect(fixture.nativeElement.querySelector('button').textContent).toContain('Test');
});

// v8
import { render, screen, fireEvent } from '@testing-library/angular';
import { IonSharedModule } from '../shared.module';

const sut = async (props = { label: 'Test' }) => {
  await render(IonFooComponent, {
    componentProperties: props,
    imports: [IonSharedModule],
    excludeComponentDeclaration: true,
  });
  return screen.findByRole('button');
};

it('should render', async () => {
  const button = await sut({ label: 'Test' });
  expect(button.textContent).toContain('Test');
});
```

## Step 4 — Verify

```bash
npm test -- --testPathPattern=<component-name>
npm run build ion
```

## Step 5 — Commit and push

The commit message on the support branch should reference the original PR/commit and include the branch marker in the PR title:

```bash
git push origin support/v19
# When opening the PR, add [v19] to the title:
# "fix(tooltip): correct z-index on overflow [v19] (#1234)"
```

## Common pitfalls

- **Forgetting `standalone: true` on v19** — the component silently fails to load.
- **Calling signals as functions in v8 templates** — `label()` compiles but returns `undefined`; use `label` directly.
- **Missing NgModule declaration in v8** — component won't be recognized in templates.
- **`inject()` in v8** — use constructor injection instead; `inject()` wasn't available.
- **`setInput()` in v8 tests** — this API doesn't exist in v8; use `componentProperties` via Testing Library.
