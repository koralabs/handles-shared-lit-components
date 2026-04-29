# Component Contracts

This page records the practical contract of every component and helper in the repo. It is intentionally explicit because the package currently mixes side-effect imports, callback props, slots, and a narrow root export surface.

## Conventions Used Here

- “Properties” are reactive Lit properties or function props accepted by the element.
- “Slots” are named insertion points exposed to consumers.
- “Outputs” are callbacks invoked by the component or browser events dispatched from it.
- “Controlled by parent” means the host application is expected to own the state transition and re-render the component accordingly.

## Shared Button Family

Source: `src/web-components/Button/index.ts`

Registered tags:

- `shared-button-small`
- `shared-button-medium`
- `shared-button-large`

### Properties

- `buttonColor?: string`
- `textColor?: string`
- `hoverColor?: string`

### Slots

- `shared-button`: the button label/content

### Outputs

- no custom callbacks
- no custom events
- native click can still be listened for on the host element

### Render Behavior

All three tags share the same base class and differ only in CSS sizing:

- small: 12px font, `10px 16px` padding
- medium: 14px font, `11px 20px` padding
- large: 16px font, `12px 24px` padding

The rendered `<button>` receives the background and text colors via inline style bindings.

### Integration Notes

- The component is a simple shell and does not expose disabled or loading semantics.
- The label must be passed via slot content, usually wrapped in `<div slot="shared-button">...</div>` inside the custom element.

## `select-wallet`

Source: `src/web-components/SelectWallet/index.ts`

Custom element tag: `select-wallet`

### Properties

- `slottedButtonsStyling: string = ''`
- `onFirstUpdated: Function = () => {}`
- `onScroll: Function = () => {}`
- `onSelectWallet: Function = (wallet) => {}`
- `wallets: any[] = []`

Internal reactive state:

- `selectedWallet: string = ''`

### Slots

- `slottedButtons`

### Outputs

- invokes `onFirstUpdated()` during `firstUpdated()`
- invokes `onSelectWallet(wallet)` when the user clicks a wallet row
- binds `onScroll` directly to the wallet list container’s `scroll` event

### Data Shape Expected

Each wallet row expects at least:

- `wallet.key`
- `wallet.name`
- `wallet.icon`

### Render Behavior

- Displays a fixed “Choose your wallet” header
- Shows a scrollable list if `wallets.length > 0`
- Shows “No supported wallet extensions found.” if the list is empty
- Renders a radio-style selected indicator through `renderSelectIcon`

### Integration Notes

- The internal `selectedWallet` state is not updated in the click handler. The current handler calls only `onSelectWallet(wallet)`. As a result, consumers should treat the built-in selected styling as incomplete until the component is updated or wrapped.
- Because selection is callback-driven instead of event-driven, usage is simplest in Lit templates or other frameworks that can pass function properties cleanly.
- Footer buttons are not provided by default; the host supplies them through the slot.

## `handle-small-search`

Source: `src/web-components/SmallHandleSearch/index.ts`

Custom element tag: `handle-small-search`

### Properties

- `inputValue?: string`
- `searching: boolean = false`

### Slots

- none

### Outputs

- dispatches `input-change` as a bubbling, composed `CustomEvent`
- event detail shape: `{ inputValue: string }`

### Methods With External Effect

- `handleInput(event)` trims the input, sets local state, dispatches `input-change`, and requests an update
- `clearSearch()` clears local state and requests an update

### Render Behavior

- Shows a search icon on the left
- Uses `search for your handle` as the default placeholder
- Changes the placeholder on focus to `Type $ for exact match`
- Shows a clear icon region that becomes visible when `searching` is true

### Integration Notes

- The component is suitable as a child of `select-handle` or `large-handle-selector`, but it can also be used independently.
- Clearing the search does not itself dispatch a new `input-change` event. If the host depends on an explicit “cleared” event, it must add that behavior around the component.

## `dropdown-button`

Source: `src/web-components/DropdownButton/index.ts`

Custom element tag: `dropdown-button`

### Properties

- `dropdownHandle: string = ''`
- `dropdownPositioning: string = ''`

Internal reactive state:

- `dropdownOpen: boolean = false`

### Slots

- `slottedDropdown`

### Outputs

- no callback props
- no custom events
- internal click handler toggles the dropdown open state

### Render Behavior

- Displays a Handles logo SVG
- Displays `dropdownHandle` or the fallback text `Choose Handle`
- Rotates the arrow icon when `dropdownOpen` is true
- Applies `dropdownPositioning` as the inline style of the dropdown container while open
- Hides the dropdown content entirely when closed with `display: none;`

### Integration Notes

- Since the component does not emit an “opened” or “closed” event, consumers who need side effects tied to open state must wrap or extend it.
- The component imports `LitElement` from `lit-element` rather than `lit`, which is inconsistent with the rest of the repo but currently part of the implementation reality.

