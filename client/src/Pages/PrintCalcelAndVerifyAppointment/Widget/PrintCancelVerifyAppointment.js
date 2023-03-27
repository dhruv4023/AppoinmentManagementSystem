export const getSinglebookedData = async (AID) => {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/appointment/getsinglebookeddata/${AID}`,
    {   
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  return data;
};
export const cancelAppointment = async (AID) => {
  // console.log("AID",AID)
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/appointment/cancelAppointment/${AID}`,
    {   
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  // console.log(data);
  alert(data);
};
