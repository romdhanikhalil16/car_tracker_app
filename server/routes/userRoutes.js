const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authController.signup);
router.post("/login", authController.login);

router.route("/");
// .post(userController.createUser)
// .get(protect, userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route("/me").get(protect, userController.getMe);

module.exports = router;
