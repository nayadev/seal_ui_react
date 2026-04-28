# ADR-0006 — Replace Changesets with release-please for automated versioning

## Version

1.0.0

## Date

2026-04-28

## Status

Accepted

## Context

The project uses `@changesets/cli` for versioning, but it was never formally adopted via an ADR and requires manual authoring of changeset files for every PR. This creates friction: contributors must remember to run `npm run changeset`, choose the bump type manually, and write a summary — steps that are easy to skip or get wrong.

The project already enforces Conventional Commits via `commitlint`. This structured commit history is a reliable source of truth for determining version bumps and generating changelogs automatically, making the manual changeset step redundant.

Alternative approaches considered:

- **Keep Changesets** — retains manual control over bump type per PR, but adds contributor overhead and does not leverage existing commit conventions.
- **semantic-release** — fully automated end-to-end; publishes on every qualifying commit to `main` with no human review step before the release.
- **release-please** — reads Conventional Commits, opens a release PR with the generated CHANGELOG and proposed version bump, and only creates the tag and GitHub Release when the PR is merged. Releases happen on the author's schedule, not automatically.

## Decision

We will replace `@changesets/cli` with `release-please` (via the `googleapis/release-please-action` GitHub Action). The workflow:

1. On every push to `main`, `release-please` inspects commits since the last release and, if there are releasable changes, opens or updates a release PR with the calculated version bump and CHANGELOG entry.
2. The release PR stays open and accumulates changes until the maintainer merges it.
3. On merge of the release PR, `release-please` creates the git tag and GitHub Release automatically.

The `.changeset/` directory, `@changesets/cli` dependency, and the `changeset` / `version` / `release` scripts in `package.json` will be removed.

## Consequences

Contributors no longer need to author changeset files — Conventional Commit messages are sufficient. The release cadence remains under maintainer control (merge the PR when ready). CHANGELOG generation and git tagging become fully automated and consistent. The tradeoff is that bump type is inferred from commit types (`feat` → minor, `fix` → patch, `feat!` / `BREAKING CHANGE` → major) rather than explicitly declared per PR; this is acceptable given the commitlint enforcement already in place.
