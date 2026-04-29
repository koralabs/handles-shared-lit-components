# Build, Storybook, And Release

## Overview

This repo is published as an npm package, not deployed as a standalone application. That shapes the local workflow:

- source code is authored in `src`
- TypeScript compiles to `lib`
- Storybook examples are part of the developer experience
- GitHub Actions publishes the package

For maintainers, the important point is that build output, checked-in artifacts, stories, and release automation are connected. If one part changes, the others need to be checked too.

## Package Metadata

Current `package.json` facts:

- package name: `@koralabs/handles-shared-lit-components`
- version: `0.3.12`
- package type: `module`
- homepage: `https://github.com/koralabs/handles-shared-lit-components`
- repository URL points at the same GitHub repo

Dependencies:

- `lit`
- `lit-html`

Notable dev dependencies:

- `typescript`
- `ts-lit-plugin`
- `@web/dev-server`
- `@web/dev-server-storybook`
- `@storybook/addon-essentials`
- `concurrently`

The dependency set is intentionally light and aligned with a small shared UI package rather than a full application framework.

## Available Scripts

### `npm run build`

Runs:

```bash
tsc
```

This compiles `src` to `lib`, emits declaration files, and fails on TypeScript errors because `noEmitOnError` is enabled.

Use it when:

- validating any source change
- preparing updated `lib` output
- checking that Storybook stories still typecheck as part of the repo

### `npm run build:local`

Runs:

```bash
yarn build && cp package.json ./lib/package.json && cd lib && npm i --production
```

This script appears intended for local linking or testing of the compiled output as a package-shaped directory.

Operational implications:

- it assumes `yarn` is available even though the repo also carries `package-lock.json`
- it copies `package.json` into `lib`
- it installs production dependencies inside `lib`

That makes it useful for package-consumption experiments, but it also reflects mixed package-manager assumptions that maintainers should keep in mind.

### `npm run storybook`

Runs:

```bash
tsc && concurrently -k -r "tsc --watch --preserveWatchOutput" "wds --watch -c .storybook/server.mjs --hmr"
```

This establishes an incremental development loop:

- initial TypeScript build
- background TypeScript watch
- web dev server with Storybook integration

Use it when:

- iterating on component visuals
- validating that a changed component still renders in example form
- checking how slots, props, and callbacks behave in a browser context

## TypeScript Configuration

`tsconfig.json` encodes several important decisions:

- modern `ESNext` target and module output
- DOM library support
- emitted declarations and declaration maps
- experimental decorators enabled
- `useDefineForClassFields: false`, which is common in Lit projects that rely on decorator semantics
- `jsx: react-jsx`, which is relevant because the repo also contains a template helper with React-like prop naming even though the main component system is Lit
- `ts-lit-plugin` in strict mode

Maintainer takeaway:

- changes to decorators, property definitions, or Lit templates should always be checked through `npm run build`
- if new files are added, they should preserve the same decorator and module assumptions unless the whole package is being modernized deliberately

## Storybook Notes

The repo contains both stories and Storybook configuration, but the current setup should be understood carefully.

Story sources:

- live authoring files are in `src/stories`
- compiled outputs are in `lib/stories`

Configured story glob:

- `.storybook/main.js` points to `../lib/src/stories/**/*.stories.{js,md,mdx}`

That means maintainers should verify Storybook behavior whenever they touch the docs, demo setup, or output layout. The codebase currently documents a path that does not line up with the checked-in `lib/stories` structure.

The safest workflow is:

1. run `npm run build`
2. inspect the compiled story output under `lib`
3. run `npm run storybook`
4. confirm the expected stories appear

If story discovery is inconsistent, the first place to inspect is the `.storybook/main.js` path configuration.

## Checked-In Build Output

The `lib` folder is present in the repository. That means:

- generated artifacts are part of the tracked tree
- maintainers should expect source edits to produce corresponding compiled changes
- Storybook and publish workflows may depend on the compiled layout being present and up to date

This is different from repos that ignore build output entirely. Here, source and generated files are part of one operational unit.

For documentation-only changes, `lib` should normally remain unchanged.

## Publish Workflow

The GitHub Actions workflow is `.github/workflows/deploy.yml`.

Trigger conditions:

- push to `master`
- manual `workflow_dispatch`

Job characteristics:

- job name: `Deploying from ${{ github.ref_name }}`
- environment: `mainnet`
- runner: `ubuntu-latest`

Publish mechanism:

- checks out the repo
- downloads the shared `main.sh` deployment script from `koralabs/adahandle-deployments`
- runs it with environment variables indicating an npm publish

Relevant environment variables in the workflow:

- `DEPLOYMENT_TYPE: npm-publish`
- `NODE_VERSION: 20`
- `IS_PUBLIC: true`

This tells maintainers three important things:

- publishing behavior is standardized through the shared deployment repo rather than defined inline
- branch correctness matters because the workflow listens to `master`
- npm package publication is part of the expected repository lifecycle, not an afterthought

## Branching Reality

The repository currently publishes from `master`, and `origin/master` is the remote default branch. Any local or external process that assumes `main` is out of sync with the actual repo configuration.

Why this matters:

- release instructions must name the real publish branch
- automation should not be updated casually without checking the workflow trigger
- maintainers working across the Kora ecosystem should note this repo-specific exception if other repos have already standardized on `main`

If the branch is renamed later, the workflow, package docs, and any downstream automation should be updated together.

## Verification For Documentation-Only Work

For documentation-only changes in this repo, a reasonable verification sequence is:

```bash
npm run build
find docs -type f | sort
python3 - <<'PY'
from pathlib import Path
import re
total = 0
for path in Path('docs').rglob('*.md'):
    if path.parts[1] in {'product', 'spec'}:
        total += len(re.findall(r\"\\b\\w+\\b\", path.read_text()))
print(total)
PY
```

Interpretation:

- `npm run build` proves the source package still compiles
- listing docs confirms the new documentation tree is present
- the word-count check proves readiness content exists in both `docs/product` and `docs/spec`

## Current Risks For Future Maintainers

When changing the repo’s packaging or developer workflow, watch for these risks:

- expanding the root export surface without documenting it can create accidental public API
- changing Storybook paths without verifying compiled layout can silently break demos
- changing branch names without updating publish workflow can stop releases
- changing source files without rebuilding can leave `lib` stale relative to `src`
- assuming all components are self-contained interactive controls can lead to incorrect host integration, because several controls are intentionally presentational

## Recommended Maintenance Discipline

For changes that affect runtime code:

1. update the source in `src`
2. run `npm run build`
3. verify the affected story if one exists
4. check whether `lib` changed as expected
5. update docs when the public behavior or workflow changed

For changes that affect packaging:

1. inspect `package.json`
2. inspect `tsconfig.json`
3. inspect `.storybook`
4. inspect `.github/workflows/deploy.yml`
5. document the new contract in `docs/spec`

That discipline is the simplest way to keep this package usable across the Handles ecosystem without letting its implicit conventions drift further out of sync with the code.
