const router = require("express").Router();

router.use("/api/v1", require("./fileRoutes"));

module.exports = router;