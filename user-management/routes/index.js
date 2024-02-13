const router = require("express").Router();

router.get("/", (req, res) => {
    res.json({
        status: "This is the user management Microservice 1.0.0",
    });
});

module.exports = router;