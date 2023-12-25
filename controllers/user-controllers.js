const { hashPassword, matchPassword } = require("../helpers/hash-password");
const { generateToken } = require("../helpers/jwt-token");
const { createError } = require("../middleware/ErrorHandling");
const User = require("../models/user-schema");

// register controller
const registerUserController = async (req, res, next) => {
  console.log(req.body);
  const body = JSON.parse(req.body.user);
  const { name, email, password } = body;
  const { filename } = req.file || {};
  if (!name || !email || !password)
    return next(
      createError("Please fill all the details...", 400, "register controller")
    );
  try {
    const existUser = await User.findOne({ email: email });
    if (existUser)
      return next(
        createError("User Already Exist...", 400, "register controller")
      );
    const hashPass = await hashPassword(password);
    const user = new User({
      ...body,
      password: hashPass,
      imageUrl: filename,
    });
    await user.save();
    return res.status(200).json({
      success: true,
      message: "user register successfulll",
      user,
    });
  } catch (error) {
    return next(createError(error.message, 500, "register controller"));
  }
};

// login controller
const loginUserController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(
      createError("Please fill all the details...", 400, "login user controlle")
    );
  try {
    const existUser = await User.findOne({ email: email });
    if (!existUser)
      return next(createError("User not exist...", 400, "login controller"));
    let matchPass = await matchPassword(password, existUser?.password);
    if (!matchPass)
      return next(createError("Wrong credential...", 400, "login controller"));
    const token = await generateToken(existUser?._id);
    return res.status(200).json({
      success: true,
      message: "login successfull",
      user: existUser,
      token,
    });
  } catch (error) {
    return next(createError(error.message, 500, "login controller"));
  }
};

module.exports = { registerUserController, loginUserController };
