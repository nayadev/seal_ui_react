const DOT_SIZE = '6px'
const DOT_SPACING = '4px'
const ANIMATION_DURATION = '1.2s'
// Each dot starts its bounce 15% of the cycle after the previous one (matching Flutter's kDelayMultiplier).
const ANIMATION_DELAY_STEP = 0.18

interface BouncingDotsProps {
  color?: string | undefined
}

/** Three-dot bouncing loading animation — mirrors Flutter's SealBouncingDots. */
export function BouncingDots({ color }: Readonly<BouncingDotsProps>) {
  return (
    <span className="seal-bouncing-dots inline-flex items-center" style={{ gap: DOT_SPACING }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block flex-shrink-0 rounded-full"
          style={{
            width: DOT_SIZE,
            height: DOT_SIZE,
            backgroundColor: color ?? 'currentColor',
            animationName: 'seal-bounce-dot',
            animationDuration: ANIMATION_DURATION,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDelay: `${(i * ANIMATION_DELAY_STEP).toFixed(2)}s`,
          }}
        />
      ))}
    </span>
  )
}
