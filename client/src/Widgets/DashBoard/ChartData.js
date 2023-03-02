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