const router = require("express").Router();
const { getUserById, getAllUser, createUser, updateUser, deleteUser, mailer } = require("./user.controller");

router.route("/:id").get(getUserById).delete(deleteUser)
router.route("/").get(getAllUser).post(createUser).put(updateUser)
router.post("/mailer", mailer);

module.exports = router;
