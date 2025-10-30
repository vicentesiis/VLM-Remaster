import React from "react";
import { DashboardCard } from "./dashboard-card";
import { TrendingUp } from "lucide-react";
import { formatCurrency } from "@/utils";

/**
 * Example of how to create new dashboard cards using the DashboardCard component
 */
export function ExampleDashboardCard({ data }) {
  return (
    <DashboardCard 
      icon={TrendingUp} 
      title="Example Card"
      className="hover:shadow-md transition-shadow" // Optional custom styling
    >
      {/* Your custom content goes here */}
      <div className="space-y-2">
        <div className="text-2xl font-bold">
          {formatCurrency(data?.value ?? 0)}
        </div>
        <p className="text-sm text-muted-foreground">
          {data?.description ?? "No data available"}
        </p>
        
        {/* You can add any content structure you need */}
        {data?.items?.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span>{item.name}</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}

/**
 * Another example showing different content structure
 */
export function MetricsDashboardCard({ metrics }) {
  return (
    <DashboardCard icon={TrendingUp} title="Key Metrics">
      <div className="grid grid-cols-2 gap-4">
        {metrics?.map((metric, index) => (
          <div key={index} className="text-center">
            <div className="text-lg font-semibold">{metric.value}</div>
            <div className="text-xs text-muted-foreground">{metric.label}</div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}