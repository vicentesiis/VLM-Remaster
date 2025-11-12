import * as flags from "country-flag-icons/react/3x2"
import PropTypes from "prop-types"
import { COUNTRY_FLAG_MAP } from "@/constants"

/**
 * Country flag component that displays flag based on nationality
 * @param {Object} props - Component props
 * @param {string} props.nationality - Country nationality
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element|null} Flag component or null
 */
export const CountryFlag = ({ nationality, className = "h-8 w-10" }) => {
  if (!nationality) return null

  const countryCode = COUNTRY_FLAG_MAP[nationality.toLowerCase()]
  if (!countryCode) return null

  const FlagComponent = flags[countryCode]
  return FlagComponent ? <FlagComponent className={className} /> : null
}

CountryFlag.propTypes = {
  nationality: PropTypes.string,
  className: PropTypes.string,
}

export default CountryFlag