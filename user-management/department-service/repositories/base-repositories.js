/* eslint-disable snakecasejs/snakecasejs */
exports.base_repository = class base_repository {
  constructor({ db_connection, model }) {
    this.db_connection = db_connection;
    this.model = model;
  }

  /**
   * The create method create database entries.
   * @param {object} payload - To define which attributes can be set in the create method.
   * @param {object} options - If you really want to let the query restrict the model data.
   */
  async create(payload, options) {
    const instance = await this.model.create(payload, options);
    return instance && instance.toJSON();
  }

  /**
   * The create method create database entries.
   * @param {object} payload - To define which attributes can be set in the create method.
   * @param {object} options - If you really want to let the query restrict the model data.
   */
  async bulk_create(payload, options = {}) {
    options.validate = true;
    const instance = await this.model.bulkCreate(payload, options);
    return instance;
  }

  /**
   * The update method update database entries.
   * @param {object} criteria - To update records with criteria.
   * @param {object} payload - To update which attributes can be set in this method.
   * @param {array} include - To update records with association.
   * @param {object} transaction - To update with transaction.
   * @param {array} returning - To return columns after destroy.
   * @param {boolean} paranoid - If you really want to let the query see the soft-deleted records, you can pass the paranoid: false option to the query method
   */
  async update(criteria, payload, include, transaction, returning = ['*'], paranoid = true) {
    return await this.model.update(payload, {
      where: criteria,
      include,
      transaction,
      returning,
      paranoid
    });
  }

  /**
   * The findByPk method obtains only a single entry from the table, using the provided primary key.
   * @param {number} primary_key - To find records with primary key.
   * @param {boolean} paranoid - If you really want to let the query see the soft-deleted records, you can pass the paranoid: false option to the query method
   */
  async find_by_pk(primary_key, paranoid = true) {
    return await this.model.findByPk(primary_key, paranoid);
  }

  /**
   * The findOne method obtains the first entry it finds.
   * @param {object} criteria - To find records with criteria.
   * @param {array} include - To find records with association.
   * @param {boolean} paranoid - If you really want to let the query see the soft-deleted records, you can pass the paranoid: false option to the query method
   * @param {object} attributes - To exclude or include column in records.
   */
  async find_one(criteria, include = [], paranoid = true, attributes) {
    return await this.model.findOne({
      where: criteria,
      include: include,
      paranoid,
      attributes
    });
  }

  /**
   * The findAll method generates a standard SELECT query which will retrieve all entries from the table
   * @param {object} criteria - To find records with criteria.
   * @param {array} include - To find records with association.
   * @param {boolean} paranoid - If you really want to let the query see the soft-deleted records, you can pass the paranoid: false option to the query method
   * @param {object} attributes - To exclude or include column in records.
   */
  async find_all(criteria, include = [], paranoid = true, attributes) {
    return await this.model.findAll({
      where: criteria,
      include: include,
      paranoid,
      raw: true,
      attributes
    });
  }

  /**
   * The findAndCountAll method generates a standard SELECT query which will retrieve all entries from the table with total count
   * @param {object} criteria - To find records with criteria.
   * @param {array} include - To find records with association.
   * @param {number} [offset=0] - To skip 0 instances/rows 
   * @param {number} [limit=10] - To fetch 10 instances/rows
   * @param {array[column, direction]} order - Will return `updated_at` DESC
   * @param {boolean} paranoid - If you really want to let the query see the soft-deleted records, you can pass the paranoid: false option to the query method
   * @param {object} attributes - To exclude or include column in records.
   */
  async find_and_count_all(criteria, include = [], offset = 0, limit = 10, order, paranoid = true, attributes) {
    return await this.model.findAndCountAll({
      where: criteria,
      include: include,
      offset,
      limit,
      order,
      paranoid,
      distinct: true,
      attributes
    });
  }

  /**
   * To restore soft-deleted records, you can use the restore method
   * @param {object} criteria - To restore records with criteria.
   * @param {object} transaction - To update with transaction.
   * @param {array} returning - To return columns after destroy.
   */
  async restore(criteria, include, transaction, returning = ['*']) {
    return await this.model.restore({ where: criteria, include, transaction, returning });
  }

  /**
   * When you call the destroy method, a soft-deletion will happen:
   * @param {object} criteria - To destroy records with criteria.
   * @param {boolean} force - If you really want a hard-deletion and your model is paranoid, you can force it using the force: true option:
   * @param {array} include - To destroy records with association.
   * @param {object} transaction - To update with transaction.
   * @param {array} returning - To return columns after destroy.
   */
  async destroy(criteria, force = false, include, transaction, returning = ['*']) {
    return await this.model.destroy({ where: criteria, force, include, transaction, returning });
  }


  /**
   * To get all the columns of the model
   */
  async all_columns_name() {
    return await this.model.getAttributes();
  }
};
