import * as React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

// Diameter expressions using design tokens (SealAvatar._kSmallSize / _kDefaultSize / _kLargeSize).
// sm=28px: dimension-lg(24) + dimension-xxs(4)
// md=40px: dimension-xl(32) + dimension-xs(8)
// lg=56px: dimension-xxl(48) + dimension-xs(8)
const AVATAR_SIZE_EXPR = {
  sm: 'calc(var(--seal-dimension-lg) + var(--seal-dimension-xxs))',
  md: 'calc(var(--seal-dimension-xl) + var(--seal-dimension-xs))',
  lg: 'calc(var(--seal-dimension-xxl) + var(--seal-dimension-xs))',
} as const

const AVATAR_FONT_SIZE_EXPR = {
  sm: 'calc((var(--seal-dimension-lg) + var(--seal-dimension-xxs)) * 0.375)',
  md: 'calc((var(--seal-dimension-xl) + var(--seal-dimension-xs)) * 0.375)',
  lg: 'calc((var(--seal-dimension-xxl) + var(--seal-dimension-xs)) * 0.375)',
} as const

type AvatarSize = keyof typeof AVATAR_SIZE_EXPR

/**
 * Props accepted by `SealAvatar`.
 */
export interface SealAvatarProps {
  /** URL of the avatar image. When absent, shows `fallback` directly. */
  src?: string
  /** Accessible description of the image. */
  alt?: string
  /**
   * Content rendered when `src` is absent or the image fails to load.
   * Typically a short string of initials: `fallback="JD"`.
   */
  fallback?: React.ReactNode
  /** Additional CSS classes applied to the root element. */
  className?: string
}

// Not exported — size is exposed through named sub-components.
type SealAvatarImplProps = SealAvatarProps & { size?: AvatarSize }

function SealAvatarImpl({
  src,
  alt = '',
  fallback,
  size = 'md',
  className,
}: Readonly<SealAvatarImplProps>) {
  const sizeExpr = AVATAR_SIZE_EXPR[size]
  // Font size scales proportionally with avatar diameter, matching Flutter's _kFontSizeRatio.
  const fontSizeExpr = AVATAR_FONT_SIZE_EXPR[size]

  return (
    <Avatar style={{ width: sizeExpr, height: sizeExpr }} className={cn('shrink-0', className)}>
      {src && <AvatarImage src={src} alt={alt} />}
      <AvatarFallback
        className="bg-[var(--seal-surface-surface-alt)] text-[var(--seal-text-primary)] font-style-small"
        style={{ fontSize: fontSizeExpr }}
      >
        {fallback}
      </AvatarFallback>
    </Avatar>
  )
}

SealAvatarImpl.displayName = 'SealAvatar'

/** Small avatar — 28 px diameter. */
const Small = (props: Readonly<SealAvatarProps>) => <SealAvatarImpl {...props} size="sm" />
Small.displayName = 'SealAvatar.Small'

/** Large avatar — 56 px diameter. */
const Large = (props: Readonly<SealAvatarProps>) => <SealAvatarImpl {...props} size="lg" />
Large.displayName = 'SealAvatar.Large'

/**
 * Circular avatar that displays a profile image with an initials fallback.
 *
 * Shows `fallback` when `src` is absent or the image fails to load. The default
 * renders at 40 px. Use `SealAvatar.Small` (28 px) or `SealAvatar.Large` (56 px)
 * for named size variants.
 *
 * @example
 * <SealAvatar src="https://example.com/photo.jpg" alt="Jane Doe" fallback="JD" />
 *
 * @example
 * <SealAvatar.Small fallback="AB" />
 * <SealAvatar.Large src={user.photoUrl} alt={user.name} fallback={user.initials} />
 */
export const SealAvatar = Object.assign(SealAvatarImpl, { Small, Large })
