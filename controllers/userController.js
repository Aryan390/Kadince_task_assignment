// const AppError = require("../utils/appError");
const User = require("./../models/userModel");
// const catchAsync = require("./../utils/catchAsync");
const factory = require("./handleFactory");

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
