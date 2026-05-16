# Handles Shared Lit Components Docs

This repository packages the shared Lit-based UI building blocks used across the Kora Labs and Handles frontend ecosystem. The library is small, but it sits on top of important product flows: connecting a Cardano wallet, choosing a handle, confirming user intent, and surfacing transient errors. These docs exist to make the package understandable without reverse-engineering Storybook stories or inspecting each component file by hand.

## Product Docs

- [Product Overview](./product/overview.md)
- [Component Catalog](./product/component-catalog.md)

## Spec Docs

- [Architecture And Packaging](./spec/architecture.md)
- [Component Contracts](./spec/component-contracts.md)
- [Build, Storybook, And Release](./spec/build-release.md)

## Scope

The documentation set is intentionally split into product and spec layers:

- `docs/product` explains why the package exists, which user journeys it supports, and how consuming apps are expected to use it.
- `docs/spec` explains how the package is laid out, what each component exposes, how it is built and published, and where the current implementation has gaps or coupling that maintainers should understand before extending it.

## Current Reality

The repository had no `docs/product` or `docs/spec` content before this update. The package also has a minimal source export surface at the root, a Storybook setup driven by compiled output, and a deploy workflow that publishes on `master`. Those facts are documented explicitly in the linked spec pages so future changes can be made with the actual codebase constraints in mind.
