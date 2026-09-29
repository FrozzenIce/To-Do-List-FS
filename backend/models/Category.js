const db = require("../config/db");

/**
 * Finds all categories
 * 
 * @returns {Promise<Array>} An array of all categories.
 * 
 */
const getAllCategories = async (userId) => {
    const sql = `
        SELECT  category_id, category_name
        FROM categories
        WHERE user_id = ?
    `;
    const [rows] = await db.query(sql, [userId]);
    return rows;
};

/**
 * Finds all categories by id
 * 
 * @param {number} id - Category ID
 * @param {number} userId - User ID
 * @returns {Promise<Array>} An array containing the matching category records.
 */
const getCategoryById = async (id, userId) => {
    const sql = `
        SELECT  category_id, category_name
        FROM categories
        WHERE category_id = ? AND user_id = ?
    `;
    const [rows] = await db.query(sql, [id, userId]);
    return rows;
};

/**
 * Creates a new category
 * 
 * @param {string} categoryName - New Category Name
 */
const createCategory = async (categoryName, userId) => {
    const sql = `
        INSERT INTO categories (category_name, user_id) 
        VALUES (?, ?)
    `;

    const [result] = await db.query(sql, [categoryName, userId]);
    return result;
}

/**
 * Deletes a category
 * @param {number} id - Category ID
 * @param {number} userId - User ID
 * @returns {Promise<Object>} The delete result.
 */
const deleteCategory = async (id, userId) => {
    const sql = `
        DELETE FROM categories
        WHERE category_id = ? AND user_id = ?
    `;
    const [result] = await db.query(sql, [id, userId]);
    return result;
} 


module.exports - {
    getAllCategories,
    getCategoryById,
    createCategory,
    deleteCategory}