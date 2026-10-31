# handles-shared-lit-components canonical contract

## Purpose and authority

I am the shared Lit web-component library (`@koralabs/handles-shared-lit-components`): buttons, popups, wallet and Handle pickers used by the front ends. I display what the app gives me and raise events; I hold no keys and never sign. I am published to npm from `.github/workflows/deploy.yml`.


This file and `.enclave` are the operator's gate: a PR that changes any path listed in `.enclave` and merges into `master` needs the operator's approval. Nothing here authorizes signing, spending, minting, burning or editing on-chain contracts or settings. Ecosystem rules (addresses correct 100% of the time, never double-mint, chain-accurate properties) are in the koralabs root `AGENTS.md`.

## Invariants (must never be violated)

1. **No component signs, submits or reads wallet secrets.** The wallet components (`SelectWallet`, `DisconnectWalletButton`) render wallet names and icons the app passes in and emit events; they call no `signTx`, `submitTx` or `signData`. No test asserts this.
2. **Components show the data they are given, unaltered.** Handle names and wallet details are displayed as passed in, with no re-derivation. Enforced in part by `tests/components.test.mjs`, `tests/interaction-components.test.mjs`, `tests/remaining-components.test.mjs` and `tests/coverage-components.test.mjs`.
3. **Events carry what the user chose.** Selection and input events (for example `input-change`) report the user's actual choice. Enforced in part by `tests/interaction-components.test.mjs`.
4. **Publishing is only through the deploy workflow, and only a new version.** OIDC publish after build; a version already on npm is skipped. Workflow property; no test.
5. **No secrets in this repo.** Not enforced by a test.

## Boundaries and known limits

- Lint is a placeholder (`"Error: no lint specified"`); there is no type or style gate beyond `tsc` build.
- Chain correctness of anything displayed is the calling app's responsibility.
- Storybook files under `src/stories/` are demos, not behaviour.

## Refactors needed to enforce this

- Add a test that the wallet components never call signing or submission methods on injected wallets (invariant 1).
- Add a gate that no key or token string is committed (invariant 5), and a real lint step.
