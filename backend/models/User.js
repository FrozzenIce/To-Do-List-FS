const db = require("../config/db");

const AUTH_USERS_COLUMNS = `
  user_id, username, email, password, created_at, updated_at
`;

const USERS_COLUMNS = `
  user_id, username, email, created_at, updated_at
`;


/**
 * Creates a new user.
 *
 * @param {Object} user - User information.
 * @param {string} user.username - Username of the user.
 * @param {string} user.email - Email address of the user.
 * @param {string} user.password - Hashed password of the user.
 * @returns {Promise<Object>} The database insert result.
 */
const createUser = async (user) => {
  const sql = `
    INSERT INTO users
    SET
      username = ?,
      email = ?,
      password = ?
  `;
  const [result] = await db.query(sql, [
    user.username,
    user.email,
    user.password,
  ]);
  return result;
};

/**
 * Finds a user by username or email.
 *
 * @param {string} identifier - Username or email used to find the user.
 * @returns {Promise<Array>} An array containing the matching user records.
 */
const findByEmailOrUsername = async (identifier, includePassword = false) => {
  const columns = includePassword
    ? AUTH_USERS_COLUMNS
    : USERS_COLUMNS;
  const sql = `
    SELECT ${columns}
    FROM users
    WHERE username = ? OR email = ?
  `;
  const [rows] = await db.query(sql, [identifier, identifier]);
  return rows;
};

/**
 * Finds a user by user id
 * 
 * @param {number} id - User Id
 * @return {Promise<Array>} - An array containing the matching user record.
 */
const findUserById = async (id, includePassword = false) => {
  const columns = includePassword
    ? AUTH_USERS_COLUMNS
    : USERS_COLUMNS;
  const sql = `
    SELECT ${columns}
    FROM users
    WHERE user_id = ?
  `;
  const [rows] = await db.query(sql, [id]);
  return rows;
};

/**
 * Updates a user detail
 * 
 * @param {number} id - User Id
 * @param {Object} updates - Update information.
 * @param {string} updates.username - Updated username of the user.
 * @param {string} updates.email - Updated email address of the user.
 * @param {string} updates.password - Updated hashed password of the user.
 * @return {Promise<Object>} - An array containing the matching user record.
 */
const ALLOWED_UPDATE_FIELDS = {
  username: "username",
  email: "email",
  password: "password"
};
const updateUser = async (id, updates) => {
  const entries = Object.entries(updates)
    .filter(([key, value]) => {
      return ALLOWED_UPDATE_FIELDS[key] && value != undefined;
    });

  if (entries.length === 0) {
    throw new Error("No valid entries to update");
  }

  const setClause = entries
    .map(([key]) => `${ALLOWED_UPDATE_FIELDS[key]} = ?`)
    .join(', ');

  const values = entries.map(([, value]) => value);

  const sql = `
    UPDATE users
    SET ${setClause}
    WHERE user_id = ?
  `;

  const [result] = await db.query(sql, [...values, id]);
  return result;
};

/**
 * Deletes a user by user id
 * 
 * @param {number} id - User Id
 * @return {Promise<Object>} - An array containing the matching user record.
 */
const deleteUser = async (id) => {
  const sql = `
    DELETE FROM users
    WHERE user_id = ?
  `;
  const [result] = await db.query(sql, [id]);
  return result;
};

module.exports = {
  createUser,
  findByEmailOrUsername,
  findUserById,
  updateUser,
  deleteUser
};