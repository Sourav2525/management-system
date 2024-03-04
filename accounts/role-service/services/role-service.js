const { role_repository_obj } = require("../repositories/role-repositories");
const { transaction_repository_obj } = require("../repositories/transaction-repositories");
const { find_paginated } = require("../lib/utils");

/**
 * Validates and adjusts query parameters for filtering roles.
 * 
 * @param {Object} payload - The request payload containing query parameters.
 * @param {Object} payload.query - The request query parameters.
 * @returns {Object} - The modified payload with validated query parameters.
 */
exports.validating_query_parameters = async (payload) => {
  let { archive = false, role_ids = [], order, order_column } = payload.query;

  // Convert archive string to a boolean
  if (archive === "true" || archive === true) payload.query.archive = true;
  else payload.query.archive = false;

  // Validate role_ids as an array
  if (role_ids && typeof role_ids === "string") {
    role_ids = role_ids.split(",");
    payload.query.role_ids = role_ids;
  } else if (role_ids && !Array.isArray(role_ids)) {
    payload.query.role_ids = [];
  }
  // Check order asc or desc. If not valid set to default
  if (order && !(order.toLowerCase() === "asc" || order.toLowerCase() === "desc")) payload.query.order = "";

  // Check order column name exist or not. If not exist set to default
  const columns = await role_repository_obj.all_columns();
  if (order_column && !columns[order_column]) payload.query.order_column = "";

  return payload;
};

/**
 * Retrieve a list of roles from the database based on specified filters.
 * 
 * @param {Object} payload - The request payload containing query parameters.
 * @param {Object} payload.query - The request query parameters.
 * @returns {Promise<Object>} - A Promise that resolves to an object containing the filtered list of roles and the total count.
 */
exports.get_filtered_roles = async (payload) => {
  payload = await this.validating_query_parameters(payload);
  let { name = "", role_ids = [], archive = false, page = 1, limit = 10, order, order_column } = payload.query;

  let options = find_paginated(page, limit);
  let offset = options.offset;
  limit = options.limit;

  let order_type = order || "DESC";
  order_column = order_column || "updated_at";
  let response = await role_repository_obj.get_filtered_roles({ name, role_ids }, { order_type, order_column, offset, limit }, archive);
  response.total = response.count;
  if (response.count === 0) {
    let total = await role_repository_obj.find_one();
    total ? total = 1 : total = 0;
    response.total = total;
  }
  response.per_page = limit;
  response.current_page = options.page + 1;
  return response;
};

/**
 * Creates a new role in the database.
 * 
 * @param {Object} payload - The request payload containing the role object in the body.
 * @param {Object} payload.body - The request body containing the role object.
 * @returns {Promise<Object>} - A Promise that resolves to the created role object.
 */
exports.create_role = async (payload) => {
  const role = payload.body;
  const transaction = await transaction_repository_obj.start_transaction();
  try {
    const response = await role_repository_obj.create_role(role, transaction);

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
 * Retrieves an role from the database by ID.
 * 
 * @param {Object} payload - The request payload containing the role ID in params.
 * @param {Object} payload.params - The request params containing the role ID.
 * @returns {Promise<Object>} - A Promise that resolves to the retrieved role object.
 */
exports.get_role_by_id = async (payload) => {
  const { role_id } = payload.params;
  const response = await role_repository_obj.get_role_by_id(role_id);
  return response;
};

/**
 * Edits an existing role in the database.
 * 
 * @param {Object} payload - The request payload containing the role ID in params and updated role object in body.
 * @param {Object} payload.params - The request params containing the role ID.
 * @param {Object} payload.body - The request body containing the updated role object.
 * @returns {Promise<Object>} - A Promise that resolves to the edited role object.
 */
exports.edit_role = async (payload) => {
  const { role_id } = payload.params;
  const role = payload.body;
  const transaction = await transaction_repository_obj.start_transaction();
  try {
    const [affected_rows, response] = await role_repository_obj.edit_role(role_id, role, transaction);

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
 * Soft deletes an role in the database.
 * 
 * @param {Object} payload - The request payload containing the role ID in params and the deleted_by information in body.
 * @param {Object} payload.params - The request params containing the role ID.
 * @returns {Promise<Object>} - A Promise that resolves to the archived role object.
 */
exports.archive_role = async (payload) => {
  const { role_id } = payload.params;
  const transaction = await transaction_repository_obj.start_transaction();
  try {
    const [response] = await role_repository_obj.archive_role(role_id, transaction);

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
 * Restores a soft-deleted role in the database.
 * 
 * @param {Object} payload - The request payload containing the role ID in params.
 * @param {Object} payload.params - The request params containing the role ID.
 * @returns {Promise<Object>} - A Promise that resolves to the restored role object.
 */
exports.restore_role = async (payload) => {
  const { role_id } = payload.params;
  const transaction = await transaction_repository_obj.start_transaction();
  try {
    const [response] = await role_repository_obj.restore_role(role_id, transaction);

    // Commit the transaction after successful restore
    await transaction_repository_obj.commit_transaction(transaction);

    return response;
  } catch (err) {
    // Rollback the transaction in case of an error
    await transaction_repository_obj.rollback_transaction(transaction);
    throw err;
  }
};
