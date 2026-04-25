import type { LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

/** Props for the gradient-painted Lucide icon. */
export interface GradientIconProps {
  readonly icon: LucideIcon
  readonly size: string | number
  readonly gradientId: string
  readonly colorStart: string
  readonly colorEnd: string
  /**
   * CSS gradient variable (e.g. `var(--seal-gradient-primary)`) or raw gradient string.
   * Used to resolve the SVG linearGradient direction so it matches the token.
   */
  readonly gradientSource: string
}

const VIEWBOX_SIZE = 24
export const GRADIENT_FALLBACK_COORDS = { x1: '0', y1: '0', x2: '24', y2: '24' }

// Converts CSS gradient direction keywords to an angle in degrees (0° = up, clockwise).
function keywordsToAngle(d: string): number {
  const b = d.includes('bottom')
  const t = d.includes('top')
  const r = d.includes('right')
  const l = d.includes('left')
  if (b && r) return 135
  if (b && l) return 225
  if (t && r) return 45
  if (t && l) return 315
  if (r) return 90
  if (l) return 270
  if (b) return 180
  return 0
}

const GRADIENT_PREFIX = 'linear-gradient('

// Finds the inner content of `linear-gradient(...)` by tracking paren depth.
function extractGradientInner(gradientStr: string): string {
  const start = gradientStr.indexOf(GRADIENT_PREFIX)
  if (start === -1) return ''
  let depth = 0
  let end = -1
  for (let i = start + GRADIENT_PREFIX.length - 1; i < gradientStr.length; i++) {
    if (gradientStr[i] === '(') depth++
    else if (gradientStr[i] === ')') {
      if (--depth === 0) {
        end = i
        break
      }
    }
  }
  return end !== -1 ? gradientStr.slice(start + GRADIENT_PREFIX.length, end) : ''
}

// Splits a string by top-level commas, ignoring commas inside nested parens.
function splitTopLevelCommas(str: string): string[] {
  const parts: string[] = []
  let nestDepth = 0
  let buf = ''
  for (const ch of str) {
    if (ch === '(') nestDepth++
    else if (ch === ')') nestDepth--
    if (ch === ',' && nestDepth === 0) {
      parts.push(buf.trim())
      buf = ''
    } else {
      buf += ch
    }
  }
  if (buf.trim()) parts.push(buf.trim())
  return parts
}

// Returns true when a gradient token is a direction ("to right", "45deg", etc.).
function isGradientDirection(token: string): boolean {
  const t = token.trimStart()
  const c = t[0] ?? ''
  return t.toLowerCase().startsWith('to ') || c === '-' || c === '.' || (c >= '0' && c <= '9')
}

// Strips a trailing position hint like "50%" from a color stop ("red 50%" → "red").
function stripPositionHint(stop: string): string {
  const s = stop.trim()
  const i = s.lastIndexOf(' ')
  if (i === -1) return s
  return s.slice(i + 1).endsWith('%') ? s.slice(0, i).trim() : s
}

/**
 * Extracts the first and last color stops from a CSS `linear-gradient()` string.
 * Skips the direction token ("to right", "45deg", etc.) if present.
 * Returns `['currentColor', 'currentColor']` when parsing fails.
 */
export function parseGradientStopColors(gradientStr: string): [string, string] {
  const inner = extractGradientInner(gradientStr)
  if (!inner) return ['currentColor', 'currentColor']
  const parts = splitTopLevelCommas(inner)
  const colors = isGradientDirection(parts[0] ?? '') ? parts.slice(1) : parts
  const first = stripPositionHint(colors[0] ?? 'currentColor')
  const last = stripPositionHint(colors.at(-1) ?? colors[0] ?? 'currentColor')
  return [first || 'currentColor', last || 'currentColor']
}

function parseSvgGradientCoords(gradientStr: string): typeof GRADIENT_FALLBACK_COORDS {
  // [^,)]+ is greedy — no backtracking risk.
  const match = /linear-gradient\(([^,)]+)/.exec(gradientStr)
  if (!match?.[1]) return GRADIENT_FALLBACK_COORDS
  const d = match[1].toLowerCase().trim()
  const angleDeg = d.includes('deg') ? Number.parseFloat(d) : keywordsToAngle(d)
  const rad = (angleDeg * Math.PI) / 180
  const half = VIEWBOX_SIZE / 2
  return {
    x1: String(half - Math.sin(rad) * half),
    y1: String(half + Math.cos(rad) * half),
    x2: String(half + Math.sin(rad) * half),
    y2: String(half - Math.cos(rad) * half),
  }
}

/**
 * Resolves a CSS gradient variable or raw gradient string into SVG linearGradient
 * coordinate pairs representing the gradient direction.
 *
 * Returns `GRADIENT_FALLBACK_COORDS` when the gradient string cannot be parsed
 * or when the CSS variable is not yet resolved (e.g. in JSDOM during testing).
 */
export function resolveGradientCoords(gradientSource: string): typeof GRADIENT_FALLBACK_COORDS {
  const str = gradientSource.startsWith('var(')
    ? getComputedStyle(document.documentElement)
        .getPropertyValue(gradientSource.slice(4, -1).trim())
        .trim()
    : gradientSource
  if (!str) return GRADIENT_FALLBACK_COORDS
  return parseSvgGradientCoords(str)
}

/**
 * Renders a Lucide icon with its stroke painted via an SVG linearGradient.
 *
 * Mirrors Flutter's `ShaderMask` approach: both text and icon are covered by the
 * same gradient shader. The linearGradient direction is kept in sync with the
 * active CSS gradient token via a `MutationObserver` on `<html class>`.
 */
export function GradientIcon({
  icon: IconEl,
  size,
  gradientId,
  colorStart,
  colorEnd,
  gradientSource,
}: GradientIconProps) {
  // For raw gradient strings (custom variant), resolve on the spot during render.
  // For CSS variable references, start with GRADIENT_FALLBACK_COORDS and let the
  // MutationObserver update coords once ThemeProvider applies the theme class.
  const [coords, setCoords] = useState(() =>
    gradientSource.startsWith('var(')
      ? GRADIENT_FALLBACK_COORDS
      : resolveGradientCoords(gradientSource),
  )

  useEffect(() => {
    // Re-read the CSS variable whenever the theme class on <html> changes.
    const readCoords = () => {
      setCoords(resolveGradientCoords(gradientSource))
    }
    const observer = new MutationObserver(readCoords)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => {
      observer.disconnect()
    }
  }, [gradientSource])

  return (
    <span aria-hidden style={{ display: 'inline-flex' }}>
      <IconEl size={size} stroke={`url(#${gradientId})`}>
        <defs>
          <linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1={coords.x1}
            y1={coords.y1}
            x2={coords.x2}
            y2={coords.y2}
          >
            <stop offset="0%" stopColor={colorStart} />
            <stop offset="100%" stopColor={colorEnd} />
          </linearGradient>
        </defs>
      </IconEl>
    </span>
  )
}
