import { cn } from "@/lib/utils"

/**
 * Hover effect variants with different intensities
 */
export const hoverVariants = {
  none: "",
  
  subtle: cn(
    "transition-all duration-200 ease-out",
    "hover:shadow-sm hover:-translate-y-0.5 hover:border-accent/40",
    "focus-within:ring-1 focus-within:ring-accent/30"
  ),
  
  medium: cn(
    "transition-all duration-300 ease-out",
    "hover:shadow-md hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/30",
    "focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/40"
  ),
  
  strong: cn(
    "transition-all duration-300 ease-out",
    "hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2 hover:border-primary/50 hover:scale-[1.02]",
    "focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary/50"
  ),
  
  glow: cn(
    "transition-all duration-400 ease-out",
    "hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2 hover:border-primary/60 hover:scale-105",
    "focus-within:ring-3 focus-within:ring-primary/40 focus-within:border-primary/60",
    "hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent"
  )
}

/**
 * Gradient overlay variants for enhanced hover effects
 */
export const gradientOverlayVariants = {
  none: "",
  
  subtle: cn(
    "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-accent/3 before:to-transparent",
    "before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100"
  ),
  
  medium: cn(
    "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-primary/5 before:to-transparent",
    "before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
  ),
  
  strong: cn(
    "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-primary/8 before:to-accent/3",
    "before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
  ),
  
  glow: cn(
    "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-primary/12 before:via-primary/6 before:to-accent/4",
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
    "transition-all duration-200 ease-out",
    "group-hover:scale-110 group-hover:text-primary"
  ),
  
  strong: cn(
    "transition-all duration-300 ease-out",
    "group-hover:scale-125 group-hover:text-primary group-hover:rotate-3"
  ),
  
  glow: cn(
    "transition-all duration-400 ease-out",
    "group-hover:scale-125 group-hover:text-primary group-hover:rotate-6 group-hover:drop-shadow-sm"
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