## `select-handle`

Source: `src/web-components/SelectHandle/index.ts`

Custom element tag: `select-handle`

### Properties

- `handleData: any[] = []`
- `loadingImg: boolean = false`
- `slottedButtonsStyling: string = ''`
- `slottedSearchStyling: string = ''`
- `imageUrl: string = ''`
- `activeHandle: any = {}`
- `onFirstUpdated: Function = () => {}`
- `onScroll: Function = () => {}`
- `onSelectHandle: Function = (handle) => {}`

### Slots

- `slottedSearch`
- `slottedButtons`
- `slottedLoader`

### Outputs

- invokes `onFirstUpdated()` during `firstUpdated()`
- invokes `onScroll` from the outer scroll container
- invokes `onSelectHandle({ ...handle })` when the user clicks a handle row

### Data Shape Expected

The component reads:

- `handle.name`

The parent is also expected to pass:

- `activeHandle.name`
- `imageUrl` for the active handle image

### Render Behavior

- Renders the slotted search container at the top
- Optionally renders a current-handle block when `activeHandle?.name` is truthy
- Renders each list row with a `$` prefix
- Highlights the row whose `handle.name` matches `activeHandle?.name`
- Shows the loader slot instead of the active image when `loadingImg` is true
- Also appends loader slot content after the list when `loadingImg` is true

### Integration Notes

- The component does not derive image URLs from the handle object; the current image path is supplied separately as `imageUrl`.
- Because `onSelectHandle` receives a shallow copy of the clicked handle, host code can safely enrich or compare the returned object without mutating the array element directly.
- Styling hooks for the search and button regions are raw string properties, not structured style APIs.

## `large-handle-selector`

Source: `src/web-components/LargeHandleSelector/index.ts`

Custom element tag: `large-handle-selector`

### Properties

- `handleData: any[] = []`
- `handleDataArray: any`
- `dropdownOpen: boolean = false`
- `isLoading: boolean = false`
- `imageUrl: string = ''`
- `imgWidth: string = ''`
- `imgHeight: string = ''`
- `slottedSearchStyling: string = ''`
- `onFirstUpdated: Function = () => {}`
- `onScroll: Function = () => {}`
- `onSelectHandle: Function = (handle) => {}`

### Slots

- `slottedSearch`
- `slottedLoader`

### Outputs

- invokes `onFirstUpdated()` during `firstUpdated()`
- invokes `onScroll` on the inner scroll wrapper
- invokes `onSelectHandle(handle)` when the user clicks a handle image card

### Data Shape Expected

The component is most aligned with the shared `WalletHandle` interface and reads:

- `handle.active`
- `handle.image`

### Render Behavior

- Displays a fixed “Choose your handle” title
- Chooses image dimensions based on list size:
  - one item: `19rem`
  - two to ten items: `10rem`
  - more than ten items: `5rem`
- Renders loader slot content when a handle item lacks `image`
- Applies an `active` class when `handle.active` is truthy
- Wraps the scroll area with a gradient overlay

### Integration Notes

- `imageUrl` exists as a property but the current render path uses `handleData.image` for each tile rather than the `imageUrl` property.
- The `handleDataArray`, `dropdownOpen`, and `isLoading` properties are currently not central to the rendered output and should not be treated as stable public API without intentional cleanup.

## `disconnect-wallet-button`

Source: `src/web-components/DisconnectWalletButton/index.ts`

Custom element tag: `disconnect-wallet-button`

### Properties

- `walletIconUrl!: string`
- `showHoverIcon: boolean = false`
- `onClick: Function = () => {}`

### Slots

- none

### Outputs

- invokes `onClick()` when the wrapper is clicked

### Render Behavior

- Shows `walletIconUrl` if present, otherwise a generic wallet icon
- On hover, swaps the wallet icon for a disconnect glyph
- Displays tooltip text `Disconnect Wallet`

### Integration Notes

- This component is optimized for a compact visual affordance, not a verbose CTA.
- The hover-driven affordance means parent apps should consider touch-device discoverability when placing it in mobile-heavy flows.

## `confirm-popup`

Source: `src/web-components/ConfirmPopup/index.ts`

Custom element tag: `confirm-popup`

### Properties

- `open: boolean = false`
- `message: string = ''`
- `secondMessage: string = ''`
- `confirmButtonLabel: string = ''`
- `cancelButtonLabel: string = ''`
- `onConfirm: (() => void) | null = null`
- `onCancel: (() => void) | null = null`

### Slots

- none

### Outputs

- invokes `onConfirm()` if present, then closes itself
- invokes `onCancel()` if present, then closes itself

### Render Behavior

- Applies `show` class to the modal root when `open` is true
- Renders two `shared-button-small` buttons with fixed color treatments
- Uses `message` and `secondMessage` as the dialog body copy

