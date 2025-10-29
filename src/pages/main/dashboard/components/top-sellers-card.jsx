
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { formatCurrency } from "@/utils";

export function TopSellersCard({ topSellers }) {
  if (!topSellers?.length) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Mejores Vendedores</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {topSellers.map((seller, index) => (
          <div key={seller.username} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <div>
                <p className="font-medium">{seller.name}</p>
                <p className="text-xs text-muted-foreground">@{seller.username}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">{formatCurrency(seller.total_sales, "USD", { fromCents: false })}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}