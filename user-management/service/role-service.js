const { role_repository_obj } = require("../repositories/role-repository");

exports.create_role = async (payload) => {
    return await role_repository_obj.create_role(payload, null);
};

exports.get_role_by_id = async (role_id) => {
    return await role_repository_obj.get_role_by_id(role_id);
};

exports.archive_role = async (role_id) => {
    return await role_repository_obj.archive_role(role_id, null);
};

exports.restore_role = async (role_id) => {
    return await role_repository_obj.restore_role(role_id, null);
};