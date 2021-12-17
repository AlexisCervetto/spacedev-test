const router = require("express").Router();
const movementsRouter = require("./movements/routes");

router.use("/movements", movementsRouter);

module.exports = router;