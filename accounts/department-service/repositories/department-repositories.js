const { department_model } = require("../models");
const { sequelize } = require("../config/db-connection");
const { base_repository } = require("./base-repositories");
const { Op, Sequelize } = require("sequelize");

/**
 * Repository class for handling operations related to departments in the database.
 * Extends the base repository class.
 */
class department_repository extends base_repository {
  /**
   * Array of columns to be returned when querying the department repository.
   * @type {string[]}
   * @private
   */
  #returning_columns;

  /**
   * Constructor for department_repository class.
   * @param {Object} payload - The payload containing database connection and model information.
   */
  constructor(payload) {
    super(payload);
    this.#returning_columns = [
      "uuid",
      "name",
      "description",
      "status",
      "created_by",
      "parent_id",
      "created_at",
      "updated_at",
      "deleted_at",
    ];
  }

  /**
   * Retrieves a paginated list of departments based on specified filters.
   * 
   * @param {Object} filters - The object containing filter criteria.
   * @param {string} filters.name - The name of the department.
   * @param {string[]} filters.department_ids - The list of department IDs to retrieve.
   * @param {Object} options - Additional options for ordering and pagination.
   * @param {string} options.order_type - The order type for the returned list of departments (ascending or descending).
   * @param {string} options.order_column - The column name according to which ordering should take place.
   * @param {number} options.offset - The number of departments to skip before selecting records.
   * @param {number} options.limit - The total number of departments to be returned.
   * @param {boolean} archive - The soft delete option.
   * @returns {Promise<Object>} - A Promise that resolves to an object containing the filtered list of departments and the total count.
   */
  async get_filtered_departments({ name, department_ids }, { order_type, order_column, offset, limit }, archive) {
    let criteria = {};
    let paranoid = true;
    const attributes = { exclude: ["id"] };
    const order = [[order_column, order_type]];

    if (name) criteria.name = { [Op.iLike]: `%${name}%` };
    if (department_ids && department_ids.length) criteria.uuid = { [Op.in]: department_ids };
    if (archive && JSON.parse(archive)) paranoid = false;

    return this.find_and_count_all(criteria, [], offset, limit, order, paranoid, attributes);
  }

  /**
   * Creates a new department in the database.
   * 
   * @param {Object} department - The department object to be created.
   * @param {Object} transaction - The transaction object for the operation.
   * @returns {Promise<Object>} - A Promise that resolves to the created department object.
   */
  async create_department(department, transaction) {
    let options = {
      transaction,
    };

    return this.create(department, options);
  }

  /**
   * Retrieves an department from the database by ID.
   * 
   * @param {string} department_id - The ID of the department to retrieve.
   * @param {boolean} paranoid - The flag to indicate whether to include soft-deleted records.
   * @returns {Promise<Object>} - A Promise that resolves to the retrieved department object.
   */
  async get_department_by_id(department_id, paranoid = true) {
    let criteria = { uuid: department_id };
    const attributes = { exclude: ["id"] };

    return this.find_one(criteria, [], paranoid, attributes);
  }

  /**
   * Edits an existing department in the database.
   * 
   * @param {string} department_id - The ID of the department to edit.
   * @param {Object} department - The updated department object.
   * @param {Object} transaction - The transaction object for the operation.
   * @returns {Promise<Array>} - A Promise that resolves to an array containing the number of affected rows and the edited department object.
   */
  async edit_department(department_id, department, transaction) {
    let criteria = { uuid: department_id };

    return this.update(criteria, department, [], transaction, this.#returning_columns);
  };

  /**
   * Soft deletes an department in the database.
   * 
   * @param {string} department_id - The ID of the department to archive.
   * @param {Object} transaction - The transaction object for the operation.
   * @returns {Promise<Array>} - A Promise that resolves to an array containing the number of affected rows and the archived department object.
   */
  async archive_department(department_id, transaction) {
    let criteria = { uuid: department_id };

    return this.destroy(criteria, false, [], transaction, this.#returning_columns);
  }

  /**
   * Restores a soft-deleted department in the database.
   * 
   * @param {string} department_id - The ID of the department to restore.
   * @param {Object} transaction - The transaction object for the operation.
   * @returns {Promise<Array>} - A Promise that resolves to an array containing the number of affected rows and the restored department object.
   */
  async restore_department(department_id, transaction) {
    let criteria = { uuid: department_id };

    return this.restore(criteria, [], transaction, this.#returning_columns);
  }

  /**
   * Retrieves all column names for the department model.
   * @returns {Promise<Array>} - A Promise that resolves to an array containing all column names for the department model.
   */
  async all_columns() {
    return this.all_columns_name();
  }
}

module.exports = {
  department_repository_obj: new department_repository({
    db_connection: sequelize,
    model: department_model,
  }),
};
