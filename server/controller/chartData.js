import Services from "../models/Services.js";

export const getYearData = async (req, res) => {
  try {
    const { SID, yr, yr2 } = req.body;
    console.log(req.body);
    const data = await Services.aggregate([
      {
        $match: {
          SID: SID,
        },
      },
      {
        $project: {
          validData: {
            $filter: {
              input: "$chartData.year",
              as: "dt",
              cond: {
                $and: [
                  { $gte: ["$$dt.value", yr] },
                  { $lte: ["$$dt.value", yr2] },
                ],
              },
            },
          },
        },
      },
    ]);

    // data.map((m) => console.log(m.validData));
    console.log(data[0].validData);
    res.status(200).json({ data: data[0].validData });
  } catch (error) {
    res.status(409).json({ mess: "error" });
  }
};
// getYearData("abc123_Office", "2019", "2022");
export const getMonthData = async (req, res) => {
  try {
    const { SID, yr } = req.body;
    const data = await Services.find(
      {
        SID: SID,
        "chartData.year.value": yr,
      },
      { "chartData.months.$": 1 }
    );
    data.map((m) => m.chartData.map((d) => console.log(d)));
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(409).json({ mess: "error" });
  }
};
// getMonthData("abc123_Gym", "2020");
// getMonthData("abc123_Office", "2021");
export const getDayData = async (req, res) => {
  try {
    const { SID, yr } = req.body;
    const data = await Services.find(
      {
        SID: SID,
        "chartData.year.value": yr,
      },
      { "chartData.days.$": 1 }
    );
    //   {
    //     $and: [
    //       {
    //         SID: SID,
    //         "chartData.year.value": yr,
    //       },
    //       {
    //         $and: [
    //           {
    //             $gte: [
    //               { $toDate: "chartData.days.$.value" },
    //               { $toDate: "2020-1-1" },
    //             ],
    //           },
    //           {
    //             $lte: [
    //               { $toDate: "chartData.days.$.value" },
    //               { $toDate: "2020-1-1" },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   { "chartData.days.$": 1 }
    // );
    // data.map((m) => m.chartData.map((d) => console.log(d)));
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(409).json({ mess: "error" });
  }
};

// const addData = async (SID) => {
//   let yr = "2020";
//   const data = await Services.findOneAndUpdate(
//     {
//       SID: SID,
//       "chartData.year.value": yr,
//     },
//     { $inc: { "chartData.month.$": 1 } }
//   );
//   // { "chartData.months.$": 1 }

//   // const data = await Services.updateMany(
//   //   { SID: SID },
//   //   { "chartData.$.year.value": "2020" },
//   //   { $inc: { "chartData.$[].year.total.0": 1 } }
//   // );
// };
// addData("abc123_Office");
// export default addData;

// const addData = async (SID) => {
//   let yr = "2020";
//   const data = await Services.updateMany(
//     { SID, SID },
//     {
//       chartData: {
//         $elemMatch: {
//           "year.value": "2020",
//           months: {
//             $elemMatch: {
//               value: "2020-1",
//             },
//           },
//           days: {
//             $elemMatch: {
//               value: "2020-1-1",
//             },
//           },
//         },
//       },
//     },
//     {
//       $inc: {
//         "chartData.$[y].year.total.0": 1,
//         "chartData.$[y].months.$[m].total.0": 1,
//         "chartData.$[y].days.$[d].total.0": 1,
//       },
//     },
//     {
//       arrayFilters: [
//         { "y.year.value": "2020" },
//         { "m.value": "2020-1" },
//         { "d.value": "2020-1-1" },
//       ],
//       multi: true, // This option ensures that all matching documents are updated
//     },
//     function (error, result) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log(result);
//       }
//     }
//   );
// };
// addData("abc123_Office");

// getDayData("abc123_Gym", "2020");
// getMonthData("abc123_Office", "2021");
// getMonthData("abc123_Office", "2021-1");
// getMonthData("abc123_Office", "2020-1");
// getMonthData("abc123_Office", "2019-1");



// const xxx = async function update() {
//   try {
//     const result = await Services.updateMany(
//       { SID: "abc123_Office", "chartData.days.value": "2021-1-2" },
//       {
//         $inc: {
//           "chartData.$.days.$[day].total.0": 1, // incrementing newValue1 by 1
//           "chartData.$.days.$[day].total.1": 1, // incrementing newValue2 by 1
//           "chartData.$.days.$[day].total.2": 1, // incrementing newValue3 by 1
//         },
//       },
//       {
//         arrayFilters: [{ "day.value": "2021-1-2" }],
//       }
//     );
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// };
// xxx()