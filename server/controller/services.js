import Services from "../models/Services.js";
import fixData from "../public/FixData.json" assert { type: "json" };
export const createService = async (req, res) => {
  try {
    const {
      SID,
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

    // console.log(req.body);
    // console.log(mongoose.isValidObjectId(_id))
    const serviceData = await Services.find({ SID });
    if (SID) {
      const arr = serviceData.filter(
        (f) =>
          (f.SID === SID && f.category === category) || f?.category !== category
      );
      if (arr.length !== serviceData.length) {
        return res.status(400).json({
          mess: category + " Appointment service , Already You have created!",
        });
      }
      await Services.findOneAndUpdate(
        { SID: SID },
        {
          category,
          serviceTime,
          breakTime,
          appoinmentTime,
          location,
          description,
          serviceName,
        }
      );
      const servData = await Services.find({ username });
      res.status(200).json(servData);
      // res.status(200).json(servData);
    } else {
      if (
        await Services.findOne({
          username: username,
          category: category,
        })
      ) {
        return res.status(400).json({
          mess: category + " Appointment service , Already You have created!",
        });
      }
      // const {user} =await User.findOne({username:username});
      const newService = new Services({
        SID: username + "_" + category,
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
  try {
    const servData = await Services.findOne(req.params);
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
  const servData = await Services.find(searchKey, {
    SID: 1,
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
      res,
      100
    );
  } catch (error) {
    res.status(404).json("null");
  }
};
