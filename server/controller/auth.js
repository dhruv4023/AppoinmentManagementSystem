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
      username,
      email,
      password,
      picturePath,
      friends,
      about,
      state,
      district,
      city,
      pincode,
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
      username: username,
      email: email,
      about: about,
      password: passwordHash,
      picPath: picturePath,
      friends: friends,
      location: {
        state: state,
        district: district,
        city: city,
        pincode: pincode,
      },
    });
    const picPath = renameAndMove(
      "user/" + newUser.firstName + newUser._id,
      picturePath
    );
    const savedUser = await newUser.save();
    await User.findByIdAndUpdate(newUser._id, {
      $set: { picPath: picPath },
    });
    res.status(200).json(savedUser);
  } catch (error) {
    deleteFile("public/assets/" + req.body.picturePath);
    res.status(500).json("something went wrong");
  }
};
export const loginControl = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: email }, { username: email }],
    });
    // console.log(user);
    if (!user)
      return res
        .status(400)
        .json({ exist: false, mess: "user doesn't exist !" });
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ exist: false, mess: "Invalid credintials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT);
    delete user.password;

    res.status(200).json({ exist: true, token, user });
  } catch (error) {
    res.status(500).json({ exist: false, mess: "failed to login" });
  }
};

export const changePassControl = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ exist: false, msg: "user doesn't exist !" });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate(user._id, {
      $set: { password: passwordHash },
    });
    res.status(200).json({ msg: "Password Changed successfully !" });
  } catch (error) {
    res.status(500).json({ msg: "failed to Change password" });
  }
};

export const getUserNames = async (req, res) => {
  try {
    const useNames = await User.distinct("username");
    // console.log(useNames)
    res.status(200).json(useNames);
  } catch (error) {
    res.status(404).json("Service not available");
  }
};
