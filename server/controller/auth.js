import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { deleteFile, renameAndMove } from "../helper/fileDirOperations.js";
/*REGISTER USER*/
export const registerControl = async (req, res) => {
  // console.log();
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
      deleteFile("public/assets/" + req.body.picturePath);
      return res.status(400).json("user already exist !");
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordHash,
      picPath: picturePath,
      friends: friends,
      location: location,
      occupation: occupation,
      viewedProfile: Math.random() * 1000,
      impressions: Math.random() * 1000,
    });
    await renameAndMove("public/" + newUser._id, picturePath);
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    deleteFile("public/assets/" + req.body.picturePath);
    res.status(500).json("something went wrong");
  }
};
export const loginControl = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json("user doesn't exist !");
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json("Invalid credintials");
    const token = jsw.sign({ id: user._id }, process.env.JWT_SECRECT);
    delete user.password;

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json("failed to login");
  }
};
