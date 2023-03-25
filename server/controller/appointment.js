import Services from "../models/Services.js";
import moment from "moment";
import updateChartData from "./chartData.js";
export const cancelAppointment = async (req, res) => {
  try {
    const { AID } = req.params;
    const status = -1;
    const SID = AID.split("_")[0] + "_" + AID.split("_")[1];
    const dt = await Services.findOne(
      { SID: SID },
      { appointmentList: { $elemMatch: { AID: AID } } }
    );
    const date = dt.appointmentList[0].dateTime.date;
    updateChartData(SID, status, date);
    const dateTime = { date: "0000-00-00", time: "00:00:00" };
    // const dateTime = { date: "2023-03-05", time: "0:00:00" };
    await Services.updateOne(
      { SID: SID, "appointmentList.AID": AID },
      {
        $set: {
          "appointmentList.$.status": status,
          "appointmentList.$.dateTime": dateTime,
        },
      }
    );
    res.status(200).json("Successfully Canceled");
  } catch (error) {
    res.status(409).json("Server Error");
  }
};
const cancelAppointmentFun = async (SID, AID, status) => {
  var x = -1;

  return x;
};
export const changeAppointmentStatus = async (req, res) => {
  try {
    const { AID } = req.params;
    const { status } = req.body;
    // console.log(AID, status, "--------------------------------");
    const SID = AID.split("_")[0] + "_" + AID.split("_")[1];
    updateChartData(SID, status);
    await Services.updateOne(
      { SID: SID, "appointmentList.AID": AID },
      { $set: { "appointmentList.$.status": status } }
    );
    res.status(200).json("Successfully Done");
  } catch (error) {
    res.status(409).json("Server Error");
  }
};
export const checkWhetherAppointmentAlredyBooked = async (req, res) => {
  try {
    const { SID } = req.params;
    const { contactNumber } = req.body;
    // console.log(contactNumber);
    let dy = new Date();
    // dy.setDate(dy.getDate() - 1);
    const data = await Services.findOne({ SID: SID });
    if (
      data.appointmentList.filter(
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
          appointmentList: {
            AID: AID,
            name: name,
            email: email,
            contactNumber: contactNumber,
            dateTime: { date, time },
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
    const today = new Date().toISOString().substring(0, 10);
    // console.log(req.params, today);
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
              input: "$appointmentList.dateTime",
              as: "dt",
              cond: {
                $gt: [{ $toDate: "$$dt.date" }, { $toDate: today }],
              },
            },
          },
        },
      },
    ]);
    // console.log(timeArr);
    const bkTime = {};
    timeArr[0].validDateTime.map((m) => {
      if (!bkTime[m.date]) bkTime[m.date] = [m.time];
      else bkTime[m.date].push(m.time);
    });
    // console.log(bkTime);
    const leftTime = await createTimeArray(SID, bkTime);
    // console.log(leftTime);
    res.status(200).json(leftTime);
  } catch (error) {
    res.status(409).json(false);
  }
};
export const getSingleBookedData = async (req, res) => {
  try {
    const { AID } = req.params;
    const SID = AID.split("_")[0] + "_" + AID.split("_")[1];
    // console.log(SID,AID);
    const data = await Services.findOne(
      { SID: SID },
      { appointmentList: { $elemMatch: { AID: AID } } }
    );
    // console.log(data);
    res.status(200).json({
      data: data.appointmentList[0] ? data.appointmentList[0] : false,
    });
  } catch (error) {
    res.status(409).json(null);
  }
};

export const getAllBookedData = async (req, res) => {
  try {
    const { SID, date } = req.params;
    // console.log(date, SID);
    const data = await Services.aggregate([
      {
        $match: {
          SID: SID,
        },
      },
      {
        $project: {
          validDateTime: {
            $filter: {
              input: "$appointmentList",
              as: "dt",
              cond: {
                $eq: [{ $toDate: "$$dt.dateTime.date" }, { $toDate: date }],
              },
            },
          },
        },
      },
    ]);
    // console.log("SDD", data[0].validDateTime);
    // date.map((m) => console.?log(m));
    res.status(200).json({ data: data[0].validDateTime });
  } catch (error) {
    res.status(409).json("Sever Error");
  }
};

const createTimeArray = async (SID, bkd) => {
  const servData = await Services.findOne(
    { SID: SID },
    {
      serviceTime: 1,
      breakTime: 1,
      appoinmentTime: 1,
    }
  );
  const timeArray = (x, startTim, endTim) => {
    const st = startTim.split(":");
    const et = endTim.split(":");
    var startTime = moment().utc().set({ hour: st[0], minute: st[1] });
    var endTime = moment().utc().set({ hour: et[0], minute: et[1] });
    var timeStops = [];
    let tp2, tp;
    while (true) {
      tp = new moment(startTime).format("HH:mm");
      startTime.add(x, "minutes");
      tp2 = new moment(startTime).format("HH:mm");
      if (startTime > endTime) break;
      timeStops.push(tp + "-" + tp2);
    }
    return timeStops;
  };
  const allTimeSlotes = [
    ...timeArray(
      servData?.appoinmentTime,
      servData?.serviceTime?.Start,
      servData?.breakTime?.Start
    ),
    ...timeArray(
      servData?.appoinmentTime,
      servData?.breakTime?.End,
      servData?.serviceTime?.End
    ),
  ];
  const today = new Date();
  const obj = {};
  for (let i = 0; i < 7; i++) {
    today.setDate(today.getDate() + 1);
    let dt = today.toISOString().substring(0, 10);
    // console.log(dt, );
    !bkd[dt]
      ? (obj[dt] = allTimeSlotes)
      : (obj[dt] = allTimeSlotes.filter((f) => !bkd[dt].includes(f)));
  }
  // console.log(obj);
  return obj;
};

