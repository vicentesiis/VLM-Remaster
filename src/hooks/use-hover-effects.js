import { cn } from "@/lib/utils"

/**
 * Hover effect variants with different intensities
 */
export const hoverVariants = {
  none: "",
  
  subtle: cn(
    "transition-all duration-200 ease-out",
    "hover:shadow-sm hover:-translate-y-0.5 hover:brightness-105",
    "focus-within:ring-1 focus-within:ring-foreground/10"
  ),
  
  medium: cn(
    "transition-all duration-300 ease-out",
    "hover:shadow-md hover:-translate-y-1 hover:brightness-105",
    "focus-within:ring-2 focus-within:ring-foreground/20"
  ),
  
  strong: cn(
    "transition-all duration-300 ease-out",
    "hover:shadow-lg hover:-translate-y-2 hover:brightness-110 hover:scale-[1.02]",
    "focus-within:ring-2 focus-within:ring-foreground/20"
  ),
  
  glow: cn(
    "transition-all duration-400 ease-out",
    "hover:shadow-xl hover:-translate-y-2 hover:brightness-110 hover:scale-105",
    "focus-within:ring-3 focus-within:ring-foreground/30"
  )
}

/**
 * Gradient overlay variants for enhanced hover effects
 */
export const gradientOverlayVariants = {
  none: "",
  
  subtle: cn(
    "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-foreground/3 before:to-transparent",
    "before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100"
  ),
  
  medium: cn(
    "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-foreground/5 before:to-transparent",
    "before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
  ),
  
  strong: cn(
    "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-foreground/8 before:to-foreground/3",
    "before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
  ),
  
  glow: cn(
    "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-foreground/12 before:via-foreground/6 before:to-foreground/4",
    "before:opacity-0 before:transition-opacity before:duration-400 hover:before:opacity-100"
  )
}

/**
 * Icon hover effects for interactive elements
 */
export const iconHoverVariants = {
  none: "",
  
  subtle: cn(
    "transition-transform duration-200 ease-out",
    "group-hover:scale-105"
  ),
  
  medium: cn(
    "transition-transform duration-200 ease-out",
    "group-hover:scale-110"
  ),
  
  strong: cn(
    "transition-transform duration-300 ease-out",
    "group-hover:scale-125 group-hover:rotate-3"
  ),
  
  glow: cn(
    "transition-transform duration-400 ease-out",
    "group-hover:scale-125 group-hover:rotate-6 group-hover:drop-shadow-sm"
  )
}

/**
 * Custom hook for hover effects
 * @param {string} variant - The hover variant ('subtle', 'medium', 'strong', 'glow')
 * @param {boolean} withGradient - Whether to include gradient overlay
 * @param {boolean} withIconEffects - Whether to include icon hover effects
 * @returns {object} - Object containing className strings for different elements
 */
export function useHoverEffects(variant = 'medium', withGradient = true, withIconEffects = true) {
  const baseHover = hoverVariants[variant] || hoverVariants.medium
  const gradientOverlay = withGradient ? gradientOverlayVariants[variant] || gradientOverlayVariants.medium : ""
  const iconHover = withIconEffects ? iconHoverVariants[variant] || iconHoverVariants.medium : ""
  
  return {
    container: cn("group relative", baseHover, gradientOverlay),
    icon: iconHover,
    variant,
    withGradient,
    withIconEffects
  }
}

/**
 * Utility function to get hover classes directly
 * @param {string} variant - The hover variant
 * @param {boolean} withGradient - Whether to include gradient overlay
 * @returns {string} - Combined className string
 */
export function getHoverClasses(variant = 'medium', withGradient = true) {
  const baseHover = hoverVariants[variant] || hoverVariants.medium
  const gradientOverlay = withGradient ? gradientOverlayVariants[variant] || gradientOverlayVariants.medium : ""
  
  return cn("group relative", baseHover, gradientOverlay)
}