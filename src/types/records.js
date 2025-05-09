/**
 * @typedef {"lead" | "student" | "applicant"} RecordType
 * @typedef {"facebook" | "instagram" | "linkedin" | "whatsapp" | "referral" | "other"} Channel
 * @typedef {"created" | "contacted" | "enrolled" | "archived"} Status
 * @typedef {"program_a" | "program_b" | "program_c"} Program
 */

/**
 * @typedef {Object} Record
 * @property {string} id
 * @property {string} public_id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} date_of_birth - ISO date string
 * @property {string} nationality
 * @property {string} state
 * @property {string} curp
 * @property {string} passport
 * @property {RecordType} record_type
 * @property {Channel} channel
 * @property {string} comments
 * @property {Status} status
 * @property {Status} previous_status
 * @property {Program} program
 * @property {boolean} contacted
 * @property {number} amount_owed
 * @property {boolean} active
 * @property {string} end_date - ISO date string
 * @property {string} exit_date - ISO date string
 * @property {string} job
 * @property {string[]} desired_jobs
 * @property {string} created_at - ISO date string
 * @property {string} updated_at - ISO date string
 */

/**
 * @typedef {Object} RecordsResponse
 * @property {Record[]} data
 * @property {string} message
 * @property {number} skip
 * @property {number} limit
 * @property {number} total
 */