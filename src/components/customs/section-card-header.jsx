import { CardTitle } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useHoverEffects } from "@/hooks/use-hover-effects";

export function SectionCardHeader({
    icon: Icon,
    title,
    description,
    hoverVariant = "subtle",
    withGradient = false,
}) {
    const hover = useHoverEffects(hoverVariant, withGradient, true);

    return (
        <div className={cn(
            "flex items-center gap-3 px-6 py-4 border-b bg-gradient-to-r from-muted/50 to-muted/30 rounded-t-xl backdrop-blur-sm",
            hover.container
        )}>
            {Icon && (
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 border border-primary/20 rounded-lg shadow-sm">
                    <Icon className={cn("w-5 h-5 text-primary", hover.icon)} />
                </div>
            )}
            <div className="flex-1 min-w-0">
                <CardTitle className="text-foreground text-xl font-semibold tracking-tight">
                    {title}
                </CardTitle>
                {description && (
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
        </div>
    )
}