# Component Catalog

This catalog explains each shipped component family in product terms. The goal is not just to list tags and props, but to answer the more important question: when should a Handles product use each component, and what must the parent application still own?

## Reading The Catalog

Each entry focuses on:

- the user problem the component solves
- the expected host responsibilities
- the notable interaction model
- the most important caveats in the current implementation

For low-level implementation details, see the spec pages. This catalog stays product-facing.

## Shared Buttons

### `shared-button-small`
### `shared-button-medium`
### `shared-button-large`

These three custom elements provide the package’s simplest CTA primitive. They share one visual style and differ only in padding and font size.

Use them when:

- you want a pill-shaped button that already matches the Handles component styling
- the component is being rendered inside another Lit component in this package or a sibling repo
- your design needs size variants without introducing another button system

What the parent provides:

- button label content via the named slot `shared-button`
- optional `buttonColor`
- optional `textColor`

Product notes:

- The button family is appropriate for dialogs, confirmations, or contained actions.
- It is not a fully featured button system. There are no variants for disabled, loading, destructive, or icon-leading states beyond what a consumer can style manually.
- The styles are intentionally minimal and can function as a lightweight shared default rather than a complete design language.

Current caveats:

- The root package export does not expose the button classes directly through `src/index.ts`. Consumers usually rely on side-effect imports from the component path.
- The slot-based label API is slightly more cumbersome than a plain `label` prop but works well inside other custom elements.

## `select-wallet`

`select-wallet` is the package’s wallet chooser shell. It renders a titled selection panel, a scrollable list of wallet options, and a bottom slot for action buttons.

Use it when:

- the user needs to choose one supported Cardano wallet extension before continuing
- you want a consistent wallet picker across multiple Handles experiences
- the app already knows which wallets are installed or supported

What the parent provides:

- a `wallets` array of wallet objects with `key`, `name`, and `icon`
- an `onSelectWallet` function for click handling
- optionally `onScroll` and `onFirstUpdated`
- optional slotted footer buttons via `slottedButtons`

What the user sees:

- a “Choose your wallet” header
- one row per wallet
- an empty state when no wallets are present
- a visual radio-style indicator intended to show which wallet is selected

Product integration guidance:

- This component is best paired with app logic that discovers wallets through `window.cardano`, normalizes them into the expected shape, and decides what to do after selection.
- If your flow needs an immediate one-click connect behavior, the `onSelectWallet` callback can do that. If your flow needs a second confirm step, add buttons in the footer slot.

Current caveats:

- The component tracks an internal `selectedWallet` state but does not update that state when a wallet is clicked. The click handler calls `onSelectWallet(wallet)` only. That means the host app should not assume the built-in selected styling is currently authoritative.
- The component uses callback properties rather than custom DOM events, so the parent must pass functions instead of listening for emitted events.

## `select-handle`

`select-handle` is the compact list-oriented handle chooser. It is meant for flows where users need to pick one handle from a set and where text scanning matters more than a gallery presentation.

Use it when:

- the app has already loaded a list of wallet-owned handles
- the user needs to switch or confirm an active handle
- you want a vertical list with a current-selection summary near the top
- the surrounding flow needs custom search, footer buttons, or loading content

What the parent provides:

- `handleData`, an array of handle-like objects
- `activeHandle`, the currently active item
- `imageUrl`, the image URL shown for the active item and selected list row
- `loadingImg`, to control when the loader slot replaces the image
- `onSelectHandle`, `onScroll`, and optionally `onFirstUpdated`
- slotted content for `slottedSearch`, `slottedButtons`, and `slottedLoader`
- optional inline style strings for the search and button wrapper regions

What the user sees:

- a search area at the top
- an optional current-handle card when `activeHandle.name` exists
- a scrollable list of handle names, each prefixed with `$`
- optional loader content when selection or list loading is in progress
- a footer action area

Product integration guidance:

- This component works best when paired with `handle-small-search`, although it can accept any search UI through the slot.
- The parent app should treat the component as a controlled renderer. It should update `activeHandle`, `imageUrl`, and `loadingImg` in response to user selection and data fetching.
- If the list is paginated or lazily loaded, the `onScroll` callback can be used to trigger loading near the bottom of the scroll container.

Current caveats:

- The component assumes the consumer has already resolved a displayable image URL for the active handle.
- The list items render only the handle name, not per-item thumbnails, unless the item is the active handle.
- The component uses function properties rather than emitting semantic custom events.

## `large-handle-selector`

`large-handle-selector` is the image-first alternative to `select-handle`. It renders a gallery of handle images and automatically adjusts image sizing based on the number of items.

Use it when:

