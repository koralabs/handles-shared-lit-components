// handle.me#938: the WalletHandle / Asset / BasicAsset contracts now live in
// @koralabs/kora-labs-common (browser-safe, self-contained). Re-export type-only so
// this stays a compile-time-only dependency — the import erases at build time, so the
// Lit web bundle never pulls in kora-labs-common's CommonJS runtime (the CJS/ESM
// interop break this avoids). WalletHandle carries Asset + BasicAsset transitively.
export type { WalletHandle } from '@koralabs/kora-labs-common';
