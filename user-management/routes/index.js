const { logger } = require("../config/logger");

const router = require("express").Router();

router.get("/", (req, res) => {
    try{
        logger.error("Internal server error");
        res.json({
            status: "This is the user management Microservice 1.0.0",
        });
    } catch(error) {

        logger.error("Internal server error");
    }
   
});

module.exports = router;