- visual identity matters and the handle art should be front-and-center
- the number of handles is small enough to browse as a grid or gallery
- the UI benefits from a more premium or collectible presentation than a compact list

What the parent provides:

- `handleData`, typically in the shared `WalletHandle` shape or a compatible subset
- `onSelectHandle`, `onScroll`, and optionally `onFirstUpdated`
- a `slottedSearch` region if filtering is needed
- a `slottedLoader` for items missing an image
- any handle-level active flag that should influence the selected styling

What the user sees:

- a “Choose your handle” title
- a search region at the top
- a scrollable area with gradient overlays
- one clickable card per handle image

Product integration guidance:

- This component fits flows where the visual rendering of a handle helps the user identify the correct asset.
- The parent app should ensure images are pre-resolved and safe to display at the expected size.
- The built-in dynamic sizing is useful for broad cases, but if a product needs exact layout control it may need a dedicated component rather than extending this one.

Current caveats:

- Image dimensions are inferred from list length with only three tiers: one item, two to ten items, or more than ten items.
- The component shows loader slot content per item when the item lacks an image, but loading semantics remain consumer-defined.
- The component exposes several properties such as `handleDataArray`, `dropdownOpen`, and `isLoading` that are not central to the current rendered output.

## `dropdown-button`

`dropdown-button` is a branded trigger wrapper for slotted dropdown content. It shows a Handles logo mark, the active handle label or a fallback prompt, and an arrow that reflects open state.

Use it when:

- you need a compact “active handle” control in a header or account widget
- dropdown content is app-specific, but the trigger should look shared
- you want to embed custom menu content through a slot rather than use a fixed menu implementation

What the parent provides:

- `dropdownHandle`, a display string for the current handle
- `dropdownPositioning`, a style string used when the dropdown is open
- slotted menu content in `slottedDropdown`

What the user sees:

- the Handles logo
- either the current handle text or “Choose Handle”
- an arrow that rotates when the dropdown is open
- any slotted dropdown content when opened

Product integration guidance:

- This is a good fit when the parent app already knows what actions belong in the dropdown, such as switching handles, opening account settings, or connecting/disconnecting flows.
- Because the component exposes the dropdown content through a slot, each consuming product can decide whether the content is a menu, a list, or a richer panel.

Current caveats:

- The component internally controls open/closed state and does not emit a toggle event.
- It imports `LitElement` from `lit-element` rather than `lit`, unlike most of the package.
- The styling of the open content is delegated to a raw inline style string, so positioning is flexible but not strongly typed.

## `handle-small-search`

`handle-small-search` is the package’s reusable text search field for handle filtering.

Use it when:

- a Handle-focused list or selector needs a compact, recognizable search bar
- you want a built-in clear button and Handle-specific placeholder behavior
- the parent app is prepared to receive and act on input changes

What the parent provides:

- optionally `inputValue`
- optionally `searching`
- an event listener for the emitted `input-change` event

What the user sees:

- a search icon
- placeholder text tuned to Handle search
- a clear icon that appears when there is content
- placeholder copy that changes on focus to hint at exact-match search with `$`

Product integration guidance:

- This is the natural search companion for `select-handle` and `large-handle-selector`.
- The parent app should debounce or filter as needed; the component emits on every input change and does not perform its own querying.

Current caveats:

- The component trims the input value before dispatching it, which may be desirable for search but should be known by consumers.
- The `clearSearch` method resets local state but does not dispatch another `input-change` event when clearing. If the parent needs a clearing event, it must wire that behavior separately or extend the component.

## `disconnect-wallet-button`

`disconnect-wallet-button` is a small affordance for leaving a connected wallet session. It swaps between the connected wallet icon and a disconnect icon on hover.

Use it when:

- the app already has a connected wallet session
- you need a compact disconnect control rather than a full text button
- the UI should reinforce the currently connected wallet visually

What the parent provides:

- optionally `walletIconUrl`
- optionally `onClick`

What the user sees:

- the current wallet icon if present, otherwise a generic wallet icon
- a hover swap to a disconnect glyph
- a tooltip reading “Disconnect Wallet”

Product integration guidance:

- This is best used in account headers, wallet chips, or active-session controls where space is limited.
- The host should own the actual disconnect logic, such as clearing session state and prompting the user if the action has broader consequences.

Current caveats:

- The component is intentionally narrow and does not ask for confirmation.
- It relies on hover to reveal intent, so touch-first contexts may need supplemental labeling or surrounding UX cues.

## `confirm-popup`

`confirm-popup` is a modal-style confirmation dialog with two button actions.

Use it when:

- the user must explicitly confirm or cancel an action
- the app needs a quick shared dialog rather than a custom modal system for one-off confirmations
- the copy is short enough to fit the component’s fixed structure

