import PropTypes from "prop-types";
import React from "react";
import { SectionCardHeader } from "@/components/customs";
import { Card, CardContent } from "@/components/ui";

/**
 * Reusable dashboard card component
 * @param {Object} props
 * @param {React.ComponentType} props.icon - Lucide icon component
 * @param {string} props.title - Card title
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.cardProps] - Additional props for the Card component
 * @param {Object} [props.contentProps] - Additional props for the CardContent component
 */
export function DashboardCard({
  icon,
  title,
  children,
  className = "",
  cardProps = {},
  contentProps = {}
}) {
  return (
    <Card className={className} {...cardProps}>
      <SectionCardHeader icon={icon} title={title} />
      <CardContent className="!p-4" {...contentProps}>
        {children}
      </CardContent>
    </Card>
  );
}

DashboardCard.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cardProps: PropTypes.object,
  contentProps: PropTypes.object,
};