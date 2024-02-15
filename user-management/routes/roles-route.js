const { role_controller } = require("../controllers");

const router = require("express").Router();

router.post("/", role_controller.create_role);
router.get("/:role_id", role_controller.get_role_by_id);
router.delete("/:role_id", role_controller.archive_role);
router.patch("/:role_id", role_controller.restore_role);

module.exports = router;