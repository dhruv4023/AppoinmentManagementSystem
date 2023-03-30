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
      holidays,
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
          holidays,
        }
      );
      const servData = await Services.find({ username });
      res.status(200).json(servData);
      // res.status(200).json(servData);
    } else {
      // console.log("eroor-----------------")
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
        holidays: holidays,
        chartData: [],
        appointmentList: [],
      });
      // console.log(mongoose.connection.readyState)
      // console.log(newService);
      await newService.save((error, data) => {
        // console.log(data, error);
      });
      // console.log(dt);
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
    const servData = await Services.findOne(req.params, {
      SID: 1,
      username: 1,
      category: 1,
      serviceTime: 1,
      breakTime: 1,
      appoinmentTime: 1,
      location: 1,
      description: 1,
      serviceName: 1,
      holidays: 1,
    });
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
    holidays: 1,
  }).limit(limit);
  res.status(200).json(servData);
};

export const getFilteredData = async (req, res) => {
  try {
    const { Category, SelectCity, pincode } = req.body;
    // console.log(req.body);
    if (pincode === "")
      returnServData(
        {
          category: Category,
          "location.city": SelectCity,
        },
        res,
        100
      );
    else if (SelectCity === "")
      returnServData(
        {
          category: Category,
          "location.pincode": pincode,
        },
        res,
        100
      );
    else
      returnServData(
        {
          category: Category,
          "location.pincode": pincode,
          "location.city": SelectCity,
        },
        res,
        100
      );
  } catch (error) {
    res.status(404).json("null");
  }
};
// const getYearData = async (sy, ey) => {
//   const yearlyData = await Services.aggregate([
//     {
//       $match: {
//         SID: "abc123_Gym",
//       },
//     },
//     {
//       $project: {
//         years: {
//           $filter: {
//             input: { $objectToArray: "$chartData" },
//             cond: {
//               $and: [
//                 { $gte: [{ $toInt: "$$this.k" }, sy] },
//                 { $lte: [{ $toInt: "$$this.k" }, ey] },
//               ],
//             },
//           },
//         },
//       },
//     },
//     {
//       $project: {
//         yearTotals: {
//           $reduce: {
//             input: "$years",
//             initialValue: {},
//             in: {
//               $mergeObjects: [
//                 "$$value",
//                 {
//                   $arrayToObject: [[{ k: "$$this.k", v: "$$this.v.total" }]],
//                 },
//               ],
//             },
//           },
//         },
//       },
//     },
//     { $replaceRoot: { newRoot: "$yearTotals" } },
//   ]);
//   console.log(yearlyData);
// };

// getYearData(2020, 2022);

// const getDateData = async (y, m) => {
//   const monthlyData = await Services.aggregate([
//     {
//       $match: {
//         SID: "abc123_Gym",
//       },
//     },
//     { $project: { _id: 0, monthlyData: "$chartData." + y + "." + m } }, // extract the data for March 2021
//     { $addFields: { monthlyData: { $objectToArray: "$monthlyData" } } }, // convert the monthly data object to an array
//     { $unwind: "$monthlyData" }, // unwind the monthly data array
//     { $match: { "monthlyData.k": { $ne: "total" } } }, // exclude the 'total' key
//     { $group: { _id: "$monthlyData.k", total: { $sum: "$monthlyData.v" } } }, // group by day key and sum the value
//     { $project: { _id: 0, day: "$_id", total: 1 } }, // rename _id to day and remove _id from the output
//     {
//       $group: { _id: null, monthlyData: { $push: { k: "$day", v: "$total" } } },
//     }, // group all documents into one, and create an array of key-value pairs
//     { $replaceRoot: { newRoot: { $arrayToObject: "$monthlyData" } } }, // convert the array of key-value pairs into an object
//   ]);
//   // console.log(monthlyData);
// };
// // console.log(getDateData(2021, "march"));

// const charData = [
//   {
//     year: "2020",
//     total: [15, 5],
//     monthly:{
//       month:"march"
//     }
//   },
// // ];
// const dateData = [
//   {
//     year: "2020",
//     total: [18, 5],
//     months: [
//       {
//         month: "jan",
//         total: [10, 5],
//         days: [
//           {
//             day: "1",
//             total: [4, 3],
//           },
//           {
//             day: 2,
//             total: [9, 3],
//           },
//         ],
//       },
//       {
//         month: "feb",
//         total: [10, 5],
//         days: [
//           {
//             day: "1",
//             total: [4, 3],
//           },
//           {
//             day: 2,
//             total: [9, 3],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     year: "2021",
//     total: [18, 5],
//     months: [
//       {
//         month: "jan",
//         total: [10, 5],
//         days: [
//           {
//             day: "1",
//             total: [4, 3],
//           },
//           {
//             day: 2,
//             total: [9, 3],
//           },
//         ],
//       },
//       {
//         month: "feb",
//         total: [10, 5],
//         days: [
//           {
//             day: "1",
//             total: [4, 3],
//           },
//           {
//             day: 2,
//             total: [9, 3],
//           },
//         ],
//       },
//     ],
//   },
// ];
// const chartData = {
//   2021: {
//     total: [15, 2],
//     march: {
//       total: [8, 2],
//       1: [1, 2],
//       2: [5, 3],
//     },
//     april: {
//       total: [7, 2],
//       1: [1, 1],
//       2: [1, 2],
//     },
//   },
//   2022: {
//     total: [14, 3],
//     march: {
//       total: [8, 2],
//       1: [1, 2],
//       2: [5, 3],
//     },
//     april: {
//       total: [7, 2],
//       1: [1, 1],
//       2: [1, 2],
//     },
//   },
// };
// retrive data from mongodb in this formate
// [ { 'april': [ 15, 2 ], 'march': [ 14, 3 ] } ]

// aggregate([

// ])

// ---------------------------------------------------------------------------------------------------------------------------------------------------

// const getMonthData = async (y) => {
//   const pipeline = [
//     {
//       $match: {
//         SID: "abc123_Office",
//       },
//     },
//     {
//       $group: {
//         _id: "$year",
//         total: { $first: "$total" },
//       },
//     },
//     // {
//     //   $project: {
//     //     _id: 0,
//     //     year: "$_id",
//     //     total: 1,
//     //   },
//     // },
//   ];
//   const monthlyData = await Services.aggregate(pipeline);
//.toArray();
//   [
//   {
//     $match: {
//       SID: "abc123_Gym",
//     },
//   },
//   { $match: { ["chartData." + y]: { $exists: true } } }, // filter documents that have 2021 data
//   {
//     $project: {
//       _id: 0,
//       monthlyTotals: { $objectToArray: "$chartData." + y },
//     },
//   },
//   // { $unwind: "$monthlyTotals" }, // unwind the monthlyTotals array
//   // { $match: { "monthlyTotals.k": { $ne: "total" } } }, // exclude the 'total' key
//   // {
//   //   $group: {
//   //     _id: "$monthlyTotals.k",
//   //     // total: { $sum: "$monthlyTotals.v.total" },
//   //   },
//   // },
//   // group by month key and sum the 'total' value
//   // { $project: { _id: 0, month: "$_id", total: 1 } }, // rename _id to month and remove _id from the output
//   // {
//   //   $group: {
//   //     _id: null,
//   //     monthlyTotals: { $push: { k: "$month", v: "$total" } },
//   //   },
//   // }, // group all documents into one, and create an array of key-value pairs
//   { $replaceRoot: { newRoot: { $arrayToObject: "$monthlyTotals" } } }, // convert the array of key-value pairs into an object
// ]
//   console.log(monthlyData);
// };
// getMonthData(2021);
