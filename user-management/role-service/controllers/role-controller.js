const { role_service } = require("../services");
const { handle_error } = require("../lib/error-handler");

/**
 * Controller function to retrieve a filtered list of roles based on request parameters.
 * Handles successful and error responses.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.get_filtered_roles = async (req, res) => {
  try {
    const response = await role_service.get_filtered_roles(req);
    res.status(200).send(response);
  } catch (error) {
    console.log("Error during getting roles: ", error);
    handle_error(res, error);
  }
};

/**
 * Controller function to create a new role based on the request body.
 * Handles successful and error responses.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.create_role = async (req, res) => {
  try {
    const response = await role_service.create_role(req);
    if (!response) throw new Error("Role could not be created.");
    res.status(201).send(response);
  } catch (error) {
    console.log("Error during adding role: ", error);
    handle_error(res, error);
  }
};

/**
 * Controller function to retrieve an role by ID.
 * Handles successful and error responses.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.get_role_by_id = async (req, res) => {
  try {
    const response = await role_service.get_role_by_id(req);
    if (!response) return res.status(404).json({ message: "Role not found." });
    res.status(200).send(response);
  } catch (error) {
    console.log("Error during getting role: ", error);
    handle_error(res, error);
  }
};

/**
 * Controller function to edit an existing role based on the request body.
 * Handles successful and error responses.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.edit_role = async (req, res) => {
  try {
    const [response] = await role_service.edit_role(req);
    if (!response) return res.status(404).json({ error: "Role not found." });
    res.status(200).json(response);
  } catch (error) {
    console.log("Error during editing role: ", error);
    handle_error(res, error);
  }
};

/**
 * Controller function to archive (soft delete) an role based on the request parameters.
 * Handles successful and error responses.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.archive_role = async (req, res) => {
  try {
    const response = await role_service.archive_role(req);
    if (!response) return res.status(404).json({ error: "Role not found or already deleted." });
    res.status(200).json({ message: "role deleted successfully." });
  } catch (error) {
    console.log("Error during archiving role: ", error);
    handle_error(res, error);
  }
};

/**
 * Controller function to restore a soft-deleted role based on the request parameters.
 * Handles successful and error responses.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.restore_role = async (req, res) => {
  try {
    const response = await role_service.restore_role(req);
    if (!response) return res.status(404).json({ error: "Role not found." });
    res.status(200).json(response);
  } catch (error) {
    console.log("Error during restoring role: ", error);
    handle_error(res, error);
  }
};
