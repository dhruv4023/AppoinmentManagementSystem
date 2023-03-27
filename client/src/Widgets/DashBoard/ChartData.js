export const getYearlydata = async (values) => {
    // console.log(SID)
    const res = await fetch(
      `${process.env.REACT_APP_SERVER}/chart/yealyData`,
      {   
        method: "POST",
        headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
      }
    );
    const data = await res.json();
    return data;
  };
export const getMonthlydata = async (values) => {
    // console.log(SID)
    const res = await fetch(
      `${process.env.REACT_APP_SERVER}/chart/monthlyData`,
      {   
        method: "POST",
        headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
      }
    );
    const data = await res.json();
    return data;
  };
export const getDailydata = async (values) => {
    // console.log(SID)
    const res = await fetch(
      `${process.env.REACT_APP_SERVER}/chart/daysData`,
      {   
        method: "POST",
        headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
      }
    );
    const data = await res.json();
    return data;
  };