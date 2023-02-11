import Appoinment from "../models/appointment.js";
import mongoose from "mongoose";
import fixData from "./../public/FixData.json" assert { type: "json" };
export const createService = async (req, res) => {
  try {
    const {
      _id,
      username,
      category,
      appoinmentTime,
      serviceStartTime,
      serviceEndTime,
      breakStartTime,
      breakEndTime,
      location,
      description,
      serviceName,
    } = req.body;

    const serviceTime = {
      Start: serviceStartTime,
      End: serviceEndTime,
    };
    const breakTime = {
      Start: breakStartTime,
      End: breakEndTime,
    };

    // console.log(req.body)
    // console.log(mongoose.isValidObjectId(_id))
    if (mongoose.isValidObjectId(_id)) {
      const appointmentdt = await Appoinment.find({ username });
      // console.log(appointmentdt,_id,category)

      const arr = appointmentdt.filter(
        (f) =>
          (f._id.equals(_id) && f.category === category) ||
          f.category !== category
      );
      if (arr.length !== appointmentdt.length) {
        return res.status(400).json({
          mess: category + " Appointment service , Already You have created!",
        });
      }
      await Appoinment.findByIdAndUpdate(_id, {
        category,
        serviceTime,
        breakTime,
        appoinmentTime,
        location,
        description,
        serviceName,
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
        serviceTime: serviceTime,
        breakTime: breakTime,
        appoinmentTime: appoinmentTime,
        location: location,
        description: description,
        serviceName: serviceName,
        AppoinmentList: [],
      });
      // console.log(newService);

      await newService.save();
      returnServData({ username }, res);
    }
  } catch (error) {
    // console.log(error)
    res.status(409).json({ mess: "error" });
  }
};

export const getAdminServices = async (req, res) => {
  try {
    returnServData(req.params, res);
  } catch (error) {
    res.status(409).json({ mess: "error" });
  }
};

export const getServicesOnBookingPage = async (req, res) => {
  // console.log(req.params);
  try {
    const servData = await Appoinment.findOne(req.params);
    // console.log(servData);
    res.status(200).json(servData);
  } catch (error) {
    res.status(409).json({ mess: "error" });
  }
};

const returnServData = async (
  searchKey,
  res,
  limit = fixData.category.length
) => {
  const servData = await Appoinment.find(searchKey, {
    username: 1,
    category: 1,
    serviceTime: 1,
    breakTime: 1,
    appoinmentTime: 1,
    location: 1,
    description: 1,
    serviceName: 1,
  }).limit(limit);
  res.status(200).json(servData);
};

export const getFilteredData = async (req, res) => {
  try {
    const { Category, SelectCity, pincode } = req.body;
    // console.log(req.body);
    returnServData(
      {
        category: Category,
        "location.city": SelectCity,
        "location.pincode": pincode,
      },
      res,100
    );
    // const filteredData = await Appoinment.find({
    //   category: Category,
    //   // location: {
    //   "location.city": SelectCity,
    //   "location.pincode": pincode,
    //   // },
    // },{
    //   username: 1,
    //   category: 1,
    //   serviceTime: 1,
    //   breakTime: 1,
    //   appoinmentTime: 1,
    //   location: 1,
    //   description: 1,
    //   serviceName: 1,
    // });

    // console.log("x", filteredData);
    // if (mongoose.isValidObjectId(UID)) {
    //   // console.log(user);
    //   res.status(200).json(user);
    // } else {
    //   const user = await User.findOne({ username: UID });
    //   // console.log(user);
    // }
    // res.status(200).json("");
  } catch (error) {
    res.status(404).json("null");
  }
};
