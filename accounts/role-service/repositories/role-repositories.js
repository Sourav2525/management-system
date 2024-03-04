const { role_model } = require("../models");
const { sequelize } = require("../config/db-connection");
const { base_repository } = require("./base-repositories");
const { Op, Sequelize } = require("sequelize");

/**
 * Repository class for handling operations related to roles in the database.
 * Extends the base repository class.
 */
class role_repository extends base_repository {
  /**
   * Array of columns to be returned when querying the role repository.
   * @type {string[]}
   * @private
   */
  #returning_columns;

  /**
   * Constructor for role_repository class.
   * @param {Object} payload - The payload containing database connection and model information.
   */
  constructor(payload) {
    super(payload);
    this.#returning_columns = [
      "uuid",
      "name",
      "description",
      "status",
      "display_picture",
      "password",
      "created_by",
      "parent_id",
      "created_at",
      "updated_at",
      "deleted_at",
    ];
  }

  /**
   * Retrieves a paginated list of roles based on specified filters.
   * 
   * @param {Object} filters - The object containing filter criteria.
   * @param {string} filters.name - The name of the role.
   * @param {string[]} filters.role_ids - The list of role IDs to retrieve.
   * @param {Object} options - Additional options for ordering and pagination.
   * @param {string} options.order_type - The order type for the returned list of roles (ascending or descending).
   * @param {string} options.order_column - The column name according to which ordering should take place.
   * @param {number} options.offset - The number of roles to skip before selecting records.
   * @param {number} options.limit - The total number of roles to be returned.
   * @param {boolean} archive - The soft delete option.
   * @returns {Promise<Object>} - A Promise that resolves to an object containing the filtered list of roles and the total count.
   */
  async get_filtered_roles({ name, role_ids }, { order_type, order_column, offset, limit }, archive) {
    let criteria = {};
    let paranoid = true;
    const attributes = { exclude: ["id"] };
    const order = [[order_column, order_type]];

    if (name) criteria.name = { [Op.iLike]: `%${name}%` };
    if (role_ids && role_ids.length) criteria.uuid = { [Op.in]: role_ids };
    if (archive && JSON.parse(archive)) paranoid = false;

    return this.find_and_count_all(criteria, [], offset, limit, order, paranoid, attributes);
  }

  /**
   * Creates a new role in the database.
   * 
   * @param {Object} role - The role object to be created.
   * @param {Object} transaction - The transaction object for the operation.
   * @returns {Promise<Object>} - A Promise that resolves to the created role object.
   */
  async create_role(role, transaction) {
    let options = {
      transaction,
    };

    return this.create(role, options);
  }

  /**
   * Retrieves an role from the database by ID.
   * 
   * @param {string} role_id - The ID of the role to retrieve.
   * @param {boolean} paranoid - The flag to indicate whether to include soft-deleted records.
   * @returns {Promise<Object>} - A Promise that resolves to the retrieved role object.
   */
  async get_role_by_id(role_id, paranoid = true) {
    let criteria = { uuid: role_id };
    const attributes = { exclude: ["id"] };

    return this.find_one(criteria, [], paranoid, attributes);
  }

  /**
   * Edits an existing role in the database.
   * 
   * @param {string} role_id - The ID of the role to edit.
   * @param {Object} role - The updated role object.
   * @param {Object} transaction - The transaction object for the operation.
   * @returns {Promise<Array>} - A Promise that resolves to an array containing the number of affected rows and the edited role object.
   */
  async edit_role(role_id, role, transaction) {
    let criteria = { uuid: role_id };

    return this.update(criteria, role, [], transaction, this.#returning_columns);
  };

  /**
   * Soft deletes an role in the database.
   * 
   * @param {string} role_id - The ID of the role to archive.
   * @param {Object} transaction - The transaction object for the operation.
   * @returns {Promise<Array>} - A Promise that resolves to an array containing the number of affected rows and the archived role object.
   */
  async archive_role(role_id, transaction) {
    let criteria = { uuid: role_id };

    return this.destroy(criteria, false, [], transaction, this.#returning_columns);
  }

  /**
   * Restores a soft-deleted role in the database.
   * 
   * @param {string} role_id - The ID of the role to restore.
   * @param {Object} transaction - The transaction object for the operation.
   * @returns {Promise<Array>} - A Promise that resolves to an array containing the number of affected rows and the restored role object.
   */
  async restore_role(role_id, transaction) {
    let criteria = { uuid: role_id };

    return this.restore(criteria, [], transaction, this.#returning_columns);
  }

  /**
   * Retrieves all column names for the role model.
   * @returns {Promise<Array>} - A Promise that resolves to an array containing all column names for the role model.
   */
  async all_columns() {
    return this.all_columns_name();
  }
}

module.exports = {
  role_repository_obj: new role_repository({
    db_connection: sequelize,
    model: role_model,
  }),
};
