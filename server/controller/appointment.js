import Appoinment from "../models/appoinment.js";
import User from "../models/user.js";
import mongoose from "mongoose";
export const createService = async (req, res) => {
  try {
    const { _id, username, category, timeRange, location, description } =
      req.body;
    // console.log(req.body)
    // console.log(mongoose.isValidObjectId(_id))
    if (mongoose.isValidObjectId(_id)) {
      const appointmentdt = await Appoinment.find({ username });
      // console.log(appointmentdt,_id,category)

      const arr = appointmentdt.filter(
        (f) =>
          (f._id.equals(_id) && f.category === category) ||
          (f.category !== category)
      );
      if (arr.length !== appointmentdt.length) {
        return res.status(400).json({
          mess: category + " Appointment service , Already You have created!",
        });
      }
      await Appoinment.findByIdAndUpdate(_id, {
        category: category,
        timeRange: timeRange,
        location: location,
        description: description,
      });
      const servData = await Appoinment.find({ username });
      res.status(200).json(servData);
      // res.status(200).json(servData);
    } else {
      if (
        await Appoinment.findOne({
          username: username,
          category: category,
        })
      ) {
        return res.status(400).json({
          mess: category + " Appointment service , Already You have created!",
        });
      }
      // const {user} =await User.findOne({username:username});
      const newService = new Appoinment({
        username: username,
        category: category,
        timeRange: timeRange,
        location: location,
        description: description,
        AppoinmentList: [],
      });
      // console.log(newService);

      await newService.save();
      const servData = await Appoinment.find({ username });
      res.status(200).json(servData);
    }
  } catch (error) {
    // console.log(error)
    res.status(409).json({ mess: "error" });
  }
};

export const getAdminServices = async (req, res) => {
  try {
    const servData = await Appoinment.find(req.params);
    res.status(200).json(servData);
  } catch (error) {
    res.status(409).json({ mess: "error" });
  }
};
