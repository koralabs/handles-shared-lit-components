# Architecture And Packaging

## Repository Shape

This repo is a TypeScript package built around Lit custom elements and a small number of template-returning helpers. The important top-level folders are:

- `src/web-components`: primary Lit custom elements
- `src/components`: template helpers, including a button template and a loader template
- `src/stories`: Storybook stories used to demonstrate the components
- `src/interfaces`: shared TypeScript interfaces for handle-shaped data
- `lib`: compiled output produced by `tsc`
- `.storybook`: local Storybook configuration
- `.github/workflows`: publish automation

There was no documentation tree before this update, which meant maintainers had to infer the package structure by scanning source files. This page documents the effective architecture as it exists now.

## Runtime Model

The package uses Lit and Lit decorators for nearly all component logic.

- Most elements extend `LitElement` from `lit`.
- Properties are declared with `@property`.
- Internal reactive state uses `@state` where needed.
- Named custom elements are registered with `@customElement(...)` in most files, except the shared button family, which uses explicit `customElements.define(...)`.
- Styles usually live in colocated `styles.ts` modules and are assigned with `static styles = ...`.

This architecture keeps each component self-contained:

- markup lives in the component file
- CSS lives beside the component
- state and lifecycle methods stay local to the element

The result is straightforward to consume from another Lit-based project because the main dependency is just Lit itself.

## Source Families

### `src/web-components`

This folder contains the package’s primary reusable UI elements:

- `Button`
- `ConfirmPopup`
- `CustomCheckBox`
- `CustomToggle`
- `DisconnectWalletButton`
- `DropdownButton`
- `ErrorPopup`
- `LargeHandleSelector`
- `RadioButton`
- `SelectHandle`
- `SelectWallet`
- `SmallHandleSearch`
- `StateExample`

Most product value in the repository lives here.

### `src/components`

This folder currently holds two template helpers:

- `Button`, a template function with React-flavored props naming but still implemented via Lit templates
- `CustomLoader`, a branded SVG loader

These helpers are not registered custom elements. They are render helpers that return `html` templates.

### `src/stories`

The Storybook stories demonstrate basic usage of each component. They are also a useful source of truth for intended props and example composition, especially in a repo with little existing documentation.

Important limitation: stories are examples, not hard guarantees. Some stories reveal intent more clearly than the component contracts do, but a few include naming mismatches or assumptions that are not fully reflected in the runtime behavior.

### `src/interfaces`

`src/interfaces/index.ts` defines the `WalletHandle` interface and its supporting asset shapes. This is the closest thing the package has to a shared domain contract.

The type suggests that Handle UI in this repo is expected to work with asset-like objects carrying:

- chain identity fields
- a human-readable name
- optional image data
- flags such as `active` and `default`
- optional pricing or validity metadata

Even when an individual component uses only a small subset of that shape, the interface documents the intended domain model for Handle-bearing assets.

## Export Surface

The root `src/index.ts` currently exports only:

- `StateExample`
- `CustomLoader`

That is a critical architectural fact. Many other components are available in source and compile into `lib`, but they are not re-exported from the package root.

Implications:

- Consumers may rely on direct path imports or side-effect imports instead of clean package-level named exports.
- The public API is narrower than the repository contents might suggest.
- Any future effort to make this a cleaner consumable package should start by intentionally defining the export surface rather than assuming all components are already part of it.

This repo therefore behaves more like a bundle of importable modules than a fully curated package API.

## Component Communication Patterns

The components use three main integration patterns.

### 1. Callback Properties

Several components accept function-valued properties such as:

- `onSelectWallet`
- `onSelectHandle`
- `onScroll`
- `onFirstUpdated`
- `onConfirm`
- `onCancel`

This is the dominant interaction model for higher-level selectors and dialogs. The parent application passes functions, and the component invokes them directly.

Advantages:

- simple to wire in Lit templates
- no extra event object parsing
- easy to keep logic in the parent component

Tradeoffs:

- less idiomatic for generic Web Component consumers than custom events
- harder to inspect with browser tooling than DOM events
- introduces a tighter coupling between the consumer and the component’s expected property shape

### 2. Custom DOM Events

Only a small portion of the package emits semantic events:

- `handle-small-search` emits `input-change` with `detail: { inputValue }`
- `error-popup` dispatches `error-popup-closed`, but it does so on `window`, not as a bubbled event from the element

This mixed model is important to understand. Consumers cannot assume a consistent event-driven contract across the package.

### 3. Named Slots

Slots are used for composition where a shell needs consumer-provided children:

- `select-wallet`: `slottedButtons`
- `select-handle`: `slottedSearch`, `slottedButtons`, `slottedLoader`
- `large-handle-selector`: `slottedSearch`, `slottedLoader`
- `dropdown-button`: `slottedDropdown`
- `error-popup`: `customError`
- button family: `shared-button`

