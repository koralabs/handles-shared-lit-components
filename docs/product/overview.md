# Product Overview

## Purpose

`@koralabs/handles-shared-lit-components` is the shared presentational component package for the Handles ecosystem’s Lit-based interfaces. It provides reusable UI primitives for the flows that show up repeatedly across the product suite:

- wallet discovery and selection
- handle selection from a wallet-owned list
- dropdown presentation of the active handle
- inline search for handle filtering
- confirmation and error dialogs
- small visual controls such as toggles, checkboxes, radio indicators, and buttons

The package exists to keep these flows visually consistent between applications and to avoid duplicating the same markup, CSS, and interaction wiring in multiple sibling repos. It is not a product by itself. It is a supporting UI layer used by product surfaces such as minting, marketplace, account, and other Handle-enabled web experiences.

## Product Role In The Ecosystem

Within the Kora Labs ecosystem, this repo fills the space between low-level design tokens and full application features.

- It is more specific than a general-purpose design system because many components are explicitly about wallet and handle workflows.
- It is less opinionated than a finished application because it does not fetch data, maintain application state across screens, or decide business rules.
- It is designed to be embedded into parent experiences that already know how to talk to Cardano wallets, resolve handle assets, and orchestrate user flows.

In practice, that means the package is responsible for rendering polished interaction shells, while the parent app remains responsible for supplying data, choosing when components are shown, and reacting to user input.

## Target Users

There are two user groups to keep in mind:

### 1. End Users Of Handles Products

These users never install this package directly, but they experience it whenever a Handles product asks them to:

- pick a wallet extension
- choose one handle from a wallet with many handles
- confirm a destructive or irreversible action
- notice an error that should auto-dismiss unless they hover
- search a long list of handles

For this audience, the value proposition is consistency. A user who has already selected a wallet in one Handles flow should recognize the same selection, error, and confirmation patterns elsewhere.

### 2. Internal Product Engineers

These users import or side-effect-load the components into sibling repos. They care about:

- stable custom element tags
- predictable properties and callbacks
- minimal styling surprises
- a small dependency footprint
- compatibility with existing Lit-based apps

For this audience, the package reduces the cost of assembling Handle-aware flows and shortens the time required to ship UI that already matches the broader product family.

## Problem Statement

Without a shared package, every product team would have to rebuild the same core interaction surfaces:

- a wallet picker with installed-wallet empty state
- a list or grid selector for wallet-owned handles
- a small search box with Handle-specific placeholder language
- a dropdown button that can frame active handle choices
- green/blue loading ornamentation consistent with the Handles brand
- confirmation and error popups with the same button treatment

That duplication would create several problems:

- inconsistent markup and interaction details across products
- repeated styling work whenever the brand evolves
- higher risk of subtle UX regressions in wallet and handle flows
- more difficult onboarding for new engineers who must learn multiple homegrown implementations

This repository solves those problems by centralizing the repeated UI shells and by providing one package that sibling applications can reuse.

## What The Package Is Responsible For

The package is responsible for the following product concerns:

- rendering the visual frame of selection dialogs, popups, and controls
- exposing slots where parent applications can insert search bars, buttons, and loaders
- rendering lists of wallets or handles using consumer-supplied data
- exposing callbacks or browser events when the user interacts with a component
- carrying forward the Handles visual language, especially the green and blue accent palette used in loaders and selected states

Several components also encode product-specific copy that a general-purpose UI toolkit would not know about, such as:

- “Choose your wallet”
- “Choose your handle”
- “No supported wallet extensions found.”
- search placeholders centered on handles
- handle display conventions that prefix the name with `$`

That copy makes the package more useful out of the box for Handle flows, but it also means the package is tightly coupled to the Handles product domain.

## What The Package Is Not Responsible For

The package should not be treated as the owner of business logic. In the current implementation it does not:

- discover wallets from `window.cardano`
- fetch wallet-owned handles
- resolve IPFS URIs into gateway URLs
- decide which handle is active
- store state outside the component instance
- manage routing or modal lifecycle for the parent application
- enforce permissions or validation rules
- translate strings for multiple locales

Instead, consumers are expected to provide data and behavior from the parent app. For example:

- `select-wallet` expects a `wallets` array and an `onSelectWallet` callback.
- `select-handle` expects `handleData`, `activeHandle`, `imageUrl`, `loadingImg`, and callback functions.
- `large-handle-selector` expects a list of handle-like objects and a selection callback.
- `handle-small-search` emits an `input-change` event, but the parent decides how to filter results.

This separation is useful because wallet, chain, and data concerns vary between sibling products, but it also means integrators must understand that these components are mostly controlled or semi-controlled shells rather than autonomous feature modules.

## Supported Product Journeys

### Wallet Selection

