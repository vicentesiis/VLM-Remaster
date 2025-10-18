import PropTypes from "prop-types"
import React from "react"
import {
  groupConfig,
  monthConfig,
  userConfig,
  yearConfig,
} from "@/components/customs/filter/filter-config"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import SectionHeader from "@/components/customs/section-header"
import { formatCurrency } from "@/utils"
import { formatIfExists } from "@/utils/reportFormatters"

export const HeaderSection = ({
  filters,
  onChange,
  handleSearch,
  listOfGroups,
  listOfUsers,
  isAgent,
  monthSelected,
  reportData,
  isFetching,
}) => {
  const totalSales = formatIfExists(
    reportData?.total_sales,
    (amount) => formatCurrency(amount, 'USD')
  )

  const totalOrders = formatIfExists(
    reportData?.total_orders,
    (n) => `${n} Órdenes`
  )
  return (
    <SectionHeader
      title={monthSelected}
      extra={totalSales}
      subtitle={totalOrders}
      actions={
        <FilterToolbar
          filterConfig={[
            ...(listOfGroups.length ? [groupConfig] : []),
            !isAgent && userConfig,
            yearConfig,
            monthConfig,
          ]}
          values={filters}
          onChange={onChange}
          context={{ groups: listOfGroups, users: listOfUsers }}
          onSearch={handleSearch}
          isLoading={isFetching}
        />
      }
    />
  )
}

HeaderSection.propTypes = {
  filters: PropTypes.any,
  handleSearch: PropTypes.any,
  isAgent: PropTypes.any,
  isFetching: PropTypes.any,
  listOfGroups: PropTypes.any,
  listOfUsers: PropTypes.any,
  monthSelected: PropTypes.any,
  onChange: PropTypes.any,
  reportData: PropTypes.any,
}

export default HeaderSection