What the parent provides:

- `open`
- `message`
- `secondMessage`
- `confirmButtonLabel`
- `cancelButtonLabel`
- `onConfirm`
- `onCancel`

What the user sees:

- two lines of confirmation text
- a cancel button
- a confirm button

Product integration guidance:

- This component is suitable for destructive or irreversible actions that do not need complex form content.
- Because the component closes itself after either action, the parent should ensure the external `open` state remains consistent if it treats the component as controlled.

Current caveats:

- The component closes itself by mutating its own `open` property after firing callbacks.
- Button labels are required for a complete UX; there are no internal defaults.
- Rich content beyond two text lines is not currently supported.

## `error-popup`

`error-popup` is a dismissible transient error dialog with an auto-closing countdown and a progress bar.

Use it when:

- the app needs to surface a non-persistent error that should disappear automatically
- the user benefits from seeing a title and message without needing to acknowledge a full-screen modal
- the parent wants a shared Handles-styled error treatment

What the parent provides:

- `open`
- `messageTitle`
- `message`
- optionally `countdown`
- optionally slotted custom content in `customError`

What the user sees:

- an alert icon
- title and message text
- a close button
- a bottom progress indicator that shrinks over time

Product integration guidance:

- This works well for operational errors that should be noticed but not block the user indefinitely.
- The hover-to-pause behavior is useful when the user needs extra time to read the message.

Current caveats:

- The component dispatches `error-popup-closed` on `window`, not from the component instance. Consumers need to know that integration detail.
- The `countdown` property exists, but the component also resets its internal state from a fixed `maxCountdown` of five seconds.
- The component clears its timer when closing, but it is still best to mount and unmount it predictably from the parent app.

## `custom-toggle`

`custom-toggle` is a visual toggle pill with normal and small sizes.

Use it when:

- you need a branded on/off indicator
- the parent app already owns the true boolean state
- the interaction is simple enough that a presentational toggle is sufficient

What the parent provides:

- `isActive`
- optionally `smallToggle`
- click handling at the host level if the toggle should change state

Current caveats:

- The component does not toggle itself. It simply renders based on the provided property.
- The current story manually mutates the property from a click handler, which accurately reflects the intended host-controlled pattern.

## `custom-checkbox`

`custom-checkbox` is the checkbox counterpart to `custom-toggle`: a branded visual shell for checked, unchecked, small, and disabled states.

Use it when:

- you need a Handles-style checkbox indicator
- parent code already knows the state and handles any click or form integration

What the parent provides:

- `checked`
- `smallCheckbox`
- `disabled`

Current caveats:

- The component is presentational only. It does not integrate with forms or emit its own change event.
- Accessibility and keyboard semantics must be handled by the host if the component is used as part of an interactive control.

## `radio-button`

`radio-button` is a minimal selected/unselected indicator with a compact mode.

Use it when:

- a parent component needs a consistent Handles-style radio visual
- selection state is owned elsewhere and only the display is shared

What the parent provides:

- `isSelected`
- `isSmall`

Current caveats:

- This is purely visual and does not represent a full accessible radio input on its own.

## `custom-loader`

`custom-loader` renders a dual-ring branded spinner using inline SVG and CSS animations.

Use it when:

- a Handle flow needs a compact, brand-aligned loading affordance
- the parent app wants to place loader content into a slot such as `slottedLoader`

Current caveats:

- It is a function that returns a Lit template, not a registered custom element.
- Consumers generally embed it in a host render tree rather than use a tag such as `<custom-loader>`.

## `state-example`

`state-example` is not a production product primitive. It is a simple demo component that shows reactive state and slot rendering.

Use it when:

- demonstrating Lit behavior locally
- confirming the package build and Storybook loop still work

Current caveats:

- The text content is clearly example-oriented rather than user-facing product copy.
- It is one of only two exports exposed by the package root today, which reflects current packaging reality rather than product importance.

## How To Choose Between Similar Components

If you are deciding between components, use the following heuristics:

- Choose `select-wallet` when the user is picking a wallet extension.
- Choose `select-handle` when the user is choosing from a text list and may need footer buttons.
- Choose `large-handle-selector` when the handle image should drive recognition.
- Choose `dropdown-button` when the user already has an active handle context and needs a compact launcher for additional choices.
- Choose `handle-small-search` when you want a shared search affordance instead of building one inline.
- Choose `confirm-popup` or `error-popup` when the app needs shared dialog treatments rather than custom message overlays.

The spec docs describe how each component is wired, but from a product point of view the important distinction is this: most components in this package render a familiar shell around data and behaviors that still belong to the host application.
