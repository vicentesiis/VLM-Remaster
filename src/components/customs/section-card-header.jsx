import React from "react";
import { CardTitle } from "@/components/ui";
import { cn } from "@/lib/utils";

export function SectionCardHeader({
    icon: Icon,
    title,
    description,
}) {

    return (
        <div className={cn(
            "flex items-center gap-3 px-6 py-2.5 border-b bg-accent/70 rounded-t-xl",
        )}>
            {Icon && (
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 border border-primary/20 rounded-lg shadow-sm">
                    <Icon className={cn("w-5 h-5 text-primary")} />
                </div>
            )}
            <div className="flex-1 min-w-0">
                <CardTitle className="text-foreground text-xl font-semibold tracking-tight">
                    {title}
                </CardTitle>
                {description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
        </div>
    )
}