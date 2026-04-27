# ADR-0001 — Use Vite over Next.js or Create React App

## Version

1.0.0

## Date

2026-03-07

## Status

Accepted

## Context

SealUI React is a token-driven React design system intended to be reusable across multiple applications. As a library rather than a standalone application, it does not require server-side rendering, routing, or other framework-level features. The build system needs to efficiently compile TypeScript, process JSX, handle CSS (including Tailwind CSS), and produce optimized bundles for consumption by other applications.

Create React App was officially deprecated in 2022 and lacks active maintenance, making it unsuitable for a modern project. Next.js, while popular, introduces unnecessary complexity for a component library with features like file-based routing, API routes, and SSR that are not needed for a UI kit. Manual Webpack configuration would require significant setup overhead without proportional benefits for this use case.

## Decision

We will use Vite as the build tool for SealUI React.

## Consequences

Development benefits include zero-configuration setup, native ES module support, fast hot module replacement (HMR), and optimized Rollup-based builds ideal for library output. Vite provides first-class integration with Storybook (@storybook/react-vite) and Vitest, aligning with our testing and documentation workflows.

By choosing Vite, we intentionally exclude SSR support by design, as this responsibility belongs to consuming applications. Bundle output is pure ES modules, requiring consumers to have compatible build systems. This decision maintains focus on our core purpose as a design system library while leveraging modern, efficient tooling.
