const { department_service } = require("../services");
const { handle_error } = require("../lib/error-handler");

/**
 * Controller function to retrieve a filtered list of departments based on request parameters.
 * Handles successful and error responses.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.get_filtered_departments = async (req, res) => {
  try {
    const response = await department_service.get_filtered_departments(req);
    res.status(200).send(response);
  } catch (error) {
    console.log("Error during getting departments: ", error);
    handle_error(res, error);
  }
};

/**
 * Controller function to create a new department based on the request body.
 * Handles successful and error responses.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.create_department = async (req, res) => {
  try {
    const response = await department_service.create_department(req);
    if (!response) throw new Error("Department could not be created.");
    res.status(201).send(response);
  } catch (error) {
    console.log("Error during adding department: ", error);
    handle_error(res, error);
  }
};

/**
 * Controller function to retrieve an department by ID.
 * Handles successful and error responses.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.get_department_by_id = async (req, res) => {
  try {
    const response = await department_service.get_department_by_id(req);
    if (!response) return res.status(404).json({ message: "Department not found." });
    res.status(200).send(response);
  } catch (error) {
    console.log("Error during getting department: ", error);
    handle_error(res, error);
  }
};

/**
 * Controller function to edit an existing department based on the request body.
 * Handles successful and error responses.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.edit_department = async (req, res) => {
  try {
    const [response] = await department_service.edit_department(req);
    if (!response) return res.status(404).json({ error: "Department not found." });
    res.status(200).json(response);
  } catch (error) {
    console.log("Error during editing department: ", error);
    handle_error(res, error);
  }
};

/**
 * Controller function to archive (soft delete) an department based on the request parameters.
 * Handles successful and error responses.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.archive_department = async (req, res) => {
  try {
    const response = await department_service.archive_department(req);
    if (!response) return res.status(404).json({ error: "Department not found or already deleted." });
    res.status(200).json({ message: "Department deleted successfully." });
  } catch (error) {
    console.log("Error during archiving department: ", error);
    handle_error(res, error);
  }
};

/**
 * Controller function to restore a soft-deleted department based on the request parameters.
 * Handles successful and error responses.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.restore_department = async (req, res) => {
  try {
    const response = await department_service.restore_department(req);
    if (!response) return res.status(404).json({ error: "Department not found." });
    res.status(200).json(response);
  } catch (error) {
    console.log("Error during restoring department: ", error);
    handle_error(res, error);
  }
};
