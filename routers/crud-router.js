const express = require("express");
const {
  addUserController,
  getAllUserController,
  deleteUserController,
  singleUserController,
  updateUserController,
} = require("../controllers/crud-user-controllers");
const crudRouter = express.Router();
// add user
crudRouter.post("/add-user", addUserController);
// all user
crudRouter.get("/all-user", getAllUserController);

// delete user
crudRouter.delete("/delete-user/:id", deleteUserController);
// single user
crudRouter.get("/single-user/:id", singleUserController);
// update user
crudRouter.patch("/update-user/:id", updateUserController);

module.exports = crudRouter;
