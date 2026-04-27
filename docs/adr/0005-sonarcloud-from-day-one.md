# ADR-0005 — Integrate SonarCloud from day one via GitHub Actions

## Version

1.0.0

## Date

2026-03-07

## Status

Accepted

## Context

Maintaining high code quality from project inception prevents technical debt accumulation and establishes consistent standards. Code quality encompasses not just functional correctness but also maintainability, security, and adherence to best practices. Retroactively integrating quality gates is more difficult than establishing them early.

Alternative approaches like relying solely on local developer tooling or post-hoc code reviews lack enforcement and consistency. Manual SonarCloud scans outside of CI are prone to omission. Integrating SonarCloud only through its automatic analysis (without GitHub Actions) would prevent us from providing test coverage data (lcov.info) that enhances Sonar's analysis capabilities. Using other CI systems would not leverage our existing GitHub infrastructure.

## Decision

We will integrate SonarCloud code quality analysis from project inception using GitHub Actions, configured to run on every push and pull request to the main branch.

## Consequences

This approach provides a clean baseline from commit one, with SonarCloud's Quality Gate enforced on every push to main—zero issues permitted. The GitHub Actions workflow captures test coverage (`lcov.info`) from `npm run test:coverage:ci` and feeds it to SonarCloud for enhanced analysis. Locally, `eslint-plugin-sonarjs` provides immediate feedback in developers' IDEs, allowing issues to be addressed before committing. This combination ensures consistent code quality standards across the team and prevents degradations from being merged. Additionally, we use the free tier of SonarCloud, which eliminates cost concerns while providing essential code quality analysis.
