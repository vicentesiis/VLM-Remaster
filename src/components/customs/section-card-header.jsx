import React from "react";
import { CardTitle } from "@/components/ui";

export function SectionCardHeader({
    icon: Icon,
    title,
    description
}) {
    return (
        <div className="flex items-center gap-1 px-4 py-2.5 border-b bg-muted/40 rounded-t-xl">
            {Icon && (
                <div className={`px-2 rounded-lg`}>
                    <Icon className="!size-5 text-primary" />
                </div>
            )}
            <div>
                <CardTitle className="text-accent-foreground text-lg">
                    {title}
                </CardTitle>
                {description && (
                    <p className="text-sm text-accent-foreground">
                        {description}
                    </p>
                )}
            </div>
        </div>
    )
}