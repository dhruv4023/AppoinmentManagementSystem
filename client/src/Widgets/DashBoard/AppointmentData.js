export const getAllBookedData = async ({ sid,date }) => {
  // console.log(sid)
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/appointment/getallbookeddata/${sid}/${date}`,
    {   
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(values),
    }
  );
  const data = await res.json();
  return data;
};
export const changeAppointmentStatus = async ({ aid, status }) => {
  // console.log(aid, status);
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/appointment/changeAppointmentStatus/${aid}`,
    {   
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({status}),
    }
  );
  alert(await res.json());
};
