const { role_service } = require("../service");

// exports.get_filtered_roles = async (req, res) => {
//   try {
//     const response = await role_service.get_filtered_roles(req);
//     res.status(200).send(response);
//   } catch (error) {
//     console.log("Error during geting filtered roles: ", error);
//     handle_error(res, error);
//   }
// };

exports.create_role = async (req, res) => {
  try {
    const response = await role_service.create_role(req.body);
    if(!response) throw new Error("role could not be created.");
    res.status(201).send(response);
  } catch (error) {
    console.log("Error during creating role: ", error);
    res.status(500 || error?.status_code).json({ error: error?.message });
  }
};

exports.get_role_by_id = async (req, res) => {
  try {
    const { role_id } = req.params;
    const response = await role_service.get_role_by_id(role_id);
    if(!response) return res.status(404).json({ error: "role not found."});
    res.status(200).send(response);
  } catch (error) {
    console.log("Error during geting role by id: ", error);
    res.status(500 || error?.status_code).json({ error: error?.message });
  }
};

// exports.edit_role = async (req, res) => {
//   try {
//     const [response] = await role_service.edit_role(req);
//     if(!response) return res.status(404).json({ error: "role not found." });
//     res.status(200).json({ message: "role edited successfully."});
//   } catch (error) {
//     console.log("Error during editing role: ", error);
//     handle_error(res, error);
//   }
// };

exports.restore_role = async (req, res) => {
  try {
    const { role_id } = req.params;
    const response = await role_service.restore_role(role_id);
    if(!response) return res.status(404).json({ error: "role not found." });
    res.status(200).json({ message: "role restored successfully."});
  } catch (error) {
    console.log("Error during restoring role: ", error);
    res.status(500 || error?.status_code).json({ error: error?.message });
  }
};

exports.archive_role = async (req, res) => {
  try {
    const { role_id } = req.params;
    const response = await role_service.archive_role(role_id);
    if(!response || response?.length === 0) return res.status(404).json({ error: "role not found." });
    res.status(200).json({ message: "role deleted successfully."});
  } catch (error) {
    console.log("Error during archiving role: ", error);
    res.status(500 || error?.status_code).json({ error: error?.message });
  }
};