The package supports the first step of many Handle experiences: asking the user to choose a wallet extension. `select-wallet` renders the list, displays the wallet icon and name, and offers an empty state if no supported wallet extensions are detected. A parent application can add action buttons through a slot, making the component suitable for “Continue” and “Cancel” style flows.

### Handle Selection In A Compact List

`select-handle` exists for flows where the user must choose one wallet-owned handle from a vertical list. It supports:

- a slotted search area
- a current-handle summary row
- a scrollable list for additional handles
- an optional loader slot while the current item or list is being resolved
- a slotted action area for confirm or navigation buttons

This makes it appropriate for wallet login flows, active-handle switching, or account settings screens where a compact list is easier to scan than a large image gallery.

### Handle Selection In A Large Visual Grid

`large-handle-selector` supports a more visual selection flow by rendering handle images at different sizes based on how many items are present. That behavior suggests use in contexts where the artwork or rendered image matters, not just the handle name. The component still delegates search and loading to the consumer through slots and callback props, but it shifts the emphasis from text rows to image cards.

### Active Handle Dropdown

`dropdown-button` wraps a trigger and slotted dropdown content so parent applications can present handle-specific actions or options. The component’s copy defaults to “Choose Handle” when no active handle string is supplied. This makes it suitable for header widgets or compact account controls where the user needs a quick way to inspect or switch handle-related actions.

### Search, Feedback, And Confirmation

The package rounds out the core flows with supporting feedback controls:

- `handle-small-search` for inline filtering
- `confirm-popup` for user confirmation
- `error-popup` for transient errors with a countdown indicator
- `disconnect-wallet-button` for the wallet exit affordance
- `custom-loader` for brand-aligned loading feedback

These pieces are intentionally narrow. They are meant to be composed into a parent flow rather than treated as whole pages.

## Design Principles

The implementation suggests several de facto product principles.

### Domain Specific Over Generic

This is not a neutral component set. Names, copy, examples, and visual treatment all assume the Handles domain. That is a feature, not an accident. The goal is to optimize for the actual product family rather than maximize reuse outside it.

### Parent-Controlled Data

Components render what they are given. The parent is expected to own:

- data retrieval
- selection state
- loading semantics
- cross-component coordination

That keeps the components simple and reduces hidden coupling to application services.

### Composable Surface Areas

Slots are used where the same shell needs different child content across products. For example, `select-handle` does not force one search input or one button set. It provides named insertion points, letting each app reuse the same frame while composing in its own search, action, or loader elements.

### Brand Consistency

Several components use recurring design motifs:

- green and blue brand accents
- rounded containers and controls
- capsule-style buttons
- prominent selection borders
- inline SVG icons instead of external icon libraries

That consistency matters because wallet and handle flows often appear inside larger, more complex applications. Reusing these motifs helps those flows feel like one family even when the surrounding page differs.

## Data Expectations

The package relies on the parent app to normalize data into the shapes the components expect.

### Wallet Data

`select-wallet` expects wallet objects with at least:

- `key`
- `name`
- `icon`

The code examples and stories imply the icon can be a URL or a data URL. The disconnect button docs also note that wallet icons are expected to come from the `window.cardano` wallet interface.

### Handle Data

The repo defines a `WalletHandle` interface in `src/interfaces/index.ts`. The type includes:

- asset identity fields such as `policyId` and `hex`
- a `name`
- an optional `image` or `imageUrl`
- an `active` marker
- a `default` marker
- optional chain-adjacent data like `utxo`, `price`, and `validUntilDate`

Not every component consumes every field, but the shared type shows the intended product direction: handle selection UI should work with assets that already carry enough metadata for display, active/default state, and possible downstream commerce or validity flows.

## Operational Constraints For Consumers

Consumers should treat this package as UI infrastructure with explicit responsibilities.

- You must pass already-usable image URLs if you expect images to render. The components do not resolve IPFS or asset metadata on their own.
- You must own loading state. Components can show a loader slot or switch appearance, but they do not fetch asynchronously by themselves.
- You must handle selection side effects. Most components call a provided function or emit an event; they do not update broader application state.
- You must decide modal lifecycle in the parent app. Some components mutate their own `open` state, but route, overlay, and screen-level behavior still belong to the consumer.
- You should not assume every control is interactive by itself. Some are presentation-only indicators and need parent wiring to become part of a completed UX flow.

## Success Criteria

This package is successful when it helps sibling applications ship Handle-specific UI faster without creating a maintenance trap. In practical terms, that means:

- engineers can discover the available components quickly
- consumers know which props, slots, callbacks, and events they must supply
- wallet and handle flows look and feel consistent across products
- maintainers can extend the package without accidentally changing hidden assumptions

The rest of the documentation set focuses on those operational details so the package can be reused confidently instead of treated like an opaque bundle of old Storybook examples.
