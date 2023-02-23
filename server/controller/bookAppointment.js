import Services from "../models/Services.js";

export const checkWhetherAppointmentAlredyBooked = async (req, res) => {
  try {
    const { SID } = req.params;
    const { contactNumber } = req.body;
    // console.log(contactNumber);
    let dy = new Date();
    // dy.setDate(dy.getDate() - 1);
    const data = await Services.findOne({ SID: SID });
    if (
      data.appoinmentList.filter(
        (f) => f.contactNumber === contactNumber && f.bookedOn > dy
      ).length > 0
    )
      return res.status(200).json({
        msg: "You have already booked Appoinment in last 24 hours",
        alredyBooked: true,
      });
    return res.status(200).json({
      alredyBooked: false,
    });
  } catch (error) {
    res.status(409).json({ mess: "error" });
  }
};

export const saveAppointment = async (req, res) => {
  try {
    const { SID } = req.params;
    const { name, email, contactNumber, message, date, time } = req.body;
    // console.log(req.body,SID);

    const AID = SID + "_" + parseInt(new Date().getTime() / 1000);
    const data = await Services.findOneAndUpdate(
      { SID: SID },
      {
        $push: {
          appoinmentList: {
            AID: AID,
            name: name,
            email: email,
            contactNumber: contactNumber,
            dateTime: date + "|" + time,
            message: message,
          },
        },
      }
    );
    data
      ? res.status(200).json({
          msg: "You have booked an Appoinment for " + date,
          id: AID,
        })
      : res.status(200).json({
          msg: "Sorry Server Error ",
          id: null,
        });
  } catch (error) {
    res.status(409).json({ mess: "error" });
  }
};

export const getBookedTime = async (req, res) => {
  try {
    // console.log(req.params);
    const { SID } = req.params;
    const timeArr = await Services.aggregate([
      {
        $match: {
          SID: SID,
        },
      },
      {
        $project: {
          validDateTime: {
            $filter: {
              input: "$appoinmentList.dateTime",
              as: "dt",
              cond: {
                $and: [
                  {
                    $gt: [
                      {
                        $toDate: {
                          $arrayElemAt: [
                            {
                              $split: ["$$dt", "|"],
                            },
                            0,
                          ],
                        },
                      },
                      new Date(),
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    ]);
    const bkTms = {};
    timeArr[0].validDateTime.forEach((e) => {
      if (!bkTms[e.split("|")[0]]) bkTms[e.split("|")[0]] = [];
      bkTms[e.split("|")[0]].push(e.split("|")[1]);
    });
    res.status(200).json(bkTms);
  } catch (error) {
    res.status(409).json({ msg: "Sever Error" });
  }
};
export const getSingleBookedData = async (req, res) => {
  try {
    const { AID } = req.params;
    const SID = AID.split("_")[0] + "_" + AID.split("_")[1];
    // console.log(SID);
    const data = await Services.findOne(
      { SID: SID },
      { appoinmentList: { $elemMatch: { AID: AID } } }
    );
    res.status(200).json({
      data: data.appoinmentList[0] ? data.appoinmentList[0] : false,
    });
  } catch (error) {
    res.status(409).json(null);
  }
};

export const getAllBookedData = async (req, res) => {
  try {
    const data = await Services.findOne(req.params);
    res.status(200).json({ data: data.AppoinmentList });
  } catch (error) {
    res.status(409).json("Sever Error");
  }
};

// const x = async () => {
//   const dateInDDMMYY = () => {
//     let dt = new Date();
//     return dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate();
//   };
//   const data = await Services.aggregate([
//     { $match: { SID: "xyz123_Gem" } },
//     // {
//     //   $match: {
//     //     "appoinmentList.bookedOn": {
//     //       $gte: new Date(dateInDDMMYY() + "T00:00:00.000Z"),
//     //       $lt: new Date(),
//     //     },
//     //     "appoinmentList.contactNumber": "9",
//     //   },
//     // },
//     {
//       $project: {
//         contactNumber: {
//           $filter: {
//             input: "$appoinmentList.bookedOn",
//             as:"$dt",
//             $cond: {
//               "$dt": {
//                 $gte: new Date(dateInDDMMYY() + "T00:00:00.000Z"),
//                 $lt: new Date(),
//               },
//               "appoinmentList.contactNumber": "9",
//             },
//           },
//         },
//       },
//     },
//   ]);
//   console.log(data);
// };
// x();
