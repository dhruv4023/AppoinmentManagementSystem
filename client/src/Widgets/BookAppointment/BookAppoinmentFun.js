export const saveAppointmentData = async ({ details, sid }) => {
  //   console.log(Details);
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/appointment/post/${sid}`,
    {   
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    }
  );
  const rs = await res.json();
  alert(rs.msg);
  return rs.id;
};
export const checkWhetherAppointmentAlredyBooked = async ({
  contactNumber,
  sid,
}) => {
  //   console.log(Details);
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/appointment/checkWhetherAppointmentAlredyBooked/${sid}`,
    {   
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contactNumber }),
    }
  );
  const rs = await res.json();
  rs.alredyBooked && alert(rs.msg);
  return rs.alredyBooked;
};

export const getBookedDtTm = async ( id) => {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/appointment/getbookedtime/${id}`,
    {   
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  return (data);
  // setUserNames(user ? data.filter((f) => f !== user.username) : data);
};