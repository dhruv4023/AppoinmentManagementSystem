export const getSinglebookedData = async (aid) => {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/appointment/getsinglebookeddata/${aid}`,
    {   
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  return data;
};
export const cancelAppointment = async (aid) => {
  // console.log("aid",aid)
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/appointment/cancelAppointment/${aid}`,
    {   
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  // console.log(data);
  alert(data);
};