Slots make the higher-level selectors more reusable across sibling products because the frame is standardized without freezing every piece of child content.

## Styling Model

The styling strategy is pragmatic and local:

- most components use static CSS from a colocated `styles.ts`
- some components inline styles directly in the render output
- several container layout adjustments are passed in as raw style strings through properties like `slottedButtonsStyling`, `slottedSearchStyling`, or `dropdownPositioning`

This gives consumers flexibility, but it has architectural consequences:

- there is no strong type safety around inline style strings
- styling contracts live partly in code and partly in informal usage expectations
- host apps can influence layout without piercing shadow DOM CSS, but the mechanism is not as structured as CSS custom properties or named parts

The only explicit CSS custom property usage in the repo today appears in `state-example`, which uses `--my-counter-text-color`.

## Lifecycle Usage

Most components keep lifecycle logic minimal.

- `firstUpdated()` is used in `select-wallet`, `select-handle`, and `large-handle-selector` to invoke a supplied callback.
- `error-popup` uses `connectedCallback`, `disconnectedCallback`, and `firstUpdated` for countdown management and hover pause behavior.

This makes the components easy to follow, but it also means most lifecycle coordination is intentionally pushed outward to the consuming app.

## Data Contracts

### Wallet Objects

The package does not define a first-class wallet TypeScript interface, but the stories and rendering logic imply the required shape:

- `key: string`
- `name: string`
- `icon: string`

Additional wallet fields may exist upstream, but those are the fields this package reads today.

### Handle Objects

The shared interface stack is:

- `BasicAsset`
  - `policyId`
  - `hex`
- `Asset`
  - `name`
  - optional `count`
  - optional `utxo`
  - optional `image`
  - optional `src`
  - optional `price`
  - optional `cost`
  - optional `validUntilDate`
- `WalletHandle`
  - `active`
  - `default`
  - optional `image`
  - optional `imageUrl`

In practice, selector components use only a subset of this information:

- `name`
- `image` or external `imageUrl`
- `active` in the large selector

But the broader shape matters because it shows maintainers the domain assumptions embedded in the package.

## Build Pipeline

The package compiles with `tsc` using:

- `target: ESNext`
- `module: ESNext`
- `outDir: ./lib`
- declaration output enabled
- experimental decorators enabled
- `ts-lit-plugin` strict mode

Because `outDir` is `./lib`, the package’s distributable JavaScript and declaration files are generated there. The repo also carries compiled `lib` output in version control today, which affects how Storybook and publishing are configured.

## Storybook Model

The package’s Storybook setup is tied to compiled output rather than source files:

- `.storybook/main.js` points to `../lib/src/stories/**/*.stories.{js,md,mdx}`

At the same time, the compiled stories visible in the repo live under `lib/stories`, not `lib/src/stories`.

That discrepancy is worth recording for maintainers because it means Storybook configuration should be re-verified whenever the local demo workflow is touched. Even if the development server still works through other local assumptions, the documented path mismatch is a real maintenance concern.

## Release And Deployment Model

The repo publishes through GitHub Actions via `.github/workflows/deploy.yml`.

Important facts:

- publish triggers on pushes to `master`
- manual `workflow_dispatch` is also enabled
- the workflow delegates publishing to a shared deployment script from `koralabs/adahandle-deployments`
- the deployment type is `npm-publish`
- the job uses `NODE_VERSION: 20`
- `IS_PUBLIC: true` is set

This indicates the package is intended to be distributed as a public npm package rather than deployed as a web app.

## Branch Reality

The execution context for this documentation task referenced `main`, but the repository and deploy workflow are currently aligned to `master`.

Architecturally, that matters because:

- any automation that assumes `main` will not match the repo’s actual publish trigger
- maintainers need to know the branch contract before editing workflows or release instructions
- documentation should reflect current reality, not a hypothetical future branch rename

If the repo is later renamed to `main`, these docs should be updated together with the workflow.

## Current Gaps And Technical Debt

The documentation effort surfaced several implementation facts that future maintainers should treat as explicit debt rather than invisible behavior:

- the package root export surface is incomplete relative to the available component set
- callback properties and custom events are mixed without one uniform convention
- some components are presentational only and rely entirely on host-driven state changes
- `select-wallet` carries internal `selectedWallet` state that is not updated on click
- Storybook configuration should be revalidated because the configured story path does not match the checked-in compiled layout
- there are no automated tests defined in `package.json`

These are not blockers for using the package, but they are important for planning future cleanup or API hardening.

## Maintainer Guidance

When extending this repo, preserve three constraints unless there is an intentional API change:

- keep the components clearly separated from business logic and data fetching
- document any new slot, callback, event, or root export as part of the public contract
- treat `lib` output, Storybook behavior, and publish workflow as one connected packaging system rather than three independent concerns

That mindset will help the repo evolve from a useful internal package into a cleaner, more predictable shared UI module.
