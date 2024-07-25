const router = require("express").Router()
const user = require("../resources/user/user.routes")

router.use("/user", user)

module.exports = router