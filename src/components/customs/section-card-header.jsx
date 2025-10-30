import React from "react";
import { CardTitle } from "@/components/ui";

export function SectionCardHeader({
    icon: Icon,
    title,
    description
}) {
    return (
        <div className="flex items-center gap-3 p-4 border-b bg-muted rounded-t-xl">
            {Icon && (
                <div className={`p-2 rounded-lg`}>
                    <Icon className="h-5 w-5" />
                </div>
            )}
            <div>
                <CardTitle>
                    {title}
                </CardTitle>
                {description && (
                    <p className="text-sm text-muted-foreground mt-1">
                        {description}
                    </p>
                )}
            </div>
        </div>
    )
}