
import { Trophy } from "lucide-react";
import React from "react";
import { SectionCardHeader } from "@/components/customs";
import { Card, CardContent } from "@/components/ui";
import { formatCurrency } from "@/utils";

export function TopSellersCard({ topSellers }) {
  if (!topSellers?.length) return null;

  return (
    <Card>
      <SectionCardHeader
        icon={Trophy}
        title="Top 3 Vendedores"
      />
      <CardContent className="!p-4">
        {topSellers.slice(0, 3).map((seller, index) => (
          <div
            key={seller.username}
            className="flex items-center justify-between p-2 bg-muted rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <div>
                <p className="font-medium">{seller.name}</p>
                <p className="text-xs text-muted-foreground">{seller.username}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">
                {formatCurrency(seller.total_sales)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card >
  );
}