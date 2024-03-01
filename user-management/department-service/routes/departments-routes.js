const { department_controller } = require('../controllers');

const router = require('express').Router();

router
    .route("/")
    .get(department_controller.get_filtered_departments)
    .post(department_controller.create_department);

router
    .route("/:department_id")
    .get(department_controller.get_department_by_id)
    .put(department_controller.edit_department)
    .delete(department_controller.archive_department)
    .patch(department_controller.restore_department);

module.exports = router;
