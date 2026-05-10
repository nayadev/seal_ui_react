import * as React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

// Diameter constants from Flutter reference (SealAvatar._kSmallSize / _kDefaultSize / _kLargeSize).
const AVATAR_SIZE_PX = {
  sm: 28,
  md: 40,
  lg: 56,
} as const

type AvatarSize = keyof typeof AVATAR_SIZE_PX

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
  const px = AVATAR_SIZE_PX[size]
  // Font size scales proportionally with avatar diameter, matching Flutter's _kFontSizeRatio.
  const fallbackFontSize = Math.round(px * 0.375)

  return (
    <Avatar style={{ width: px, height: px }} className={cn('shrink-0', className)}>
      {src && <AvatarImage src={src} alt={alt} />}
      <AvatarFallback
        className="bg-[var(--seal-surface-surface-alt)] text-[var(--seal-text-primary)] font-medium"
        style={{ fontSize: fallbackFontSize }}
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