### Integration Notes

- The component mutates its own `open` state via `closePopup()`. If the host mirrors `open` externally, it should keep that state in sync.
- No semantic close event is emitted. Consumers must infer closure from the callbacks they pass or by inspecting state.

## `error-popup`

Source: `src/web-components/ErrorPopup/index.ts`

Custom element tag: `error-popup`

### Properties

- `open: boolean = true`
- `message: string = ''`
- `messageTitle: string = ''`
- `countdown: number = 5`

Internal fields:

- `countdownInterval: number | null = null`
- `maxCountdown: number = 5`
- `isPaused: boolean = false`

### Slots

- `customError`

### Outputs

- dispatches `error-popup-closed` on `window` when `closePopup()` runs

### Lifecycle Behavior

- `connectedCallback()` attaches hover listeners
- `disconnectedCallback()` removes hover listeners
- `firstUpdated()` starts the countdown timer

### Render Behavior

- Renders a modal shell with alert icon, title, body, and close button
- Shrinks the progress bar as `countdown` decreases
- Pauses the countdown on mouse enter
- Resumes on mouse leave
- Resets countdown to `maxCountdown` when closed

### Integration Notes

- The public `countdown` property suggests configurability, but the internal timer logic resets from a fixed `maxCountdown` value of five seconds. Treat the five-second behavior as the current authoritative implementation.
- Because the close event is dispatched on `window`, hosts should register listeners accordingly if they need closure notifications.

## `custom-toggle`

Source: `src/web-components/CustomToggle/index.ts`

Custom element tag: `custom-toggle`

### Properties

- `isActive: boolean = false`
- `smallToggle: boolean = false`

### Slots

- none

### Outputs

- no custom callbacks
- no custom events

### Render Behavior

- Applies `toggled` and `small` classes based on the supplied boolean props
- Renders a line and circle visual that represents the toggle position

### Integration Notes

- The component does not manage its own state transitions. A parent app should update `isActive` in response to user interaction if the control is meant to be interactive.

## `custom-checkbox`

Source: `src/web-components/CustomCheckBox/index.ts`

Custom element tag: `custom-checkbox`

### Properties

- `checked: boolean = false`
- `smallCheckbox: boolean = false`
- `disabled: boolean = false`

### Slots

- none

### Outputs

- no custom callbacks
- no custom events

### Render Behavior

- Applies `checked`, `small`, and `disabled` classes to the wrapper
- Renders the checkmark SVG only when `checked` is true

### Integration Notes

- This component is display-only in its current form. If used as an interactive form control, the host should handle accessibility roles, keyboard behavior, and state updates.

## `radio-button`

Source: `src/web-components/RadioButton/index.ts`

Custom element tag: `radio-button`

### Properties

- `isSelected: boolean = true`
- `isSmall: boolean = true`

### Slots

- none

### Outputs

- none

### Render Behavior

- Renders nested selected or unselected divs
- Applies a small variant class when `isSmall` is true

### Integration Notes

- This is a styling primitive rather than a complete radio input control.

## `state-example`

Source: `src/web-components/StateExample/index.ts`

Custom element tag: `state-example`

### Properties

- `count: number = 0`
- `title: string = ''`

### Slots

- default slot

### Outputs

- no custom callbacks
- no custom events

### Render Behavior

- Renders a heading and a button that increments `count`
- Uses `--my-counter-text-color` CSS custom property to color all text

### Integration Notes

- This is a demo component and should not be treated as a domain-specific production primitive.

## Template Helpers In `src/components`

These helpers are part of the repo contract even though they are not registered custom elements.

### `Button`

Source: `src/components/Button/index.ts`

Properties via `ButtonProps`:

- `primary?: boolean`
- `backgroundColor?: string`
- `size?: 'small' | 'medium' | 'large'`
- `label: string`
- `onClick?: () => void`

Behavior:

- returns a Lit template for a styled native button
- computes a primary or secondary class
- applies `backgroundColor` through `styleMap`

Notes:

- This helper is separate from the custom-element button family and resembles a Storybook-friendly template primitive.

### `CustomLoader`

Source: `src/components/CustomLoader/index.ts`

Properties:

- none

Behavior:

- returns a Lit template that renders a dual-SVG animated loader

Notes:

- Suitable for slotted loading surfaces or inline waiting states where a branded loader is desired.

## Cross-Cutting Contract Guidance

If you are integrating or extending this package, the safest assumptions are:

- selector and dialog components prefer callback properties over emitted events
- slotted composition is the main extension mechanism for larger shells
- several controls are presentational only and depend on parent-managed state
- the root package export is incomplete, so direct module imports may still be required

Any future cleanup should document changes against this page explicitly, because the current contract is defined as much by implementation habit as by formal package API design.
