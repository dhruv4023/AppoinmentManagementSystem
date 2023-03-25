import Services from "../models/Services.js";
import { incrementValBy1 } from "./insertToChartData/incVal.js";
import { insertDateObj } from "./insertToChartData/insertNewObj.js";
export const getYearData = async (req, res) => {
  try {
    const { SID, yr, yr2 } = req.body;
    // console.log(req.body);
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
    // console.log(data[0].validData);
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
    // data.map((m) => m.chartData.map((d) => console.log(d)));
    // console.log(data[0].chartData[0].months);
    res.status(200).json({ data: data[0].chartData[0].months });
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
    res.status(200).json({ data: data[0].chartData[0].days });
  } catch (error) {
    res.status(409).json({ mess: "error" });
  }
};

// insertDateObj("abc123_Salon", "2051", "2", "1");

// incrementValBy1("abc123_Salon", "2051", "2", "1", 1, 1);

// const d = new Date();
// console.log(typeof ("" + d.getFullYear()), d.getMonth() + 1, d.getDate());

const updateChartData = async (SID, status, date) => {
  try {
    var d;
    if (date) d = new Date(date);
    else d = new Date();
    const ymd = d.toISOString().substring(0, 10).split("-");
    // console.log(ymd);
    // console.log(d.getFullYear(), d.getMonth() + 1, d.getDate());
    if (status === -1) {
      incrementValBy1(SID, ymd[0], ymd[1], ymd[2], 0, 1);
    } else if (status === 1) {
      incrementValBy1(SID, ymd[0], ymd[1], ymd[2], 1, 0);
    }
  } catch (error) {
    console.log("error");
  }
};
export default updateChartData;

// const d = new Date();
// const ymd = d.toISOString().substring(0, 10).split("-");
// console.log(ymd[0], ymd[1], ymd[2]);
// console.log(d)
