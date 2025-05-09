/**
 * @typedef {"super_admin" | "admin" | "agent"} UserRole
 * @typedef {"callcenter" | "remote" | "post" | "leader"} AgentType
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} username
 * @property {string} name
 * @property {string} phone
 * @property {UserRole} role
 * @property {AgentType} agent_type
 * @property {boolean} active
 * @property {string|null} group_role
 * @property {string|null} group_id
 * @property {string} updated_at
 */

/**
 * @typedef {Object} UserResponse
 * @property {User} data
 * @property {string} message
 */
