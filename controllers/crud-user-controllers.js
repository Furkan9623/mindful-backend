const { createError } = require("../middleware/ErrorHandling");
const Cruduser = require("../models/crud-schema");

const addUserController = async (req, res, next) => {
  const { name, phone, email } = req.body;
  if (!name || !phone || !email)
    return next(
      createError("Please fill all the details..", 400, "add user controller")
    );
  try {
    const existUser = await Cruduser.findOne({ email: email });
    if (existUser)
      return next(
        createError("User already exist...", 400, "add user controller")
      );
    const addUser = new Cruduser({ ...req.body });
    await addUser.save();
    return res.status(200).json({
      success: true,
      message: "user add successfull",
    });
  } catch (error) {
    return next(createError(error.message, 500, "add user controller"));
  }
};

// get all user
const getAllUserController = async (req, res, next) => {
  console.log(req.query);
  const { name, phone, email, filter } = req.query;
  let obj = {};
  if (name) {
    obj.name = { $regex: name, $options: "i" };
  } else if (phone) {
    obj.phone = { $regex: phone, $options: "i" };
  } else if (email) {
    obj.email = { $regex: email, $options: "i" };
  } else {
    obj = {};
  }

  try {
    let result;
    switch (filter) {
      case "a-z":
        result = await Cruduser.find(obj).sort({ name: 1 });
        break;
      case "z-a":
        result = await Cruduser.find(obj).sort({ name: -1 });
        break;
      case "last-modify":
        result = await Cruduser.find(obj).sort({ updatedAt: -1 }).limit(1);
        break;
      case "last-insert":
        result = await Cruduser.find({ ...obj })
          .sort({ createdAt: -1 })
          .limit(1);
        break;
      default:
        // Add a default sort option if needed
        result = await Cruduser.find(obj);
        break;
    }
    if (!result)
      return next(createError("No data found", 404, "get all user controller"));

    return res.status(200).json({
      success: true,
      message: "All users",
      alluser: result,
    });
  } catch (error) {
    return next(createError(error.message, 500, "get all user controller"));
  }
};

const deleteUserController = async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    return next(
      createError("Please provide valid id", 400, "deleteUserController")
    );
  try {
    const result = await Cruduser.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      message: "user delete successfull",
    });
  } catch (error) {
    return next(createError(error.message, 500, "delete controller"));
  }
};

// single user
const singleUserController = async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    return next(createError("Please provide id", 400, "single controller"));
  try {
    const result = await Cruduser.findOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "user fetch",
      user: result,
    });
  } catch (error) {
    return next(createError(error.message, 500, "singel controller"));
  }
};
// update user
const updateUserController = async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    return next(
      createError("Please provide the id", 404, "update user controller")
    );
  const { name, email, phone } = req.body;
  if (!name || !email || !phone)
    return next(
      createError(
        "Please fill all the details...",
        400,
        "update user controller"
      )
    );
  try {
    const updateUser = await Cruduser.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "update user successfull",
      user: updateUser,
    });
  } catch (error) {
    return next(createError(error.message, 500, "update controller"));
  }
};
module.exports = {
  addUserController,
  getAllUserController,
  deleteUserController,
  singleUserController,
  updateUserController,
};
