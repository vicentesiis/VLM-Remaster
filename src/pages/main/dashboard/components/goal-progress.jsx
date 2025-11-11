import { CheckCircle, Target } from "lucide-react";
import React from "react";
import { Progress } from "@/components/ui/progress";
import { useHoverEffects } from "@/hooks/use-hover-effects";
import { cn } from "@/lib/utils";

export function GoalProgress({
    label,
    currentValue,
    goalValue,
    className = "",
    showIcon = true,
    size = "default", // "sm", "default", "lg"
    hoverVariant = "subtle", // "none", "subtle", "medium", "strong", "glow"
    interactive = true
}) {
    const progressPercentage = goalValue > 0
        ? Math.round((currentValue / goalValue) * 100)
        : 0;

    const isCompleted = progressPercentage >= 100;
    const isNearCompletion = progressPercentage >= 80;

    // Get hover effects based on user preference (same for all states)
    const effectVariant = interactive ? hoverVariant : "none";

    const hoverEffects = useHoverEffects(effectVariant, true, true);

    const sizeClasses = {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base"
    };

    const progressHeights = {
        sm: "h-1.5",
        default: "h-2.5",
        lg: "h-3"
    };

    const iconSizes = {
        sm: "h-3 w-3",
        default: "h-4 w-4",
        lg: "h-5 w-5"
    };

    return (
        <div className={cn(
            "space-y-2 rounded-lg px-3 py-1 border border-transparent",
            interactive && hoverEffects.container,
            className
        )}>
            {/* Header with label and percentage */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {showIcon && (
                        <div className={cn(
                            "flex items-center justify-center rounded-full transition-all duration-300 ",
                            interactive && hoverEffects.icon,
                            isCompleted
                                ? "text-green-600 bg-green-100"
                                : isNearCompletion
                                    ? "text-amber-600 bg-amber-100"
                                    : "bg-muted text-primary",
                            iconSizes[size] === "h-3 w-3" ? "p-0.5" : iconSizes[size] === "h-4 w-4" ? "p-1" : "p-1.5"
                        )}>
                            {isCompleted ? (
                                <CheckCircle className={cn(iconSizes[size], interactive && "transition-all duration-300")} />
                            ) : (
                                <Target className={cn(iconSizes[size], interactive && "transition-all duration-300")} />
                            )}
                        </div>
                    )}
                    <span className={cn(
                        "font-medium text-foreground transition-colors duration-200",
                        interactive && "group-hover:text-primary",
                        sizeClasses[size]
                    )}>
                        {label}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <span className={cn(
                        "font-bold transition-all duration-200",
                        interactive && "group-hover:scale-105",
                        isCompleted
                            ? "text-green-600"
                            : isNearCompletion
                                ? "text-amber-600"
                                : "text-muted-foreground group-hover:text-primary",
                        sizeClasses[size]
                    )}>
                        {progressPercentage}%
                    </span>
                </div>
            </div>

            {/* Progress bar with enhanced styling */}
            <div className="relative">
                <Progress
                    value={Math.min(progressPercentage, 100)}
                    className={cn(
                        "transition-all duration-500 ease-out",
                        interactive && "group-hover:shadow-md",
                        progressHeights[size],
                        isCompleted && "shadow-sm"
                    )}
                />

                {/* Enhanced glow effect for completed goals */}
                {isCompleted && (
                    <div className={cn(
                        "absolute inset-0 rounded-full bg-green-400/20 blur-sm -z-10 transition-all duration-300",
                        interactive && "group-hover:bg-green-400/30 group-hover:blur-md"
                    )} />
                )}

                {/* Hover glow for non-completed goals */}
                {interactive && !isCompleted && (
                    <div className="absolute inset-0 rounded-full bg-primary/10 blur-sm -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
            </div>
        </div>
    );
}