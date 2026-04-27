# ADR-0002 — Use shadcn/ui with copied code over external dependency

## Version

1.0.0

## Date

2026-03-07

## Status

Accepted

## Context

SealUI React requires a layer of primitive UI components to build upon. These primitives need to be customizable to match our design system's token-driven approach while maintaining accessibility and behavioral correctness. The challenge is determining the best approach to incorporate these primitives: as an external dependency, through direct copying, or via another mechanism.

Using shadcn/ui as an external dependency (e.g., installing via npm) would create version coupling and limit our ability to modify components to fit our token system. Building primitives from scratch would duplicate effort and risk accessibility issues. We need a approach that provides high-quality, accessible primitives while allowing full customization.

## Decision

We will use shadcn/ui's philosophy of copying component code directly into our project rather than importing them as an external dependency.

## Consequences

This approach gives us complete control over each component, allowing us to wrap them with our Seal\* wrappers and pass design tokens through CSS variables. We avoid breaking changes from upstream updates since we control when and how to incorporate changes. However, this means component updates are manual processes—we must explicitly run `npx shadcn@latest add <component>` to get new versions, and we may need to reapply our customizations afterward. The `src/components/ui/` directory is managed exclusively by the shadcn CLI and should never be edited manually, ensuring consistency with the tool's expectations.
