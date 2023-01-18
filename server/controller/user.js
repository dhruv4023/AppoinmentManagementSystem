import mongoose from "mongoose";
import User from "../models/user.js";
export const getUsers = async (req, res) => {
  try {
    const { UID } = req.params;
    if (mongoose.isValidObjectId(UID)) {
      const user = await User.find({ _id });
      console.log(user);
      res.status(200).json(user);
    } else {
      const user = await User.findOne({ username: UID });
      console.log(user);
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(404).json("null");
  }
};
