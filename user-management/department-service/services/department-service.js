const { department_repository_obj } = require("../repositories/department-repositories");
const { transaction_repository_obj } = require("../repositories/transaction-repositories");
const { find_paginated } = require("../lib/utils");

/**
 * Validates and adjusts query parameters for filtering departments.
 * 
 * @param {Object} payload - The request payload containing query parameters.
 * @param {Object} payload.query - The request query parameters.
 * @returns {Object} - The modified payload with validated query parameters.
 */
exports.validating_query_parameters = async (payload) => {
  let { archive = false, department_ids = [], order, order_column } = payload.query;

  // Convert archive string to a boolean
  if (archive === "true" || archive === true) payload.query.archive = true;
  else payload.query.archive = false;

  // Validate department_ids as an array
  if (department_ids && typeof department_ids === "string") {
    department_ids = department_ids.split(",");
    payload.query.department_ids = department_ids;
  } else if (department_ids && !Array.isArray(department_ids)) {
    payload.query.department_ids = [];
  }
  // Check order asc or desc. If not valid set to default
  if (order && !(order.toLowerCase() === "asc" || order.toLowerCase() === "desc")) payload.query.order = "";

  // Check order column name exist or not. If not exist set to default
  const columns = await department_repository_obj.all_columns();
  if (order_column && !columns[order_column]) payload.query.order_column = "";
  return payload;
};

/**
 * Retrieve a list of departments from the database based on specified filters.
 * 
 * @param {Object} payload - The request payload containing query parameters.
 * @param {Object} payload.query - The request query parameters.
 * @returns {Promise<Object>} - A Promise that resolves to an object containing the filtered list of departments and the total count.
 */
exports.get_filtered_departments = async (payload) => {
  payload = await this.validating_query_parameters(payload);
  let { name = "", department_ids = [], archive = false, page = 1, limit = 10, order, order_column } = payload.query;

  let options = find_paginated(page, limit);
  let offset = options.offset;
  limit = options.limit;

  let order_type = order || "DESC";
  order_column = order_column || "updated_at";
  let response = await department_repository_obj.get_filtered_departments({ name, department_ids }, { order_type, order_column, offset, limit }, archive);
  response.total = response.count;
  if (response.count === 0) {
    let total = await department_repository_obj.find_one();
    total ? total = 1 : total = 0;
    response.total = total;
  }
  response.per_page = limit;
  response.current_page = options.page + 1;
  return response;
};

/**
 * Creates a new department in the database.
 * 
 * @param {Object} payload - The request payload containing the department object in the body.
 * @param {Object} payload.body - The request body containing the department object.
 * @returns {Promise<Object>} - A Promise that resolves to the created department object.
 */
exports.create_department = async (payload) => {
  const department = payload.body;
  const transaction = await transaction_repository_obj.start_transaction();
  try {
    const response = await department_repository_obj.create_department(department, transaction);

    // Commit the transaction after successful creation
    await transaction_repository_obj.commit_transaction(transaction);

    return response;
  } catch (err) {
    // Rollback the transaction in case of an error
    await transaction_repository_obj.rollback_transaction(transaction);
    throw err;
  }
};

/**
 * Retrieves an department from the database by ID.
 * 
 * @param {Object} payload - The request payload containing the department ID in params.
 * @param {Object} payload.params - The request params containing the department ID.
 * @returns {Promise<Object>} - A Promise that resolves to the retrieved department object.
 */
exports.get_department_by_id = async (payload) => {
  const { department_id } = payload.params;
  const response = await department_repository_obj.get_department_by_id(department_id);
  return response;
};

/**
 * Edits an existing department in the database.
 * 
 * @param {Object} payload - The request payload containing the department ID in params and updated department object in body.
 * @param {Object} payload.params - The request params containing the department ID.
 * @param {Object} payload.body - The request body containing the updated department object.
 * @returns {Promise<Object>} - A Promise that resolves to the edited department object.
 */
exports.edit_department = async (payload) => {
  const { department_id } = payload.params;
  const department = payload.body;
  const transaction = await transaction_repository_obj.start_transaction();
  try {
    const [affected_rows, response] = await department_repository_obj.edit_department(department_id, department, transaction);

    // Commit the transaction after successful update
    await transaction_repository_obj.commit_transaction(transaction);

    return response;
  } catch (err) {
    // Rollback the transaction in case of an error
    await transaction_repository_obj.rollback_transaction(transaction);
    throw err;
  }
};

/**
 * Soft deletes an department in the database.
 * 
 * @param {Object} payload - The request payload containing the department ID in params and the deleted_by information in body.
 * @param {Object} payload.params - The request params containing the department ID.
 * @returns {Promise<Object>} - A Promise that resolves to the archived department object.
 */
exports.archive_department = async (payload) => {
  const { department_id } = payload.params;
  const transaction = await transaction_repository_obj.start_transaction();
  try {
    const [response] = await department_repository_obj.archive_department(department_id, transaction);

    // Commit the transaction after successful archive
    await transaction_repository_obj.commit_transaction(transaction);

    return response;
  } catch (err) {
    // Rollback the transaction in case of an error
    await transaction_repository_obj.rollback_transaction(transaction);
    throw err;
  }
};

/**
 * Restores a soft-deleted department in the database.
 * 
 * @param {Object} payload - The request payload containing the department ID in params.
 * @param {Object} payload.params - The request params containing the department ID.
 * @returns {Promise<Object>} - A Promise that resolves to the restored department object.
 */
exports.restore_department = async (payload) => {
  const { department_id } = payload.params;
  const transaction = await transaction_repository_obj.start_transaction();
  try {
    const [response] = await department_repository_obj.restore_department(department_id, transaction);

    // Commit the transaction after successful restore
    await transaction_repository_obj.commit_transaction(transaction);

    return response;
  } catch (err) {
    // Rollback the transaction in case of an error
    await transaction_repository_obj.rollback_transaction(transaction);
    throw err;
  }
};
