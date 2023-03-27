export const getAllBookedData = async ({ SID,date }) => {
  // console.log(SID)
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/appointment/getallbookeddata/${SID}/${date}`,
    {   
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(values),
    }
  );
  const data = await res.json();
  return data;
};
export const changeAppointmentStatus = async ({ AID, status }) => {
  // console.log(AID, status);
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/appointment/changeAppointmentStatus/${AID}`,
    {   
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({status}),
    }
  );
  alert(await res.json());
};
