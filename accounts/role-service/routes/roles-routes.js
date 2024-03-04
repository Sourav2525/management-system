const { role_controller } = require('../controllers');

const router = require('express').Router();

router
    .route("/")
    .get(role_controller.get_filtered_roles)
    .post(role_controller.create_role);

router
    .route("/:role_id")
    .get(role_controller.get_role_by_id)
    .put(role_controller.edit_role)
    .delete(role_controller.archive_role)
    .patch(role_controller.restore_role);

module.exports = router;
