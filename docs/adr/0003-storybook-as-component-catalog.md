# ADR-0003 — Use Storybook as the React component catalog

## Version

1.0.0

## Date

2026-03-07

## Status

Accepted

## Context

As a component library, SealUI React needs an environment for developing, testing, and documenting UI components in isolation. This environment should allow developers to interact with components under various states (loading, disabled, error, etc.) and themes without needing to run an entire application. The solution must support our token-driven theming system and integrate well with our testing workflow (Vitest).

Alternative approaches like building a custom demo app would require significant development and maintenance effort. Ladle and Histoire are newer alternatives but lack the ecosystem maturity and plugin support of Storybook. Importantly, we want to maintain parity with our Flutter implementation (seal_ui_flutter) which uses Widgetbook for similar purposes—choosing Storybook aligns with this philosophy of having a dedicated catalog tool despite different implementations.

## Decision

We will use Storybook as the React component catalog for developing, documenting, and testing SealUI components in isolation.

## Consequences

Storybook provides a rich ecosystem of addons (accessibility, testing, design tools) and integrates seamlessly with our Vitest setup through the @storybook/addon-vitest addon. Stories live alongside components in `src/stories/<Category>/Seal<Name>.stories.tsx`, ensuring documentation stays close to implementation. Every component requires a story, promoting comprehensive documentation. Storybook's MCP (Model Context Plugin) integration enables AI-assisted development workflows. The global toolbar in `preview.tsx` allows seamless switching between our four themes (nebula, arctic, deep_ocean, terminal) and two modes (dark, light), facilitating thorough theme testing.
