  const { role_model } = require("../models");
  const { base_repository } = require("./base-respository");
  const { Op, Sequelize } = require("sequelize");
  
  class role_repository extends base_repository {
    #returning_columns;
  
    constructor(payload) {
      super(payload);
      this.#returning_columns = ["uuid", "name", "description", "status", "display_picture", "created_by", "parent_id", "created_at", "updated_at", "deleted_at"];
    }
    
    async get_filtered_roles({ name, status }, { order_type, order_column, offset, limit }, archive) {
      let criteria = {};
  
      if (name) criteria = { [Op.and]: Sequelize.literal(`CONCAT(name, ' ', last_name) ILIKE '%${name}%'`) };
      if (status) criteria.status = status;
  
      let include = [];
      const order = [[order_column, order_type]];
      let paranoid = true;
      if (archive && JSON.parse(archive)) paranoid = false;
      const attributes = { exclude: ["id"] };
      return this.find_and_count_all(criteria, include, offset, limit, order, paranoid, attributes);
    }
  
    async create_role(role, transaction) {
      const { uuid, name, description, status, display_picture, created_by, parent_id } = role;
      let new_role = { uuid, name, description, status, display_picture, created_by, parent_id };
      let options = {
        include: [],
        transaction,
      };
      return this.create(new_role, options);
    }
  
    async get_role_by_id(role_id, paranoid = true) {
      let criteria = { uuid: role_id };
      let include = [];
      const attributes = { exclude: ["id"] };
      return this.find_one(criteria, include, paranoid, attributes);
    }
  
    async get_role_by_id_with_attr(role_id, attributes_array) {
      let criteria = { uuid: role_id };
      const attributes = { include: attributes_array };
      const response = await this.find_one(criteria, [], true, attributes);
      return response;
    }
  
    async edit_role(role, role_id, transaction) {
      let criteria = { uuid: role_id };
      const { name, description, status, display_picture } = role;
      let role_obj = { name, description, status, display_picture };
      return this.update(criteria, role_obj, [], transaction, this.#returning_columns);
    }
  
    async restore_role(role_id, transaction) {
      let criteria = { uuid: role_id };
      return this.restore(criteria, transaction, this.#returning_columns);
    }
  
    async archive_role(role_id, transaction) {
      let criteria = { uuid: role_id };
      return this.destroy(criteria, false, [], transaction, this.#returning_columns);
    }
  
    async all_columns() {
      return this.all_columns_name();
    }
  }
  
  module.exports = {
    role_repository_obj: new role_repository({
      model: role_model,
    }),
  };
  