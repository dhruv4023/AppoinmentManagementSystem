import Services from "../../models/Services.js";

export const incrementValBy1 = async function update(
  SID,
  yr,
  mn,
  dy,
  done,
  cancel
) {
  try {
    Services.updateOne(
      {
        SID: SID,
        "chartData.year.value": yr,
      },
      {
        $inc: {
          "chartData.$.year.total.0": done, // increment first value in the total array
          "chartData.$.year.total.1": cancel, // increment second value in the total array
        },
      }
    ).then((result) => {
      // console.log(result);
      Services.updateOne(
        { SID: SID, "chartData.months.value": yr + "-" + mn },
        {
          $inc: {
            "chartData.$[].months.$[month].total.0": done,
            "chartData.$[].months.$[month].total.1": cancel,
          },
        },
        { arrayFilters: [{ "month.value": yr + "-" + mn }] }
      )
        .then(() => {
          Services.updateOne(
            { SID: SID, "chartData.days.value": yr + "-" + mn + "-" + dy },
            {
              $inc: {
                "chartData.$[].days.$[day].total.0": done,
                "chartData.$[].days.$[day].total.1": cancel,
              },
            },
            { arrayFilters: [{ "day.value": yr + "-" + mn + "-" + dy }] }
          )
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    });
  } catch (error) {
    console.error(error);
  }
};
