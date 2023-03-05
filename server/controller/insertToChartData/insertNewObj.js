import Services from "../../models/Services.js";

const insertDayObj = async (SID, y, m, d) => {
  const dayExists = await Services.find({
    SID: SID,
    "chartData.days.value": y + "-" + m + "-" + d,
  });
  if (dayExists.length === 0) {
    await Services.updateMany(
      {
        SID: SID,
        "chartData.year.value": y,
      },
      {
        $push: {
          "chartData.$.days": {
            value: y + "-" + m + "-" + d,
            total: [0, 0],
          },
        },
      }
    );
  }
};
const insertMonthObj = async (SID, y, m, d) => {
  const monthExists = await Services.find({
    SID: SID,
    "chartData.months.value": y + "-" + m,
  });
  if (monthExists.length === 0) {
    Services.updateMany(
      {
        SID: SID,
        "chartData.year.value": y,
      },
      {
        $push: {
          "chartData.$.months": {
            value: y + "-" + m,
            total: [0, 0],
          },
        },
      }
    ).then(() => insertDayObj(SID, y, m, d));
  } else {
    insertDayObj(SID, y, m, d);
  }
};
const insertYearObj = async (SID, y, m, d) => {
  const yearExists = await Services.findOne({
    SID: SID,
    "chartData.year.value": y,
  });
  if (!yearExists) {
    Services.updateOne(
      { SID: SID },
      {
        $push: {
          chartData: {
            year: {
              value: y,
              total: [0, 0],
            },
          },
        },
      }
    ).then(() => insertMonthObj(SID, y, m, d));
  } else {
    insertMonthObj(SID, y, m, d);
  }
};

export const insertDateObj = async (SID, y, m, d) => {
  await insertYearObj(SID, y, m, d);
};