// cancel();
// createTimeArray("abc123_Office", []).then((m) => console.log(m));
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// const zz = async () => {
//   const data = await Services.find(
//     { SID: "xyz123_Gym" },
//     { appointmentList: 1 }
//   );
//   console.log(data[0].appointmentList);
// };
// zz();
// const z = async (AID) => {
// const SID = AID.split("_")[0] + "_" + AID.split("_")[1];
// console.log(SID);
// const x = await Services.findOne(
//   { SID: SID, "appointmentList.AID": AID }
//   // { $set: { "appointmentList.$.status": 1 } }
// );
// const x =
// console.log(x);
// };
// z("xyz123_Gym_673041");
// const x = async () => {
//   const dateInDDMMYY = () => {
//     let dt = new Date();
//     return dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate();
//   };
//   const data = await Services.aggregate([
//     { $match: { SID: "xyz123_Gem" } },
//     // {
//     //   $match: {
//     //     "appointmentList.bookedOn": {
//     //       $gte: new Date(dateInDDMMYY() + "T00:00:00.000Z"),
//     //       $lt: new Date(),
//     //     },
//     //     "appointmentList.contactNumber": "9",
//     //   },
//     // },
//     {
//       $project: {
//         contactNumber: {
//           $filter: {
//             input: "$appointmentList.bookedOn",
//             as:"$dt",
//             $cond: {
//               "$dt": {
//                 $gte: new Date(dateInDDMMYY() + "T00:00:00.000Z"),
//                 $lt: new Date(),
//               },
//               "appointmentList.contactNumber": "9",
//             },
//           },
//         },
//       },
//     },
//   ]);
//   console.log(data);
// };
// x();

// const x = {
//   SID: "1",
//   appointmentList: [
//     {
//       AID: "xyz123_Gym1676780796220",
//       name: "9",
//       email: "9",
//       contactNumber: "9",
//       dateTime: "19-2-2023|18:00-20:00",
//       message: "9",
//       _id: {
//         $oid: "63f1a4fc91683d8e6861259c",
//       },
//       bookedOn: {
//         $date: {
//           $numberLong: "1676780796246",
//         },
//       },
//     },
//     {
//       AID: "xyz123_Gym_673041",
//       name: "9",
//       email: "9",
//       contactNumber: "9",
//       dateTime: "20-2-2023|18:00-20:00",
//       message: "9",
//       _id: {
//         $oid: "63f1b6fe128e7455e41f8bfe",
//       },
//       bookedOn: {
//         $date: {
//           $numberLong: "1676785406226",
//         },
//       },
//     },
//     {
//       AID: "xyz123_Gym_673061",
//       name: "9",
//       email: "9",
//       contactNumber: "9",
//       dateTime: "20-2-2023|18:00-20:00",
//       message: "9",
//       _id: {
//         $oid: "63f1b711128e7455e41f8c02",
//       },
//       bookedOn: {
//         $date: {
//           $numberLong: "1676785425695",
//         },
//       },
//     },
//   ],
// };

// const x = {
//   SID: "1",
//   appointmentList: [
//     {
//       status: 0,
//       AID: "xyz123_Gym_1676790595",
//       name: "9",
//       email: "9",
//       contactNumber: "9409434932",
//       date: "2023-2-21",
//       time: "09:00-11:00",
//       message: "9",
//     },
//     {
//       status: 0,
//       AID: "xyz123_Gym_1676802030",
//       name: "py",
//       email: "9",
//       contactNumber: "9409434932",
//       date: "2023-2-20",
//       time: "11:00-13:00",
//       message: "y",
//     },
//     {
//       status: 0,
//       AID: "xyz123_Gym_1676802427",
//       name: "9",
//       email: "9",
//       contactNumber: "99999",
//       date: "2023-3-19",
//       time: "14:00-16:00",
//       message: "9",
//     },
//   ],
// };

// const today = new Date();
// console.log(today.toISOString().substring(0, 10));
// const zzzz = async (SID, date) => {
//   const timeArr = await Services.aggregate([
//     {
//       $match: {
//         SID: SID,
//       },
//     },
//     {
//       $project: {
//         validDateTime: {
//           $filter: {
//             input: "$appointmentList.dateTime",
//             as: "dt",
//             cond: {
//               $gt: [{ $toDate: "$$dt.date" }, { $toDate: date }],
//             },
//           },
//         },
//       },
//     },
//   ]);
//   console.log(timeArr);
// };

// zzzz("abc123_Office", "2023-2-1");
// console.log(today.toISOString().substring(0, 10));
// const timeArray = futureAppointments.flatMap(appointment => appointment.appointmentList
//     .filter(app => new Date(app.date) > today)
//     .map(app => app.time));
// const today = new Date();
// const futureAppointments = x.appointmentList.filter(appointment => new Date(appointment.date) > today);

// const timeArray = futureAppointments.map(appointment => appointment.time);

// console.log(timeArray);
// const dts=new Date("2023-2-20");

// console.log(dts.getDate());

// let x = [1, 2, 3, 4, 5];
// x = x.filter((f) => [1, 2].includes(f));
// console.log(x);
