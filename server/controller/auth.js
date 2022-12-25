import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
/*REGISTER USER*/
export const registerControl = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picPath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordHash,
      picPath: picPath,
      friends: friends,
      location: location,
      occupation: occupation,
      viewedProfile: Math.random() * 1000,
      impressions: Math.random() * 1000,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json("something went wrong");
    console.log("error in auth controller");
  }
};
export const loginControl = async (req, res) => {
  console.log(process.env.JWT_SECRECT)
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) return res.status(400).json("user doesn't exit !");
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json("Invalid credintials");
    const token = jsw.sign({ id: user._id }, process.env.JWT_SECRECT);
    delete user.password;

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json("failed to login");
    console.log("error in auth login controller");
  }
};
