const express = require("express");
const {
  registerUserController,
  loginUserController,
} = require("../controllers/user-controllers");
const upload = require("../middleware/multer-middleware");
const authMiddleware = require("../middleware/auth");
const userRouter = express.Router();
// register user
userRouter.post("/register", upload.single("profile"), registerUserController);
// login user
userRouter.post("/login", loginUserController);


module.exports = userRouter;
