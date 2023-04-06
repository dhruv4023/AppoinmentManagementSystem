import Services from "../../models/Services.js";

const insertDayObj = async (sid, y, m, d) => {
  const dayExists = await Services.find({
    sid: sid,
    "chartData.days.value": y + "-" + m + "-" + d,
  });
  if (dayExists.length === 0) {
    await Services.updateMany(
      {
        sid: sid,
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
const insertMonthObj = async (sid, y, m, d) => {
  const monthExists = await Services.find({
    sid: sid,
    "chartData.months.value": y + "-" + m,
  });
  if (monthExists.length === 0) {
    Services.updateMany(
      {
        sid: sid,
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
    ).then(() => insertDayObj(sid, y, m, d));
  } else {
    insertDayObj(sid, y, m, d);
  }
};
const insertYearObj = async (sid, y, m, d) => {
  const yearExists = await Services.findOne({
    sid: sid,
    "chartData.year.value": y,
  });
  if (!yearExists) {
    Services.updateOne(
      { sid: sid },
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
    ).then(() => insertMonthObj(sid, y, m, d));
  } else {
    insertMonthObj(sid, y, m, d);
  }
};

export const insertDateObj = async (sid, y, m, d) => {
  await insertYearObj(sid, y, m, d);
};
