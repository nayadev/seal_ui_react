# ADR-0004 — Publish Storybook to Chromatic for visual regression

## Version

1.0.0

## Date

2026-03-07

## Status

Accepted

## Context

With multiple themes each supporting dark and light modes, SealUI React has numerous visual configurations to test. Manual visual testing across these combinations is error-prone and doesn't scale. As a design system, visual consistency is critical—unintended changes to component appearance can break consuming applications' UIs. A key consideration was enabling AI-assisted development workflows through the Storybook MCP server.

While Percy offers similar visual testing, it requires separate setup and lacks Storybook's native integration. Playwright screenshots would demand custom test writing and maintenance. Forgoing visual testing risks regressions going undetected until they reach consumers. Chromatic provides the optimal balance: purpose-built for Storybook, seamless integration, and a generous free tier for open-source projects.

## Decision

We will publish Storybook to Chromatic for automated visual regression testing across all theme and mode combinations.

## Consequences

Every pull request triggers a Chromatic build that compares Storybook stories against the baseline, generating visual diffs for review. This catches unintended UI changes early in the development process. Visual diffs require manual approval through Chromatic's UI, ensuring intentional design changes are explicitly accepted. Our CI now depends on Chromatic's availability and correct configuration, making the CHROMATIC_PROJECT_TOKEN secret essential for builds. Using the free tier eliminates cost concerns while providing essential visual regression protection. Additionally, Chromatic enables publishing the Storybook MCP server, which supports AI-assisted development workflows.
